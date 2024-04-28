[
    {
        "aggregation": "segment", 
        "analysis_id": "dadcc58e-8ba7-4cd4-b486-41c8c9e653ef", 
        "basecall_1d": {
            "exit_status_dist": {
                "fail:qscore_filter": 3, 
                "pass": 3997
            }, 
            "qscore_dist_temp": [
                {
                    "count": 3, 
                    "mean_qscore": 6.5
                }, 
                {
                    "count": 86, 
                    "mean_qscore": 7.0
                }, 
                {
                    "count": 107, 
                    "mean_qscore": 7.5
                }, 
                {
                    "count": 151, 
                    "mean_qscore": 8.0
                }, 
                {
                    "count": 200, 
                    "mean_qscore": 8.5
                }, 
                {
                    "count": 323, 
                    "mean_qscore": 9.0
                }, 
                {
                    "count": 479, 
                    "mean_qscore": 9.5
                }, 
                {
                    "count": 574, 
                    "mean_qscore": 10.0
                }, 
                {
                    "count": 599, 
                    "mean_qscore": 10.5
                }, 
                {
                    "count": 575, 
                    "mean_qscore": 11.0
                }, 
                {
                    "count": 463, 
                    "mean_qscore": 11.5
                }, 
                {
                    "count": 263, 
                    "mean_qscore": 12.0
                }, 
                {
                    "count": 113, 
                    "mean_qscore": 12.5
                }, 
                {
                    "count": 35, 
                    "mean_qscore": 13.0
                }, 
                {
                    "count": 23, 
                    "mean_qscore": 13.5
                }, 
                {
                    "count": 5, 
                    "mean_qscore": 14.0
                }, 
                {
                    "count": 1, 
                    "mean_qscore": 15.0
                }
            ], 
            "qscore_sum_temp": {
                "count": 4000, 
                "mean": 10.471681594848633, 
                "sum": 41886.7265625
            }, 
            "read_len_events_sum_temp": 12961339, 
            "seq_len_bases_dist_temp": [
                {
                    "count": 4000, 
                    "length": 0.0
                }
            ], 
            "seq_len_bases_sum_temp": 4000, 
            "seq_len_events_dist_temp": [
                {
                    "count": 232, 
                    "length": 0.0
                }, 
                {
                    "count": 946, 
                    "length": 1000.0
                }, 
                {
                    "count": 1124, 
                    "length": 2000.0
                }, 
                {
                    "count": 713, 
                    "length": 3000.0
                }, 
                {
                    "count": 367, 
                    "length": 4000.0
                }, 
                {
                    "count": 233, 
                    "length": 5000.0
                }, 
                {
                    "count": 133, 
                    "length": 6000.0
                }, 
                {
                    "count": 99, 
                    "length": 7000.0
                }, 
                {
                    "count": 59, 
                    "length": 8000.0
                }, 
                {
                    "count": 31, 
                    "length": 9000.0
                }, 
                {
                    "count": 23, 
                    "length": 10000.0
                }, 
                {
                    "count": 17, 
                    "length": 11000.0
                }, 
                {
                    "count": 7, 
                    "length": 12000.0
                }, 
                {
                    "count": 4, 
                    "length": 13000.0
                }, 
                {
                    "count": 2, 
                    "length": 14000.0
                }, 
                {
                    "count": 5, 
                    "length": 15000.0
                }, 
                {
                    "count": 2, 
                    "length": 16000.0
                }, 
                {
                    "count": 2, 
                    "length": 17000.0
                }, 
                {
                    "count": 1, 
                    "length": 19000.0
                }
            ], 
            "speed_bases_per_second_dist_temp": [
                {
                    "count": 4000, 
                    "speed": 1.0
                }
            ], 
            "strand_median_pa": {
                "count": 4000, 
                "mean": 85.13560485839844, 
                "sum": 340542.40625
            }, 
            "strand_sd_pa": {
                "count": 4000, 
                "mean": 12.429203987121582, 
                "sum": 49716.81640625
            }
        }, 
        "channel_count": 466, 
        "context_tags": {
            "barcoding_enabled": "0", 
            "basecall_config_filename": "rna_r9.4.1_70bps_hac.cfg", 
            "experiment_duration_set": "4320", 
            "experiment_type": "rna", 
            "local_basecalling": "1", 
            "package": "bream4", 
            "package_version": "6.0.10", 
            "sample_frequency": "3012", 
            "sequencing_kit": "sqk-rna002"
        }, 
        "latest_run_time": 291.1696472167969, 
        "levels_sums": {
            "count": 4000, 
            "mean": null, 
            "open_pore_level_sum": null
        }, 
        "opts": {
            "calib_max_sequence_length": "1550", 
            "calib_min_coverage": "0.600000", 
            "calib_min_sequence_length": "1100", 
            "calib_reference": "YHR174W.fasta", 
            "chunk_size": "2000", 
            "chunks_per_caller": "10000", 
            "chunks_per_runner": "512", 
            "config": "rna_r9.4.1_70bps_hac.cfg", 
            "device": "auto", 
            "dmean_threshold": "10.000000", 
            "dmean_win_size": "400", 
            "gpu_runners_per_device": "4", 
            "jump_threshold": "2.000000", 
            "max_search_len": "15000", 
            "min_qscore": "7.000000", 
            "model_file": "template_rna_r9.4.1_70bps_hac.jsn", 
            "overlap": "50", 
            "ping_segment_duration": "60", 
            "ping_url": "https://ping.oxfordnanoportal.com/basecall", 
            "qscore_offset": "0.420000", 
            "qscore_scale": "0.880000", 
            "records_per_fastq": "4000", 
            "reverse_sequence": "1", 
            "trim_min_events": "100", 
            "trim_strategy": "rna", 
            "trim_threshold": "5.000000", 
            "u_substitution": "1"
        }, 
        "read_count": 4000, 
        "reads_per_channel_dist": [
            {
                "channel": 1, 
                "count": 7
            }, 
            {
                "channel": 2, 
                "count": 7
            }, 
            {
                "channel": 3, 
                "count": 13
            }, 
            {
                "channel": 4, 
                "count": 5
            }, 
            {
                "channel": 5, 
                "count": 7
            }, 
            {
                "channel": 7, 
                "count": 7
            }, 
            {
                "channel": 8, 
                "count": 5
            }, 
            {
                "channel": 9, 
                "count": 8
            }, 
            {
                "channel": 10, 
                "count": 9
            }, 
            {
                "channel": 11, 
                "count": 12
            }, 
            {
                "channel": 12, 
                "count": 9
            }, 
            {
                "channel": 13, 
                "count": 9
            }, 
            {
                "channel": 15, 
                "count": 6
            }, 
            {
                "channel": 16, 
                "count": 9
            }, 
            {
                "channel": 17, 
                "count": 11
            }, 
            {
                "channel": 18, 
                "count": 6
            }, 
            {
                "channel": 19, 
                "count": 9
            }, 
            {
                "channel": 20, 
                "count": 1
            }, 
            {
                "channel": 21, 
                "count": 8
            }, 
            {
                "channel": 22, 
                "count": 8
            }, 
            {
                "channel": 23, 
                "count": 8
            }, 
            {
                "channel": 24, 
                "count": 11
            }, 
            {
                "channel": 25, 
                "count": 9
            }, 
            {
                "channel": 27, 
                "count": 10
            }, 
            {
                "channel": 28, 
                "count": 11
            }, 
            {
                "channel": 30, 
                "count": 13
            }, 
            {
                "channel": 31, 
                "count": 14
            }, 
            {
                "channel": 32, 
                "count": 9
            }, 
            {
                "channel": 33, 
                "count": 8
            }, 
            {
                "channel": 35, 
                "count": 6
            }, 
            {
                "channel": 36, 
                "count": 10
            }, 
            {
                "channel": 37, 
                "count": 10
            }, 
            {
                "channel": 38, 
                "count": 11
            }, 
            {
                "channel": 39, 
                "count": 8
            }, 
            {
                "channel": 40, 
                "count": 4
            }, 
            {
                "channel": 41, 
                "count": 9
            }, 
            {
                "channel": 42, 
                "count": 8
            }, 
            {
                "channel": 43, 
                "count": 1
            }, 
            {
                "channel": 44, 
                "count": 10
            }, 
            {
                "channel": 45, 
                "count": 10
            }, 
            {
                "channel": 46, 
                "count": 13
            }, 
            {
                "channel": 47, 
                "count": 13
            }, 
            {
                "channel": 49, 
                "count": 8
            }, 
            {
                "channel": 50, 
                "count": 9
            }, 
            {
                "channel": 51, 
                "count": 14
            }, 
            {
                "channel": 52, 
                "count": 8
            }, 
            {
                "channel": 53, 
                "count": 10
            }, 
            {
                "channel": 54, 
                "count": 6
            }, 
            {
                "channel": 55, 
                "count": 10
            }, 
            {
                "channel": 56, 
                "count": 6
            }, 
            {
                "channel": 57, 
                "count": 9
            }, 
            {
                "channel": 58, 
                "count": 11
            }, 
            {
                "channel": 59, 
                "count": 10
            }, 
            {
                "channel": 60, 
                "count": 7
            }, 
            {
                "channel": 62, 
                "count": 8
            }, 
            {
                "channel": 63, 
                "count": 6
            }, 
            {
                "channel": 64, 
                "count": 7
            }, 
            {
                "channel": 65, 
                "count": 5
            }, 
            {
                "channel": 66, 
                "count": 9
            }, 
            {
                "channel": 67, 
                "count": 9
            }, 
            {
                "channel": 68, 
                "count": 11
            }, 
            {
                "channel": 69, 
                "count": 8
            }, 
            {
                "channel": 70, 
                "count": 8
            }, 
            {
                "channel": 72, 
                "count": 8
            }, 
            {
                "channel": 74, 
                "count": 12
            }, 
            {
                "channel": 75, 
                "count": 9
            }, 
            {
                "channel": 76, 
                "count": 10
            }, 
            {
                "channel": 78, 
                "count": 11
            }, 
            {
                "channel": 79, 
                "count": 11
            }, 
            {
                "channel": 80, 
                "count": 9
            }, 
            {
                "channel": 82, 
                "count": 8
            }, 
            {
                "channel": 83, 
                "count": 11
            }, 
            {
                "channel": 84, 
                "count": 13
            }, 
            {
                "channel": 86, 
                "count": 8
            }, 
            {
                "channel": 87, 
                "count": 8
            }, 
            {
                "channel": 88, 
                "count": 7
            }, 
            {
                "channel": 90, 
                "count": 13
            }, 
            {
                "channel": 91, 
                "count": 11
            }, 
            {
                "channel": 92, 
                "count": 10
            }, 
            {
                "channel": 94, 
                "count": 9
            }, 
            {
                "channel": 95, 
                "count": 12
            }, 
            {
                "channel": 97, 
                "count": 9
            }, 
            {
                "channel": 98, 
                "count": 12
            }, 
            {
                "channel": 99, 
                "count": 5
            }, 
            {
                "channel": 100, 
                "count": 9
            }, 
            {
                "channel": 101, 
                "count": 1
            }, 
            {
                "channel": 102, 
                "count": 9
            }, 
            {
                "channel": 103, 
                "count": 9
            }, 
            {
                "channel": 104, 
                "count": 6
            }, 
            {
                "channel": 105, 
                "count": 8
            }, 
            {
                "channel": 106, 
                "count": 9
            }, 
            {
                "channel": 107, 
                "count": 10
            }, 
            {
                "channel": 109, 
                "count": 6
            }, 
            {
                "channel": 110, 
                "count": 9
            }, 
            {
                "channel": 111, 
                "count": 7
            }, 
            {
                "channel": 112, 
                "count": 9
            }, 
            {
                "channel": 113, 
                "count": 8
            }, 
            {
                "channel": 114, 
                "count": 8
            }, 
            {
                "channel": 115, 
                "count": 10
            }, 
            {
                "channel": 116, 
                "count": 7
            }, 
            {
                "channel": 117, 
                "count": 10
            }, 
            {
                "channel": 118, 
                "count": 11
            }, 
            {
                "channel": 119, 
                "count": 10
            }, 
            {
                "channel": 120, 
                "count": 12
            }, 
            {
                "channel": 121, 
                "count": 11
            }, 
            {
                "channel": 122, 
                "count": 7
            }, 
            {
                "channel": 123, 
                "count": 6
            }, 
            {
                "channel": 125, 
                "count": 8
            }, 
            {
                "channel": 126, 
                "count": 5
            }, 
            {
                "channel": 127, 
                "count": 7
            }, 
            {
                "channel": 129, 
                "count": 7
            }, 
            {
                "channel": 130, 
                "count": 7
            }, 
            {
                "channel": 131, 
                "count": 10
            }, 
            {
                "channel": 132, 
                "count": 11
            }, 
            {
                "channel": 133, 
                "count": 8
            }, 
            {
                "channel": 134, 
                "count": 11
            }, 
            {
                "channel": 135, 
                "count": 14
            }, 
            {
                "channel": 136, 
                "count": 10
            }, 
            {
                "channel": 137, 
                "count": 9
            }, 
            {
                "channel": 138, 
                "count": 10
            }, 
            {
                "channel": 139, 
                "count": 11
            }, 
            {
                "channel": 140, 
                "count": 10
            }, 
            {
                "channel": 141, 
                "count": 7
            }, 
            {
                "channel": 142, 
                "count": 8
            }, 
            {
                "channel": 143, 
                "count": 9
            }, 
            {
                "channel": 144, 
                "count": 10
            }, 
            {
                "channel": 145, 
                "count": 7
            }, 
            {
                "channel": 146, 
                "count": 11
            }, 
            {
                "channel": 147, 
                "count": 9
            }, 
            {
                "channel": 148, 
                "count": 6
            }, 
            {
                "channel": 149, 
                "count": 13
            }, 
            {
                "channel": 150, 
                "count": 8
            }, 
            {
                "channel": 151, 
                "count": 5
            }, 
            {
                "channel": 152, 
                "count": 8
            }, 
            {
                "channel": 153, 
                "count": 8
            }, 
            {
                "channel": 154, 
                "count": 7
            }, 
            {
                "channel": 155, 
                "count": 12
            }, 
            {
                "channel": 156, 
                "count": 8
            }, 
            {
                "channel": 158, 
                "count": 11
            }, 
            {
                "channel": 159, 
                "count": 9
            }, 
            {
                "channel": 160, 
                "count": 8
            }, 
            {
                "channel": 161, 
                "count": 7
            }, 
            {
                "channel": 162, 
                "count": 10
            }, 
            {
                "channel": 163, 
                "count": 7
            }, 
            {
                "channel": 164, 
                "count": 14
            }, 
            {
                "channel": 165, 
                "count": 6
            }, 
            {
                "channel": 166, 
                "count": 9
            }, 
            {
                "channel": 167, 
                "count": 9
            }, 
            {
                "channel": 168, 
                "count": 12
            }, 
            {
                "channel": 169, 
                "count": 3
            }, 
            {
                "channel": 170, 
                "count": 9
            }, 
            {
                "channel": 171, 
                "count": 8
            }, 
            {
                "channel": 172, 
                "count": 11
            }, 
            {
                "channel": 173, 
                "count": 9
            }, 
            {
                "channel": 174, 
                "count": 10
            }, 
            {
                "channel": 175, 
                "count": 8
            }, 
            {
                "channel": 176, 
                "count": 10
            }, 
            {
                "channel": 177, 
                "count": 9
            }, 
            {
                "channel": 178, 
                "count": 8
            }, 
            {
                "channel": 179, 
                "count": 9
            }, 
            {
                "channel": 180, 
                "count": 8
            }, 
            {
                "channel": 181, 
                "count": 8
            }, 
            {
                "channel": 182, 
                "count": 13
            }, 
            {
                "channel": 183, 
                "count": 6
            }, 
            {
                "channel": 184, 
                "count": 9
            }, 
            {
                "channel": 185, 
                "count": 11
            }, 
            {
                "channel": 186, 
                "count": 8
            }, 
            {
                "channel": 187, 
                "count": 10
            }, 
            {
                "channel": 188, 
                "count": 6
            }, 
            {
                "channel": 189, 
                "count": 6
            }, 
            {
                "channel": 190, 
                "count": 9
            }, 
            {
                "channel": 191, 
                "count": 8
            }, 
            {
                "channel": 192, 
                "count": 7
            }, 
            {
                "channel": 193, 
                "count": 6
            }, 
            {
                "channel": 194, 
                "count": 11
            }, 
            {
                "channel": 195, 
                "count": 10
            }, 
            {
                "channel": 196, 
                "count": 10
            }, 
            {
                "channel": 199, 
                "count": 10
            }, 
            {
                "channel": 200, 
                "count": 9
            }, 
            {
                "channel": 202, 
                "count": 9
            }, 
            {
                "channel": 205, 
                "count": 8
            }, 
            {
                "channel": 206, 
                "count": 8
            }, 
            {
                "channel": 207, 
                "count": 6
            }, 
            {
                "channel": 208, 
                "count": 7
            }, 
            {
                "channel": 209, 
                "count": 4
            }, 
            {
                "channel": 211, 
                "count": 12
            }, 
            {
                "channel": 212, 
                "count": 8
            }, 
            {
                "channel": 213, 
                "count": 11
            }, 
            {
                "channel": 214, 
                "count": 11
            }, 
            {
                "channel": 215, 
                "count": 9
            }, 
            {
                "channel": 216, 
                "count": 6
            }, 
            {
                "channel": 217, 
                "count": 7
            }, 
            {
                "channel": 218, 
                "count": 7
            }, 
            {
                "channel": 219, 
                "count": 7
            }, 
            {
                "channel": 220, 
                "count": 12
            }, 
            {
                "channel": 221, 
                "count": 9
            }, 
            {
                "channel": 222, 
                "count": 3
            }, 
            {
                "channel": 223, 
                "count": 8
            }, 
            {
                "channel": 224, 
                "count": 9
            }, 
            {
                "channel": 225, 
                "count": 7
            }, 
            {
                "channel": 226, 
                "count": 10
            }, 
            {
                "channel": 227, 
                "count": 3
            }, 
            {
                "channel": 228, 
                "count": 8
            }, 
            {
                "channel": 230, 
                "count": 8
            }, 
            {
                "channel": 231, 
                "count": 6
            }, 
            {
                "channel": 232, 
                "count": 7
            }, 
            {
                "channel": 233, 
                "count": 9
            }, 
            {
                "channel": 235, 
                "count": 6
            }, 
            {
                "channel": 236, 
                "count": 8
            }, 
            {
                "channel": 237, 
                "count": 8
            }, 
            {
                "channel": 239, 
                "count": 8
            }, 
            {
                "channel": 240, 
                "count": 12
            }, 
            {
                "channel": 241, 
                "count": 12
            }, 
            {
                "channel": 242, 
                "count": 10
            }, 
            {
                "channel": 243, 
                "count": 5
            }, 
            {
                "channel": 244, 
                "count": 9
            }, 
            {
                "channel": 245, 
                "count": 9
            }, 
            {
                "channel": 246, 
                "count": 5
            }, 
            {
                "channel": 247, 
                "count": 6
            }, 
            {
                "channel": 248, 
                "count": 4
            }, 
            {
                "channel": 249, 
                "count": 10
            }, 
            {
                "channel": 250, 
                "count": 8
            }, 
            {
                "channel": 251, 
                "count": 6
            }, 
            {
                "channel": 252, 
                "count": 7
            }, 
            {
                "channel": 253, 
                "count": 11
            }, 
            {
                "channel": 254, 
                "count": 9
            }, 
            {
                "channel": 255, 
                "count": 8
            }, 
            {
                "channel": 256, 
                "count": 10
            }, 
            {
                "channel": 257, 
                "count": 10
            }, 
            {
                "channel": 258, 
                "count": 2
            }, 
            {
                "channel": 259, 
                "count": 5
            }, 
            {
                "channel": 260, 
                "count": 9
            }, 
            {
                "channel": 261, 
                "count": 6
            }, 
            {
                "channel": 262, 
                "count": 11
            }, 
            {
                "channel": 263, 
                "count": 9
            }, 
            {
                "channel": 264, 
                "count": 8
            }, 
            {
                "channel": 265, 
                "count": 10
            }, 
            {
                "channel": 266, 
                "count": 7
            }, 
            {
                "channel": 267, 
                "count": 9
            }, 
            {
                "channel": 268, 
                "count": 5
            }, 
            {
                "channel": 269, 
                "count": 5
            }, 
            {
                "channel": 270, 
                "count": 11
            }, 
            {
                "channel": 271, 
                "count": 8
            }, 
            {
                "channel": 272, 
                "count": 7
            }, 
            {
                "channel": 274, 
                "count": 10
            }, 
            {
                "channel": 275, 
                "count": 7
            }, 
            {
                "channel": 276, 
                "count": 5
            }, 
            {
                "channel": 277, 
                "count": 9
            }, 
            {
                "channel": 278, 
                "count": 9
            }, 
            {
                "channel": 279, 
                "count": 10
            }, 
            {
                "channel": 280, 
                "count": 11
            }, 
            {
                "channel": 281, 
                "count": 7
            }, 
            {
                "channel": 283, 
                "count": 11
            }, 
            {
                "channel": 284, 
                "count": 2
            }, 
            {
                "channel": 285, 
                "count": 7
            }, 
            {
                "channel": 286, 
                "count": 6
            }, 
            {
                "channel": 287, 
                "count": 11
            }, 
            {
                "channel": 289, 
                "count": 9
            }, 
            {
                "channel": 290, 
                "count": 10
            }, 
            {
                "channel": 291, 
                "count": 9
            }, 
            {
                "channel": 292, 
                "count": 8
            }, 
            {
                "channel": 293, 
                "count": 9
            }, 
            {
                "channel": 294, 
                "count": 10
            }, 
            {
                "channel": 295, 
                "count": 4
            }, 
            {
                "channel": 296, 
                "count": 7
            }, 
            {
                "channel": 297, 
                "count": 10
            }, 
            {
                "channel": 298, 
                "count": 10
            }, 
            {
                "channel": 299, 
                "count": 9
            }, 
            {
                "channel": 300, 
                "count": 10
            }, 
            {
                "channel": 301, 
                "count": 3
            }, 
            {
                "channel": 302, 
                "count": 8
            }, 
            {
                "channel": 303, 
                "count": 8
            }, 
            {
                "channel": 304, 
                "count": 8
            }, 
            {
                "channel": 305, 
                "count": 11
            }, 
            {
                "channel": 307, 
                "count": 6
            }, 
            {
                "channel": 308, 
                "count": 5
            }, 
            {
                "channel": 309, 
                "count": 8
            }, 
            {
                "channel": 310, 
                "count": 7
            }, 
            {
                "channel": 311, 
                "count": 9
            }, 
            {
                "channel": 312, 
                "count": 12
            }, 
            {
                "channel": 313, 
                "count": 12
            }, 
            {
                "channel": 314, 
                "count": 10
            }, 
            {
                "channel": 315, 
                "count": 6
            }, 
            {
                "channel": 316, 
                "count": 11
            }, 
            {
                "channel": 317, 
                "count": 9
            }, 
            {
                "channel": 318, 
                "count": 7
            }, 
            {
                "channel": 319, 
                "count": 10
            }, 
            {
                "channel": 320, 
                "count": 9
            }, 
            {
                "channel": 321, 
                "count": 6
            }, 
            {
                "channel": 322, 
                "count": 9
            }, 
            {
                "channel": 323, 
                "count": 7
            }, 
            {
                "channel": 324, 
                "count": 7
            }, 
            {
                "channel": 325, 
                "count": 9
            }, 
            {
                "channel": 326, 
                "count": 11
            }, 
            {
                "channel": 327, 
                "count": 11
            }, 
            {
                "channel": 328, 
                "count": 9
            }, 
            {
                "channel": 329, 
                "count": 7
            }, 
            {
                "channel": 330, 
                "count": 10
            }, 
            {
                "channel": 331, 
                "count": 6
            }, 
            {
                "channel": 332, 
                "count": 8
            }, 
            {
                "channel": 333, 
                "count": 4
            }, 
            {
                "channel": 334, 
                "count": 6
            }, 
            {
                "channel": 335, 
                "count": 7
            }, 
            {
                "channel": 336, 
                "count": 9
            }, 
            {
                "channel": 337, 
                "count": 7
            }, 
            {
                "channel": 339, 
                "count": 7
            }, 
            {
                "channel": 340, 
                "count": 6
            }, 
            {
                "channel": 341, 
                "count": 10
            }, 
            {
                "channel": 342, 
                "count": 12
            }, 
            {
                "channel": 343, 
                "count": 11
            }, 
            {
                "channel": 344, 
                "count": 13
            }, 
            {
                "channel": 345, 
                "count": 6
            }, 
            {
                "channel": 346, 
                "count": 13
            }, 
            {
                "channel": 347, 
                "count": 5
            }, 
            {
                "channel": 348, 
                "count": 9
            }, 
            {
                "channel": 349, 
                "count": 14
            }, 
            {
                "channel": 350, 
                "count": 7
            }, 
            {
                "channel": 351, 
                "count": 13
            }, 
            {
                "channel": 352, 
                "count": 10
            }, 
            {
                "channel": 353, 
                "count": 4
            }, 
            {
                "channel": 354, 
                "count": 1
            }, 
            {
                "channel": 356, 
                "count": 12
            }, 
            {
                "channel": 357, 
                "count": 10
            }, 
            {
                "channel": 358, 
                "count": 10
            }, 
            {
                "channel": 359, 
                "count": 10
            }, 
            {
                "channel": 360, 
                "count": 10
            }, 
            {
                "channel": 361, 
                "count": 9
            }, 
            {
                "channel": 362, 
                "count": 12
            }, 
            {
                "channel": 364, 
                "count": 7
            }, 
            {
                "channel": 365, 
                "count": 9
            }, 
            {
                "channel": 366, 
                "count": 8
            }, 
            {
                "channel": 367, 
                "count": 6
            }, 
            {
                "channel": 368, 
                "count": 12
            }, 
            {
                "channel": 369, 
                "count": 3
            }, 
            {
                "channel": 370, 
                "count": 5
            }, 
            {
                "channel": 371, 
                "count": 6
            }, 
            {
                "channel": 373, 
                "count": 7
            }, 
            {
                "channel": 374, 
                "count": 11
            }, 
            {
                "channel": 375, 
                "count": 8
            }, 
            {
                "channel": 377, 
                "count": 10
            }, 
            {
                "channel": 378, 
                "count": 8
            }, 
            {
                "channel": 379, 
                "count": 11
            }, 
            {
                "channel": 381, 
                "count": 3
            }, 
            {
                "channel": 382, 
                "count": 7
            }, 
            {
                "channel": 384, 
                "count": 3
            }, 
            {
                "channel": 385, 
                "count": 12
            }, 
            {
                "channel": 386, 
                "count": 7
            }, 
            {
                "channel": 387, 
                "count": 8
            }, 
            {
                "channel": 388, 
                "count": 9
            }, 
            {
                "channel": 389, 
                "count": 10
            }, 
            {
                "channel": 390, 
                "count": 8
            }, 
            {
                "channel": 391, 
                "count": 7
            }, 
            {
                "channel": 392, 
                "count": 8
            }, 
            {
                "channel": 393, 
                "count": 9
            }, 
            {
                "channel": 394, 
                "count": 5
            }, 
            {
                "channel": 395, 
                "count": 8
            }, 
            {
                "channel": 396, 
                "count": 10
            }, 
            {
                "channel": 397, 
                "count": 7
            }, 
            {
                "channel": 398, 
                "count": 11
            }, 
            {
                "channel": 399, 
                "count": 10
            }, 
            {
                "channel": 400, 
                "count": 9
            }, 
            {
                "channel": 401, 
                "count": 10
            }, 
            {
                "channel": 402, 
                "count": 6
            }, 
            {
                "channel": 403, 
                "count": 8
            }, 
            {
                "channel": 404, 
                "count": 14
            }, 
            {
                "channel": 405, 
                "count": 9
            }, 
            {
                "channel": 406, 
                "count": 8
            }, 
            {
                "channel": 407, 
                "count": 11
            }, 
            {
                "channel": 408, 
                "count": 6
            }, 
            {
                "channel": 409, 
                "count": 8
            }, 
            {
                "channel": 410, 
                "count": 10
            }, 
            {
                "channel": 411, 
                "count": 9
            }, 
            {
                "channel": 412, 
                "count": 9
            }, 
            {
                "channel": 413, 
                "count": 8
            }, 
            {
                "channel": 414, 
                "count": 8
            }, 
            {
                "channel": 415, 
                "count": 10
            }, 
            {
                "channel": 416, 
                "count": 7
            }, 
            {
                "channel": 417, 
                "count": 10
            }, 
            {
                "channel": 418, 
                "count": 9
            }, 
            {
                "channel": 419, 
                "count": 5
            }, 
            {
                "channel": 420, 
                "count": 9
            }, 
            {
                "channel": 421, 
                "count": 10
            }, 
            {
                "channel": 422, 
                "count": 11
            }, 
            {
                "channel": 423, 
                "count": 7
            }, 
            {
                "channel": 424, 
                "count": 14
            }, 
            {
                "channel": 425, 
                "count": 13
            }, 
            {
                "channel": 426, 
                "count": 7
            }, 
            {
                "channel": 427, 
                "count": 8
            }, 
            {
                "channel": 428, 
                "count": 8
            }, 
            {
                "channel": 429, 
                "count": 10
            }, 
            {
                "channel": 430, 
                "count": 9
            }, 
            {
                "channel": 431, 
                "count": 11
            }, 
            {
                "channel": 433, 
                "count": 4
            }, 
            {
                "channel": 434, 
                "count": 8
            }, 
            {
                "channel": 435, 
                "count": 10
            }, 
            {
                "channel": 436, 
                "count": 8
            }, 
            {
                "channel": 437, 
                "count": 9
            }, 
            {
                "channel": 438, 
                "count": 9
            }, 
            {
                "channel": 439, 
                "count": 14
            }, 
            {
                "channel": 440, 
                "count": 7
            }, 
            {
                "channel": 441, 
                "count": 7
            }, 
            {
                "channel": 442, 
                "count": 12
            }, 
            {
                "channel": 443, 
                "count": 7
            }, 
            {
                "channel": 444, 
                "count": 10
            }, 
            {
                "channel": 445, 
                "count": 5
            }, 
            {
                "channel": 446, 
                "count": 8
            }, 
            {
                "channel": 448, 
                "count": 7
            }, 
            {
                "channel": 449, 
                "count": 8
            }, 
            {
                "channel": 450, 
                "count": 8
            }, 
            {
                "channel": 451, 
                "count": 6
            }, 
            {
                "channel": 452, 
                "count": 10
            }, 
            {
                "channel": 453, 
                "count": 10
            }, 
            {
                "channel": 454, 
                "count": 8
            }, 
            {
                "channel": 455, 
                "count": 9
            }, 
            {
                "channel": 456, 
                "count": 8
            }, 
            {
                "channel": 457, 
                "count": 9
            }, 
            {
                "channel": 458, 
                "count": 4
            }, 
            {
                "channel": 459, 
                "count": 12
            }, 
            {
                "channel": 460, 
                "count": 5
            }, 
            {
                "channel": 461, 
                "count": 6
            }, 
            {
                "channel": 462, 
                "count": 10
            }, 
            {
                "channel": 463, 
                "count": 13
            }, 
            {
                "channel": 465, 
                "count": 8
            }, 
            {
                "channel": 466, 
                "count": 11
            }, 
            {
                "channel": 467, 
                "count": 9
            }, 
            {
                "channel": 468, 
                "count": 14
            }, 
            {
                "channel": 469, 
                "count": 9
            }, 
            {
                "channel": 470, 
                "count": 7
            }, 
            {
                "channel": 471, 
                "count": 8
            }, 
            {
                "channel": 472, 
                "count": 8
            }, 
            {
                "channel": 474, 
                "count": 11
            }, 
            {
                "channel": 475, 
                "count": 8
            }, 
            {
                "channel": 476, 
                "count": 13
            }, 
            {
                "channel": 477, 
                "count": 1
            }, 
            {
                "channel": 478, 
                "count": 7
            }, 
            {
                "channel": 479, 
                "count": 13
            }, 
            {
                "channel": 480, 
                "count": 13
            }, 
            {
                "channel": 481, 
                "count": 8
            }, 
            {
                "channel": 482, 
                "count": 10
            }, 
            {
                "channel": 483, 
                "count": 9
            }, 
            {
                "channel": 484, 
                "count": 9
            }, 
            {
                "channel": 485, 
                "count": 9
            }, 
            {
                "channel": 486, 
                "count": 11
            }, 
            {
                "channel": 487, 
                "count": 10
            }, 
            {
                "channel": 488, 
                "count": 8
            }, 
            {
                "channel": 490, 
                "count": 9
            }, 
            {
                "channel": 491, 
                "count": 9
            }, 
            {
                "channel": 493, 
                "count": 11
            }, 
            {
                "channel": 494, 
                "count": 6
            }, 
            {
                "channel": 495, 
                "count": 8
            }, 
            {
                "channel": 496, 
                "count": 9
            }, 
            {
                "channel": 497, 
                "count": 9
            }, 
            {
                "channel": 498, 
                "count": 12
            }, 
            {
                "channel": 499, 
                "count": 6
            }, 
            {
                "channel": 500, 
                "count": 7
            }, 
            {
                "channel": 501, 
                "count": 7
            }, 
            {
                "channel": 502, 
                "count": 12
            }, 
            {
                "channel": 503, 
                "count": 13
            }, 
            {
                "channel": 505, 
                "count": 10
            }, 
            {
                "channel": 506, 
                "count": 9
            }, 
            {
                "channel": 507, 
                "count": 4
            }, 
            {
                "channel": 508, 
                "count": 12
            }, 
            {
                "channel": 509, 
                "count": 9
            }, 
            {
                "channel": 510, 
                "count": 8
            }, 
            {
                "channel": 511, 
                "count": 9
            }, 
            {
                "channel": 512, 
                "count": 10
            }
        ], 
        "run_id": "ee396dc02864e69958a659792fcb84dc02c2ec1d", 
        "segment_duration": 60, 
        "segment_number": 1, 
        "segment_type": "guppy-acquisition", 
        "software": {
            "analysis": "1d_basecalling", 
            "name": "guppy-basecalling", 
            "version": "6.5.7+ca6d6af"
        }, 
        "tracking_id": {
            "asic_id": "681222043", 
            "asic_id_eeprom": "8080929", 
            "asic_temp": "26.228251", 
            "asic_version": "IA02D", 
            "auto_update": "0", 
            "auto_update_source": "https://mirror.oxfordnanoportal.com/software/MinKNOW/", 
            "bream_is_standard": "0", 
            "configuration_version": "4.0.16", 
            "device_id": "X3", 
            "device_type": "gridion", 
            "distribution_status": "stable", 
            "distribution_version": "20.06.17", 
            "exp_script_name": "sequencing_MIN106_RNA:FLO-MIN106:SQK-RNA002", 
            "exp_script_purpose": "sequencing_run", 
            "exp_start_time": "2023-02-17T13:36:13Z", 
            "flow_cell_id": "FAW03721", 
            "flow_cell_product_code": "FLO-MIN106", 
            "guppy_version": "4.0.11+f1071ce", 
            "heatsink_temp": "33.953125", 
            "hostname": "GXB03380", 
            "installation_type": "nc", 
            "local_firmware_file": "1", 
            "msg_id": "884cd44e-15a2-4cee-8907-61aa4a087ed3", 
            "operating_system": "ubuntu 16.04", 
            "protocol_group_id": "cc", 
            "protocol_run_id": "e2414b6d-b78d-45f7-9620-768c51d1cdf2", 
            "protocols_version": "6.0.10", 
            "run_id": "ee396dc02864e69958a659792fcb84dc02c2ec1d", 
            "sample_id": "cc", 
            "time_stamp": "2023-10-31T02:49:53Z", 
            "usb_config": "GridX5_fx3_1.1.3_ONT#MinION_fpga_1.1.1#bulk#Auto", 
            "version": "4.0.5"
        }
    }, 
    {
        "aggregation": "cumulative", 
        "analysis_id": "dadcc58e-8ba7-4cd4-b486-41c8c9e653ef", 
        "basecall_1d": {
            "exit_status_dist": {
                "fail:qscore_filter": 3, 
                "pass": 3997
            }, 
            "qscore_dist_temp": [
                {
                    "count": 3, 
                    "mean_qscore": 6.5
                }, 
                {
                    "count": 86, 
                    "mean_qscore": 7.0
                }, 
                {
                    "count": 107, 
                    "mean_qscore": 7.5
                }, 
                {
                    "count": 151, 
                    "mean_qscore": 8.0
                }, 
                {
                    "count": 200, 
                    "mean_qscore": 8.5
                }, 
                {
                    "count": 323, 
                    "mean_qscore": 9.0
                }, 
                {
                    "count": 479, 
                    "mean_qscore": 9.5
                }, 
                {
                    "count": 574, 
                    "mean_qscore": 10.0
                }, 
                {
                    "count": 599, 
                    "mean_qscore": 10.5
                }, 
                {
                    "count": 575, 
                    "mean_qscore": 11.0
                }, 
                {
                    "count": 463, 
                    "mean_qscore": 11.5
                }, 
                {
                    "count": 263, 
                    "mean_qscore": 12.0
                }, 
                {
                    "count": 113, 
                    "mean_qscore": 12.5
                }, 
                {
                    "count": 35, 
                    "mean_qscore": 13.0
                }, 
                {
                    "count": 23, 
                    "mean_qscore": 13.5
                }, 
                {
                    "count": 5, 
                    "mean_qscore": 14.0
                }, 
                {
                    "count": 1, 
                    "mean_qscore": 15.0
                }
            ], 
            "qscore_sum_temp": {
                "count": 4000, 
                "mean": 10.471681594848633, 
                "sum": 41886.7265625
            }, 
            "read_len_events_sum_temp": 12961339, 
            "seq_len_bases_dist_temp": [
                {
                    "count": 4000, 
                    "length": 0.0
                }
            ], 
            "seq_len_bases_sum_temp": 4000, 
            "seq_len_events_dist_temp": [
                {
                    "count": 232, 
                    "length": 0.0
                }, 
                {
                    "count": 946, 
                    "length": 1000.0
                }, 
                {
                    "count": 1124, 
                    "length": 2000.0
                }, 
                {
                    "count": 713, 
                    "length": 3000.0
                }, 
                {
                    "count": 367, 
                    "length": 4000.0
                }, 
                {
                    "count": 233, 
                    "length": 5000.0
                }, 
                {
                    "count": 133, 
                    "length": 6000.0
                }, 
                {
                    "count": 99, 
                    "length": 7000.0
                }, 
                {
                    "count": 59, 
                    "length": 8000.0
                }, 
                {
                    "count": 31, 
                    "length": 9000.0
                }, 
                {
                    "count": 23, 
                    "length": 10000.0
                }, 
                {
                    "count": 17, 
                    "length": 11000.0
                }, 
                {
                    "count": 7, 
                    "length": 12000.0
                }, 
                {
                    "count": 4, 
                    "length": 13000.0
                }, 
                {
                    "count": 2, 
                    "length": 14000.0
                }, 
                {
                    "count": 5, 
                    "length": 15000.0
                }, 
                {
                    "count": 2, 
                    "length": 16000.0
                }, 
                {
                    "count": 2, 
                    "length": 17000.0
                }, 
                {
                    "count": 1, 
                    "length": 19000.0
                }
            ], 
            "speed_bases_per_second_dist_temp": [
                {
                    "count": 4000, 
                    "speed": 1.0
                }
            ], 
            "strand_median_pa": {
                "count": 4000, 
                "mean": 85.13560485839844, 
                "sum": 340542.40625
            }, 
            "strand_sd_pa": {
                "count": 4000, 
                "mean": 12.429203987121582, 
                "sum": 49716.81640625
            }
        }, 
        "channel_count": 466, 
        "context_tags": {
            "barcoding_enabled": "0", 
            "basecall_config_filename": "rna_r9.4.1_70bps_hac.cfg", 
            "experiment_duration_set": "4320", 
            "experiment_type": "rna", 
            "local_basecalling": "1", 
            "package": "bream4", 
            "package_version": "6.0.10", 
            "sample_frequency": "3012", 
            "sequencing_kit": "sqk-rna002"
        }, 
        "latest_run_time": 291.1696472167969, 
        "levels_sums": {
            "count": 4000, 
            "mean": null, 
            "open_pore_level_sum": null
        }, 
        "opts": {
            "calib_max_sequence_length": "1550", 
            "calib_min_coverage": "0.600000", 
            "calib_min_sequence_length": "1100", 
            "calib_reference": "YHR174W.fasta", 
            "chunk_size": "2000", 
            "chunks_per_caller": "10000", 
            "chunks_per_runner": "512", 
            "config": "rna_r9.4.1_70bps_hac.cfg", 
            "device": "auto", 
            "dmean_threshold": "10.000000", 
            "dmean_win_size": "400", 
            "gpu_runners_per_device": "4", 
            "jump_threshold": "2.000000", 
            "max_search_len": "15000", 
            "min_qscore": "7.000000", 
            "model_file": "template_rna_r9.4.1_70bps_hac.jsn", 
            "overlap": "50", 
            "ping_segment_duration": "60", 
            "ping_url": "https://ping.oxfordnanoportal.com/basecall", 
            "qscore_offset": "0.420000", 
            "qscore_scale": "0.880000", 
            "records_per_fastq": "4000", 
            "reverse_sequence": "1", 
            "trim_min_events": "100", 
            "trim_strategy": "rna", 
            "trim_threshold": "5.000000", 
            "u_substitution": "1"
        }, 
        "read_count": 4000, 
        "reads_per_channel_dist": [
            {
                "channel": 1, 
                "count": 7
            }, 
            {
                "channel": 2, 
                "count": 7
            }, 
            {
                "channel": 3, 
                "count": 13
            }, 
            {
                "channel": 4, 
                "count": 5
            }, 
            {
                "channel": 5, 
                "count": 7
            }, 
            {
                "channel": 7, 
                "count": 7
            }, 
            {
                "channel": 8, 
                "count": 5
            }, 
            {
                "channel": 9, 
                "count": 8
            }, 
            {
                "channel": 10, 
                "count": 9
            }, 
            {
                "channel": 11, 
                "count": 12
            }, 
            {
                "channel": 12, 
                "count": 9
            }, 
            {
                "channel": 13, 
                "count": 9
            }, 
            {
                "channel": 15, 
                "count": 6
            }, 
            {
                "channel": 16, 
                "count": 9
            }, 
            {
                "channel": 17, 
                "count": 11
            }, 
            {
                "channel": 18, 
                "count": 6
            }, 
            {
                "channel": 19, 
                "count": 9
            }, 
            {
                "channel": 20, 
                "count": 1
            }, 
            {
                "channel": 21, 
                "count": 8
            }, 
            {
                "channel": 22, 
                "count": 8
            }, 
            {
                "channel": 23, 
                "count": 8
            }, 
            {
                "channel": 24, 
                "count": 11
            }, 
            {
                "channel": 25, 
                "count": 9
            }, 
            {
                "channel": 27, 
                "count": 10
            }, 
            {
                "channel": 28, 
                "count": 11
            }, 
            {
                "channel": 30, 
                "count": 13
            }, 
            {
                "channel": 31, 
                "count": 14
            }, 
            {
                "channel": 32, 
                "count": 9
            }, 
            {
                "channel": 33, 
                "count": 8
            }, 
            {
                "channel": 35, 
                "count": 6
            }, 
            {
                "channel": 36, 
                "count": 10
            }, 
            {
                "channel": 37, 
                "count": 10
            }, 
            {
                "channel": 38, 
                "count": 11
            }, 
            {
                "channel": 39, 
                "count": 8
            }, 
            {
                "channel": 40, 
                "count": 4
            }, 
            {
                "channel": 41, 
                "count": 9
            }, 
            {
                "channel": 42, 
                "count": 8
            }, 
            {
                "channel": 43, 
                "count": 1
            }, 
            {
                "channel": 44, 
                "count": 10
            }, 
            {
                "channel": 45, 
                "count": 10
            }, 
            {
                "channel": 46, 
                "count": 13
            }, 
            {
                "channel": 47, 
                "count": 13
            }, 
            {
                "channel": 49, 
                "count": 8
            }, 
            {
                "channel": 50, 
                "count": 9
            }, 
            {
                "channel": 51, 
                "count": 14
            }, 
            {
                "channel": 52, 
                "count": 8
            }, 
            {
                "channel": 53, 
                "count": 10
            }, 
            {
                "channel": 54, 
                "count": 6
            }, 
            {
                "channel": 55, 
                "count": 10
            }, 
            {
                "channel": 56, 
                "count": 6
            }, 
            {
                "channel": 57, 
                "count": 9
            }, 
            {
                "channel": 58, 
                "count": 11
            }, 
            {
                "channel": 59, 
                "count": 10
            }, 
            {
                "channel": 60, 
                "count": 7
            }, 
            {
                "channel": 62, 
                "count": 8
            }, 
            {
                "channel": 63, 
                "count": 6
            }, 
            {
                "channel": 64, 
                "count": 7
            }, 
            {
                "channel": 65, 
                "count": 5
            }, 
            {
                "channel": 66, 
                "count": 9
            }, 
            {
                "channel": 67, 
                "count": 9
            }, 
            {
                "channel": 68, 
                "count": 11
            }, 
            {
                "channel": 69, 
                "count": 8
            }, 
            {
                "channel": 70, 
                "count": 8
            }, 
            {
                "channel": 72, 
                "count": 8
            }, 
            {
                "channel": 74, 
                "count": 12
            }, 
            {
                "channel": 75, 
                "count": 9
            }, 
            {
                "channel": 76, 
                "count": 10
            }, 
            {
                "channel": 78, 
                "count": 11
            }, 
            {
                "channel": 79, 
                "count": 11
            }, 
            {
                "channel": 80, 
                "count": 9
            }, 
            {
                "channel": 82, 
                "count": 8
            }, 
            {
                "channel": 83, 
                "count": 11
            }, 
            {
                "channel": 84, 
                "count": 13
            }, 
            {
                "channel": 86, 
                "count": 8
            }, 
            {
                "channel": 87, 
                "count": 8
            }, 
            {
                "channel": 88, 
                "count": 7
            }, 
            {
                "channel": 90, 
                "count": 13
            }, 
            {
                "channel": 91, 
                "count": 11
            }, 
            {
                "channel": 92, 
                "count": 10
            }, 
            {
                "channel": 94, 
                "count": 9
            }, 
            {
                "channel": 95, 
                "count": 12
            }, 
            {
                "channel": 97, 
                "count": 9
            }, 
            {
                "channel": 98, 
                "count": 12
            }, 
            {
                "channel": 99, 
                "count": 5
            }, 
            {
                "channel": 100, 
                "count": 9
            }, 
            {
                "channel": 101, 
                "count": 1
            }, 
            {
                "channel": 102, 
                "count": 9
            }, 
            {
                "channel": 103, 
                "count": 9
            }, 
            {
                "channel": 104, 
                "count": 6
            }, 
            {
                "channel": 105, 
                "count": 8
            }, 
            {
                "channel": 106, 
                "count": 9
            }, 
            {
                "channel": 107, 
                "count": 10
            }, 
            {
                "channel": 109, 
                "count": 6
            }, 
            {
                "channel": 110, 
                "count": 9
            }, 
            {
                "channel": 111, 
                "count": 7
            }, 
            {
                "channel": 112, 
                "count": 9
            }, 
            {
                "channel": 113, 
                "count": 8
            }, 
            {
                "channel": 114, 
                "count": 8
            }, 
            {
                "channel": 115, 
                "count": 10
            }, 
            {
                "channel": 116, 
                "count": 7
            }, 
            {
                "channel": 117, 
                "count": 10
            }, 
            {
                "channel": 118, 
                "count": 11
            }, 
            {
                "channel": 119, 
                "count": 10
            }, 
            {
                "channel": 120, 
                "count": 12
            }, 
            {
                "channel": 121, 
                "count": 11
            }, 
            {
                "channel": 122, 
                "count": 7
            }, 
            {
                "channel": 123, 
                "count": 6
            }, 
            {
                "channel": 125, 
                "count": 8
            }, 
            {
                "channel": 126, 
                "count": 5
            }, 
            {
                "channel": 127, 
                "count": 7
            }, 
            {
                "channel": 129, 
                "count": 7
            }, 
            {
                "channel": 130, 
                "count": 7
            }, 
            {
                "channel": 131, 
                "count": 10
            }, 
            {
                "channel": 132, 
                "count": 11
            }, 
            {
                "channel": 133, 
                "count": 8
            }, 
            {
                "channel": 134, 
                "count": 11
            }, 
            {
                "channel": 135, 
                "count": 14
            }, 
            {
                "channel": 136, 
                "count": 10
            }, 
            {
                "channel": 137, 
                "count": 9
            }, 
            {
                "channel": 138, 
                "count": 10
            }, 
            {
                "channel": 139, 
                "count": 11
            }, 
            {
                "channel": 140, 
                "count": 10
            }, 
            {
                "channel": 141, 
                "count": 7
            }, 
            {
                "channel": 142, 
                "count": 8
            }, 
            {
                "channel": 143, 
                "count": 9
            }, 
            {
                "channel": 144, 
                "count": 10
            }, 
            {
                "channel": 145, 
                "count": 7
            }, 
            {
                "channel": 146, 
                "count": 11
            }, 
            {
                "channel": 147, 
                "count": 9
            }, 
            {
                "channel": 148, 
                "count": 6
            }, 
            {
                "channel": 149, 
                "count": 13
            }, 
            {
                "channel": 150, 
                "count": 8
            }, 
            {
                "channel": 151, 
                "count": 5
            }, 
            {
                "channel": 152, 
                "count": 8
            }, 
            {
                "channel": 153, 
                "count": 8
            }, 
            {
                "channel": 154, 
                "count": 7
            }, 
            {
                "channel": 155, 
                "count": 12
            }, 
            {
                "channel": 156, 
                "count": 8
            }, 
            {
                "channel": 158, 
                "count": 11
            }, 
            {
                "channel": 159, 
                "count": 9
            }, 
            {
                "channel": 160, 
                "count": 8
            }, 
            {
                "channel": 161, 
                "count": 7
            }, 
            {
                "channel": 162, 
                "count": 10
            }, 
            {
                "channel": 163, 
                "count": 7
            }, 
            {
                "channel": 164, 
                "count": 14
            }, 
            {
                "channel": 165, 
                "count": 6
            }, 
            {
                "channel": 166, 
                "count": 9
            }, 
            {
                "channel": 167, 
                "count": 9
            }, 
            {
                "channel": 168, 
                "count": 12
            }, 
            {
                "channel": 169, 
                "count": 3
            }, 
            {
                "channel": 170, 
                "count": 9
            }, 
            {
                "channel": 171, 
                "count": 8
            }, 
            {
                "channel": 172, 
                "count": 11
            }, 
            {
                "channel": 173, 
                "count": 9
            }, 
            {
                "channel": 174, 
                "count": 10
            }, 
            {
                "channel": 175, 
                "count": 8
            }, 
            {
                "channel": 176, 
                "count": 10
            }, 
            {
                "channel": 177, 
                "count": 9
            }, 
            {
                "channel": 178, 
                "count": 8
            }, 
            {
                "channel": 179, 
                "count": 9
            }, 
            {
                "channel": 180, 
                "count": 8
            }, 
            {
                "channel": 181, 
                "count": 8
            }, 
            {
                "channel": 182, 
                "count": 13
            }, 
            {
                "channel": 183, 
                "count": 6
            }, 
            {
                "channel": 184, 
                "count": 9
            }, 
            {
                "channel": 185, 
                "count": 11
            }, 
            {
                "channel": 186, 
                "count": 8
            }, 
            {
                "channel": 187, 
                "count": 10
            }, 
            {
                "channel": 188, 
                "count": 6
            }, 
            {
                "channel": 189, 
                "count": 6
            }, 
            {
                "channel": 190, 
                "count": 9
            }, 
            {
                "channel": 191, 
                "count": 8
            }, 
            {
                "channel": 192, 
                "count": 7
            }, 
            {
                "channel": 193, 
                "count": 6
            }, 
            {
                "channel": 194, 
                "count": 11
            }, 
            {
                "channel": 195, 
                "count": 10
            }, 
            {
                "channel": 196, 
                "count": 10
            }, 
            {
                "channel": 199, 
                "count": 10
            }, 
            {
                "channel": 200, 
                "count": 9
            }, 
            {
                "channel": 202, 
                "count": 9
            }, 
            {
                "channel": 205, 
                "count": 8
            }, 
            {
                "channel": 206, 
                "count": 8
            }, 
            {
                "channel": 207, 
                "count": 6
            }, 
            {
                "channel": 208, 
                "count": 7
            }, 
            {
                "channel": 209, 
                "count": 4
            }, 
            {
                "channel": 211, 
                "count": 12
            }, 
            {
                "channel": 212, 
                "count": 8
            }, 
            {
                "channel": 213, 
                "count": 11
            }, 
            {
                "channel": 214, 
                "count": 11
            }, 
            {
                "channel": 215, 
                "count": 9
            }, 
            {
                "channel": 216, 
                "count": 6
            }, 
            {
                "channel": 217, 
                "count": 7
            }, 
            {
                "channel": 218, 
                "count": 7
            }, 
            {
                "channel": 219, 
                "count": 7
            }, 
            {
                "channel": 220, 
                "count": 12
            }, 
            {
                "channel": 221, 
                "count": 9
            }, 
            {
                "channel": 222, 
                "count": 3
            }, 
            {
                "channel": 223, 
                "count": 8
            }, 
            {
                "channel": 224, 
                "count": 9
            }, 
            {
                "channel": 225, 
                "count": 7
            }, 
            {
                "channel": 226, 
                "count": 10
            }, 
            {
                "channel": 227, 
                "count": 3
            }, 
            {
                "channel": 228, 
                "count": 8
            }, 
            {
                "channel": 230, 
                "count": 8
            }, 
            {
                "channel": 231, 
                "count": 6
            }, 
            {
                "channel": 232, 
                "count": 7
            }, 
            {
                "channel": 233, 
                "count": 9
            }, 
            {
                "channel": 235, 
                "count": 6
            }, 
            {
                "channel": 236, 
                "count": 8
            }, 
            {
                "channel": 237, 
                "count": 8
            }, 
            {
                "channel": 239, 
                "count": 8
            }, 
            {
                "channel": 240, 
                "count": 12
            }, 
            {
                "channel": 241, 
                "count": 12
            }, 
            {
                "channel": 242, 
                "count": 10
            }, 
            {
                "channel": 243, 
                "count": 5
            }, 
            {
                "channel": 244, 
                "count": 9
            }, 
            {
                "channel": 245, 
                "count": 9
            }, 
            {
                "channel": 246, 
                "count": 5
            }, 
            {
                "channel": 247, 
                "count": 6
            }, 
            {
                "channel": 248, 
                "count": 4
            }, 
            {
                "channel": 249, 
                "count": 10
            }, 
            {
                "channel": 250, 
                "count": 8
            }, 
            {
                "channel": 251, 
                "count": 6
            }, 
            {
                "channel": 252, 
                "count": 7
            }, 
            {
                "channel": 253, 
                "count": 11
            }, 
            {
                "channel": 254, 
                "count": 9
            }, 
            {
                "channel": 255, 
                "count": 8
            }, 
            {
                "channel": 256, 
                "count": 10
            }, 
            {
                "channel": 257, 
                "count": 10
            }, 
            {
                "channel": 258, 
                "count": 2
            }, 
            {
                "channel": 259, 
                "count": 5
            }, 
            {
                "channel": 260, 
                "count": 9
            }, 
            {
                "channel": 261, 
                "count": 6
            }, 
            {
                "channel": 262, 
                "count": 11
            }, 
            {
                "channel": 263, 
                "count": 9
            }, 
            {
                "channel": 264, 
                "count": 8
            }, 
            {
                "channel": 265, 
                "count": 10
            }, 
            {
                "channel": 266, 
                "count": 7
            }, 
            {
                "channel": 267, 
                "count": 9
            }, 
            {
                "channel": 268, 
                "count": 5
            }, 
            {
                "channel": 269, 
                "count": 5
            }, 
            {
                "channel": 270, 
                "count": 11
            }, 
            {
                "channel": 271, 
                "count": 8
            }, 
            {
                "channel": 272, 
                "count": 7
            }, 
            {
                "channel": 274, 
                "count": 10
            }, 
            {
                "channel": 275, 
                "count": 7
            }, 
            {
                "channel": 276, 
                "count": 5
            }, 
            {
                "channel": 277, 
                "count": 9
            }, 
            {
                "channel": 278, 
                "count": 9
            }, 
            {
                "channel": 279, 
                "count": 10
            }, 
            {
                "channel": 280, 
                "count": 11
            }, 
            {
                "channel": 281, 
                "count": 7
            }, 
            {
                "channel": 283, 
                "count": 11
            }, 
            {
                "channel": 284, 
                "count": 2
            }, 
            {
                "channel": 285, 
                "count": 7
            }, 
            {
                "channel": 286, 
                "count": 6
            }, 
            {
                "channel": 287, 
                "count": 11
            }, 
            {
                "channel": 289, 
                "count": 9
            }, 
            {
                "channel": 290, 
                "count": 10
            }, 
            {
                "channel": 291, 
                "count": 9
            }, 
            {
                "channel": 292, 
                "count": 8
            }, 
            {
                "channel": 293, 
                "count": 9
            }, 
            {
                "channel": 294, 
                "count": 10
            }, 
            {
                "channel": 295, 
                "count": 4
            }, 
            {
                "channel": 296, 
                "count": 7
            }, 
            {
                "channel": 297, 
                "count": 10
            }, 
            {
                "channel": 298, 
                "count": 10
            }, 
            {
                "channel": 299, 
                "count": 9
            }, 
            {
                "channel": 300, 
                "count": 10
            }, 
            {
                "channel": 301, 
                "count": 3
            }, 
            {
                "channel": 302, 
                "count": 8
            }, 
            {
                "channel": 303, 
                "count": 8
            }, 
            {
                "channel": 304, 
                "count": 8
            }, 
            {
                "channel": 305, 
                "count": 11
            }, 
            {
                "channel": 307, 
                "count": 6
            }, 
            {
                "channel": 308, 
                "count": 5
            }, 
            {
                "channel": 309, 
                "count": 8
            }, 
            {
                "channel": 310, 
                "count": 7
            }, 
            {
                "channel": 311, 
                "count": 9
            }, 
            {
                "channel": 312, 
                "count": 12
            }, 
            {
                "channel": 313, 
                "count": 12
            }, 
            {
                "channel": 314, 
                "count": 10
            }, 
            {
                "channel": 315, 
                "count": 6
            }, 
            {
                "channel": 316, 
                "count": 11
            }, 
            {
                "channel": 317, 
                "count": 9
            }, 
            {
                "channel": 318, 
                "count": 7
            }, 
            {
                "channel": 319, 
                "count": 10
            }, 
            {
                "channel": 320, 
                "count": 9
            }, 
            {
                "channel": 321, 
                "count": 6
            }, 
            {
                "channel": 322, 
                "count": 9
            }, 
            {
                "channel": 323, 
                "count": 7
            }, 
            {
                "channel": 324, 
                "count": 7
            }, 
            {
                "channel": 325, 
                "count": 9
            }, 
            {
                "channel": 326, 
                "count": 11
            }, 
            {
                "channel": 327, 
                "count": 11
            }, 
            {
                "channel": 328, 
                "count": 9
            }, 
            {
                "channel": 329, 
                "count": 7
            }, 
            {
                "channel": 330, 
                "count": 10
            }, 
            {
                "channel": 331, 
                "count": 6
            }, 
            {
                "channel": 332, 
                "count": 8
            }, 
            {
                "channel": 333, 
                "count": 4
            }, 
            {
                "channel": 334, 
                "count": 6
            }, 
            {
                "channel": 335, 
                "count": 7
            }, 
            {
                "channel": 336, 
                "count": 9
            }, 
            {
                "channel": 337, 
                "count": 7
            }, 
            {
                "channel": 339, 
                "count": 7
            }, 
            {
                "channel": 340, 
                "count": 6
            }, 
            {
                "channel": 341, 
                "count": 10
            }, 
            {
                "channel": 342, 
                "count": 12
            }, 
            {
                "channel": 343, 
                "count": 11
            }, 
            {
                "channel": 344, 
                "count": 13
            }, 
            {
                "channel": 345, 
                "count": 6
            }, 
            {
                "channel": 346, 
                "count": 13
            }, 
            {
                "channel": 347, 
                "count": 5
            }, 
            {
                "channel": 348, 
                "count": 9
            }, 
            {
                "channel": 349, 
                "count": 14
            }, 
            {
                "channel": 350, 
                "count": 7
            }, 
            {
                "channel": 351, 
                "count": 13
            }, 
            {
                "channel": 352, 
                "count": 10
            }, 
            {
                "channel": 353, 
                "count": 4
            }, 
            {
                "channel": 354, 
                "count": 1
            }, 
            {
                "channel": 356, 
                "count": 12
            }, 
            {
                "channel": 357, 
                "count": 10
            }, 
            {
                "channel": 358, 
                "count": 10
            }, 
            {
                "channel": 359, 
                "count": 10
            }, 
            {
                "channel": 360, 
                "count": 10
            }, 
            {
                "channel": 361, 
                "count": 9
            }, 
            {
                "channel": 362, 
                "count": 12
            }, 
            {
                "channel": 364, 
                "count": 7
            }, 
            {
                "channel": 365, 
                "count": 9
            }, 
            {
                "channel": 366, 
                "count": 8
            }, 
            {
                "channel": 367, 
                "count": 6
            }, 
            {
                "channel": 368, 
                "count": 12
            }, 
            {
                "channel": 369, 
                "count": 3
            }, 
            {
                "channel": 370, 
                "count": 5
            }, 
            {
                "channel": 371, 
                "count": 6
            }, 
            {
                "channel": 373, 
                "count": 7
            }, 
            {
                "channel": 374, 
                "count": 11
            }, 
            {
                "channel": 375, 
                "count": 8
            }, 
            {
                "channel": 377, 
                "count": 10
            }, 
            {
                "channel": 378, 
                "count": 8
            }, 
            {
                "channel": 379, 
                "count": 11
            }, 
            {
                "channel": 381, 
                "count": 3
            }, 
            {
                "channel": 382, 
                "count": 7
            }, 
            {
                "channel": 384, 
                "count": 3
            }, 
            {
                "channel": 385, 
                "count": 12
            }, 
            {
                "channel": 386, 
                "count": 7
            }, 
            {
                "channel": 387, 
                "count": 8
            }, 
            {
                "channel": 388, 
                "count": 9
            }, 
            {
                "channel": 389, 
                "count": 10
            }, 
            {
                "channel": 390, 
                "count": 8
            }, 
            {
                "channel": 391, 
                "count": 7
            }, 
            {
                "channel": 392, 
                "count": 8
            }, 
            {
                "channel": 393, 
                "count": 9
            }, 
            {
                "channel": 394, 
                "count": 5
            }, 
            {
                "channel": 395, 
                "count": 8
            }, 
            {
                "channel": 396, 
                "count": 10
            }, 
            {
                "channel": 397, 
                "count": 7
            }, 
            {
                "channel": 398, 
                "count": 11
            }, 
            {
                "channel": 399, 
                "count": 10
            }, 
            {
                "channel": 400, 
                "count": 9
            }, 
            {
                "channel": 401, 
                "count": 10
            }, 
            {
                "channel": 402, 
                "count": 6
            }, 
            {
                "channel": 403, 
                "count": 8
            }, 
            {
                "channel": 404, 
                "count": 14
            }, 
            {
                "channel": 405, 
                "count": 9
            }, 
            {
                "channel": 406, 
                "count": 8
            }, 
            {
                "channel": 407, 
                "count": 11
            }, 
            {
                "channel": 408, 
                "count": 6
            }, 
            {
                "channel": 409, 
                "count": 8
            }, 
            {
                "channel": 410, 
                "count": 10
            }, 
            {
                "channel": 411, 
                "count": 9
            }, 
            {
                "channel": 412, 
                "count": 9
            }, 
            {
                "channel": 413, 
                "count": 8
            }, 
            {
                "channel": 414, 
                "count": 8
            }, 
            {
                "channel": 415, 
                "count": 10
            }, 
            {
                "channel": 416, 
                "count": 7
            }, 
            {
                "channel": 417, 
                "count": 10
            }, 
            {
                "channel": 418, 
                "count": 9
            }, 
            {
                "channel": 419, 
                "count": 5
            }, 
            {
                "channel": 420, 
                "count": 9
            }, 
            {
                "channel": 421, 
                "count": 10
            }, 
            {
                "channel": 422, 
                "count": 11
            }, 
            {
                "channel": 423, 
                "count": 7
            }, 
            {
                "channel": 424, 
                "count": 14
            }, 
            {
                "channel": 425, 
                "count": 13
            }, 
            {
                "channel": 426, 
                "count": 7
            }, 
            {
                "channel": 427, 
                "count": 8
            }, 
            {
                "channel": 428, 
                "count": 8
            }, 
            {
                "channel": 429, 
                "count": 10
            }, 
            {
                "channel": 430, 
                "count": 9
            }, 
            {
                "channel": 431, 
                "count": 11
            }, 
            {
                "channel": 433, 
                "count": 4
            }, 
            {
                "channel": 434, 
                "count": 8
            }, 
            {
                "channel": 435, 
                "count": 10
            }, 
            {
                "channel": 436, 
                "count": 8
            }, 
            {
                "channel": 437, 
                "count": 9
            }, 
            {
                "channel": 438, 
                "count": 9
            }, 
            {
                "channel": 439, 
                "count": 14
            }, 
            {
                "channel": 440, 
                "count": 7
            }, 
            {
                "channel": 441, 
                "count": 7
            }, 
            {
                "channel": 442, 
                "count": 12
            }, 
            {
                "channel": 443, 
                "count": 7
            }, 
            {
                "channel": 444, 
                "count": 10
            }, 
            {
                "channel": 445, 
                "count": 5
            }, 
            {
                "channel": 446, 
                "count": 8
            }, 
            {
                "channel": 448, 
                "count": 7
            }, 
            {
                "channel": 449, 
                "count": 8
            }, 
            {
                "channel": 450, 
                "count": 8
            }, 
            {
                "channel": 451, 
                "count": 6
            }, 
            {
                "channel": 452, 
                "count": 10
            }, 
            {
                "channel": 453, 
                "count": 10
            }, 
            {
                "channel": 454, 
                "count": 8
            }, 
            {
                "channel": 455, 
                "count": 9
            }, 
            {
                "channel": 456, 
                "count": 8
            }, 
            {
                "channel": 457, 
                "count": 9
            }, 
            {
                "channel": 458, 
                "count": 4
            }, 
            {
                "channel": 459, 
                "count": 12
            }, 
            {
                "channel": 460, 
                "count": 5
            }, 
            {
                "channel": 461, 
                "count": 6
            }, 
            {
                "channel": 462, 
                "count": 10
            }, 
            {
                "channel": 463, 
                "count": 13
            }, 
            {
                "channel": 465, 
                "count": 8
            }, 
            {
                "channel": 466, 
                "count": 11
            }, 
            {
                "channel": 467, 
                "count": 9
            }, 
            {
                "channel": 468, 
                "count": 14
            }, 
            {
                "channel": 469, 
                "count": 9
            }, 
            {
                "channel": 470, 
                "count": 7
            }, 
            {
                "channel": 471, 
                "count": 8
            }, 
            {
                "channel": 472, 
                "count": 8
            }, 
            {
                "channel": 474, 
                "count": 11
            }, 
            {
                "channel": 475, 
                "count": 8
            }, 
            {
                "channel": 476, 
                "count": 13
            }, 
            {
                "channel": 477, 
                "count": 1
            }, 
            {
                "channel": 478, 
                "count": 7
            }, 
            {
                "channel": 479, 
                "count": 13
            }, 
            {
                "channel": 480, 
                "count": 13
            }, 
            {
                "channel": 481, 
                "count": 8
            }, 
            {
                "channel": 482, 
                "count": 10
            }, 
            {
                "channel": 483, 
                "count": 9
            }, 
            {
                "channel": 484, 
                "count": 9
            }, 
            {
                "channel": 485, 
                "count": 9
            }, 
            {
                "channel": 486, 
                "count": 11
            }, 
            {
                "channel": 487, 
                "count": 10
            }, 
            {
                "channel": 488, 
                "count": 8
            }, 
            {
                "channel": 490, 
                "count": 9
            }, 
            {
                "channel": 491, 
                "count": 9
            }, 
            {
                "channel": 493, 
                "count": 11
            }, 
            {
                "channel": 494, 
                "count": 6
            }, 
            {
                "channel": 495, 
                "count": 8
            }, 
            {
                "channel": 496, 
                "count": 9
            }, 
            {
                "channel": 497, 
                "count": 9
            }, 
            {
                "channel": 498, 
                "count": 12
            }, 
            {
                "channel": 499, 
                "count": 6
            }, 
            {
                "channel": 500, 
                "count": 7
            }, 
            {
                "channel": 501, 
                "count": 7
            }, 
            {
                "channel": 502, 
                "count": 12
            }, 
            {
                "channel": 503, 
                "count": 13
            }, 
            {
                "channel": 505, 
                "count": 10
            }, 
            {
                "channel": 506, 
                "count": 9
            }, 
            {
                "channel": 507, 
                "count": 4
            }, 
            {
                "channel": 508, 
                "count": 12
            }, 
            {
                "channel": 509, 
                "count": 9
            }, 
            {
                "channel": 510, 
                "count": 8
            }, 
            {
                "channel": 511, 
                "count": 9
            }, 
            {
                "channel": 512, 
                "count": 10
            }
        ], 
        "run_id": "ee396dc02864e69958a659792fcb84dc02c2ec1d", 
        "segment_duration": 60, 
        "segment_number": 1, 
        "segment_type": "guppy-acquisition", 
        "software": {
            "analysis": "1d_basecalling", 
            "name": "guppy-basecalling", 
            "version": "6.5.7+ca6d6af"
        }, 
        "tracking_id": {
            "asic_id": "681222043", 
            "asic_id_eeprom": "8080929", 
            "asic_temp": "26.228251", 
            "asic_version": "IA02D", 
            "auto_update": "0", 
            "auto_update_source": "https://mirror.oxfordnanoportal.com/software/MinKNOW/", 
            "bream_is_standard": "0", 
            "configuration_version": "4.0.16", 
            "device_id": "X3", 
            "device_type": "gridion", 
            "distribution_status": "stable", 
            "distribution_version": "20.06.17", 
            "exp_script_name": "sequencing_MIN106_RNA:FLO-MIN106:SQK-RNA002", 
            "exp_script_purpose": "sequencing_run", 
            "exp_start_time": "2023-02-17T13:36:13Z", 
            "flow_cell_id": "FAW03721", 
            "flow_cell_product_code": "FLO-MIN106", 
            "guppy_version": "4.0.11+f1071ce", 
            "heatsink_temp": "33.953125", 
            "hostname": "GXB03380", 
            "installation_type": "nc", 
            "local_firmware_file": "1", 
            "msg_id": "2d5f35c0-095a-4bd6-ad23-988fed260e07", 
            "operating_system": "ubuntu 16.04", 
            "protocol_group_id": "cc", 
            "protocol_run_id": "e2414b6d-b78d-45f7-9620-768c51d1cdf2", 
            "protocols_version": "6.0.10", 
            "run_id": "ee396dc02864e69958a659792fcb84dc02c2ec1d", 
            "sample_id": "cc", 
            "time_stamp": "2023-10-31T02:49:53Z", 
            "usb_config": "GridX5_fx3_1.1.3_ONT#MinION_fpga_1.1.1#bulk#Auto", 
            "version": "4.0.5"
        }
    }
]