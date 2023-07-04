---
id: yolov5-6.0-train
title: ''
sidebar_label: yolov5 v6.0 train
---

## yolov5 v6.0 train and convert to onnx

### 运行环境

name | version 
---------|----------
 System | **[Windows 10 21H2](https://wiki.ubuntu.com/FocalFossa/ReleaseNotes/)**
 CUDA   | **[11.3.1](https://developer.nvidia.com/cuda-11-3-1-download-archive?target_os=Windows&target_arch=x86_64)**
 CUDNN  | **[v8.2.1.32](https://developer.nvidia.cn/rdp/cudnn-archive#a-collapse821-113)**
 Python | **[3.8.0](https://www.python.org/downloads/release/python-380/)** -- **[Anaconda](https://www.anaconda.com/)**
 PyTorch| **[LTS(1.8.2)](https://pytorch.org/get-started/locally/)**
 YOLOv5 | **[v6.0](https://github.com/ultralytics/yolov5/releases/tag/v6.0)**


### 环境配置

下载 [YOLOv5-v6.0](https://github.com/ultralytics/yolov5/releases/tag/v6.0) 源码，解压后进入工作目录

- 安装依赖（建议🚀🚀🚀）

``` powershell
pip install -r requirements.txt
```

- 安装 `PyTorch-CUDA`，根据[官网](https://pytorch.org/get-started/locally/)的指令来

``` powershell
pip3 install torch==1.8.2 torchvision==0.9.2 torchaudio===0.8.2 --extra-index-url https://download.pytorch.org/whl/lts/1.8/cu111
```

- 基于 `coco128` 数据集测试一下运行环境
  - **[Train Custom Data](https://github.com/ultralytics/yolov5/wiki/Train-Custom-Data)**

``` powershell
python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights yolov5s.pt --cfg yolov5s.yaml
```

这里训练的时候可能会出现类似以下的错误

``` powershell
OSError: [WinError 1455] 页面文件太小，无法完成操作。 Error loading "D:\workspace\anaconda3\envs\yolov5-6-0\lib\site-packages\torch\lib\cudnn_adv_infer64_8.dll" or one of its dependencies.
```
可以参照 https://blog.csdn.net/weixin_43959833/article/details/116669523 中的解决办法

这里我修改了 `utils/datasets.py` 中的 `nw` 变量的值

``` py {3}
···
batch_size = min(batch_size, len(dataset))
nw = min([os.cpu_count(), batch_size if batch_size > 1 else 0, workers])  # number of workers
nw = 0
sampler = torch.utils.data.distributed.DistributedSampler(dataset) if rank != -1 else None
···
```

修改后能够正常训练，不过这个会降低训练速度，如果对此有要求还是修改一下虚拟内存

### 训练自定义数据集

执行训练的 `train.py` 文件中，可以设置很多的参数，定义在 `parse_opt` 函数中

```py
def parse_opt(known=False):
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', type=str, default=ROOT / 'yolov5s.pt', help='initial weights path')
    parser.add_argument('--cfg', type=str, default='', help='model.yaml path')
    parser.add_argument('--data', type=str, default=ROOT / 'data/coco128.yaml', help='dataset.yaml path')
    ···
    return opt
```

我们训练自己的数据集需要设置的几个参数一般为

- --weights 预训练的权重文件，直接下载
- --data 训练时的配置文件，参照 `coco128.yaml` 修改
- --cfg 网络的配置文件，参照 `yolov5s.yaml` 修改
- --img 训练时图片的输入尺寸，会影响到网络的输出层
- --batch 每批次训练输入的图像数量，越大训练越快，对硬件要求也越高
- --epochs 训练总轮次


#### weights
直接下载

- **https://github.com/ultralytics/yolov5/releases/tag/v6.0**


#### data
参照 `data/coco128.yaml` 中的内容，根据自己的数据集进行修改

``` yaml
path:  {path} # dataset root dir
train: images/train  # train images (relative to 'path') 128 images
val: images/val  # val images (relative to 'path') 128 images
test:  # test images (optional)

# Classes
nc: {n}  # number of classes
names: ['', '', '']  # class names
```

#### cfg
以 `models/yolov5s.yaml` 为例，不需要修改网络相关的结构，但是要根据修改的 `--data` 文件中的 `nc` 修改一下相应的 `nc`

``` yaml
nc: {n}  # number of classes
```

#### img
网络的输入尺寸，因设置为 `8` 的倍数，例如 640，480，320 等

对应的会影响网络的输出尺寸
- `layer 345 output resolution*1/8`
- `layer 403 output resolution*1/16`
- `layer 461 output resolution*1/32`


#### batch epochs
根据自己的硬件选择 batch 的大小

epochs可以稍微设置大一些，训练过程中会保存最好的训练结果为 best.pt

### 转换训练完成的权重文件

**安装 `onnx`**

``` powershell
pip install --upgrade onnx
```

**转换模型**

``` powershell
python3.8 export.py --data data/{custom}.yaml --weights run/train/exp/weights/best.pt --include onnx
```

转换模型的时候也可以设置网络输入的分辨率

``` powershell
python3.8 export.py --data data/{custom}.yaml --weights run/train/exp/weights/best.pt --include onnx --img {size} {size}
```

## 参考与致谢
- **[pytorch](https://pytorch.org/get-started/locally/)**
- **[ultralytics/yolov5](https://github.com/ultralytics/yolov5)**
- **[v6.0 - YOLOv5n 'Nano' models, Roboflow integration, TensorFlow export, OpenCV DNN support](https://github.com/ultralytics/yolov5/releases/tag/v6.0)**
- **[Train Custom Data](https://github.com/ultralytics/yolov5/wiki/Train-Custom-Data)**
- **[多种方法彻底解决pycharm中: OSError: [WinError 1455] 页面文件太小，无法完成操作 的问题](https://blog.csdn.net/weixin_43959833/article/details/116669523)**