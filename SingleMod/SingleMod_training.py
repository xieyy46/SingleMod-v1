import sys
import os
import torch
import torch.nn as nn
from torch.nn import functional as F
import random
from torch.autograd import Function
import numpy as np
from torch.utils.data import Dataset, Subset,DataLoader
import scipy.stats as ss
import collections
from torch.cuda.amp import autocast, GradScaler
import adabound
from datetime import datetime
import argparse

class MilDataset(Dataset):
	def __init__(self, data):
		self.data = [
			(
                                torch.from_numpy(item[0]),#seq
                                torch.from_numpy(item[1]),#sig
                                item[2],#label
				item[3],# extra
				len(item[3]) # read number
                        ) for item in data
                ]
	def __len__(self):
		return len(self.data)
	def __getitem__(self, index):
		return self.data[index]
	def n_features(self):
		return 2

def collate(batch):
	seq, sig, label, extra, length  = zip(*batch)
	return (
                torch.cat(seq, dim=0),
                torch.cat(sig, dim=0),
                torch.tensor(label).float(),
		extra,
		length
                )

def split_list(lst, chunk_size):
	for i in range(0, len(lst), chunk_size):
		yield lst[i:i + chunk_size]

def split_large_list(lst, max_chunk_size):
	result = []
	for chunk in split_list(lst, max_chunk_size):
		if len(chunk) < max_chunk_size and result:
			result[-1].extend(chunk)
		else:
			result.append(chunk)
	return result

def data_organize(sample, extra_npy, seq_npy, sig_npy, m6A_database, kit, coverage, seq, sig, label, extra, site):
	#load data
	motif_extra = np.memmap(extra_npy, mode='r', dtype="<U80")
	#total chunks number
	lengths = motif_extra.shape[0]
	if kit == "002":
		motif_seq = np.memmap( seq_npy, mode='r', shape=(lengths,400,5), dtype="int8")
	if kit == "004":
		motif_seq = np.memmap( seq_npy, mode='r', shape=(lengths,400,9), dtype="int8")
	motif_sig = np.memmap( sig_npy, mode='r', shape=(lengths,400), dtype="float32")

	#load m6A information for m6A database
	mr = {}
	kmer = {}
	for line in open(m6A_database,"r"):
		info = line.strip().split("\t")
		site_1 = info[0]+"|"+info[2]+"|"+info[5]
		mr[site_1] = float(info[4])
		kmer[site_1] = info[6]
	
	idxs = {}
	for idx,chunk in enumerate(motif_extra):
		info = chunk.split("|")
		site_1 = "|".join([info[0],str(int(info[1])+5),info[2]])
		if site_1 in mr:
			idxs.setdefault(site_1,[])
			idxs[site_1].append(idx)
	
	#organize single read data into site data
	for key,idx in idxs.items():
		if len(idx) >= coverage:
			if len(idx) < 800:
				seq.append(motif_seq[idx])
				sig.append(motif_sig[idx])
				label.append(mr[key])
				tmp_extra = []
				for i in motif_extra[idx]:
					info = i.strip().split("|")
					tmp_extra.append(key+"|"+info[3]+"|"+kmer[key]+"|"+sample)
				extra.append(tmp_extra)
				site.append(key+"|"+kmer[key]+"|"+sample)
			#split high coverage site into multi sites
			else:
				small_idxs = split_large_list(idx, 400)
				for small_idx in small_idxs:
					seq.append(motif_seq[small_idx])
					sig.append(motif_sig[small_idx])
					label.append(mr[key])
					tmp_extra = []
					for i in motif_extra[small_idx]:
						info = i.strip().split("|")
						tmp_extra.append(key+"|"+info[3]+"|"+kmer[key]+"|"+sample)
					extra.append(tmp_extra)
					site.append(key+"|"+kmer[key]+"|"+sample)	
	
	return seq, sig, label, extra, site

