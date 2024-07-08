################################################################################
#	              		                                               #
#		      	        SingleMod v1                                   #
#	        Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen                 #   
# Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  #		
#                                                                              #
################################################################################

import sys
import re
import numpy as np
import os
import argparse

def read_process(kit,database,read_name,strand,idx,motifs,memmap_sig,memmap_seq,memmap_extra,extra_file):

	#base to encoding
	encoding_dict = {'A': 0, 'C': 1, 'G': 2, 'T': 3}	

	sites, kmers, signals = database
	if kit == "002":
		cans = set([sites[i] for i, kmer in enumerate(kmers) if kmer in motifs])
	if kit == "004":
		cans = set([sites[i] for i, kmer in enumerate(kmers) if kmer[2:7] in motifs])
	idx = idx
	for can in cans:
		first_index = sites.index(can)
		last_index = len(sites) - 1 - sites[::-1].index(can)
		middle_index = (first_index + last_index) // 2

		# +200 -200
		start_index = max(0, middle_index - 199)
		end_index = min(len(kmers), middle_index + 201)

		if kit == "002":
			can_motif = kmers[middle_index]
		if kit == "004":
			can_motif = kmers[middle_index][2:7]
		kmer_slice = kmers[start_index:end_index]
		signal_slice = signals[start_index:end_index]
	
		#save to memmap
		if len(signal_slice) == 400:
			# to array
			signal_slice_array = np.array(signal_slice, dtype="float32")
			if kit == "002":
				kmer_slice_array =  np.array([encoding_dict[i]  for i in "".join(kmer_slice)],dtype="int8").reshape(400,5)
			if kit == "004":
				kmer_slice_array =  np.array([encoding_dict[i]  for i in "".join(kmer_slice)],dtype="int8").reshape(400,9)
			
			motif_idx = idx[can_motif]			

			memmap_sig[can_motif][motif_idx] = signal_slice_array
			memmap_seq[can_motif][motif_idx] = kmer_slice_array
			memmap_extra[can_motif][motif_idx] = can+"|"+read_name+"|"+can_motif
			
			print(can,read_name,can_motif,file=extra_file[can_motif],sep="\t")
			idx[can_motif] = idx[can_motif] + 1
	return idx

