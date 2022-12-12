---
id: gphoto2-get-capture
title: gphoto2 连接相机获取照片
sidebar_label: 控制相机
---

> gPhoto2 是一个免费软件，提供了在类 Unix 系统上通过终端来控制数码相机的功能

### 安装 **`gphoto2`**
- 在 `Ubuntu/debian` 系统中

``` shell
sudo apt-get install gphoto2
```

- 通过 `--help` 查看帮助

```
gphoto2 --help
```

**[gphoto2的说明文档](https://pypi.org/project/gphoto2/)**

### 测试
将相机用USB与设备连接，打开相机电源

打开终端输入

``` shell
lsusb
```

当输出类似 `Bus 001 Device 013: ID 04a9:3218 Canon, Inc. EOS 600D / Rebel T3i (ptp)` 这样的信息表示相机与设备成功连接了

- 通过 `--list-cameras` 来查看是否支持自己的相机型号

```
gphoto2 --list-cameras
```

通过 `grep` 可以对特殊的型号进行筛选，例如我所使用的相机为 `Canon EOS 600D`

```
gphoto2 --list-cameras | grep 600D
```

终端输出信息为 `“Canon EOS 600D”` ，表示支持这个型号的相机

- 通过 `--auto-detect` 连接相机

```
gphoto2 --auto-detect
```

- 通过 `--list-files` 查看相机的文件

```
gphoto2 --list-files
```

这时候如果返回错误

```
*** 错误 ***       
An error occurred in the io-library ('Could not claim the USB device'): Could not claim interface 0 (设备或资源忙). Make sure no other program (gvfs-gphoto2-volume-monitor) or kernel module (such as sdc2xx, stv680, spca50x) is using the device and you have read/write access to the device.
*** 错误 (-53:“Could not claim the USB device”) ***
```

参考 **[这里](https://askubuntu.com/questions/993876/gphoto2-could-not-claim-the-usb-device)** 的办法进行解决

```
pkill -f gphoto2
gphoto2 --list-files
```

即可查看相机内的文件

- 通过 `--get-config capturetarget` 查看当前相机存储位置的设置，是 `RAM` 还是 `SD卡`

```
gphoto2 --get-config capturetarget
```

- 通过 `--set-config capturetarget` 改变相机存储位置的设置，0为 `RAM` ，1为 `SD卡`

```
gphoto2 --set-config capturetarget=1
```

- 通过 `--capture-image` 控制相机捕捉图片

```
gphoto2 --capture-image
```

按下回车，相机快门触发，成功控制相机进行拍照
- 还可以通过增加 `--filename` 参数设置图片的文件名

```
gphoto2 --capture-image --filename pic-001.jpg
```

不过这里测试的时候可能相机本身也有设置，所以设置文件名并没有成功，以后再慢慢测试

### 待续......

## 参考
**[gphoto2](https://pypi.org/project/gphoto2/)**

**[玩转树莓派－Raspberry，控制单反相机进行可编程摄影](https://my.oschina.net/u/2306127/blog/392725/)**

**[gphoto2: Could not claim the USB device](https://askubuntu.com/questions/993876/gphoto2-could-not-claim-the-usb-device)**
