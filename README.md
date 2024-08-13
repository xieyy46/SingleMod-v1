# SingleMod
by Ying-Yuan Xie, Zhen-Dong Zhong, Hong-Xuan Chen  
Correspondence to: zhangzhang@mail.sysu.edu.cn and luogzh5@mail.sysu.edu.cn  

![schematic illustration of SingleMod](https://github.com/xieyy46/SingleMod-v1/blob/main/Figures/schematic%20illustration.png)
A deep learning model designed for the precise detection of m6A within single RNA molecules using nanopore DRS data. SingleMod is trained through a deep multiple instance regression framework, carefully tailored to harness the extensive methylation-rate labels. SingleMod is a generizable framework which can be easily adopted to train model for other Nucleic Acid Modifications.   

**Note:** SingleMod support m6A prediction from direct RNA sequencing data generated using RNA002 kit or the latest RNA004 kit.

# Requisites
Data preparing:
| Data | Note | 
|:--------------:|:----------------------------:|
| fast5 or pod5 files |  containing raw current signals |
| reference.fa | genome.fa or transcript.fa, we recommend genome.fa|
| methylation_rate.bed | methylation-rate labels, **needed only for training your own models** |

Environment:   
Our pipeline is executed on the Linux system.    
Python3.6+ is required. 

Softwares:
| Tool | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| Guppy   | generate fastq from fast5 through basecalling  | ignored, if your fast5 has been basecalled |
| dorado   | generate fastq from pod5 through basecalling  | for RNA004 data, ignored, if your pod5 has been basecalled |
| minimap2 | align reads to reference.fa  | ignored, if you have mapped your reads |
| Picard | split bam file to multiple ones | allowing for parallel processing, significantly saving time |
| nanopolish | eventalign, assign current signals to bases | |
| pod5 | convert pod5 format to fast5 format | for RNA004 data |
| f5c | eventalign, assign current signals to bases | for RNA004 data |

python modules:
| Module | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| torch  | an open source Python machine learning library | |
| adabound | optimize the model's parameters | **needed only for training your own models**|

SingleMod code (https://github.com/xieyy46/SingleMod-v1/tree/main/SingleMod):
| Code | Usage | Note |
|:--------------:|:----------------------------:|:----------------------------:|
| organize_from_eventalign.py  | extra and organize raw signals from nanopolish eventalign result | |
| merge_motif_npy.py  | extra and organize raw signals into different motifs | |
| SingleMod_m6A_prediction.py  | predict m6A modification within each molecule | |
| bam_mark_m6A.py  | mark m6A modifications into bam file for visualization of single-molecule m6A | |
| SingleMod_train.py | training your own models | **needed only for training your own models** |

SingleMod models:   
RNA002 (mammal): https://github.com/xieyy46/SingleMod-v1/tree/main/models/RNA002/mammal    
RNA002 (non-mammal): https://github.com/xieyy46/SingleMod-v1/tree/main/models/RNA002/non-mammal    
RNA004: https://github.com/xieyy46/SingleMod-v1/tree/main/models/RNA004   

# Running SingleMod  
#Following our pipeline, beginners in DRS can easily generate single-molecule m6A profile.    
#Welcome to use our test data （including both RNA002 and RNA004） for end-to-end practice; we also provide the expected results for each step: https://github.com/xieyy46/SingleMod-v1/tree/main/test

1, basecalling # ignore, if your fast5 has been basecalled  
```
RNA002:
guppy_basecaller -i fast5_dir -s basecall_output_dir -c rna_r9.4.1_70bps_hac.cfg -x 'cuda:all'

RNA004:
dorado basecaller rna004_130bps_sup@v3.0.1 pod5_dir -x 'cuda:all' > basecall_output_dir/calls.bam
dorado summary basecall_output_dir/calls.bam > basecall_output_dir/calls.summary
samtools fastq basecall_output_dir/calls.bam  > basecall_output_dir/calls.fastq
```
* `fast5_dir`: path to directory containing your fast5 files (xxx.fast5).
* `pod5_dir`: path to directory containing your pod5 files (xxx.pod5).  
* `basecall_output_dir`: path to directory containing outputs during basecalling process.
* `-x`: specify cuda index to use GPU for basecalling.

2, mapping and spliting bam file
```
mkdir split_bam_dir

#mapping
RNA002:
cat basecall_output_dir/pass/*fastq > basecall_output_dir/merge.fastq # ignore, if you have merge your fastq files
RNA004:
mv basecall_output_dir/calls.fastq basecall_output_dir/merge.fastq
#if mapping to genome.fa  
minimap2 -ax splice -k 14 reference.fa -t 25 --secondary=no basecall_output_dir/merge.fastq -o sample_name.sam # ignore, if you have mapped your reads
#if mapping to transcript.fa 
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
* `split_bam_dir`: path to directory containing split bam files.  
* `--SPLIT_TO_N_FILES 25`: how many files sample_name.bam should be split into for following parallel processing. This value can be adjust.
* The default prefix for split bam files is shard_xxxx.  

3, eventalign  
```
mkdir eventalign_output_dir

#making index
RNA002:
nanopolish index --directory=fast5_dir --sequencing-summary=basecall_output_dir/sequencing_summary.txt basecall_output_dir/merge.fastq
# or if you donot have sequencing_summary.txt, but much slower: nanopolish index --directory=fast5_dir basecall_output_dir/merge.fastq
RNA004:
pod5 convert to_fast5 pod5_dir/ --output fast5_dir/
f5c index --iop 4 -d fast5_dir basecall_output_dir/merge.fastq

#parallelly nanopolish eventalign
RNA002:
for file in split_bam_dir/*.bam
do
{
info=(${file//// })
nanopolish eventalign --reads basecall_output_dir/merge.fastq --bam $file --genome reference.fa -t 15 --scale-events --samples --signal-index --summary eventalign_output_dir/${info[-1]%%.bam}_summary.txt --print-read-names > eventalign_output_dir/${info[-1]%%.bam}_eventalign.txt
} &
done
RNA004:
for file in split_bam_dir/*.bam
do
{
info=(${file//// })
f5c eventalign -r basecall_output_dir/merge.fastq -b $file -g reference.fa -t 15 --pore rna004 --rna --scale-events --samples --signal-index --summary eventalign_output_dir/${info[-1]%%.bam}_summary.txt --print-read-names > eventalign_output_dir/${info[-1]%%.bam}_eventalign.txt
} &
done
#if run out of memory, please run in batches
```
* `eventalign_output_dir`: path to directory containing outputs during nanopolish eventalign process.   
* `sequencing_summary.txt`: this file will be generate in basecalling step.  

4, extracting and organizing features for m6A prediction (or model traning)
```
mkdir tmp_features  
mkdir features

cd split_bam_dir
#convert bam to bed to extract strand informationt
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
python -u SingleMod/organize_from_eventalign_new.py -v 002|004 -b split_bam_dir/${i}.bed -e eventalign_output_dir/${i}_eventalign.txt -o tmp_features -p $i -s 500000
} &
done
wait
cd tmp_features #required step
wc -l *-extra_info.txt | sed 's/^ *//g' | sed '$d' | tr " " "\t"   > extra_info.txt

python -u SingleMod/merge_motif_npy.py -v 002|004 -d tmp_features -s 500000 -o features
```
* `-v`: DRS kit used, choose either 002 (RNA002) or 004 (RNA004), with the default setting being 002.
* `-s`: the first dimension of memmap files (size), default setting is 500000. If run in 25 parallel batchs, 500000 is enough to cover 5G (or ~5 millions reads) DRS data. If your data is over 5G, set a larger size, for example 5-10G: 1000000, 10-15G: 1500000. 
* `tmp_features`: path to directory containing intermediate file.  
* `features`: path to directory containing final input files to SingleMod for different motifs (including sequence.npy, signal.npy and extra.npy).   

5, m6A prediction
```
mkdir prediction

#predicting
# we now support m6A prediction within 39 motifs for RNA002 data
for motif in AAACA AAACC AAACG AAACT AAATA AAATT AGACA AGACC AGACG AGACT AGATT ATACT CAACT CGACT CTACT GAACA GAACC GAACG GAACT GAATA GAATC GAATG GAATT GGACA GGACC GGACG GGACT GGATA GGATC GGATG GGATT GTACT TAACT TGACA TGACC TGACG TGACT TTACA TTACT
do
python -u SingleMod/SingleMod_m6A_prediction.py -v 002 -d features -k $motif -m models/model_${motif}.pth.tar -g 0 -b 30000 -o prediction/${motif}_prediction.txt
done

#36 motifs for RNA004 data
for motif in AAACA AAACC AAACG AAACT AAATA AAATT AGACA AGACC AGACG AGACT AGATT ATACT CAACT CGACT CTACT GAACA GAACC GAACT GAATA GAATG GAATT GGACA GGACC GGACG GGACT GGATA GGATC GGATG GGATT GTACT TAACA TAACT TGACA TGACC TGACT TTACT
do
python -u SingleMod/SingleMod_m6A_prediction.py -v 004 -d features -k $motif -m models/model_${motif}.pth.tar -g 0 -b 30000 -o prediction/${motif}_prediction.txt
done

#organizing the results
cat prediction/*_prediction.txt > prediction.txt

#calculate methylation rate for each sites from single-molecule m6A prediction
awk 'BEGIN{OFS=FS="\t"}{split($1,info,"|");s=info[1]"|"info[2]"|"info[3]"|"info[5];t[s]=t[s]+1;if($2 > 0.5){m[s]=m[s]+1}}END{for(i in t){split(i,info,"|");if(i in m){print info[1],info[2]-1,info[2],i,m[i]/t[i],info[3],t[i],m[i],info[4]}else{print info[1],info[2]-1,info[2],i,0,info[3],t[i],0,info[4]}}}' prediction.txt | sort -k1,1 -k2,2n > mr.bed  

```
* `prediction`: directory containing m6A prediction results.  
* `models`: directory containing SingleMod models.  
* `-g`: cuda index, default is using CPU; if you use GPU, please specify the cuda index.  
* `-b`: batch size for m6A prediction, default is 30000; if you use CPU to make prediction, you can use a larger batch size.  
* `prediction.txt` is the final result containing single-molecule m6A prediction, its format is as follow:  
(chromosome|location|strand|read_name|motif  probability)  
chr14|3864706|+|90e1832b-38e5-40c3-944d-b7cfd1407ad6|AAACA  0.9866609573364258
chr5|747885|+|388ca3b1-1353-4dbc-a5c9-b3fdf0ed5818|AAACA  4.8746630335547135e-34
* `mr.bed` contains methylation rate results for each sites calculated from single-molecule m6A prediction, its format is as follow:  
(chromosome location-1  location  ID  methylation_rate  strand  total_molecule_number  modified_molecule_number  motif)  
chr1  16677290  16677291  chr1|16677291|+|AAACA  0.156863  +  51   8  AAACA  
chr1  16677516  16677517  chr1|16677517|+|AAACA  0.037736  +  53   2  AAACA

6, visualization of single-molecule m6A in IGV (optional)
```
mkdir marked

#marking m6A modification information into bam file
cd split_bam_dir
for file in *bam
do
{
python -u SingleMod/bam_mark_m6A.py  -p prediction.txt -b $file -o marked/$file
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
#To achieve a clearer visualization, it is necessary to modify some settings in IGV. Please following: https://github.com/xieyy46/SingleMod-v1/blob/main/test/RNA002/marked/README.md

![MCL1 single-molecule m6A](https://github.com/xieyy46/SingleMod-v1/blob/main/Figures/MCL1_single-molecule_m6A.png)

# Training your own models
#You can train new models to detect modifications at single-molecule level, including m6A models in other motifs, or models for other types of modifications.
```
mkdir training
mkdir training/motif
mkdir training/motif/rep

python -u SingleMod/SingleMod_train.py -v 002|004 -s Sample1,Sample2,...,SampleN \
-seq Sample1_features/motif_sequence.npy,Sample2_features/motif_sequence.npy,...,SampleN_features/motif_sequence.npy \
-sig Sample1_features/motif_signal.npy,Sample2_features/motif_signal.npy,...,SampleN_features/motif_signal.npy \
-ext Sample1_features/motif_extra.npy,Sample2_features/motif_extra.npy,...,SampleN_features/motif_extra.npy \
-d Sample1_label,Sample2_label,...,SampleN_label \
-m motif -r 0 -g 0 \
-o training/motif/rep > training/motif/rep/training.log
```
* `training`: directory containing model training results.
* `-v`: DRS kit used, choose either 002 (RNA002) or 004 (RNA004), with the default setting being 002.
* `-m`: motif specified.
* `-r`: experiment batch index, used to set seed when split data into train, validate and test set, default is 0.
* `-g`: cuda index, default is using CPU
* `-d`: bed file containing the absolute quantification information (methylation rates), its format is as follow:   
(chromosvome location-1  location  *  methylation_rate  strand  kmer)   
chr1    15878   15879   *  0.0290404       -       CGCCAAGCT   
chr1    15939   15940   *  0.028949549999999998    -       AGGGAGCTC   

# Citing SingleMod
# Data availability
