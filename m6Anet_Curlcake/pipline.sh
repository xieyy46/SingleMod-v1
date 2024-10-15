#!/bin/bash
#version: m6Anet 2.0.2 (https://github.com/GoekeLab/m6anet)

#used_raw_data: m6A_fast5 (rep1), UNM_rep1_fast5 (rep1) (https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE124309)
#ref.fa: reference (https://github.com/novoalab/EpiNano/tree/master/Reference_sequences/cc.fasta)

#basecalling
guppy_basecaller -i m6A_fast5 -s output/m6A -c rna_r9.4.1_70bps_hac.cfg --fast5_out -r --cpu_threads_per_caller 10
guppy_basecaller -i UNM_fast5 -s output/UNM -c rna_r9.4.1_70bps_hac.cfg --fast5_out -r --cpu_threads_per_caller 10

#alignment
cat output/m6A/pass/*fastq > m6A.fastq
cat output/UNM/pass/*fastq > UNM.fastq

minimap2 -a ref.fa -t 24 --secondary=no m6A.fastq -o m6A.sam
minimap2 -a ref.fa -t 24 --secondary=no UNM.fastq -o UNM.sam
samtools view -@ 24 -F 2048 -F 4 -b m6A.sam | samtools sort -O BAM -@ 24 -o m6A.bam
samtools view -@ 24 -F 2048 -F 4 -b UNM.sam | samtools sort -O BAM -@ 24 -o UNM.bam
samtools index -@ 24 m6A.bam
samtools index -@ 24 UNM.bam

#eventalign
nanopolish index --directory=m6A_fast5 --sequencing-summary=output/m6A/sequencing_summary.txt m6A.fastq
nanopolish index --directory=UNM_fast5 --sequencing-summary=output/UNM/sequencing_summary.txt UNM.fastq

nanopolish eventalign \
--reads m6A.fastq --bam m6A.bam --genome ref.fa \
--scale-events --signal-index -t 24 --summary=m6A_eventalign.summary > m6A_eventalign.txt
nanopolish eventalign \
--reads UNM.fastq --bam UNM.bam --genome ref.fa \
--scale-events --signal-index -t 24 --summary=UNM_eventalign.summary > UNM_eventalign.txt

#m6Anet dataprep
m6anet dataprep --eventalign m6A_evenalign.txt \
--out_dir dataprep/m6A \
--n_processes 24 \
--readcount_max 1000000

m6anet dataprep --eventalign UNM_evenalign.txt \
--out_dir dataprep/UNM \
--n_processes 24 \
--readcount_max 1000000

#m6Anet inference
m6anet inference --input_dir dataprep/m6A --out_dir run/m6A --n_processes 24
m6anet inference --input_dir dataprep/UNM --out_dir run/UNM --n_processes 24
