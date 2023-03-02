---
id: esp32-idf-Clion-env
title: ''
sidebar_label: esp32-idf & Clion
---

## 在 CLion 中配置 ESP_CMake 项目
name | version 
---------|----------
 System | **[Ubuntu 20.04](https://releases.ubuntu.com/20.04/)**
 CMake  | **[3.10](https://cmake.org/)** ≥
 ESP-IDF | **[master--v5.1](https://github.com/espressif/esp-idf)**
 ESP-IDF Programming GuideLogo | **[v5.1](https://docs.espressif.com/projects/esp-idf/en/release-v5.1/esp32/index.html)**
 Device | ESP32-S3-WROOM-1

### 安装 ESP-IDF

- Github地址 **[`espressif/esp-idf`](https://github.com/espressif/esp-idf)**

- Gitee地址 **[`乐鑫开源/esp-idf`](https://gitee.com/EspressifSystems/esp-idf)**

- 文档地址 **[`ESP-IDF 快速入门`](https://www.jetbrains.com/help/clion/esp-idf.html#prepare)**

#### Linux

``` bash
sudo apt-get install git wget flex bison gperf python3 python3-venv python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0
```

**下载 ESP-IDF**

``` bash
mkdir -p ~/esp
cd ~/esp
git clone --recursive https://github.com/espressif/esp-idf.git
# clone 指定版本
# git clone -b v4.4 --recursive https://github.com/espressif/esp-idf.git esp-idf-v4.4
```

或者直接到 **[`espressif/esp-idf Tags`](https://github.com/espressif/esp-idf/tags)** 下载所需版本之后解压

**执行安装脚本**

``` bash
cd ~/esp/esp-idf
export IDF_GITHUB_ASSETS="dl.espressif.com/github_assets"
./install.sh esp32
# 安装所有芯片的支持
# ./install.sh
```

**添加环境变量**

```
. ./export.sh
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/export-sh.png)

这样添加环境变量只会针对当前终端生效

### 配置 CLion

先从 ESP-IDF 的目录中复制一下 example

```
cp -r ~/esp/esp-idf/examples/get-started/hello_world .
```

然后在 `CLion` 中打开 `hellow_world` 项目

#### 修改 CMakeLists.txt

这个项目是使用 `CMake` 来构建的，可以看到根目录下的 `CMakeLists.txt` 内容如下

```cmake
cmake_minimum_required(VERSION 3.16)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(hello_world)
```

#### 添加 IDF_PATH 环境变量
打开 `CLion` **文件 -> 设置 -> 构建、执行、部署**

执行 `. ./export.sh` 之后将输出 `ESP_IDF` 的安装路径

``` shell title="eg"
Setting IDF_PATH to '/home/rcxxx/esp/esp-idf'
```

打开 `CMake` 设置添加环境变量

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/ESP_IDF_CLion_CMake_env_value.png)

将 `ESP_IDF` 安装的路径设置为添加为 `IDF_PATH` 环境变量

切换到之前的终端，查看当前终端的环境变量

``` shell
echo $PATH
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/echo-path.png)


将所有跟 esp32 相关的变量复制，粘贴到 `CMake` 环境变量之前

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/echo-path-copy.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/export-sh-copy.png)


清除 `CMake` 缓存，重新加载配置


如果配置无误，`CMake` 将会输出 

``` bash
-- Configuring done
-- Generating done
-- Build files have been written to: ...
```

使用快捷键 `ctrl + F9` 即可编译项目

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/build-app-done.png)

修改编译选项为 `flash` 直接烧录程序

烧录前的准备工作可以参照
- [CLion & esp32 执行烧录前执行脚本赋予串口权限](https://sinnammanyo.cn/stack/devices/esp32/esp32-CLion-flash-seria-port-permission)

烧录时可能会遇到这样的错误，原因是板子的参数没有设置

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/chip-argument.png)

在 `CMakeLists.txt` 文件中添加如下语句

``` cmake
cmake_minimum_required(VERSION 3.16)

set(ENV{IDF_TARGET} "esp32s3")

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(hello_world)
```

清除缓存后重新编译项目

- 也可以在 CMake 用户环境变量中添加 `IDF_TARGET`，更推荐这个方案

烧录结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/flash.png)

## 更新
**使用 monitor 监测功能时，默认会打开 `/dev/ttyUSB0` 端口（Ubuntu），有的设备接时的端口为 `/dev/ttyACM*` 会导致监测功能报错，解决方法**
- *[Flashing and monitoring an ESP-32 chip in CLion](https://www.jetbrains.com/help/clion/esp-idf.html#flash-monitor)*

1. 可以在 CMake 用户环境变量中添加 `ESPPORT`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/espport.png)

2. 或者在 `CMakeLists.txt` 文件中设置环境变量

``` cmake
set(ENV{ESPPORT} "/dev/ttyACM0")
```

## 更新 0.2

CLion 配置项目完成之后的编译，烧录操作还算正常，但是监测功能在使用的时候出现结果为空的情况

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/result-none.png)

并且每次修改代码之后，都要依次选择编译、烧录、监测三个功能，相当繁琐，经过跟 `ChatGPT` 的交流之后，找到一个方法可以一次解决所有问题

在 CLion 的运行/调试配置中，可以使用脚本文本方式来自定义编译、烧录和监控 ESP-IDF 项目

1. 点击 CLion 工具栏，在下拉菜单中选择 `编辑配置（Edit Configurations）`。

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/edit-cfg.png)

2. 左上角的加号 `添加配置（Add New Configuration）`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/add-new.png)

3. 选择添加 `Shell Script`
   
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/shell-script.png)

4. 选择脚本文本

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/script-text.png)

5. 在 `脚本文本` 一栏中填入终端命令语句

``` bash
. ~/esp/esp-idf/export.sh && idf.py build && idf.py -p /dev/ttyACM0 -b 115200 flash && idf.py -p /dev/ttyACM0 -b 115200 monitor
```
- `. ~/esp/esp-idf/export.sh` 激活环境的脚本，脚本路径根据自己的安装位置修改
- `idf.py build` 编译项目
- `idf.py -p /dev/ttyACM0 -b 115200 flash` 烧录项目，端口以及波特率根据自己的需求修改
- `idf.py -p /dev/ttyACM0 -b 115200 monitor` 监测项目，同上

然后即可点击 run，直接执行三步操作

### 结束监测

**终端中的 `monitor` 监测使用快捷键 `CTRL + ]`退出监测**

## 参考
- **[CLion-Doc-ESP-IDF](https://www.jetbrains.com/help/clion/esp-idf.html)**
- **[在 Windows 上用 CLion 开发 ESP32 | CLion教程 | 嵌入式开发 | IDE](https://www.bilibili.com/video/BV1LD4y1P78U/?spm_id_from=333.337.search-card.all.click&vd_source=4cca3a7520260c460d94cf70a3f0a5ba)**
- **[espressif/esp-idf](https://github.com/espressif/esp-idf)**
- **[乐鑫开源/esp-idf](https://gitee.com/EspressifSystems/esp-idf)**
- **[ChatGPT](https://chat.openai.com/auth/login)**
