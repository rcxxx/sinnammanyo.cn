---
id: opencv-install-gpu
title: OpenCV开发环境配置
sidebar_label: Install（GPU）
---

## OpenCV


- [OpenCV官网](https://opencv.org/)

## Ubuntu18.04从源码编译OpenCV - 开启GPU支持

配置列表

名称 | 版本 |
---------|:--------:|
 系统版本 | Ubuntu18.04LTS |
 GCC/G++ | 7.5.0 |
 OpenCV | 4.4.0 |
 CUDA | 10.2 |

### 安装前先安装显卡驱动以及CUDA、CUDNN
可以参考这里👉

### 安装各种依赖

``` bash
sudo apt-get install build-essential
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libdc1394-22
```

- **`libjasper-dev`**

``` bash
sudo add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
sudo apt update
sudo apt install libjasper-dev
```

- 一些其他的依赖
``` bash
sudo apt-get install \
libglew-dev \
zlib1g-dev \
libavutil-dev \
libpostproc-dev \
libeigen3-dev
```

### 获取 **`OpenCV`** 源码
通过 `git` 下载

``` bash
cd ~/<my_work_directory>
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git
git clone https://github.com/opencv/opencv_extra.git
```

- 注意这里需要分别将三个仓库中的分支都切换至 `4.4.0`

从官网下载压缩包 <Highlight color="#25c2a0">[推荐]</Highlight>

- [**`opencv-4.4.0`**](https://github.com/opencv/opencv/releases/tag/4.4.0)
- [**`opencv_contrib-4.4.0`**](https://github.com/opencv/opencv_contrib/releases/tag/4.4.0)
- [**`opencv_extra-4.4.0`**](https://github.com/opencv/opencv_extra/releases/tag/4.4.0)

下载完成后解压

``` bash
tar zxvf opencv-4.4.0.tar.gz ~/workspace/
tar zxvf opencv_contrib-4.4.0.tar.gz ~/workspace/
tar zxvf opencv_extra-4.4.0.tar.gz ~/workspace/
```

### 编译
新建 `build/` 目录存放编译生成的文件

``` bash
cd ~/workspace/opencv-4.4.0/
mkdir build
cd build
```

配置 `cmake` 参数，修改 `opencv_extra` 和 `opencv_contrib` 的路径

``` bash
cmake -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DBUILD_PNG=OFF \
    -DBUILD_TIFF=OFF \
    -DBUILD_TBB=OFF \
    -DBUILD_JPEG=OFF \
    -DBUILD_JASPER=OFF \
    -DBUILD_ZLIB=OFF \
    -DBUILD_EXAMPLES=ON \
    -DBUILD_opencv_python2=OFF \
    -DBUILD_opencv_python3=ON \
    -DBUILD_opencv_cudacodec=OFF \
    -DWITH_OPENCL=OFF \
    -DWITH_OPENMP=OFF \
    -DWITH_FFMPEG=ON \
    -DWITH_GSTREAMER=OFF \
    -DWITH_GSTREAMER_0_10=OFF \
    -DWITH_CUDA=ON \
    -DOPENCV_DNN_CUDA=ON \
    -DENABLE_FAST_MATH=1 \
    -DCUDA_FAST_MATH=1 \
    -DWITH_CUBLAS=1 \
    -DWITH_TBB=ON \
    -DWITH_GTK=ON \
    -DWITH_VTK=OFF \
    -DWITH_1394=OFF \
    -DWITH_OPENEXR=OFF \
    -DCUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda-10.2 \
    -DCUDA_ARCH_PTX="" \
    -DINSTALL_C_EXAMPLES=OFF \
    -DINSTALL_TESTS=ON \
    -DOPENCV_TEST_DATA_PATH=../../opencv_extra-4.4.0/testdata \
    -DOPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-4.4.0/modules \
    -DOPENCV_GENERATE_PKGCONFIG=YES \
    ..
```

等待 `makefile` 生成 —— 过程保持网络通畅，会下载一些内容

生成完之后开始编译

``` bash
NUM_CPU=$(nproc)
make -j$(($NUM_CPU - 1))
```

:::info
这里编译时间更久，你可以叫几个朋友一起喝茶 (= =!)
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

## 参考
官网tutorial [Building OpenCV for Tegra with CUDA](https://docs.opencv.org/4.4.0/d6/d15/tutorial_building_tegra_cuda.html)

export const Highlight = ({children, color}) => ( <span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: '#fff',
    padding: '0.2rem',
    }}>{children}</span> );