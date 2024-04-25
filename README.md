# SingleMod
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
| minimap2 | align reads to reference.fa  | we recommend mapping your reads to genome.fa |
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

SingleMod models: https://github.com/xieyy46/SingleMod/tree/main/models

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
