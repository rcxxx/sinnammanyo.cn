---
id: jetson-nano-install-pytorch
title: Jetson Nano Install Pytorch
sidebar_label: Install Pytorch
---

## Pytorch
`Jetson Nano` 上安装 `Pytorch` 网上资料是比较多的，安装后可以用 `Nano` 来运行自己的模型，但别指望用它来训练模型（当然 Mnist那样的小型数据集还是可以的）

自行编译 `Pytorch` 是一个很复杂的工作，如果你想挑战一下，那就可以去试试，应该非常有趣

网上已经有不少以及编译好的 `whl` 包，可以直接安装

- **[Qengineering/PyTorch-Jetson-Nano](https://github.com/Qengineering/PyTorch-Jetson-Nano)**

这个仓库里能找到非常多的包，肯定有适合的版本，我这里选择安装 `Pytorch 1.10.0` ，py版本为`Python3.6.13`

```
conda create -n pytorch-1.10.0 python=3.6
```
创建 `conda` 环境后，按照这篇链接中的 **`Installation by wheel.`** 安装即可

- **[Install PyTorch on Jetson Nano.](https://qengineering.eu/install-pytorch-on-jetson-nano.html)**

- 安装各种依赖
``` shell
sudo apt-get install python3-pip libjpeg-dev libopenblas-dev libopenmpi-dev libomp-dev
pip3 install future
pip3 install -U --user wheel mock pillow
pip3 install testresources
```

- 更新 `setuptools`
```shell
pip3 install --upgrade setuptools
```

- 安装 `Cython`
```shell
pip3 install Cython
```

- 安装 `gdown` 在 `Google drive` 上下载 `whl`
```
pip3 install gdown
gdown https://drive.google.com/uc?id=1TqC6_2cwqiYacjoLhLgrZoap6-sVL2sd
```

:::tip 💻
这里最好设置一下代理， **pip** 走 **socks5** 的时候会报错，装好 **gdown** 之后在设置一下，然后关掉
:::

- 安装 `PyTorch 1.10.0`
```
pip3 install torch-1.10.0a0+git36449ea-cp36-cp36m-linux_aarch64.whl
```

- 安装后删除 `whl`，也可以自己存着，方便以后使用
```
rm torch-1.10.0a0+git36449ea-cp36-cp36m-linux_aarch64.whl
```

### `export OPENBLAS_CORETYPE=ARMV8`

成功安装后，`import torch` 时却报错了

!()[https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/pytorch-Illegal-instruction.png]

在网上搜索后在 **[” Illegal instruction (core dumped)” Xavier](https://forums.developer.nvidia.com/t/illegal-instruction-core-dumped-xavier/166278)** 中找到了解决方案

```
export OPENBLAS_CORETYPE=ARMV8
```

之后再 `import torch` 就可以了

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/pytorch-import-done.png)

也可以编辑 `~/.bashrc` 文件，将 `export OPENBLAS_CORETYPE=ARMV8` 写入其中，这样每次启动终端的时候就会自动设置这个环境变量

```
echo 'export OPENBLAS_CORETYPE=ARMV8' >> ~/.bashrc
```

## 参考
- **[Jetson Zoo](https://elinux.org/Jetson_Zoo)**
- **[Install PyTorch on Jetson Nano.](https://qengineering.eu/install-pytorch-on-jetson-nano.html)**
- **[Qengineering/PyTorch-Jetson-Nano](https://github.com/Qengineering/PyTorch-Jetson-Nano)**
- **[Jetson NanoのPython3環境でIllegal instruction (cpre dumped)](https://qiita.com/Nabeshin/items/da65eaa8c7feb66ad84c)**
- **[” Illegal instruction (core dumped)” Xavier](https://forums.developer.nvidia.com/t/illegal-instruction-core-dumped-xavier/166278)**
- **[Illegal instruction (core dumped) on import for numpy 1.19.5 on ARM64](https://github.com/numpy/numpy/issues/18131)**