def eventalign_process(kit,eventalign,strands,motifs,out_dir,prefix,size):

	extra_file, memmap_seq, memmap_sig, memmap_extra, idx  = {},{},{},{},{}
	for motif in motifs:
		#save extra information
		extra_file[motif] = open(out_dir + "/" + prefix + "-"+ motif + "-extra_info.txt","w")

		#save data to memmap
		if kit == "002":
			memmap_seq[motif] = np.memmap(out_dir + "/" + prefix + "-"+ motif + '-sequence.npy', mode='w+', shape=(size,400,5), dtype="int8")
		if kit == "004":
			memmap_seq[motif] = np.memmap(out_dir + "/" + prefix + "-"+ motif + '-sequence.npy', mode='w+', shape=(size,400,9), dtype="int8")
		memmap_sig[motif] = np.memmap(out_dir + "/" + prefix + "-"+ motif + '-signal.npy', mode='w+', shape=(size,400), dtype="float32")
		memmap_extra[motif] = np.memmap(out_dir + "/" + prefix + "-"+ motif + '-extra.npy', mode='w+', shape=(size), dtype="<U80")

		#index
		idx[motif] = 0

	with open(eventalign,"r") as f:	

		# header
		next(f)
		#first line 
		line = f.readline().strip()
		info = line.strip().split("\t")
		database = [[],[],[]]
		read_name = info[3]
		strand = strands.get(read_name)
		if strand == "+" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
			site = info[0]+"|"+info[1]+"|+"
			ran = int(info[14]) - int(info[13])
			database[0][:0] = [site] * ran
			database[1][:0] = [info[9]] * ran
			database[2][:0] = list(map(float, info[15].split(",")))		
		elif strand == "-" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
			site = info[0]+"|"+info[1]+"|-"
			ran = int(info[14]) - int(info[13])
			database[0].extend([site] * ran)
			database[1].extend([info[9]] * ran)
			database[2].extend(map(float, info[15].split(",")))
		else:
			pass

		n = 2
		for line in f:
			info = line.strip().split("\t")
			if info[3] == read_name:
				strand = strands.get(info[3])
				if strand == "+" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
					site = info[0]+"|"+info[1]+"|+"
					ran = int(info[14]) - int(info[13])
					database[0][:0] = [site] * ran
					database[1][:0] = [info[9]] * ran
					database[2][:0] = list(map(float, info[15].split(",")))
				elif strand == "-" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
					site = info[0]+"|"+info[1]+"|-"
					ran = int(info[14]) - int(info[13])
					database[0].extend([site] * ran)
					database[1].extend([info[9]] * ran)
					database[2].extend(map(float, info[15].split(",")))
				else:
					pass
				n = n+1
				if n % 500000 == 0:
					print(f'{prefix} {n} line finish')
			else:
				#previous read process
				strand = strands.get(read_name)
				idx = read_process(kit,database,read_name,strand,idx,motifs,memmap_sig,memmap_seq,memmap_extra,extra_file)		
		
				database = [[],[],[]]
				read_name = info[3]
				strand = strands.get(read_name)
				if strand == "+" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
					site = info[0]+"|"+info[1]+"|+"
					ran = int(info[14]) - int(info[13])
					database[0][:0] = [site] * ran
					database[1][:0] = [info[9]] * ran
					database[2][:0] = list(map(float, info[15].split(",")))
				elif strand == "-" and info[9] != "NNNNN" and info[9] != "NNNNNNNNN":
					site = info[0]+"|"+info[1]+"|-"
					ran = int(info[14]) - int(info[13])
					database[0].extend([site] * ran)
					database[1].extend([info[9]] * ran)
					database[2].extend(map(float, info[15].split(",")))
				else:
					pass
				n = n+1
				if n % 500000 == 0:
					print(f'{prefix} {n} line finish')
		#last read process
		strand = strands.get(read_name)
		idx = read_process(kit,database,read_name,strand,idx,motifs,memmap_sig,memmap_seq,memmap_extra,extra_file)
	
	
	#close memmap
	for motif in motifs:
		del memmap_seq[motif],memmap_sig[motif],memmap_extra[motif]

		extra_file[motif].close()
	print(prefix,"all finish")

def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")	
	
	#parameters setting
	parser = argparse.ArgumentParser(description='extra and organize raw signals from nanopolish eventalign result')
	parser.add_argument('-v','--kit',type=str,default="002",required = False, help="the RNA kit version of DRS data, '002' for RNA002 kit and '004' for RNA004 kit")
	parser.add_argument('-b','--bed',required = True, help="the path to bed file")
	parser.add_argument('-e','--eventalign',required = True, help="the path to eventalign.txt")
	parser.add_argument('-o','--out_dir',required = True, help="the directory saving output results")
	parser.add_argument('-p','--prefix',required = True, help="the prefix of output results")
	parser.add_argument('-s','--size',type=int,default=500000,required = False, help="the first dimension of memmap files; default setting is 500000. If run in 25 batchs, 500000 is enough to cover 5G DRS data. If your data is over 5G, set a larger size, for example 5-10G: 1000000, 10-15G: 1500000")
	args = parser.parse_args(sys.argv[1:])

	if not (os.path.exists(args.bed) and os.path.exists(args.eventalign)):
		print("One or both of the files (bed or eventalign.txt) does not exist. Exiting program.")
		exit()
	
	if not os.path.exists(args.out_dir):
		os.makedirs(args.out_dir)
	
	#candidate motif
	#the current version focuses on NDAYN motifs
	motifs = [i + x + "A" + y +z for i in ["A","C","G","T"] for x in ["A","T","G"] for y in ["C","T"] for z in ["A","C","G","T"]]

	#extra strand information from bed file
	strands = {}
	with open(args.bed,"r") as f:
		for line in f:
			info = line.strip().split("\t")
			strands[info[3]] = info[5]


	eventalign_process(args.kit,args.eventalign,strands,motifs,args.out_dir,args.prefix,args.size)		

if __name__ == '__main__':
	main()
