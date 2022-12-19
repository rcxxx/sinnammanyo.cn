---
id: yolov5-train
title: 用 yolov5 进行开源数据集的训练
sidebar_label: yolov5 训练开源数据集
---

## yolov5环境配置
- **[可以参考这里](https://sinnammanyo.cn/personal-site/docs/yolo/yolov5-start)**

## 下载开源数据集

这里推荐一个网站，上面托管了很多开源的数据集

- **[public.roboflow](https://public.roboflow.com/)**

- **[roboflow 的 GitHub](https://github.com/roboflow-ai)**


这里我选择下载 **[`Uno Cards Dataset`](https://public.roboflow.com/object-detection/uno-cards/1)** 的 `v1` 版本

点击 `Download` 选项后，将 `Format` 勾选为 `YOLO v5 PyTorch` 后下载

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/uno-cards-dataset-download.png)

:::tip 😃
非常感谢开源这些数据集的贡献者们，有机会我也希望做这样很酷的事
:::

下载完成并解压后将文件夹重命名为 `Uno-Cards-Datasets` ，目录如下

``` bash
Uno-Cards-Datasets/
├── train
│   ├── images
│   └── labels
├── test
│   ├── images
│   └── labels
├── valid
│   ├── images
│   └── labels
├── data.yaml
└── ···
```

- `train/` 目录中存放用来做训练集的图片和对应的 `label` 文件
- `test/` 目录中存放用来做测试集的图片和对应的 `label` 文件
- `valid/` 目录中存放用来做验证集的图片和对应的 `label` 文件
- `data.yaml` 文件用来整理数据集中 `label` 的类别


## 配置训练参数
将 `Uno-Cards-Datasets/` 整个目录复制到 `yolov5-master` 的根目录下

**修改 `Uno-Cards-Datasets/data.yaml` 文件中的 `train` 和 `val` 路径**

``` yaml title="data.yaml"
train: ../Uno-Cards-Datasets/train/images
val: ../Uno-Cards-Datasets/valid/images

nc: 15
names: ['0', '1', '10', '11', '12', '13', '14', '2', '3', '4', '5', '6', '7', '8', '9']
```

**修改 `models/yolov5s.yaml` 文件中的 `nc` 改为和 `Uno-Cards-Datasets/data.yaml` 中的 `nc` 一样的值**

``` yaml title="yolov5s.yaml"
# parameters
nc: 15  # number of classes
    ···
```

## 开始训练
在 `yolov5-master/`目录下打开终端，激活对应的虚拟环境

``` bash title="train yolov5s"
source activate yolov5
python train.py --img 640 --batch 16 --epochs 300 --data Uno-Cards-Datasets/data.yaml --cfg models/yolov5s.yaml --weights ''
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolov5-train-uno.png)

开始训练，GPU占用已经快裂开了

接下来就是漫长的等待······

我的GPU训练速度是比较慢的，大概花了30多个小时完成这个数据集的训练

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolov5-train-uno-finish.png)

训练完成之后在 `runs/train/exp/weights/` 目录下输出了 `best.pt` 和 `last.pt` 两个权重文件

接下来我们用 `best.pt` 来测试一下训练的效果

```
python detect.py --source Uno-Cards-Datasets/test/images/000090623_jpg.rf.f7accf08c83af2398c4837f2f731707a.jpg --weights runs/train/exp/weights/best.pt --conf 0.25
```

- `--source` 参数后面修改为输入的测试图片或目录
- `--weights` 参数后面修改为 `runs/train/exp/weights/best.pt `

之后就会在 `runs/detect/exp` 目录中生成训练好的结果，具体路径以终端输出的为准

来看看测试的结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/000090623_jpg.rf.f7accf08c83af2398c4837f2f731707a.jpg)

图中的三张 UNO 卡片都成功的被检测出来，并且有较高的置信度

然后我们尝试着从相机获取图像并且动态的检测 UNO 卡片

```
python detect.py --source 0 --weights runs/train/exp/weights/best.pt
```

- `--source 0` 参数表示打开本地摄像头

来看看效果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolov5-UNO-camera.png)

## 参考
- **[Improving Uno with Computer Vision (Plus the Dataset so You Can Too)](https://blog.roboflow.com/improving-uno-with-computer-vision/)**

- **[YOLOv5模型训练](https://xugaoxiang.com/2020/07/02/yolov5-training/)**
