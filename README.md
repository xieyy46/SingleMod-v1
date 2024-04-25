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
