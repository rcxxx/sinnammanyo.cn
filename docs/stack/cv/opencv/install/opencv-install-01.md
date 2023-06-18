---
id: opencv-install-cpu
title: OpenCV 开发环境配置
sidebar_label: Install-CPU
---

Name | Version |
---------|:--------:|
 System | Ubuntu 20.04.5 LTS
 OpenCV | 4.7.0 |

## OpenCV

- [OpenCV官网](https://opencv.org/)

## Ubuntu20.04从源码编译OpenCV

### 获取 **`OpenCV`** 源码

从官网下载压缩包 

- [**`opencv-4.7.0`**](https://github.com/opencv/opencv/releases/tag/4.7.0)
- [**`opencv_contrib-4.7.0`**](https://github.com/opencv/opencv_contrib/releases/tag/4.7.0)
- [**`opencv_extra-4.7.0`**](https://github.com/opencv/opencv_extra/releases/tag/4.7.0)

下载完成后解压

``` bash
tar zxvf opencv-4.7.0.tar.gz ~/workspace/opencv/4.7.0/
tar zxvf opencv_contrib-4.7.0.tar.gz ~/workspace/opencv/4.7.0/
tar zxvf opencv_extra-4.7.0.tar.gz ~/workspace/opencv/4.7.0/
```

### 安装各种依赖

``` bash
sudo apt-get install \
build-essential \
cmake \
git \
libgtk2.0-dev \
pkg-config \
libavcodec-dev \
libavformat-dev \
libswscale-dev \
libtbb2 \
libtbb-dev \
libjpeg-dev \
libpng-dev \
libtiff-dev \
libdc1394-22 \
libglew-dev \
zlib1g-dev \
libavutil-dev \
libpostproc-dev \
libeigen3-dev \
libopenexr-dev \
libwebp-dev \
libgtk-3-dev \
qtbase5-dev \
libgstreamer1.0-dev \
libgstreamer-plugins-base1.0-dev
```

- **`libjasper-dev`**

``` bash
sudo add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
sudo apt update
sudo apt install libjasper-dev
```

### 编译
新建 `build/` 目录存放编译生成的文件

``` bash
cd ~/workspace/opencv/4.7.0/;mkdir build;cd build
```

- **<Highlight color="#FFA500">[可选]</Highlight>** 配置并生成 `makefile` 过程中会下载一些依赖内容，建议开启网络代理

``` bash
export http_proxy=socks5://127.0.0.1:7890;export https_proxy=socks5://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7890
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
    -DINSTALL_TESTS=ON \
    -DOPENCV_TEST_DATA_PATH=../opencv_extra-4.7.0/testdata \
    -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib-4.7.0/modules \
    ../opencv-4.7.0
```

这里选择不编译 `opencv-python` 包，CPU 版本的 `opencv-python` 直接 pip 安装即可

等待 `makefile` 生成 —— 过程保持网络通畅，会下载一些内容

生成完之后开始编译

``` bash
NUM_CPU=$(nproc)
make -j$(($NUM_CPU - 1))
```

:::info
可以去泡壶茶然后休息一下，看看番，编译速度取决于CPU

[推荐看看这里的视频](https://space.bilibili.com/483818980) —— 不是广告
:::

等待编译完成后

``` bash
sudo make install
```
- 将编译好的 `.so` 文件以及头文件安装到 `/usr/local` 目录下

### 配置环境变量
**`sudo gedit /etc/ld.so.conf.d/opencv.conf`**

- 打开 `opencv.conf` 在其中添加 `/usr/local/lib`

**`sudo gedit /etc/bash.bashrc`**

- 打开 `bash.bashrc` 在最后面添加

``` bash
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig 
export PKG_CONFIG_PATH
```

**`sudo ldconfig`**

- 使配置生效

### 测试
``` bash
cd ~/workspace/opencv/4.7.0/opencv-4.7.0/samples/cpp/example_cmake/
cmake .
make
./opencv_example
```

成功启动摄像头设备并显示 `Hello OpenCV` 字样，安装完成

## 参考

export const Highlight = ({children, color}) => ( <span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: '#fff',
    padding: '0.2rem',
    }}>{children}</span> );