def data_construct(seq, sig, label, extra, site, proportion_train, replicate, out_dir, motif):
	random.seed(replicate) #setting seed using replicate index
	idx = list(range(len(seq)))
	random.shuffle(idx)
	len1 = int(len(seq) * proportion_train)
	len2 = int(len(seq) * (proportion_train + (1 - proportion_train)/2))
	train_seq,val_seq,test_seq = [seq[i] for i in idx[0:len1]],[seq[i] for i in idx[len1:len2]],[seq[i] for i in idx[len2:]]
	train_sig,val_sig,test_sig = [sig[i] for i in idx[0:len1]],[sig[i] for i in idx[len1:len2]],[sig[i] for i in idx[len2:]]
	train_label,val_label,test_label = [label[i] for i in idx[0:len1]],[label[i] for i in idx[len1:len2]],[label[i] for i in idx[len2:]]
	train_extra,val_extra,test_extra = [extra[i] for i in idx[0:len1]],[extra[i] for i in idx[len1:len2]],[extra[i] for i in idx[len2:]]
	train_site,val_site,test_site = [site[i] for i in idx[0:len1]],[site[i] for i in idx[len1:len2]],[site[i] for i in idx[len2:]]	

	train_data = list(zip(train_seq,train_sig,train_label,train_extra))
	val_data = list(zip(val_seq,val_sig,val_label,val_extra))
	test_data = list(zip(test_seq,test_sig,test_label,test_extra))
	print("load data finish")
	print(f'Train data size: {len(train_data)} sites')
	print(f'Validate data size: {len(val_data)} sites')
	print(f'Test data size: {len(test_data)} sites')
	f = open(out_dir + "/" + motif + "_data_split.txt","w")
	for i,j in enumerate(train_site):
		print(j,len(train_extra[i]),train_label[i],"Training",file=f,sep="\t")
	for i,j in enumerate(val_site):
		print(j,len(val_extra[i]),val_label[i],"Validating",file=f,sep="\t")
	for i,j in enumerate(test_site):
		print(j,len(test_extra[i]),test_label[i],"Testing",file=f,sep="\t")
	f.close()
	
	return train_data,val_data,test_data

def count_parameters(model):
 	return sum(p.numel() for p in model.parameters() if p.requires_grad)

#activate function
class ACT(Function):
	@staticmethod
	def forward(ctx, inputs):
		output = inputs.new(inputs.size())
		output[inputs > 0.5] = 1
		output[inputs <= 0.5] = 0
		ctx.save_for_backward(inputs)
		return output

	@staticmethod
	def backward(ctx, grad_output):
		input_, = ctx.saved_tensors
		grad_output[input_>1.] = 0
		grad_output[input_<0.] = 0
		return grad_output
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
		self.activate = ACT.apply

	def forward(self,sigs,seqs, length):
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
		predictions = self.activate(probs)
		blocks = torch.split(predictions, length)
		out = torch.stack([block.mean() for block in blocks])
		return out

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
		self.activate = ACT.apply

	def forward(self,sigs,seqs, length):
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
		predictions = self.activate(probs)
		blocks = torch.split(predictions, length)
		out = torch.stack([block.mean() for block in blocks])
		return out

