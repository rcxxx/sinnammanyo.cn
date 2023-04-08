---
id: yolov8-train
title: yolov8 训练自定数据集
sidebar_label: yolov8 train
---

## datasets
训练之前需要准备数据集，`yolov8` 推荐了数据集标注工具 [`Roboflow`](https://docs.roboflow.com/)，Roboflow 是一个很强大的在线工具，目前所提供的格式中包含 yolov8 的格式，可以直接使用此工具制作数据集

- 注册登录平台，根据教程创建一个工作区

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-workspace.png)

- 在工作区中创建一个项目

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-create-project.png)

- `Upload` 上传你准备好的作为数据集的图片，可以直接进行标注，但是为了防止连接崩溃的情况，建议先将保存后，再执行标注

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-upload.png)

- `Annotate` 对你上传的图片进行标注，有不需要标注但想作为背景进行训练的，记得点击跳过，所有图片都标注完成后，生成数据集

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-annotation.png)

- `Generate` 生成数据集
1. 根据推荐自动划分训练集，测试集和验证集，在 `Train/Test Split` 中进行比例的调整
2. 对图像进行预处理，有的网络输入要求长宽相等，这一步可以对图像执行 `resize` 并且可以选择 `black/white edges` 填充，保证图像不失真
3. 图像增强，提高训练出来的模型质量

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-generate.png)

- `Generate`-`Export` 导出数据集，可以直接导出包括 `COCO，VOC，YOLOv8` 等格式的数据集

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-export.png)

导出数据集的结果如下，其中 `data.yaml` 为 yolov8 训练时所需的配置文件

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/roboflow-export-result.png)

数据集准备完成

---

## yolov8 env install

**如果你需要使用 GPU 训练，则需要安装 GPU 版本的 Pytorch**
- 如果你需要将训练完的模型导出为 opset=12 的 onnx 模型，建议不要安装 2.0 版本的 Pytorch，推荐使用版本为 [v1.13.1](https://pytorch.org/get-started/previous-versions/#v1131)，选择你需要的 CUDA 版本进行安装
``` bash
# CUDA 11.6
pip install torch==1.13.1+cu116 torchvision==0.14.1+cu116 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu116
# CUDA 11.7
pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu117
# CPU only
pip install torch==1.13.1+cpu torchvision==0.14.1+cpu torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cpu
```

- 安装 ultralytics
``` bash
pip install -r requirements.txt
pip install ultralytics
```

## yolov8 train

数据集准备完成之后，将数据集复制到 `ultralytics` 项目的 `ultralytics/datasets` 目录下，复制后文件结构如下

``` bash
datasets/
└── custom
    ├── data.yaml
    ├── README.dataset.txt
    ├── README.roboflow.txt
    ├── test
    │   ├── images
    │   └── labels
    ├── train
    │   ├── images
    │   └── labels
    └── valid
        ├── images
        └── labels
```

参照 [Usage Examples](https://docs.ultralytics.com/modes/train/#usage-examples)

``` shell
# 从 YAML 构建新模型，从头开始训练
yolo detect train data=coco128.yaml model=yolov8n.yaml epochs=100 imgsz=640

# 从预训练的 *.pt 模型开始训练
yolo detect train data=coco128.yaml model=yolov8n.pt epochs=100 imgsz=640

# 从 YAML 构建一个新模型，将预训练权重转移到其中并开始训练
yolo detect train data=coco128.yaml model=yolov8n.yaml pretrained=yolov8n.pt epochs=100 imgsz=640
```

选择从头训练新的模型，使用 yolov8n 的网络结构

``` bash
yolo detect train data=custom/data.yaml model=yolov8n.yaml epochs=100 imgsz=640
```

**开始训练**，训练过程的日志将保存在 `ultralytics/runs/detect/train` 中

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/yolov8-train-start.png)

- 使用tensorboard 可视化训练过程，在 http://localhost:6006/ 中查看

```bash
tensorboard --logdir runs/detect/train
```

**训练完成**，训练结果的全中将保存在 `ultralytics/runs/detect/train/weights` 中，分别为
- best.pt 验证效果最好的权重文件
- last.pt 最后一个训练轮次的权重文件

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/yolov8/yolov8-train-result.png)

## val and predict

- 验证
``` bash
yolo detect val model=runs/detect/train/weights/best.pt  # val custom model
```

- 预测
``` bash
yolo predict model=runs/detect/train/weights/best.pt source='{image-path}' imgsz=640
```

## convert to onnx

``` bash
yolo export model=runs/detect/train/weights/best.pt imgsz=640 format=onnx opset=12
```

## OpenCV DNN

- **[使用 CV::DNN 模块读取 ultralytics/YOLO-v8 ONNX 模型进行实时目标检测](https://sinnammanyo.cn/stack/cv/opencv/dnn/opencv-dnn-ultralytics)**

## 参考
- **[INSTALLING PREVIOUS VERSIONS OF PYTORCH](https://pytorch.org/get-started/previous-versions/#installing-previous-versions-of-pytorch)**
- **[ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)**
- **[YOLOv8 Docs](https://docs.ultralytics.com/)**
- **[开始使用 - Roboflow](https://help.roboflow.com/cn_CN/get-started/dataset-upload-roboflow-data-types)**