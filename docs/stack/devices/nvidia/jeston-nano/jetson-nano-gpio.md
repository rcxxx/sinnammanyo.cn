---
id: jetson-nano-gpio
title: Nvidia Jetson Nano GPIO
sidebar_label: Jetson GPIO
---

import BrowserWindow from '@site/src/components/BrowserWindow';

> Jetson TX1, TX2, AGX Xavier, and Nano development boards contain a 40 pin GPIO header, similar to the 40 pin header in the Raspberry Pi. These GPIOs can be controlled for digital input and output using the Python library provided in the Jetson GPIO Library package. The library has the same API as the RPi.GPIO library for Raspberry Pi in order to provide an easy way to move applications running on the Raspberry Pi to the Jetson board.

## 安装

``` shell
cd {workspace}/
git clone https://github.com/NVIDIA/jetson-gpio.git
cd jetson-gpio/
conda activate {env_name} # 如果想在 conda 环境中安装的话
python setup.py install
```
- 如果不使用 **`conda`** 环境的话也可以直接
- **`sudo pip install Jetson.GPIO`**


测试安装

``` shell
python
>>> import Jetson.GPIO as GPIO
>>> GPIO.VERSION
'2.0.17'
>>> GPIO.RPI_INFO
{'P1_REVISION': 1, 'RAM': '4096M', 'REVISION': 'Unknown', 'TYPE': 'Jetson Nano', 'MANUFACTURER': 'NVIDIA', 'PROCESSOR': 'ARM A57'}
```

## 使用

### 设置用户权限

> Jetson NANO GPIO正常情况下只允许root用户权限访问，采用以下方法，可以让除root以外的其他用户也能通过python操作NANO的GPIO

``` shell
sudo groupadd -f -r gpio
sudo usermod -a -G gpio {user_name} # 自己的用户名
```

找到对应的 `python` 包的 `99-gpio.rules` 文件

```
sudo find / -name 99-gpio.rules
```

- 如果是直接 `git` 下载的，文件会在 `{workspace}/jetson-gpio/lib/python/Jetson/GPIO/99-gpio.rules`

然后将对应的 `99-gpio.rules` 文件复制到 `/etc/udev/rules.d` 目录
- 例如我的文件在 `~/workspace/tools/jetson-gpio/lib/python/Jetson/GPIO/99-gpio.rules`

``` shell
sudo cp ~/workspace/tools/jetson-gpio/lib/python/Jetson/GPIO/99-gpio.rules /etc/udev/rules.d/
```

重新加载 `udev` 规则

``` shell
sudo udevadm control --reload-rules && sudo udevadm trigger
```

重启设备

```
sudo reboot
```

### Jetson Nano J41 Header
`Jetson Nano` 有 `40PIN` 的 `GPIO` 接口提供四种预设模式 `BOARD`、`BCM`、`CVM` 和 `TEGRA_SOC`，其中 `BOARD` 和 `BCM` 常在 `Python` 中使用，开发板正面对应 `BOARD` 模式的编号，背面则对应 `BCM` 模式

- **`BOARD`**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-J41-Header.png)

- **`BCM`**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-J41-Header-BCM.png)

### Python API
- **[Jetson.GPIO - PyPI](https://pypi.org/project/Jetson.GPIO/)** 中有详细的 `API` 文档

- **简单使用**

<BrowserWindow>

**设置一个GPIO口循环输出高低电平**

``` py
import Jetson.GPIO as GPIO
import time as time

def main():
    print("Press CTRL+C to exit")
    # 设置模式为 BOARD
    GPIO.setmode(GPIO.BOARD)
    
    # 设置引脚 37 为输出
    io = 37
    GPIO.setup(io, GPIO.OUT)
    try:
        while True:
            GPIO.output(io, GPIO.HIGH)
            time.sleep(2)
            GPIO.output(io, GPIO.LOW)
            time.sleep(2)
    finally:
        # 清除设置
        GPIO.cleanup()

if __name__ == '__main__':
    main()
```

- 运行效果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-gpio-output_0v.jpg)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-gpio-output_3-3v.jpg)

</BrowserWindow>

## 参考
- **[NVIDIA/jetson-gpio](https://github.com/NVIDIA/jetson-gpio)**
- **[Jetson.GPIO - PyPI](https://pypi.org/project/Jetson.GPIO/)**
- **[[第一次用Jetson nano 就上手]使用40 pin GPIO](https://www.rs-online.com/designspark/jetson-nano-40-pin-gpio-1-cn)**
- **[如何配置和使用Jetson Nano GPIO](https://blog.csdn.net/lifeisme666/article/details/109728437)**
- **[Jetson NANO GPIO---允许其他用户访问](https://www.it610.com/article/1290481682784264192.htm)**
- **[NVIDIA Jetson Nano J41 Header Pinout](https://www.jetsonhacks.com/nvidia-jetson-nano-j41-header-pinout/)**
- **[Jetson Nano系列教程3：GPIO](https://www.waveshare.net/study/portal.php?mod=view&aid=882)**