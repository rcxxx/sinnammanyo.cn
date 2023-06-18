---
id: raspberry-pi-octoprint
title: 树莓派 + octoprint 局域网操作打印机
sidebar_label: 树莓派 + octoprint
---

> OctoPrint 提供了一个用于控制消费类 3D 打印机的快速 Web 界面

### 安装前准备

- 准备一个 **[`树莓派`](https://www.raspberrypi.org/)** 
> 这里使用的是 **`树莓派4B`**
- 安装烧录软件 **[`rufus`](https://rufus.ie/zh/)**
- 安装SSH远程软件 **[`MobaXterm`](https://mobaxterm.mobatek.net/)**

### 安装 `Octoprint`

#### 下载镜像
到 **[`Octoprint`官网](https://octoprint.org/download/)** 下载自己所需要版本的镜像，推荐使用树莓派然进行安装

#### 烧录系统

下载后解压，打开 **[`rufus`](https://rufus.ie/zh/)**，向准备好的内存卡中写入镜像文件

写入镜像完成后，用 **[`vscode`](https://code.visualstudio.com/)** 或者 **[`Notepad++`](https://notepad-plus.en.softonic.com/)** 打开内存卡 `boot/` 目录下的 `octopi-wpa-supplicant.txt` 文件，找到

```
# WPA/WPA2 securd
#network={
#  ssid="put SSID here"
#  psk="put password here"
#}
```

从 **`network`** 行开始取消注释，将 **`ssid`** 修改为你 WIFI 的名字，将 **`psk`** 修改为你 WIFI 的密码

#### 设置 `Octoprint`
将内存卡插入树莓派，接通电源后查看路由器是否有一个新的设备连接，记下这个设备的IP地址，使用浏览器访问

如果成功访问了 **`Octoprint`** 的界面，则安装完成，开始对 **`Octoprint`** 进行一些基本的配置，包括用户名，登录密码等

然后根据你打印机的参数，对 **`Octoprint`** 进行进一步的设置

#### 测试打印

使用一根USB线连接树莓派和打印机，启动打印机后在 **`Octoprint`** 界面中点击 **`Connect`** 即可连接到打印机

如果你的树莓派还接入了摄像头，那么可以在界面中的 **`Control`** 栏看到摄像头的画面

- 还有一些其他的设置可以到网上查阅或是自己摸索

直接从本地上传文件或是直接使用打印机 SD卡 中的文件即可开始打印


## 参考

**[Octoprint安装指南——树莓派篇 @YU-NO 撰稿时间：2019.10.24 12:00 模范志：https://www.hobbyzine.net mailto:yu-no@163.com](https://zhuanlan.zhihu.com/p/88286814)**
