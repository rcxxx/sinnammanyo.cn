---
id: Cat-food-machine-based-on-MegFLow
title: 基于旷视开源框架MegFlow的猫粮机(1)
sidebar_label: 猫咪检测与特征提取
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import BVideo from "@site/src/components/BVideo";

<BrowserWindow>

### 视频演示

<BVideo src="//player.bilibili.com/player.html?aid=635056677&bvid=BV1Ub4y1v7SE&cid=467195886&page=1" bsrc="https://www.bilibili.com/video/bv1Ub4y1v7SE"/>

### 项目地址
- [rcxxx/MegFlow —— cat_feeders](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders)

</BrowserWindow>


舍友的朋友要把猫咪送过来帮忙照顾几天，这样家里就一下子有了两只猫，投喂两只猫咪的工作量并不是 “x2” 那么简单，所谓懒是科技进步的阶梯，因为懒，所以准备做一个自动投喂的猫粮机，并不是定时定量的自动投喂，那样还需要买一个猫粮机，并且还需要经常设置和修改猫粮机喂食的时间以及数量，并且两只猫的话，就会出现更多的问题

于是我们准备做一个能够知道碗里还有没有猫粮，并且能够认识两只猫咪并进行分别的自动投喂的猫粮机，简单的执行逻辑如下


其他的都比较好办，关键是怎么让猫粮机认识两只猫，根据最初的想法，可以通过AI算法对两只猫咪进行检测和区分，相关的开源资料非常丰富，于是在 `GitHub` 里搜索相关资料，还真找到了一个非常易用的框架，并且有一个叫 **[`猫猫围栏`](https://megflow.readthedocs.io/zh_CN/latest/built-in-applications/cat_finder.html)** 的 **Demo** 可以实现类似的功能

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/MegFlow-Cat_feeder/megflow-wechat.png)

先来了解一下 `MegFlow` 这个框架
## `MegFlow`

> MegFlow 提供快速视觉应用落地流程，最快 15 分钟搭建起视频分析服务 ...

