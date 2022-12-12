---
id: opencv-build-cfg
title: OpenCV Build Configuration Options 
sidebar_label: Build Config
---

名称 | 版本 |
---------|:--------:|
 opencv | 4.5.0 |
 opencv_contrib | 4.5.0 |

## Build with extra modules

**`opencv_contrib`** 是 **`opencv`** 的拓展模块，其中包含了如 **`DNN`** 模块等拓展模块

- Download **[opencv/opencv_contrib](https://github.com/opencv/opencv_contrib/releases/tag/4.5.0)**

Cmake 选项为 **`-DOPENCV_EXTRA_MODULES_PATH={path}/opencv_contrib/modules`**

## Generate pkg-config info

启用 `PKGCONFIG` 选项将生成 `opencv4.pc` 文件，便于使用 `pkg-config`

Cmake 选项为 **`-DOPENCV_GENERATE_PKGCONFIG=ON`**

## Parallel processing

一些OpenCV算法可以使用多线程来加速处理

- Linux 默认后端为pthreads库

Cmake 选项为 **`-DWITH_PTHREADS_PF=ON`**

## GUI backends (highgui module)

默认开启 `GTK` 支持，可以选择开启 `QT` 支持更高级的GUI操作

- **`GTK3`** 支持

```
sudo apt-get install libgtk-3-dev
```

Cmake 选项为 **`-DWITH_QT=ON`**

:::note
OpenCV compiled with Qt support enables advanced highgui interface, see **[Qt New Functions](https://docs.opencv.org/4.5.0/dc/d46/group__highgui__qt.html)** for details.
:::

**OpenGL**

Cmake 选项为 **`-DWITH_OPENGL=ON`**

## Deep learning neural networks inference backends and options (dnn module)

**`protobuf`** 为默认开启

Cmake 选项为 **`-DWITH_PROTOBUF=ON`**、**`-DBUILD_PROTOBUF=ON`**

**`TBB`**

- 安装依赖 `sudo apt-get install libtbb2 libtbb-dev`

Cmake 选项为 **`-DWITH_TBB=ON`**


## 整理一份常用的 CMake 配置
- **依赖安装**

``` bash
sudo apt-get install build-essential gcc g++
sudo apt-get install cmake git pkg-config 
```

- `GUI` 相关的依赖

``` bash
sudo apt-get install libgtk-3-dev
sudo apt-get install qtbase5-dev
```

- `Camera(v4l) & Media` 相关的依赖

``` bash
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev
sudo apt-get install libgstreamer1.0-dev  libgstreamer-plugins-base1.0-dev 
```

- `Image` 相关的依赖，各种图片格式

``` bash
sudo apt-get install libpng-dev libjpeg-dev libopenexr-dev libtiff-dev libwebp-dev
```

- `libjasper-dev`

``` bash
sudo add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
sudo apt update
sudo apt install libjasper-dev
```

- **`TBB`**
``` bash
sudo apt-get install libtbb2 libtbb-dev
```

- **设置代理**

```
export http_proxy=http://127.0.0.1:10808
export https_proxy=http://127.0.0.1:10808
```

- **`CMake` 选项**

``` bash
cmake -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DOPENCV_GENERATE_PKGCONFIG=YES \
    -DWITH_QT=ON \
    -DWITH_OPENGL=ON \
    -DWITH_TBB=ON \
    -DBUILD_opencv_python2=OFF \
    -DBUILD_opencv_python3=OFF \
    -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib-4.5.0/modules \
    ../opencv-4.5.0
```

## 参考
- [OpenCV configuration options reference](https://docs.opencv.org/4.5.0/db/d05/tutorial_config_reference.html)