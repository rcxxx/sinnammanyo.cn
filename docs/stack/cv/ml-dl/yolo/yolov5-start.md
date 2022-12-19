---
id: yolov5-start
title: yolov5 环境配置
sidebar_label: yolov5 环境配置
---

- **[yolov5 GitHub 链接](https://github.com/ultralytics/yolov5)**

对于这类神奇的开源项目，我并没有很深刻的去理解，也没有那种能力

更多的还是出于自己的兴趣来做一些实现，膜拜大佬们就完事了

## 克隆源码

先从 **[`GitHub`](https://github.com/ultralytics/yolov5)** 上克隆源码

整个项目的大致目录如下，只贴出来了这里会提到的文件

``` bash
yolov5-master/
├── data
│   ├── images
│   │   ├── bus.jpg
│   │   └── zidane.jpg
│   └── ···
├── weights
│   └── download_weights.sh
├── requirements.txt
├── detect.py
└── ···
```

- `data/images/` 路径下存放示例所用的两张图片
- `weights/` 目录下是下载权重文件的脚本 `download_weights.sh`
- `requirements.txt` 文件列出了环境所需要的依赖
- `detect.py` 用来实现检测的 `py` 文件

## 环境配置

如果你安装了 `Anaconda` 的话，建议创建一个新的虚拟环境，避免与自己本来的开发环境冲突

``` bash
conda create -n yolov5 python==3.8
source activate yolov5
```

然后根据 `requirements.txt` 文件安装依赖环境

``` bash
pip install -r requirements.txt
```

正常的话相关环境已经配置完成了

---

## 执行测试

安装完成之后使用 `download_weights.sh` 脚本下载训练好的权重文件

``` bash
bash weights/download_weights.sh
```

:::info 💻
这里会因为网络的原因而导致失败，也可以直接到 yolov5 的 **[release](https://github.com/ultralytics/yolov5/releases)** 下载
:::

---

下载完成之后根目录下会多出几个权重文件，分别对应不同的网络结构

``` bash
yolov5-master/
├── ···
├── yolov5l.pt
├── yolov5m.pt
├── yolov5s.pt
└── yolov5x.pt
```

这里以 `yolov5s.pt` 为例

``` bash
python detect.py --source data/images --weights yolov5s.pt --conf 0.25
```

执行检测

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolo-start.png)

从终端打印的信息可以看到，分别在两张图中检测到了一些内容

也会在目录中生成一个 `runs/detect/exp` 目录，可以直接到这个目录中查看检测的结果

示例👇

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/zidane.jpg)

这里因为我执行了两次，所以出现了 `Results saved to runs/detect/exp2`

例程看完了，下一步就是用 `yolov5` 来训练其他的数据集
- **[传送门](https://sinnammanyo.cn/personal-site/docs/yolo/yolov5-train)**

## 参考

- [yolov5 README](https://github.com/ultralytics/yolov5/blob/master/README.md)