def train_002(train_dl,val_dl,test_dl,epochs,out_dir,device):
	#define model, loss and optimizer
	model = Model_002().to(device)
	print("Construct model finish")
	print("Number of parameters: ", count_parameters(model))
	criterion = criterion = nn.MSELoss()
	optimizer = adabound.AdaBound(model.parameters(), lr=1e-3, final_lr=0.1)
	torch.set_num_threads(2)

	train_result = {}
	val_result = {}
	test_result = {}
	time = {}
	#onehot coding
	base_to_onehot = torch.eye(4)
	base_to_onehot = base_to_onehot.to(device)

	#for mix precision training
	scaler = GradScaler()
	for epoch in range(epochs):
		model.train()
		train_result.setdefault(epoch,[[],[],[],[]])
		val_result.setdefault(epoch,[[],[],[],[]])
		test_result.setdefault(epoch,[[],[],[],[]])
		for i,datas in enumerate(train_dl):
			seq, sig, label, extra,length = datas
			seq = seq.long().to(device)
			seq = base_to_onehot[seq.flatten()].view(-1, 400, 20).permute(0, 2, 1)
			sig = sig.reshape(-1,1,400).to(device)
			label = label.to(device)
			with autocast():
				outputs, prob , predictions = model(sig,seq,length)
				loss = criterion(outputs,label)
			optimizer.zero_grad()
			scaler.scale(loss).backward()
			scaler.step(optimizer)
			scaler.update()
			train_result[epoch][0].extend(label.tolist())
			train_result[epoch][1].extend(outputs.tolist())

		model.eval()
		with torch.no_grad():
			for i,datas in enumerate(val_dl):
				seq, sig, label, extra,length = datas
				seq = seq.long().to(device)
				seq = base_to_onehot[seq.flatten()].view(-1, 400, 20).permute(0, 2, 1)
				sig = sig.reshape(-1,1,400).to(device)
				label = label.to(device)
				outputs = model(sig,seq,length)
				val_result[epoch][0].extend(label.tolist()) 
				val_result[epoch][1].extend(outputs.tolist())

			for i,datas in enumerate(test_dl):
				seq, sig, label, extra,length = datas
				seq = seq.long().to(device)
				seq = base_to_onehot[seq.flatten()].view(-1, 400, 20).permute(0, 2, 1)
				sig = sig.reshape(-1,1,400).to(device)
				label = label.to(device)
				outputs = model(sig,seq,length)
				test_result[epoch][0].extend(label.tolist())
				test_result[epoch][1].extend(outputs.tolist())
		time[epoch] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		torch.save({'state_dict': model.state_dict()}, out_dir + '/model_'+str(epoch+1)+'.pth.tar', _use_new_zipfile_serialization=False)
		if (epoch+1) % 10 == 0:
			for key, values in train_result.items():
				train_targ = train_result[key][0]
				train_pred = train_result[key][1]
				val_targ = val_result[key][0]
				val_pred = val_result[key][1]
				test_targ = test_result[key][0]
				test_pred = test_result[key][1]
				#training performance 
				train_mae = np.mean(np.abs(np.subtract(train_targ, train_pred)))
				train_mse = np.mean(np.square(np.subtract(train_targ, train_pred)))
				train_corr = ss.pearsonr(train_targ, train_pred)[0]
				#validate performance
				val_mae = np.mean(np.abs(np.subtract(val_targ, val_pred)))
				val_mse = np.mean(np.square(np.subtract(val_targ, val_pred)))
				val_corr = ss.pearsonr(val_targ, val_pred)[0]
				#testing performance
				test_mae = np.mean(np.abs(np.subtract(test_targ, test_pred)))
				test_mse = np.mean(np.square(np.subtract(test_targ, test_pred)))
				test_corr = ss.pearsonr(test_targ, test_pred)[0]

				print(
                                        f'Epoch [{key + 1}/{epochs}]; Train MAE: {train_mae:.5f}, Train MSE: {train_mse:.5f}, Train Corr: {train_corr:.5f}; '
                                        f'Validate MAE: {val_mae:.5f}, Validate MSE: {val_mse:.5f}, Validate Corr: {val_corr:.5f}; '
                                        f'Test MAE: {test_mae:.5f}, Test MSE: {test_mse:.5f}, Test Corr: {test_corr:.5f}',
                                        "Adabound",
                                        time[key],
                                        sep="\t",
                                        flush=True
				)

			train_result = {}
			val_result = {}
			test_result = {}

	f.close()
	print("Training finish")

