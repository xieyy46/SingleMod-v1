# Note
ignore the following warning when running 
/public1/work/yingyuan/SingleMod/v1/code/SingleMod_m6A_prediction.py:36: UserWarning: The given NumPy array is not writeable, and PyTorch does not support non-writeable tensors. This means you can write to the underlying (supposedly non
-writeable) NumPy array using the tensor. You may want to copy the array to protect its data or make it writeable before converting it to a tensor. This type of warning will be suppressed for the rest of this program. (Triggered interna
lly at  /pytorch/torch/csrc/utils/tensor_numpy.cpp:143.)
  return torch.from_numpy(self.seq[index]),torch.from_numpy(self.sig[index]),self.extra[index]
