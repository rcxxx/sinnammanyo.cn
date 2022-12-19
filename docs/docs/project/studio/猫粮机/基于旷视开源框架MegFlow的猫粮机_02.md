---
id: Cat-food-machine-based-on-MegFLow_02
title: 基于旷视开源框架MegFlow的猫粮机(2)
sidebar_label: 喂食策略
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import BVideo from "@site/src/components/BVideo";

<BrowserWindow>

### 视频演示

<BVideo src="//player.bilibili.com/player.html?aid=935429326&bvid=BV1PT4y1m7Kk&cid=479365652&page=1" bsrc="https://www.bilibili.com/video/BV1PT4y1m7Kk"/>

### 项目地址
- [rcxxx/MegFlow —— cat_feeders](https://github.com/rcxxx/MegFlow/tree/master/flow-python/examples/cat_feeders)

</BrowserWindow>

## 新环境的配置
由于想让猫粮机长时间工作，不能只将程序跑在工作用的电脑上

我们选择 `Nvidia Jetson Nano` 作为猫粮机的运算平台，它体积够小，刚好能放入猫粮机内，执行这样需求较低的计算任务算力也足够

由于 `Nano` 是 `aarch64` 架构的，所以需要重新配置一下相关环境
- `MegFlow` 需要安装 `aarch64` 版本的 `.whl`
- `MegEngine` 也需要安装 `aarch64` 版本的 `.whl`

详细的安装过程放在这里👇
- **[Jetson Nano Install MegFlow && MegEngine](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-megflow-megengine)**

## 猫粮机的功能控制

考虑到猫猫的健康，需要时长调整它们的进食量，瘦的要多吃点，胖的要少吃点······

考虑到投喂的参数是变化的，所以准备增加一个串口屏来实时调整相应的投喂参数，比如投喂量，投喂次数，时间间隔等参数

#### 串口数据交互

- **[`serial.py`](https://github.com/rcxxx/MegFlow/blob/master/flow-python/examples/cat_feeders/serial.py)**

``` py
str = self._serial.read(6).hex()
if str is not None:
    if str[0:2] == 'aa' and str[10:12] == 'ff':
        feeding = []
        temp = str[2:10]
        for i in range(0, len(temp), 2):
            feeding.append(int(temp[i:i+2], 16))
        self._feeding = feeding
```
- 读取串口数据并根据帧头帧尾解码数据，并更新参数列表，这里设置了读取超时，为了保证稳定，串口屏部分有数据变化才会发送新的数据

#### 喂食逻辑
大致控制逻辑如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/MegFlow-Cat_feeder/%E7%8C%AB%E7%B2%AE%E6%9C%BA%E5%96%82%E9%A3%9F%E6%9C%BA%E5%88%B6.png)

根据设想的控制逻辑，新建功能插件

- **[`feeder.py`](https://github.com/rcxxx/MegFlow/blob/master/flow-python/examples/cat_feeders/feeder.py)**

```py
def isFeeding(self, name, time, feeding_times):
    last_t_fmt = self.formatTimestamp(float(self._r.get(f'{name}.feeding.last_t')))
    current_t_fmt = self.formatTimestamp(time)
    new_date = (current_t_fmt[0] - last_t_fmt[0]) + (current_t_fmt[1] - last_t_fmt[1]) + (current_t_fmt[2] - last_t_fmt[2])
    if new_date > 0:
        # 日期超过一天
        self._r.set(f'{name}.feeding.times', 0)

    times = int(self._r.get(f'{name}.feeding.times'))
    if ((current_t_fmt[3] - last_t_fmt[3]) >= self._preset_time or new_date) and (times < feeding_times):
        self._r.set(f'{name}.feeding.last_t', time)
        self._r.set(f'{name}.feeding.times', (times + 1))
        return True

    return False
```

这里分别将对应猫咪的已喂食数据，上一次喂食的时间都通过 `redis` 存储在本地，这样就算猫粮机断电了，也能保证正常的喂食逻辑，不需要重新进行初始化

#### 控制猫粮机
拆解猫粮机发现猫粮机的控制是通过电平脉冲来实现的，简单测试之后发现持续 `1s` 的高电平是 5g 左右的猫粮，`2s` 的脉冲则有 10g 左右，但是随着脉冲时间的延长，出粮的量并不是线性变化的，于是遵循少量多次的原则来控制猫粮机的出粮

`Jetson Nano` 上的引脚就可以作为脉冲的控制，只需要编写相应的代码就可以实现
- **[Nvidia Jetson Nano GPIO](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-gpio)**

新建功能插件
- **[`nano_gpio.py`](https://github.com/rcxxx/MegFlow/blob/master/flow-python/examples/cat_feeders/nano_gpio.py)**

``` py
GPIO.setmode(GPIO.BOARD)
GPIO.setup(self._gpio, GPIO.OUT)
GPIO.output(self._gpio, GPIO.HIGH)
def gpio_low(gpio):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(gpio, GPIO.OUT)
    GPIO.output(gpio, GPIO.LOW)
t = Timer(gpio_arg[0]/5, gpio_low, (self._gpio,))
t.start()
```
- 这里用到 `threading.timer()` 方法来实现延时任务，因为使用 `time.sleep()` 会让整个程序阻塞，影响后面的程序执行

之后修改相应的 `.toml` 文件

- **[`cat_feeder_nano.toml`](https://github.com/rcxxx/MegFlow/blob/master/flow-python/examples/cat_feeders/cat_feeder_nano.toml)**

然后设置开机自启动脚本，改造完成 ~~~！

## 致谢
感谢旷视科技的开发人员提供的技术支持，细致的问题解答~

目前项目已开源到天元社区 **[Awesome MegEngine](https://github.com/MegEngine/awesome-megengine)**

## 参考
- **[MegEngine/MegFlow](https://github.com/MegEngine/MegFlow)**
- **[MegFlow’s documentation!](https://megflow.readthedocs.io/zh_CN/latest/)**
- **[Jetson Nano Install MegFlow && MegEngine](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-megflow-megengine)**
- **[Nvidia Jetson Nano GPIO](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-gpio)**