def train_004(train_dl,val_dl,test_dl,epochs,out_dir,device):
	#define model, loss and optimizer
	model = Model_004().to(device)
	print("Construct model finish")
	print("Number of parameters: ", count_parameters(model))
	criterion = criterion = nn.MSELoss()
	optimizer = adabound.AdaBound(model.parameters(), lr=1e-3, final_lr=0.1)
	torch.set_num_threads(2)

	train_result = {}
	val_result = {}
	test_result = {}
	time = {}
	#onehot coding
	base_to_onehot = torch.eye(4)
	base_to_onehot = base_to_onehot.to(device)
	
	#for mix precision training
	scaler = GradScaler()
	for epoch in range(epochs):
		model.train()
		train_result.setdefault(epoch,[[],[]])
		val_result.setdefault(epoch,[[],[]])
		test_result.setdefault(epoch,[[],[]])
		for i,datas in enumerate(train_dl):
			seq, sig, label, extra,length = datas
			seq = seq.long().to(device)
			seq = base_to_onehot[seq.flatten()].view(-1, 400, 36).permute(0, 2, 1)
			sig = sig.reshape(-1,1,400).to(device)
			label = label.to(device)
			with autocast():
				outputs = model(sig,seq,length)
				loss = criterion(outputs,label)
			optimizer.zero_grad()
			scaler.scale(loss).backward()
			scaler.step(optimizer)
			scaler.update()
			train_result[epoch][0].extend(label.tolist())
			train_result[epoch][1].extend(outputs.tolist())

		model.eval()
		with torch.no_grad():
			for i,datas in enumerate(val_dl):
				print(i)
				seq, sig, label, extra,length = datas
				seq = seq.long().to(device)
				seq = base_to_onehot[seq.flatten()].view(-1, 400, 36).permute(0, 2, 1)
				sig = sig.reshape(-1,1,400).to(device)
				label = label.to(device)
				outputs = model(sig,seq,length)
				val_result[epoch][0].extend(label.tolist())	
				val_result[epoch][1].extend(outputs.tolist())

			for i,datas in enumerate(test_dl):
				seq, sig, label, extra,length = datas
				seq = seq.long().to(device)
				seq = base_to_onehot[seq.flatten()].view(-1, 400, 36).permute(0, 2, 1)
				sig = sig.reshape(-1,1,400).to(device)
				label = label.to(device)
				outputs = model(sig,seq,length)
				test_result[epoch][0].extend(label.tolist())
				test_result[epoch][1].extend(outputs.tolist())
		time[epoch] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		torch.save({'state_dict': model.state_dict(),'optimize_state_dict':optimizer.state_dict()}, out_dir + '/model_'+str(epoch+1)+'.pth.tar', _use_new_zipfile_serialization=False)
		if (epoch+1) % 10 == 0:
			for key, values in train_result.items():
				train_targ = train_result[key][0]
				train_pred = train_result[key][1]
				val_targ = val_result[key][0]
				val_pred = val_result[key][1]
				test_targ = test_result[key][0]
				test_pred = test_result[key][1]
				#training performance 
				train_mae = np.mean(np.abs(np.subtract(train_targ, train_pred)))
				train_mse = np.mean(np.square(np.subtract(train_targ, train_pred)))
				train_corr = ss.pearsonr(train_targ, train_pred)[0]
				#validate performance
				val_mae = np.mean(np.abs(np.subtract(val_targ, val_pred)))
				val_mse = np.mean(np.square(np.subtract(val_targ, val_pred)))
				val_corr = ss.pearsonr(val_targ, val_pred)[0]
                                #testing performance
				test_mae = np.mean(np.abs(np.subtract(test_targ, test_pred)))
				test_mse = np.mean(np.square(np.subtract(test_targ, test_pred)))
				test_corr = ss.pearsonr(test_targ, test_pred)[0]

				print(
                                        f'Epoch [{key + 1}/{epochs}]; Train MAE: {train_mae:.5f}, Train MSE: {train_mse:.5f}, Train Corr: {train_corr:.5f}; '
                                        f'Validate MAE: {val_mae:.5f}, Validate MSE: {val_mse:.5f}, Validate Corr: {val_corr:.5f}; '
					f'Test MAE: {test_mae:.5f}, Test MSE: {test_mse:.5f}, Test Corr: {test_corr:.5f}',
                                        "Adabound",
                                        time[key],
                                        sep="\t",
					flush=True
                               )

			train_result = {}
			val_result = {}
			test_result = {}

	print("Training finish")