[![](https://github.com/MegEngine/MegFlow/raw/master/logo.png)](https://github.com/MegEngine/MegFlow)

按照 **[官方文档](https://megflow.readthedocs.io/zh_CN/latest/how-to-build-and-run/run-in-15-minutes.zh.html)** 安装运行环境后，运行下 `猫猫围栏` 示例程序

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/MegFlow-Cat_feeder/MegFLow-demo-display.png)

可以看到能够成功检测到图片中的猫咪，这里启动的其实是该项目里的一个注册服务：
1. 通过 `YOLOX` 执行目标检测，检测图像中的猫咪
2. 通过 `Resnet50` 对猫咪的特征进行提取，然后与输入的标签对应（也就是猫咪的名字），通过`redis` 进行对应的存储，将会存储在本地，后续的操作就能通过搜索存储过的 `key` 对不同的猫咪进行识别

- 这里的两个网络模型都已经实现了，用的是同样为旷视开源的深度学习框架 **[`MegEngine`](https://github.com/MegEngine/MegEngine)**，不需要自己去搭建以及训练，省了不少工作量

但是这里还没有实现最终的功能，我们需要稍微修改一下部分代码，将检测的服务在本地跑起来

## 功能实现

### 自定义功能插件

要实现自定义的功能，我们要根据教程写一些自定义的 **`Python Plugins`**
> **[`MegFLow - Python Plugins`](https://megflow.readthedocs.io/zh_CN/latest/how-to-add-my-service/appendix-B-python-plugin.zh.html#python-plugins)**

接下来要将原本上传图片或是视频的服务更改为本地的相机输入

#### 读取本地视频或是摄像头
这里使用 `cv2` 来实现读取本地 `视频/摄像头` 的操作
- **[`camera.py`](https://github.com/rcxxx/MegFlow/blob/master/flow-python/examples/cat_feeders/camera.py)**

:::note 📝
- **`MegFlow`** 的节点之间，消息 **`msg`** 被打包成 **`Envelope`** 后在节点之间传递
- 这里将 **`camera.py`** 作为源节点，会在第一次发送 **`Envelope`** 后，接收后续的节点的数据后再进行数据的更新
:::

#### YOLOX 目标检测，标记出所有猫猫
这里要用到的模型等都能到 **[`👉模型下载`](https://megflow.readthedocs.io/zh_CN/latest/download-models.zh.html)** 找到，此项目的 `Release` 中也上传了 **[`模型文件👉`](https://github.com/rcxxx/MegFlow/releases/tag/aarch64-whl)**

- **[`det.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/det.py)**

```py title="load model"
# load detect model and warmup
self._predictor = PredictorLite(path=args['path'],
                                confthre=args['conf'],
                                nmsthre=args['nms'],
                                test_size=(self._tsize, self._tsize),
                                device=args['device'],
                                device_id=args['device_id'])
warmup_data = np.zeros((224, 224, 3), dtype=np.uint8)
self._predictor.inference(warmup_data)
```
- 位于构造函数中的模型加载，加载模型之后将进行一次类似“热身”的无效检测，保证后续的推理速度

**有关 YOLOX 可以看这里**
- **[MegEngine/YOLOX](https://github.com/MegEngine/YOLOX)**

#### 对检测的结果执行跟踪，并对跟踪结果进行相应的处理
- **[`track.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/track.py)**

```py
items = msg['items']

tracks, failed_ids = self._tracker.track(items)
msg['tracks'] = tracks
msg['failed_ids'] = failed_ids
```

- **[`shaper.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/shaper.py)**

```py
if 'tracks' in msg:
    for track in msg['tracks']:
        tid = track['tid']

        if tid not in self._shaper:
            ...
            # save crop to _shaper[tid]

if 'failed_ids' in msg:
            fids = msg['failed_ids']
            if len(fids) > 0:
                for fid in fids:
                    if fid in self._shaper:
                        self._shaper.pop(fid)
```
- 执行 `track` 节点后，将会给猫猫生成唯一的 `ID` ，只有在一个 `ID` 第一次出现的时候才会进行图片的裁剪，再做特征的提取，提高程序的效率，当 `ID` 丢失时则会移除相应的图片

**有关 IOU Tracker 可以看这里**
- **[bochinski/iou-tracker](https://github.com/bochinski/iou-tracker)**

#### Resnet50 提取特征
- **[`reid.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/reid.py)**

```py title="load model"
# load ReID model and warmup
self._model = PredictorLite(path=args['path'],
                            device=args['device'],
                            device_id=args['device_id'])
warmup_data = np.zeros((224, 224, 3), dtype=np.uint8)
self._model.inference(warmup_data)
```
- 加载模型后同样进行一次无效检测

#### 在本地的 `redis` 存储中搜索特征
之前通过注册服务可以将猫咪的特征提取并生成 `key` 存储在本地，这里直接用提取到的特征进行搜索，匹配对应的猫咪的名称

- **[`redis_search.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/redis_search.py)**

特征匹配后将生成对应 `track ID` 的 `result` 并打包进 `msg['results']`

#### 根据特征的匹配结果标记相应的猫咪

- **[`name.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/name.py)**

原本的注册服务对应的 `key` 只能有一个特征值，可以对同一个猫猫注册多次特征，能提高匹配的成功率

#### 将结果进行可视化

- **[`display.py`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/display.py)**


### 修改 `toml` 文件设置 `MegFLow` 的工作图

根据文档的教程：**[HOW TO USE —— Config](https://megflow.readthedocs.io/zh_CN/latest/how-to-add-my-service/appendix-A-graph-definition.zh.html)** ，修改框架的计算图

修改相应的 `toml` 文件，模型的推理可以选择使用 `CPU` 或是 `GPU` ，所以要写对应的 `toml` 文件

- **[`cat_feeder_cpu.toml`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/cat_feeder_cpu.toml)**
- **[`cat_feeder_gpu.toml`](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders/cat_feeder_gpu.toml)**


### 读取视频进行测试
这里视频以及猫咪的特征注册我都以及提前做了

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="cpu"
values={[
    {label: 'CPU', value: 'cpu'},
    {label: 'GPU', value: 'gpu'},
]}>
<TabItem value="cpu">

```shell
cd {workspace}/Megflow/flow-python/examples/
conda activate megflow
megflow_run -c cat_feeders/cat_feeder_cpu.toml -p cat_feeders/
```

</TabItem>
<TabItem value="gpu">

```shell
cd {workspace}/Megflow/flow-python/examples/
conda activate megflow
megflow_run -c cat_feeders/cat_feeder_gpu.toml -p cat_feeders/
```

</TabItem>
</Tabs>

- 结果如下
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/MegFlow-Cat_feeder/run-cat_feeder-display.png)

成功区分出两只猫猫，程序部分基本完工，后续将继续增加投喂策略，以及设置相关参数的功能

## 参考
- **[`MegEngine/MegFlow`](https://github.com/MegEngine/MegFlow)**
- **[`MegEngine/MegEngine`](https://github.com/MegEngine/MegEngine)**
- **[MegFlow 之 15 分钟 x86 CPU + GPU平台推理服务部署：在线视频流检测报警](https://githubmemory.com/repo/yuenshome/yuenshome.github.io/issues/136)**