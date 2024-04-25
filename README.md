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
| extract_feature_onestep.py  | generate features for each DRACN motif in each molecule | |
| organize_feature.py   | organize features into input format of SingleMod  | |
| mir_predict.py    | predict the probability of m6A modification for each DRACN motif in each molecule | |
| bam_mark_m6A.py   | mark m6A modifications in bam file for visualization of single-molecule m6A| |
| mir_train.py      | training your own models | **needed only for training your own models** |

SingleMod models: https://github.com/xieyy46/SingleMod/tree/main/models
