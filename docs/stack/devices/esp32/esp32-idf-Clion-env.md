---
id: esp32-idf-Clion-env
title: ''
sidebar_label: esp32-idf & Clion
---

## 在 CLion 中配置 ESP_CMake 项目

### 安装 ESP-IDF

- Github地址 **[`espressif/esp-idf`](https://github.com/espressif/esp-idf)**

- Gitee地址 **[`乐鑫开源/esp-idf`](https://gitee.com/EspressifSystems/esp-idf)**

- 文档地址 **[`ESP-IDF 快速入门`](https://www.jetbrains.com/help/clion/esp-idf.html#prepare)**

#### Linux

**安装依赖** - 这里使用的系统版本是 **[`Ubuntu20.04`](https://releases.ubuntu.com/20.04/)**

``` bash
sudo apt-get install git wget flex bison gperf python3 python3-venv python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0
```

**下载 ESP-IDF**

``` bash
mkdir -p ~/workspace/esp
cd ~/workspace/esp
git clone --recursive https://github.com/espressif/esp-idf.git
# clone 指定版本
# git clone -b v4.4 --recursive https://github.com/espressif/esp-idf.git esp-idf-v4.4
```

或者直接到 **[`espressif/esp-idf Tags`](https://github.com/espressif/esp-idf/tags)** 下载所需版本之后解压

**执行安装脚本**

``` bash
cd ~/workspace/esp/esp-idf-v4.4
export IDF_GITHUB_ASSETS="dl.espressif.com/github_assets"
./install.sh esp32
# 安装所有芯片的支持
# ./install.sh
```

**添加环境变量**

```
./export.sh
```

这样添加环境变量只会针对当前终端生效

### 配置 CLion

先从 ESP-IDF 的目录中复制一下 example

```
cp -r ~/workspace/esp//esp-idf-v4.4/examples/get-started/hello_world .
```

然后在 `CLion` 中打开 `hellow_world` 项目

#### 修改 CMakeLists.txt

这个项目是使用 `CMake` 来构建的，可以看到根目录下的 `CMakeLists.txt` 内容如下

```cmake
cmake_minimum_required(VERSION 3.5)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(hello_world)
```

由于这里并不方便使用 `export.sh` 开启虚拟环境，可以直接设置 `python` 可执行文件的位置，内容修改如下

```cmake
cmake_minimum_required(VERSION 3.5)

set(PYTHON "$HOME/.espressif/python_env/idf4.4_py3.8_env/bin/python")
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(hello_world)
```
- 根据自己 `IDF` 的安装情况，可能需要修改路径

#### 添加 IDF_PATH 环境变量
打开 `CLion` **文件 -> 设置 -> 构建、执行、部署**

打开 `CMake` 设置添加环境变量

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/ESP_IDF_CLion_CMake_env_value.png)

将 `ESP_IDF` 安装的路径设置为添加为 `IDF_PATH` 环境变量


#### 修改 gcc、g++路径

这个时候如果 CMake 报错

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/cmake_error_gcc.png)

进入 `ESP_IDF` 安装路径的 `tools/cmake/toolchain-esp32.cmake` 的目录下

按照你所使用开发板的型号修改对应的 `toolchain-esp32.cmake`，将其中的 `xtensa-esp32-elf-gcc` 三条 `set()` 修改如下

``` cmake
set(CMAKE_C_COMPILER $ENV{HOME}/.espressif/tools/xtensa-esp32-elf/esp-2021r2-8.4.0/xtensa-esp32-elf/bin/xtensa-esp32-elf-gcc)
set(CMAKE_CXX_COMPILER $ENV{HOME}/.espressif/tools/xtensa-esp32-elf/esp-2021r2-8.4.0/xtensa-esp32-elf/bin/xtensa-esp32-elf-g++)
set(CMAKE_ASM_COMPILER $ENV{HOME}/.espressif/tools/xtensa-esp32-elf/esp-2021r2-8.4.0/xtensa-esp32-elf/bin/xtensa-esp32-elf-gcc)
```
- 路径根据自己的实际路径设置，位置应该都一样

如果配置无误，`CMake` 将会输出 

``` bash
-- Configuring done
-- Generating done
-- Build files have been written to: ...
```

使用快捷键 `ctrl + F9` 即可编译项目

修改编译选项为 `flash` 直接烧录程序

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/esp-idf-clion/flash.png)

## 参考
- **[CLion-Doc-ESP-IDF](https://www.jetbrains.com/help/clion/esp-idf.html)**
- **[espressif/esp-idf](https://github.com/espressif/esp-idf)**
- **[乐鑫开源/esp-idf](https://gitee.com/EspressifSystems/esp-idf)**