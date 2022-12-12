---
id: pytorch-install
title: PyTorch开发环境配置
sidebar_label: Install
---

## 关于PyTorch

## 安装前准备
先阅读[官方文档](https://pytorch.org/get-started/locally/)

确定好自己所需要安装的版本以及所需要准备的工具
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pytorch-install-01.png)


本文档所使用系统版本为Ubuntu18.04.05LTS

GPU相关参数如图 GPU为 GTX1660ti
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/nvidia-smi.png)


### [<Highlight color="#33FFCC">推荐</Highlight>]Anaconda

:::note :-)
Anaconda能很方便的管理虚拟环境，解决各种依赖的冲突
:::

- [Anaconda官网](https://www.anaconda.com/)

一路安装完成即可

### [<Highlight color="#FFCC33">可选</Highlight>]CUDA

:::caution注意
安装CUDA需要NVIDIA的GPU并且安装好显卡驱动
:::

- [CUDA](https://developer.nvidia.com/cuda-toolkit-archive)

可以根据所选PyTorch对应的CUDA版本进行安装

建议下载本地deb包安装，尽量科学上网，不然可能会因为网络问题下载失败
- 如果出现问题可以查阅[官方文档](https://docs.nvidia.com/cuda/archive/10.2/)

- [CUDNN](https://developer.nvidia.com/rdp/cudnn-download)

根据相应的CUDA版本选择安装

## 正式安装
根据所准备的选择相对应的选项

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pytorch-install-02.png)


``` bash
conda create -n pytorch-gpu python==3.8
source activate pytorch-gpu
conda install pytorch torchvision torchaudio cudatoolkit=10.2 -c pytorch
```


export const Highlight = ({children, color}) => ( <span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: 'Black',
    padding: '0.2rem',
}}>{children}</span> );