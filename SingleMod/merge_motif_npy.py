################################################################################
#                                                                              #
#                               SingleMod v1                                   #
#               Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen                 #   
# Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  #                
#                                                                              #
################################################################################


import numpy as np
import sys 
import multiprocessing
import os
import argparse
import functools

def load_data(args_list):
	motif, data_dir, out_dir, size = args_list

	seq = []
	sig = []
	extra = []
	for batch,chunk_number in chunks[motif].items():
		batch_seq = np.memmap( data_dir + "/" + batch + "-"+ motif + '-sequence.npy', mode='r', shape=(size,400,5), dtype="int8")
		batch_sig = np.memmap( data_dir + "/" + batch + "-"+ motif + '-signal.npy', mode='r', shape=(size,400), dtype="float32")
		batch_extra = np.memmap(data_dir + "/" + batch + "-"+ motif + '-extra.npy', mode='r', shape=(size), dtype="<U70")
		
		if chunk_number != 0:
			seq.append(batch_seq[0:chunk_number])
			sig.append(batch_sig[0:chunk_number])
			extra.append(batch_extra[0:chunk_number])
		
		print(f'{motif} {batch} finish')
		del batch_seq
		del batch_sig
		del batch_extra
	
	seq = np.concatenate(seq)
	sig = np.concatenate(sig)
	extra = np.concatenate(extra)
	
	#write to new memmap
	motif_seq = np.memmap( out_dir + "/" + motif + '_sequence.npy', mode='w+', shape=seq.shape, dtype="int8")
	motif_sig = np.memmap( out_dir + "/" + motif + '_signal.npy', mode='w+', shape=sig.shape, dtype="float32")
	motif_extra = np.memmap(out_dir + "/" + motif + '_extra.npy', mode='w+', shape=extra.shape, dtype="<U70")
	
	motif_seq[:] = seq[:]
	motif_sig[:] = sig[:]
	motif_extra[:] = extra[:]

	motif_seq.flush()
	motif_sig.flush()
	motif_extra.flush()
	
	del motif_seq
	del motif_sig
	del motif_extra
	print(f'{motif} finish; total length: {len(seq)}')

def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")

        #parameters setting
	parser = argparse.ArgumentParser(description='extra and organize raw signals into different motifs')
	parser.add_argument('-d','--data_dir',required = True, help="the directory containing npy files and extra_info.txt (the output directory of organize_from_eventalign.py)")
	parser.add_argument('-o','--out_dir',required = True, help="the directory saving output results")
	parser.add_argument('-s','--size',type=int,default=500000,required = False, help="the first dimension of npy files (the size setting when runing organize_from_eventalign.py). If error occur, do not use default setting")
	parser.add_argument('-p','--process',type=int,default=8,required = False, help="the number of process; default setting is 20")
	args = parser.parse_args(sys.argv[1:])

	if not os.path.exists(args.data_dir):
		print("The directory containing npy files and extra_info.txt does not exist. Exiting program.")
		exit()

	if not os.path.exists(args.out_dir):
		os.makedirs(args.out_dir)
	
	global chunks
	chunks = {}
	for line in open(args.data_dir + "/extra_info.txt","r"):	
		info = line.strip().split("\t")
		batch = info[1].split("-")[0]
		motif = info[1].split("-")[1]
		chunks.setdefault(motif,{})
		chunks[motif][batch] = int(info[0])

	#candidate motif
	motifs = chunks.keys()

	args_lists = [(motif, args.data_dir, args.out_dir, args.size) for motif in motifs]	

	p = multiprocessing.Pool(args.process)
	p.map(load_data, args_lists)
	p.close()
	p.join()
	print("All finish")

if __name__ == "__main__":
	main()
