---
id: octoprint-octolapse-auto-snapshot
title: octolapse 插件实现自动拍照
sidebar_label: 延时摄影
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import BVideo from "@site/src/components/BVideo";

<BrowserWindow>

### 视频演示

<BVideo src="//player.bilibili.com/player.html?aid=464633616&bvid=BV1rL41177o8&cid=456006994&page=1" bsrc="https://www.bilibili.com/video/BV1rL41177o8/"/>

</BrowserWindow>

### 准备工作

实现延时摄影之前，需要先完成两件事
1. 给你的树莓派安装上 **`Octoprint`**
   - [如何安装👉](https://sinnammanyo.cn/personal-site/docs/project/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/raspberry-pi-octoprint)
2. 给你的 **`Octoprint`** 安装 **[`Octolapse`](https://plugins.octoprint.org/plugins/octolapse/)** 插件
2. 在树莓派中安装 **`gphoto2`**
   - [如何安装👉](https://sinnammanyo.cn/personal-site/docs/project/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/gphoto2-get-capture)，树莓派中运行的 **`Octoprint`** 也是 `linxu` 系统，所以是通用的
3. 一台有外接电源的单反，因为我们这里使用单反来完成延时摄影，如果你使用网络摄像头的话也可以参考 **[Octolapse/wiki](https://github.com/FormerLurker/Octolapse/wiki)** 进行配置

### 编写脚本
> 这一步需要用到之前安装的远程 SSH 软件 MobaXterm

- 在 `MobaXterm` 中连接你树莓派的 IP 地址，默认的用户名和密码一般是

``` sh
login as: pi
pi@ip's password: raspberry
```

远程进入到系统后，由于需要在终端中编辑，所以需要你会使用一些终端编辑的工具，例如 `vim`、`nano` 等

- 通过 **`cd`** 命令进入到 `~/scripts` 文件夹，到其他的文件夹也不影响

``` sh 
cd ~/scripts
```

- 编写脚本 `detect_camera.sh` 用来在打印开始时自动连接相机

``` sh title="detect_camera.sh"
#!/bin/bash

# 连接相机
gphoto2 --auto-detect
# 获取相机存储位置
gphoto2 --get-config capturetarget
# 设置相机存储位置为SD卡
gphoto2 --set-config capturetarget=1
# 拍照测试
gphoto2 --trigger-capture
```

- 编写 python 脚本 `snapshot.py`

``` py title="snapshot.py"
from time import sleep
from datetime import datetime
from sh import gphoto2 as gp
import signal, os, subprocess, string

def killgphoto2Process():
    p = subprocess.Popen(['ps','-a'], stdout = subprocess.PIPE)
    out, err = p.communicate()

    for line in out.splitlines():
        if b'gvfsd-gphoto2' in line:
            pid = int(line.split(None, 1)[0])
            os.kill(pid, signal.SIGKILL)

killgphoto2Process()
gp(['--trigger-capture'])
```

- 编写脚本 `snapshot.sh`

``` sh title="snapshot.sh"
#!/bin/bash

# 执行拍照的 python 程序
python3 /home/pi/scripts/snapshot.py
```

脚本准备完成，安装一下 **`sh`**

``` sh
sudo apt-get install python3-pip
sudo pip3 install sh
```
### 配置 `Octoprint` 和 `Octolapse`

通过浏览器访问 ip 进入 **`Octoprint`** 界面，找到插件选项，搜索 **`Octolapse`** 并安装，安装后重启 **`Octoprint`** ，在界面上多出了 **`Octolapse`** 的选项

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/plugin-install.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/Octolapse.png)
#### 编辑 `Printer` 创建一个新的打印机配置文件

- **`Current Slicer Settings`** 栏的配置来自切片软件中的设置，建议选择 `Automatic Configuration`
  - 根据 `wiki` 中的 **[`V0.4 Automatic Slicer Configuration`](https://github.com/FormerLurker/Octolapse/wiki/V0.4---Automatic-Slicer-Configuration)** ，建议选择特定的切片软件，我们自己测试的时候使用别的切片软件设置不起效果
- **`Build Volume and Origin`** 栏的配置填你打印机的基本配置
  - **`Override Octoprint Printer Profile`** 这个选项勾选，覆盖原来的配置文件
  - 大部分保持默认即可
  - **`Firmware Settings`** 中三项项设置分别选择 **`Require Explicit G90/G91`** ， **`Require Explicit M82/M83`** ， **`Use Octoprint Setting`** ， **`Millimeters`**
  - **`Gcode Settings`** 中需要填入一些特殊的 **`GCode`** ，一般使用延时，用来给相机拍照时延时，后续需要在切片软件中同样填入这个，这里我选择填入 **`G4 P700`** 表示停止，延时700ms

#### 编辑 `Cameras` 配置相机以及脚本

- **`Custom Camera Scripts`**
  - **`Before Print Start Script`** 里填入 **`~/scripts/detect_camera.sh`**
  - **`Before Snapshot Script`** 里填入 **`~/scripts/snapshot.sh`**

保存退出

### 设置切片软件
测试时我们选用了一些其他的切片软件，所导出的 GCode 不能正确的被 **`Octolapse`** 识别，所以不能实现单反相机的延时摄影

根据 **`Octolapse`** 网站上的教程选用 **`PrusaSlicer`** 进行模型的切片，并对切片软件进行相应的设置

打开 **`PrusaSlicer`** 软件设置，将设置模式修改为专家模式，大部分设置根据自己打印机的相应参数进行设置

有几个关键须要设置的地方

**`打印设置` 部分**
- **`输出选项`** 中，勾选 **`详细 G 代码`**
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/%E8%AF%A6%E7%BB%86G%E4%BB%A3%E7%A0%81.png)

**`打印机设置` 部分**
- **`自定义 G-code`** 中，在 **`图层更改G代码之前`** 框中的 **`;[layer_z]`** 之前加入自定义 G 代码，例如 —— **`G4 P700`**，这个 G 代码会在后续用做打印时拍照的触发指令，需要与 **`Octolapse`** 的设置保持一致
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/%E8%87%AA%E5%AE%9A%E4%B9%89G-code.png)

- **`挤出机/喷头`** 中，需要关闭回抽时擦拭的功能，这个选项会导致喷头挤不出料，一定要关闭
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/3D%E6%89%93%E5%8D%B0%E5%BB%B6%E6%97%B6%E6%91%84%E5%BD%B1/%E8%87%AA%E5%AE%9A%E4%B9%89G-code.png)

### 测试打印


## 参考
- **[Octolapse](https://plugins.octoprint.org/plugins/octolapse/)**
- **[V0.4 Automatic Slicer Configuration](https://github.com/FormerLurker/Octolapse/wiki/V0.4---Automatic-Slicer-Configuration)**
- **[V0.4 Slic3r Slic3r PE and PrusaSlicer](https://github.com/FormerLurker/Octolapse/wiki/V0.4---Slic3r-Slic3r-PE-and-PrusaSlicer)**