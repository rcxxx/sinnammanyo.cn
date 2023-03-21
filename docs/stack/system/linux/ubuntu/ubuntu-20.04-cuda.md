---
id: ubuntu-20-04-cuda-toolkit
title: ''
sidebar_label: NVIDIA CUDA/CUDNN
---

Name | Version |
---------|:--------:|
 系统版本 | Ubuntu20.04LTS |
 CUDA | 12.0 |
 CUDNN | 8.8.1 |

## 安装 CUDA

- *[CUDA Toolkit 12.0 Downloads](https://developer.nvidia.com/cuda-12-0-0-download-archive)*
- *[NVIDIA CUDA Installation Guide for Linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#)*

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/cuda/cuda-download.png)

按照下方给出的命令行，逐一进行安装

``` bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.0.0/local_installers/cuda-repo-ubuntu2004-12-0-local_12.0.0-525.60.13-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2004-12-0-local_12.0.0-525.60.13-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2004-12-0-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

安装 CUDA 的同时会给你的设备安装相应版本的显卡驱动，不用提前去找驱动版本安装，安装完成之后，将 CUDA 安装路径添加到 $PATH 环境变量

- 参照 *[Installation Guide 13.1.1. Environment Setup](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#environment-setup)*

**添加安装路径到环境变量**

``` bash
export PATH=/usr/local/cuda-12.0/bin${PATH:+:${PATH}}
```

**添加运行时库路径**

``` bash
export LD_LIBRARY_PATH=/usr/local/cuda-12.0/lib64\
                         ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```

可以直接将上述指令写入 `~/.bashrc`

配置完之后重启设备，测试安装 `nvcc -V`，如果输出类似以下内容，则安装完成

``` bash
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Mon_Oct_24_19:12:58_PDT_2022
Cuda compilation tools, release 12.0, V12.0.76
Build cuda_12.0.r12.0/compiler.31968024_0
```

``` bash
cd /usr/local/cuda/extras/demo_suite
./bandwidthTest
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/cuda/bandwidthTest.png)

``` bash
cd /usr/local/cuda/extras/demo_suite
./deviceQuery
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/cuda/deviceQuery%2C.png)

## 安装 CUDNN

- *[cuDNN Download](https://developer.nvidia.com/rdp/cudnn-download)*

需要注册一个 NVIDIA 的账号才能转到下载页面

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/cuda/cudnn-download.png)

选择下载 `deb` 包进行安装

- 参照 [1.3.2. Debian Local Installation](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html#installlinux-deb)

``` bash
sudo dpkg -i cudnn-local-repo-*.deb
sudo cp /var/cudnn-local-repo-*.gpg /usr/share/keyrings/
sudo apt-get install libcudnn8=8.x.x.x-1+cudaX.Y
sudo apt-get install libcudnn8-dev=8.x.x.x-1+cudaX.Y
sudo apt-get install libcudnn8-samples=8.x.x.x-1+cudaX.Y
```

``` bash title="eg."
sudo apt-get install libcudnn8=8.8.1.3-1+cuda12.0
sudo apt-get install libcudnn8-dev=8.8.1.3-1+cuda12.0
sudo apt-get install libcudnn8-samples=8.8.1.3-1+cuda12.0
```

测试安装

``` bash
cd -r /usr/src/cudnn_samples_v8/ ~/workspace/cuda
cd cudnn_samples_v8/mnistCUDNN/
sudo apt-get install libfreeimage3 libfreeimage-dev
make clean && make
./mnistCUDNN
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/cuda/test-cudnn.png)

