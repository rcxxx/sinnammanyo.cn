---
id: opencv-dnn-yolov5-resnet
title: ''
sidebar_label: YOLOV5 & ResNet 
---

## yolov5 & ResNet 进行目标检测 + 特征提取

### ResNet 网络结构
···

### libtorh 安装
- `pytorch` 官网地址 **[https://pytorch.org](https://pytorch.org/)**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov5_resnet/libtorch-download.png)

- 测试 `libtorch` 文档**[USING THE PYTORCH C++ FRONTEND](https://pytorch.org/tutorials/advanced/cpp_frontend.html)**

**`CMakeLists.txt`** 文件内容

``` makefile
cmake_minimum_required(VERSION 3.23)
project(${project_name})

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)

## Find and add libtorch as required
set(CMAKE_PREFIX_PATH "~/WorkSpace/code/libtorch")
find_package(Torch REQUIRED)
include_directories(${TORCH_INCLUDE_DIRS})
link_libraries(${TORCH_LIBRARIES})
```

### ResNet 模型搭建
#### 卷积核


#### 残差块

- `BasicBlock`


#### 网络结构


只保留最终扁平化的一维向量

#### 网络初始化指针


### OpenCV DNN yolov5
- [使用 CV::DNN 模块读取 YOLO v5 ONNX 模型进行实时目标检测](https://sinnammanyo.cn/personal-site/docs/computer/cv/opencv/dnn/opencv-dnn-yolov5-6-0)

### ResNet 封装

#### cv::Mat to torch::Tensor
网络输入的格式是 `torch::Tensor` ，而检测后裁剪出来的数据类型为 `cv::Mat` ，需要进行数据转换，由于 `OpenCV` 中的图像用的 BGR 格式，需要将其转换为 `RGB` 格式，并转换为浮点类型，然后通过 torch 中的方法进行张量的转换

### 加载图片进行推理

## 参考

- **[leimao/LibTorch-ResNet-CIFAR](https://github.com/leimao/LibTorch-ResNet-CIFAR)**
- **[PyTorch使用ResNet18提取图像特征并进行相似度计算](https://blog.csdn.net/qq_37299618/article/details/121486682)**
- **[Pytorch实战2：ResNet-18实现Cifar-10图像分类](https://blog.csdn.net/sunqiande88/article/details/80100891)**
- **[使用 CV::DNN 模块读取 YOLO v5 ONNX 模型进行实时目标检测](https://sinnammanyo.cn/personal-site/docs/computer/cv/opencv/dnn/opencv-dnn-yolov5-6-0)**
- **[libtorch Tensor与opencv Mat相互转换](https://blog.csdn.net/juluwangriyue/article/details/108360320)**
- **[深度学习中归一化输入为什么要除方差/标准差?](https://www.zhihu.com/question/394376741/answer/2447545447)**
- **[Deep residual networks pre-trained on ImageNet](https://pytorch.org/hub/pytorch_vision_resnet/)**