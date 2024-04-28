# SingleMod
by Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen  
Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  

![schematic illustration of SingleMod](https://github.com/xieyy46/SingleMod-v1/blob/main/Figures/schematic%20illustration.png)
A deep learning model designed for the precise detection of m6A within single RNA molecules using nanopore DRS data. SingleMod is trained through a deep multiple instance regression framework, carefully tailored to harness the extensive methylation-rate labels. SingleMod is a generizable framework which can be easily adopted to train model for other Nucleic Acid Modifications.
# Requisites
Data preparing:
| Data | Note | 
|:--------------:|:----------------------------:|
| fast5 files |  containing raw current signals |
| reference.fa | genome.fa or transcript.fa, we recommend genome.fa|
| methylation_rate.bed | methylation-rate labels, **needed only for training your own models** |

Environment:   
Our pipeline is executed on the Linux system.    
Python3.6+ is required. 

Softwares:
| Tool | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| Guppy  | generate fastq from fast5 through basecalling  | ignored, if your fast5 has been basecalled |
| minimap2 | align reads to reference.fa  | ignored, if you have mapped your reads |
| Picard | split bam file to multiples one | allowing for parallel processing, significantly saving time |
| nanopolish | eventalign, assign current signals to bases | |

python modules:
| Module | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| torch  | an open source Python machine learning library | |
| adabound | optimize the model's parameters | **needed only for training your own models**|

SingleMod code:
| Code | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| organize_from_eventalign.py  | extra and organize raw signals from nanopolish eventalign result | |
| split_into_motif.py  | extra and organize raw signals into different motifs | |
| SingleMod_m6A_prediction.py  | predict m6A modification within each molecule | |
| bam_mark_m6A.py  | mark m6A modifications into bam file for visualization of single-molecule m6A | |
| SingleMod_train.py | training your own models | **needed only for training your own models** |

SingleMod models: https://github.com/xieyy46/SingleMod-v1/tree/main/models   

# Running SingleMod  
#Following our pipeline, beginners in DRS can easily generate single-molecule m6A profile   
#Welcome to use our test data for end-to-end practice; our test data provides the expected results for each step: https://github.com/xieyy46/SingleMod/tree/main/test

1, basecalling # ignore, if your fast5 has been basecalled  
`guppy_basecaller -i fast5_dir -s basecall_output_dir -c rna_r9.4.1_70bps_hac.cfg -x 'auto'`  
* `fast5_dir`: path to directory containing your fast5 files (xxx.fast5) 
* `basecall_output_dir`: path to directory containing outputs during basecalling process

2, mapping and spliting bam file
```
mkdir split_bam_dir

#mapping
cat basecall_output_dir/pass/*fastq > basecall_output_dir/merge.fastq # ignore, if you have merge your fastq files  
minimap2 -ax map-ont -k 14 reference.fa -t 25 --secondary=no basecall_output_dir/merge.fastq -o sample_name.sam # ignore, if you have mapped your reads
samtools view -@ 30 -F 2048 -F 4 -b sample_name.sam | samtools sort -O BAM -@ 20  -o sample_name.bam
samtools index -@ 16 sample_name.bam

#spliting bam files for parallel processing
java -jar picard.jar SplitSamByNumberOfReads --INPUT sample_name.bam --SPLIT_TO_N_FILES 25 --OUTPUT split_bam_dir
for bam in split_bam_dir/*bam
do
{
samtools index $bam
} &
done
```
* `split_bam_dir`: path to directory containing split bam files  
* `--SPLIT_TO_N_FILES 25`: how many files sample_name.bam should be split into for following parallel processing. This value can be adjust.
* The default prefix for split bam files is shard_

3, nanopolish eventalign  
```
mkdir eventalign_output_dir

#making index
nanopolish index --directory=fast5_dir --sequencing-summary=basecall_output_dir/sequencing_summary.txt
# or if you donot have sequencing_summary.txt, but much slower: nanopolish index --directory=fast5_dir basecall_output_dir/merge.fastq

#parallelly nanopolish eventalign 
for file in split_bam_dir/*.bam
do
{
info=(${file//// })
nanopolish eventalign --reads basecall_output_dir/merge.fastq --bam $file --genome reference.fa -t 15 --scale-events --samples --signal-index --summary eventalign_output_dir/${info[-1]%%.bam}_summary.txt --print-read-names > eventalign_output_dir/${info[-1]%%.bam}_eventalign.txt
} &
done
#if run out of memory, please run in batches
```
* `eventalign_output_dir`: path to directory containing outputs during nanopolish eventalign process  
* `sequencing_summary.txt`: this file will be generate in basecalling step

4, extracting and organizing features for m6A prediction (or model traning)
```
mkdir tmp_features  
mkdir features

cd split_bam_dir
#convert bam to bed to extra strand information
for file in shard*bam
do
{
bedtools bamtobed -i $file > ${file/.bam/.bed}
} &
done
wait

#running parallelly
batch=(shard_0001 shard_0002 shard_0003 shard_0004 shard_0005 shard_0006 shard_0007 shard_0008 shard_0009 shard_0010 shard_0011 shard_0012 shard_0013 shard_0014 shard_0015 shard_0016 shard_0017 shard_0018 shard_0019 shard_0020 shard_0021 shard_0022 shard_0023 shard_0024 shard_0025)
for i in ${batch[@]}
do
{
python -u SingleMod/organize_from_eventalign.py -b split_bam_dir/${i}.bed -e eventalign_output_dir/${i}_evenalign.txt -o tmp_features -p $i
} &
done
wait
cd tmp_features
wc -l *_extra_info.txt | sed 's/^ *//g' | sed '$d' | tr " " "\t"   > extra_info.txt

python -u SingleMod/split_into_motif.py -d tmp_features -o features
```
* `tmp_features`: path to directory containing intermediate file 
* `features`: path to directory containing final input files to SingleMod for different motifs (including sequence.npy, signal.npy and extra.npy) 

5, m6A prediction
```
mkdir prediction

#predicting
# we now support m6A prediction within 43 motifs
for motif in AAACA AAACC AAACG AAACT AAATA AAATT AGACA AGACC AGACG AGACT AGATT ATACA ATACT CAACA CAACT CGACT CTACT GAACA GAACC GAACG GAACT GAATA GAATC GAATG GAATT GGACA GGACC GGACG GGACT GGATA GGATC GGATG GGATT GTACA GTACT TAACA TAACT TGACA TGACC TGACG TGACT TTACA TTACT
do
python -u SingleMod/SingleMod_m6A_prediction.py -d features -k $motif -m models/model_${motif}.pth.tar -g 0 -b 30000 -o prediction/${motif}_prediction.txt
done

#organizing the results
cat prediction/*_prediction.txt > prediction.txt

#calculate methylation rate for each sites from single-molecule m6A prediction
awk 'BEGIN{OFS=FS="\t"}{split($1,info,"|");s=info[1]"|"info[2]"|"info[3]"|"info[5];t[s]=t[s]+1;if($2 > 0.5){m[s]=m[s]+1}}END{for(i in t){split(i,info,"|");if(i in m){print info[1],info[2]-1,info[2],i,m[i]/t[i],info[3],t[i],m[i],info[4]}else{print info[1],info[2]-1,info[2],i,0,info[3],t[i],0,info[4]}}}' prediction.txt | sort -k1,1 -k2,2n > mr.bed  

```
* `prediction`: directory containing m6A prediction results
* `models`: directory containing SingleMod models
* `-g`: cuda index, default is using CPU; if you use GPU, please specify the cuda index
* `-b`: batch size for m6A prediction, default is 30000; if you use CPU to make prediction, you can use a larger batch size
* `prediction.txt` is the final result containing single-molecule m6A prediction, its format is as follow:  
(chromosome|location|strand|read_name|motif  probability)  
chromosome_14|3864706|+|90e1832b-38e5-40c3-944d-b7cfd1407ad6|AAACA  0.9866609573364258
chromosome_5|747885|+|388ca3b1-1353-4dbc-a5c9-b3fdf0ed5818|AAACA  4.8746630335547135e-34
* `mr.bed` contains methylation rate results for each sites calculated from single-molecule m6A prediction, its format is as follow:  
(chromosome location-1  location  ID  methylation_rate  strand  total_molecule_number  modified_molecule_number  motif)  
chr1  16677290  16677291  chr1|16677291|+|AAACA  0.156863  +  51   8  AAACA  
chr1  16677516  16677517  chr1|16677517|+|AAACA  0.037736  +  53   2  AAACA


7, visualization of single-molecule m6A in IGV (optional)
```
mkdir marked

#marking m6A modification information into bam file
cd split_bam_dir
for file in *bam
do
{
python -u SingleMod/bam_mark_m6A.py  prediction.txt $file marked/$file
} &
done
wait

#merge and index
cd marked
for file in *bam; do samtools index $file;done
samtools merge -@ 20 merge.bam *bam
samtools index merge.bam
rm shard*
```
* `marked`: path to directory containing m6A-marked bam file

Load the m6A-marked bam file into IGV. A representative gene snapshot is shown below (the gray and black vertical bars indicate A and m6A, respectively):  
#To achieve a clearer visualization, it is necessary to modify some settings in IGV. Please following: https://github.com/xieyy46/SingleMod/blob/main/test/marked/README.md

![MCL1 single-molecule m6A](https://github.com/xieyy46/SingleMod/blob/main/Figures/MCL1_single-molecule_m6A.png)


# Citing SingleMod
# Data availability
