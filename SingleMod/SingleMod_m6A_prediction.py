################################################################################
#                                                                              #
#                               SingleMod v1                                   #
#               Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen                 #   
# Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  #                
#                                                                              #
################################################################################

import sys
import os
import torch
import torch.nn as nn
from torch.nn import functional as F
import random
import torch.multiprocessing as mp
from torch.nn.parallel import DistributedDataParallel as DDP
import torch.distributed as dist
from torch.autograd import Function
import numpy as np
from torch.utils.data import Dataset, Subset,DataLoader
import scipy.stats as ss
import collections
from torch.cuda.amp import autocast, GradScaler
#import adabound
from datetime import datetime
import argparse

class MilDataset(Dataset):
	def __init__(self, seq,sig,extra):
		self.seq = seq
		self.sig = sig
		self.extra = extra
	def __len__(self):
		return len(self.seq)
	def __getitem__(self, index):
		return torch.from_numpy(self.seq[index]),torch.from_numpy(self.sig[index]),self.extra[index]
	def n_features(self):
		return 2


class Model_002(nn.Module):
	def __init__(self):
		super(Model_002,self).__init__()
                # add layers
                #signal
		self.conv1 = nn.Sequential(
                        nn.Conv1d(1, out_channels=16, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(16),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=16, out_channels=32, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(32),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=32, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=128, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(128),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=128, out_channels=256, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(256),
                        nn.ReLU(),
                        nn.MaxPool1d(2)
		)
		
		#sequence
		self.conv2 = nn.Sequential(
                        nn.Conv1d(20, out_channels=16, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(16),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=16, out_channels=32, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(32),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=32, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=128, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(128),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=128, out_channels=256, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(256),
                        nn.ReLU(),
                        nn.MaxPool1d(2)
		)

		#dropout
		self.dropout = nn.Dropout(p=0.5)

		#merge
		self.conv3 = nn.Sequential(
                        nn.Conv1d(512, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=3),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=5),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=7),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=11),
                        nn.BatchNorm1d(64),
                        nn.ReLU()
		)

		self.fc = nn.Linear(64 * 3, 2)

                #activate
		self.softmax = nn.Softmax(dim=1)	

	def forward(self,sigs,seqs):
		#forward
		#module 1
		sigs_x = self.conv1(sigs)

                #module 2
		seqs_x = self.conv2(seqs)

                #merge
		z = torch.cat((self.dropout(sigs_x), self.dropout(seqs_x)), 1)
		z = self.conv3(z)
		z = torch.flatten(z, start_dim=1)
		z = self.dropout(z)
		z = self.fc(z)		

		#combine
		probs = self.softmax(z)[:,1]
		
		return probs
	
def inference_002(test_dl,model_pare,out_file,device):
	#load model
	model = Model_002().to(device)
	checkpoint = torch.load(model_pare,map_location=device)
	model.load_state_dict({k.replace('module.',''):v for k,v in checkpoint['state_dict'].items()})
	
	#open file to save predict result
	f1 = open(out_file,"w")
	
	#onehot coding
	base_to_onehot = torch.eye(4)
	base_to_onehot = base_to_onehot.to(device)

	#result
	test_prob = []
	test_extra = []

	model.eval()
	with torch.no_grad():
		for i,datas in enumerate(test_dl):	
			seq, sig, extra = datas
			seq = seq.long().to(device)
			seq = base_to_onehot[seq.flatten()].view(-1, 400, 20).permute(0, 2, 1)
			sig = sig.reshape(-1,1,400).to(device)
			prob  = model(sig,seq)
			test_prob.extend(prob.tolist())
			test_extra.extend(list(extra))
			
		
	for i in zip(test_extra,test_prob):
		info = i[0].split("|")
		if len(info) == 5 :
			site = "|".join([info[0],str(int(info[1])+3),info[2],info[3],info[4]])
			print(site,i[1],sep="\t",file=f1,flush=True)
	
	f1.close()

