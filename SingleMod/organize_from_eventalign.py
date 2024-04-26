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

def read_process(database,read_name,strand,idx,motif,memmap_sig,memmap_seq,memmap_extra,extra_file):

	#base to encoding
	encoding_dict = {'A': 0, 'C': 1, 'G': 2, 'T': 3}	

	sites, kmers, signals = database  
	cans = set([sites[i] for i, kmer in enumerate(kmers) if motif.match(kmer)])
	idx = idx
	for can in cans:
		first_index = sites.index(can)
		last_index = len(sites) - 1 - sites[::-1].index(can)
		middle_index = (first_index + last_index) // 2

		# +200 -200
		start_index = max(0, middle_index - 199)
		end_index = min(len(kmers), middle_index + 201)

		can_motif = kmers[middle_index]
		kmer_slice = kmers[start_index:end_index]
		signal_slice = signals[start_index:end_index]
	
		#save to memmap
		if len(signal_slice) == 400:
			# to array
			signal_slice_array = np.array(signal_slice, dtype="float32")
			kmer_slice_array =  np.array([encoding_dict[i]  for i in "".join(kmer_slice)],dtype="int8").reshape(400,5)
			
			memmap_sig[idx] = signal_slice_array
			memmap_seq[idx] = kmer_slice_array
			memmap_extra[idx] = can+"|"+read_name+"|"+can_motif
			
			print(can,read_name,can_motif,file=extra_file,sep="\t")
			idx = idx + 1
	return idx

def eventalign_process(eventalign,strands,motif,out_dir,prefix,size):

	#save extra information
	extra_file = open(out_dir + "/" + prefix + "_extra_info.txt","w")

	#save data to memmap
	memmap_seq = np.memmap(out_dir + "/" + prefix + '_sequence.npy', mode='w+', shape=(size,400,5), dtype="int8")
	memmap_sig = np.memmap(out_dir + "/" + prefix + '_signal.npy', mode='w+', shape=(size,400), dtype="float32")
	memmap_extra = np.memmap(out_dir + "/" + prefix + '_extra.npy', mode='w+', shape=(size), dtype="<U70")

	with open(eventalign,"r") as f:	

		# header
		next(f)
		#first line 
		line = f.readline().strip()
		info = line.strip().split("\t")
		database = [[],[],[]]
		read_name = info[3]
		strand = strands.get(read_name)
		if strand == "+" and info[9] != "NNNNN":
			site = info[0]+"|"+info[1]+"|+"
			ran = int(info[14]) - int(info[13])
			database[0][:0] = [site] * ran
			database[1][:0] = [info[9]] * ran
			database[2][:0] = list(map(float, info[15].split(",")))		
		elif strand == "-" and info[9] != "NNNNN":
			site = info[0]+"|"+info[1]+"|-"
			ran = int(info[14]) - int(info[13])
			database[0].extend([site] * ran)
			database[1].extend([info[9]] * ran)
			database[2].extend(map(float, info[15].split(",")))
		else:
			pass

		n = 2
		idx = 0 
		for line in f:
			info = line.strip().split("\t")
			if info[3] == read_name:
				strand = strands.get(info[3])
				if strand == "+" and info[9] != "NNNNN":
					site = info[0]+"|"+info[1]+"|+"
					ran = int(info[14]) - int(info[13])
					database[0][:0] = [site] * ran
					database[1][:0] = [info[9]] * ran
					database[2][:0] = list(map(float, info[15].split(",")))
				elif strand == "-" and info[9] != "NNNNN":
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
				idx = read_process(database,read_name,strand,idx,motif,memmap_sig,memmap_seq,memmap_extra,extra_file)		
		
				database = [[],[],[]]
				read_name = info[3]
				strand = strands.get(read_name)
				if strand == "+" and info[9] != "NNNNN":
					site = info[0]+"|"+info[1]+"|+"
					ran = int(info[14]) - int(info[13])
					database[0][:0] = [site] * ran
					database[1][:0] = [info[9]] * ran
					database[2][:0] = list(map(float, info[15].split(",")))
				elif strand == "-" and info[9] != "NNNNN":
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
		idx = read_process(database,read_name,strand,idx,motif,memmap_sig,memmap_seq,memmap_extra,extra_file)
	
	
	#close memmap
	del memmap_seq
	del memmap_sig
	del memmap_extra

	extra_file.close()
	print(prefix,"all finish")

def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")	
	
	#parameters setting
	parser = argparse.ArgumentParser(description='extra and organize raw signals from nanopolish eventalign result')
	parser.add_argument('-b','--bed',required = True, help="the path to bed file")
	parser.add_argument('-e','--eventalign',required = True, help="the path to eventalign.txt")
	parser.add_argument('-o','--out_dir',required = True, help="the directory saving output results")
	parser.add_argument('-p','--prefix',required = True, help="the prefix of output results")
	parser.add_argument('-s','--size',type=int,default=15000000,required = False, help="the first dimension of memmap files; default setting is 15000000, which is enough to cover 5G DRS data. If your data is over 5G, set a larger size, for example 5-10G: 30000000, 10-15G: 45000000")
	args = parser.parse_args(sys.argv[1:])

	if not (os.path.exists(args.bed) and os.path.exists(args.eventalign)):
		print("One or both of the files (bed or eventalign.txt) does not exist. Exiting program.")
		exit()
	
	if not os.path.exists(args.out_dir):
		os.makedirs(args.out_dir)
	
	#candidate motif
	#the current version focuses on NDAYN motifs
	motif = re.compile(r'.[ATG]A[TC].')

	#extra strand information from bed file
	strands = {}
	with open(args.bed,"r") as f:
		for line in f:
			info = line.strip().split("\t")
			strands[info[3]] = info[5]


	eventalign_process(args.eventalign,strands,motif,args.out_dir,args.prefix,args.size)		

if __name__ == '__main__':
	main()