def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")
	
	#parameters setting
	parser = argparse.ArgumentParser(description='train SingleMod model for a specific motif')
	parser.add_argument('-v','--kit',type=str,default="002",required = False, help="the RNA kit version of DRS data, '002' for RNA002 kit and '004' for RNA004 kit")
	parser.add_argument('-s','--sample',required = True, help="sample name, multi samples shoule be separated by comma")
	parser.add_argument('-seq','--sequence_npy',required = True, help="the path to sequence.npy, multi files shoule be separated by comma")
	parser.add_argument('-sig','--signal_npy',required = True, help="the path to signal.npy, multi files shoule be separated by comma")
	parser.add_argument('-ext','--extra_npy',required = True, help="the path to extra.npy, multi files shoule be separated by comma")	
	parser.add_argument('-d','--m6A_database',required = True, help="m6A bed file by GLORI, multi files shoule be separated by comma")

	parser.add_argument('-m','--motif',required = True, help="motif specified")
	parser.add_argument('-p','--proportion_train',type=float,default=0.9,required = False, help="proportion of training data, 0-1, default is 0.9")
	parser.add_argument('-c','--coverage',type=int,default=20,required = False, help="minimum coverage required to train model, default is 20")
	parser.add_argument('-r','--replicate',type=int,default=0,required = False, help="experiment batch index, used to set seed when split data into train, validate and test set, default is 0")
	parser.add_argument('-e','--epochs',type=int,default=200,required = False, help="training epochs, default is 200")
	parser.add_argument('-b','--batch_size',type=int,default=10,required = False, help="training batch size, default is 10")
	parser.add_argument('-g','--gpu',type=int,default=0,required = False, help="cuda index, default is 0")	
	parser.add_argument('-o','--out_dir',default="./",required = False, help="the directory to output model and log, default is current directory")
	args = parser.parse_args(sys.argv[1:])

	print(	f'Samples: {args.sample}',
		f'Motif: {args.motif}',
		f'Experiment batch: {args.replicate}',
		f'Required coverage: {args.coverage}',
		f'Training epochs: {args.epochs}',
		f'Training batch size: {args.batch_size}',
		f'GPU: cuda:{args.gpu}',
		sep = "\n"
	)
	if not os.path.exists(args.out_dir):
		os.makedirs(args.out_dir)

	#sample list
	sample_list = args.sample.split(",")
	extra_npy_list = args.extra_npy.split(",")
	seq_npy_list = args.sequence_npy.split(",")
	sig_npy_list = args.signal_npy.split(",")
	m6A_database_list = args.m6A_database.split(",")
	
	#load data
	seq = []
	sig = []
	label = []
	extra = []
	site = []
	for i in zip(sample_list,extra_npy_list,seq_npy_list,sig_npy_list,m6A_database_list):
		sample,extra_npy,seq_npy,sig_npy,m6A_database = i[0],i[1],i[2],i[3],i[4]
		seq, sig, label, extra, site  = data_organize(sample,extra_npy,seq_npy,sig_npy,m6A_database, args.kit, args.coverage, seq, sig, label, extra, site)
		print(f'{sample} data organize finish')

	#organize data 
	train_data,val_data,test_data  = data_construct(seq, sig, label, extra, site, args.proportion_train,args.replicate,args.out_dir,args.motif)
	
	#construct training data
	train_dataset = MilDataset(train_data)
	train_dl = DataLoader(train_dataset,shuffle = True,batch_size = args.batch_size, collate_fn= collate)
	val_dataset = MilDataset(val_data)
	val_dl = DataLoader(val_dataset,shuffle = False,batch_size = 100, collate_fn= collate)
	test_dataset = MilDataset(test_data)
	test_dl = DataLoader(test_dataset,shuffle = False,batch_size = 100, collate_fn= collate)
	print("construct training data finish")
	
	#training

	os.environ["CUDA_VISIBLE_DEVICES"] = str(args.gpu)
	device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
	if args.kit == "002":
		train_002(train_dl,val_dl,test_dl,args.epochs,args.out_dir,device)
	if args.kit == "004":
		train_004(train_dl,val_dl,test_dl,args.epochs,args.out_dir,device)

if __name__ == '__main__':
	main()