class Model_004(nn.Module):
	def __init__(self):
		super(Model_004,self).__init__()
		# add layers
		#signal
		self.conv1 = nn.Sequential(
                        nn.Conv1d(1, out_channels=16, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(16),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=16, out_channels=32, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(32),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=32, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=128, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(128),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=128, out_channels=256, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(256),
                        nn.ReLU(),
                        nn.MaxPool1d(2)
                )
         
                #sequence

		self.conv2 = nn.Sequential(
                        nn.Conv1d(36, out_channels=16, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(16),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=16, out_channels=32, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(32),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=32, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=128, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(128),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=128, out_channels=256, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(256),
                        nn.ReLU(),
                        nn.MaxPool1d(2)
		)

		#dropout
		self.dropout = nn.Dropout(p=0.5)

		#merge
		self.conv3 = nn.Sequential(
                        nn.Conv1d(512, out_channels=64, kernel_size=3,padding = 1),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.MaxPool1d(2),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=3),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=5),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=7),
                        nn.BatchNorm1d(64),
                        nn.ReLU(),
                        nn.Conv1d(in_channels=64, out_channels=64, kernel_size=11),
                        nn.BatchNorm1d(64),
                        nn.ReLU()
		)

		self.fc = nn.Linear(64 * 3, 2)

		#activate
		self.softmax = nn.Softmax(dim=1) 

	def forward(self,sigs,seqs):
		#forward
		#module 1
		sigs_x = self.conv1(sigs)

		#module 2
		seqs_x = self.conv2(seqs)

		#merge
		z = torch.cat((self.dropout(sigs_x), self.dropout(seqs_x)), 1)
		z = self.conv3(z)
		z = torch.flatten(z, start_dim=1)
		z = self.dropout(z)
		z = self.fc(z)   

		#combine
		probs = self.softmax(z)[:,1]

		return probs

def inference_004(test_dl,model_pare,out_file,device):
	#load model
	model = Model_004().to(device)
	checkpoint = torch.load(model_pare,map_location=device)
	model.load_state_dict({k.replace('module.',''):v for k,v in checkpoint['state_dict'].items()})

	#open file to save predict result
	f1 = open(out_file,"w")

	#onehot coding
	base_to_onehot = torch.eye(4)
	base_to_onehot = base_to_onehot.to(device)

	#result
	test_prob = []
	test_extra = []

	model.eval()
	with torch.no_grad():
		for i,datas in enumerate(test_dl):
			seq, sig, extra = datas
			seq = seq.long().to(device)
			seq = base_to_onehot[seq.flatten()].view(-1, 400, 36).permute(0, 2, 1)
			sig = sig.reshape(-1,1,400).to(device)
			prob  = model(sig,seq)
			test_prob.extend(prob.tolist())
			test_extra.extend(list(extra))


	for i in zip(test_extra,test_prob):
		info = i[0].split("|")
		if len(info) == 5 :
			site = "|".join([info[0],str(int(info[1])+5),info[2],info[3],info[4]])
			print(site,i[1],sep="\t",file=f1,flush=True)

	f1.close()

def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")
	
	#parameters setting
	parser = argparse.ArgumentParser(description='m6A prediction using SingleMod model within specific motif')
	parser.add_argument('-v','--kit',type=str,default="002",required = False, help="the RNA kit version of DRS data, '002' for RNA002 kit and '004' for RNA004 kit")
	parser.add_argument('-d','--npy_dir',required = True, help="the directory containing npy files")
	parser.add_argument('-k','--motif',required = True, help="specified motif")
	parser.add_argument('-m','--model',required = True, help="the SingleMod model")
	parser.add_argument('-g','--gpu',type=int,default=-1,required = False, help="cuda index, default is using CPU; if you use GPU, please specify the cuda index")
	parser.add_argument('-b','--batch_size',type=int,default=30000,required = False, help="batch size for m6A prediction, default is 30000; if you use CPU to make prediction, you can use a larger batch size (e.g. 200000) to save time")
	parser.add_argument('-o','--out_file',required = True, help="the file to output prediction result")
	args = parser.parse_args(sys.argv[1:])

	try:
		motif_extra = np.memmap(args.npy_dir + "/" + args.motif + "_extra.npy", mode='r', dtype="<U90")
		print(f'predicting m6A within {args.motif} motif start')
	except FileNotFoundError:
		print("do not find specified motif in your data")
		print("exit")
		exit()	

	#load data
	#total chunks number
	lengths = motif_extra.shape[0]
	if args.kit == "002":
		motif_seq = np.memmap( args.npy_dir + "/" + args.motif + "_sequence.npy", mode='r', shape=(lengths,400,5), dtype="int8")
	if args.kit == "004":
		motif_seq = np.memmap( args.npy_dir + "/" + args.motif + "_sequence.npy", mode='r', shape=(lengths,400,9), dtype="int8")
	motif_sig = np.memmap( args.npy_dir + "/" + args.motif + "_signal.npy", mode='r', shape=(lengths,400), dtype="float32")

	dataset = MilDataset(motif_seq, motif_sig,motif_extra)
	test_dl = DataLoader(dataset,shuffle = False,batch_size = args.batch_size)	
	
	if args.gpu == -1:
		device = torch.device('cpu')
	else:
		os.environ["CUDA_VISIBLE_DEVICES"] = str(args.gpu)
		device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
	if args.kit == "002":
		inference_002(test_dl,args.model,args.out_file,device)
	if args.kit == "004":
		inference_004(test_dl,args.model,args.out_file,device)
	print(f'predicting m6A within {args.motif} motif finish')

if __name__ == '__main__':
	main()
