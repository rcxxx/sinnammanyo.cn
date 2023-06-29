---
id: win11-wsl-usb
title: Win11 WSL2 连接 USB 设备
sidebar_label: WSL2 连接 USB 设备
---

### 安装 usbipd-win
- **[dorssel/usbipd-win/releases](https://github.com/dorssel/usbipd-win/releases)**

### WSL2 Ubuntu 安装 USB/IP 项目

``` bash
sudo apt install linux-tools-generic hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/*-generic/usbip 20
```

### 添加 USB 设备

**管理员身份启动 powershell**

``` bash
usbipd wsl list
```

- 连接设备到 WSL2

``` bash
usbipd wsl attach --busid <busid>
```

例如 

``` bash
usbipd wsl attach --busid 3-1
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-usb/usbipd-wsl-list.png)

- **WSL2 Ubuntu 中列出 USB 设备列表**

``` bash
lsusb
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-usb/lsusb.png)

- 关闭 USB 连接

``` bash
usbipd wsl detach --busid <busid>
```

## 参考
- **[连接 USB 设备](https://learn.microsoft.com/zh-cn/windows/wsl/connect-usb)**
- **[dorssel/usbipd-win](https://github.com/dorssel/usbipd-win)**
