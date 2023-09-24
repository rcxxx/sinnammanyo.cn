---
id: win11-wsl-ubuntu2204
title: Win11 WSL2 Install Ubuntu22.04
sidebar_label: WSL2 Ubuntu22.04
---

## WSL

> 适用于 Linux 的 Windows 子系统可让开发人员按原样运行 GNU/Linux 环境 - 包括大多数命令行工具、实用工具和应用程序 - 且不会产生传统虚拟机或双启动设置开销。
> ······

## 准备工作

### 开启 CPU 虚拟化

跟安装虚拟机类似，需要到 BIOS 中开启 CPU Virtualization，开启后可在任务管理器中查看

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/cpu-virtualization-on.png)

### 开启 Windows 虚拟监控平台以及 Linux 子系统

#### 命令行方法
以管理员身份运行 PowerShell

- 启用适用于 Linux 的 Windows 子系统

``` powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

- 启用虚拟机功能

``` powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

#### 手动方法

打开控制面版 -> 启用或关闭 Windows 功能，勾选如下选项

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/windows-virtualization.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/Hyper-V-on.png)

确认后将执行下载，并提示重启，重启后以管理员身份运行 PowerShell 并输入

``` powershell
bcdedit /set hypervisorlaunchtype auto
```

### 下载 Linux 内核更新包

- **[适用于 x64 计算机的 WSL2 Linux 内核更新包](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)**

下载后得到一个 `.msi` 文件，执行安装即可

### 设置 WSL2 为默认版本

``` powershell
wsl --set-default-version 2
```

### 安装 Ubuntu 22.04 LTS

- **[Ubuntu 22.04 LTS](https://apps.microsoft.com/store/detail/ubuntu-22042-lts/9PN20MSR04DW?hl=zh-cn&gl=cn&rtc=1)**

可以选择在 Microsoft Store 中直接下载，也可以从命令行安装

- 查看可以安装的版本

``` powershell
wsl -l -o
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/wsl-l-o.png)

- 安装 Ubuntu 22.04 LTS

``` powershell
wsl --install -d Ubuntu-22.04
```

安装后启动 Ubuntu 22.04 终端如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/ubuntu2204-installed.png)

### WSL 上运行 Linux GUI 应用

**需要安装 GPU 驱动程序**

- **[英特尔 GPU 驱动程序](https://www.intel.com/content/www/us/en/download/19344/intel-graphics-windows-dch-drivers.html)**
- **[Amd GPU 驱动程序](https://www.amd.com/en/support)**
- **[Nvidia GPU 驱动程序](https://www.nvidia.com/Download/index.aspx?lang=en-us)**

#### 更新 WSL
更新 WSL 到包含 Linux GUI 支持的最新版本

``` powershell
wsl --update
```

重启 WSL

``` powershell
wsl --shutdown
```

进行测试

打开 Ubuntu 22.04 终端

``` bash
sudo apt update
sudo apt install x11-apps -y
xeyes &
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ubuntu2204/ubuntu2204-xeyes.png)

同理也可以使用诸如 `gedit`、`VLC` 等的 GUI 应用

## 注销 WSL-Ubuntu

```
wsl --list
wsl --unregister Ubuntu-22.04
```

## 参考
- **[使用 WSL 在 Windows 上安装 Linux](https://learn.microsoft.com/zh-cn/windows/wsl/install)**
- **[Windows 11 安装 WSL2](https://zhuanlan.zhihu.com/p/475462241)**
- **[在 适用于 Linux 的 Windows 子系统 上运行 Linux GUI 应用](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps)**