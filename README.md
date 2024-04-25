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

5, extracting and organizing features for m6A prediction (or model traning)
```
mkdir features  

#search candidate sites for prediction (all DRACNs in all molecules)  
cd eventalign_output_dir  
for file in *eventalign.txt  
do
{
awk 'BEGIN{OFS=FS="\t"}{if($10 ~ /[GTA][AG]AC[ACGT]/){if($3==$10){print $1,".",".","+",$2+3,$2+3,$10}else{print $1,".",".","-",$2+3,$2+3,$10}}}' $file | sort --parallel 20 -T features/ | uniq > features/${file%%_eventalign.txt}_candidate.txt
} &
done
wait
cat features/*_candidate.txt | sort --parallel 20  -T features  | uniq > features/candidate.txt
rm features/*_candidate.txt

#generate strand information for each molecule
bedtools bamtobed  -i sample_name.bam | cut -f 4,6 > features/strand.txt

#generate prefix of files name for all split bam files
ls split_bam_dir/*bam | awk 'BEGIN{OFS=FS="\t"}{split($1,info,"/");print info[length(info)]}' | sed 's/.bam//g' > features/prefix.txt

#extracting features
python -u SingleMod/extract_feature_onestep.py -s features/strand.txt -c features/candidate.txt -e eventalign_output_dir -q sam2tsv_output_dir -p features/prefix.txt -o features -n 13 
ls path_to_features/features/*current_qual.txt > features/features.txt

#organizing features
python -u SingleMod/organize_feature.py -c features/features.txt -o features -n 25 -m DRACN
```
* `features`: path to directory containing candidate.txt, strand.txt, prefix.txt, features.txt, and train.npy (train.npy is the input of SingleMod)
