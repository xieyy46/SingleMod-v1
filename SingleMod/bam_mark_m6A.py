################################################################################
#                                                                              #
#                               SingleMod v1                                   #
#               Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen                 #   
# Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  #                
#                                                                              #
################################################################################


import pysam
import sys
import array
import os
import argparse

def load_m6A(m6A_file):
	m6A={}
	for line in open(m6A_file,"r"):
		info = line.strip().split("\t")
		site = info[0].split("|")
		m6A.setdefault(site[3],{})
		if float(info[1]) > 0.5:
			m6A[site[3]][int(site[1])-1] = "M"
		else:
			m6A[site[3]][int(site[1])-1] = "U"
	return m6A


def mark_bam(in_bam,out_bam,m6A):
	with pysam.AlignmentFile(in_bam, "r") as bam,pysam.AlignmentFile(out_bam,"wb",template=bam) as outbam:
		bam_iter = bam.fetch()
		for i in bam_iter:
			if i.query_name in m6A:
				loc = [l for l,m in i.get_aligned_pairs() if m in m6A[i.query_name]]
				if None not in loc:
					status = [m6A[i.query_name][m] for l,m in i.get_aligned_pairs() if m in m6A[i.query_name]]
					status_dict = dict(zip(loc,status))
					seq = "".join([status_dict[j] if j in loc else i.seq[j] for j in range(len(i.seq))])
					qual = array.array('B',[80 if j in loc else i.query_qualities[j] for j in range(len(i.query_qualities))])
					mp = i.mapping_quality
					read_out = i
					read_out.query_sequence = seq
					read_out.query_qualities = qual
					read_out.mapping_quality = mp
					outbam.write(read_out)
				else:
					seq = [j for j in i.seq]
					seq.reverse()
					qual = i.query_qualities.tolist()
					qual.reverse()
					cig = []
					q = []
					s = []
					p = []
					start = i.reference_start
					for x,y in i.cigartuples:
						if x == 1:
							cig.extend(["I"]*y)
							s.extend([seq.pop() for i in range(y)])
							q.extend([qual.pop() for i in range(y)])
							p.extend(["None"]*y)
						elif x == 2 :
							cig.extend(["D"]*y)
							s.extend(["None"]*y)
							q.extend(["None"]*y)
							p.extend([pos for pos in range(start,start+y)])
							start = start+y
						elif x == 3:
							cig.extend(["N"]*y)
							s.extend(["None"]*y)
							q.extend(["None"]*y)
							p.extend([pos for pos in range(start,start+y)])
							start = start+y
						elif x == 4:
							cig.extend(["S"]*y)
							s.extend([seq.pop() for i in range(y)])
							q.extend([qual.pop() for i in range(y)])
							p.extend(["None"]*y)
						else:		
							cig.extend(["M"]*y)
							s.extend([seq.pop() for i in range(y)])
							q.extend([qual.pop() for i in range(y)])
							p.extend([pos for pos in range(start,start+y)])
							start = start+y
					for j in m6A[i.query_name]:
						idx = p.index(j)
						cig[idx] = "M"
						q[idx] = 80
						s[idx] = m6A[i.query_name][j]
					n=1
					cigar = []
					for z in range(1,len(cig)):
						if cig[z] == cig[z-1]:
							n=n+1
							if z == len(cig)-1:
								cigar.append(str(n)+cig[z-1])
						else:
							cigar.append(str(n)+cig[z-1])
							n = 1
							if z == len(cig)-1:
								cigar.append(str(n)+cig[z])
					mp = i.mapping_quality
					qual = array.array('B',[j for j in q if j != "None"])
					sequence  = "".join([j for j in s if j != "None"])
					cigar = "".join(cigar)
					read_out = i
					read_out.query_sequence = sequence
					read_out.query_qualities = qual
					read_out.mapping_quality = mp
					read_out.cigarstring = cigar
					outbam.write(read_out)


def main():
	#command
	print("-------------------------------------------")
	print("python"," ".join(sys.argv),sep="\t")

	#parameters setting
	parser = argparse.ArgumentParser(description='mark m6A for each molecule in bam file for visualization in IGV')
	parser.add_argument('-b','--bam',required = True, help="the path to bam file")
	parser.add_argument('-p','--prediction',required = True, help="the path to m6A prediction result")
	parser.add_argument('-o','--out_bam',required = True, help="the path to out bam file")
	args = parser.parse_args(sys.argv[1:])

	if not (os.path.exists(args.bam) and os.path.exists(args.prediction)):
		print("One or both of the files (bam or prediction) does not exist. Exiting program.")
		exit()

	m6A = load_m6A(args.prediction)
	mark_bam(args.bam,args.out_bam,m6A)
	print(f'mark m6A into {args.bam} finish')
		
if __name__ == '__main__':
	main()
