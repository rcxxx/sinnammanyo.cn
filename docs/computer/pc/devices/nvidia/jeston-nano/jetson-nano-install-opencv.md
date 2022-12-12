---
id: jetson-nano-install-opencv
title: Jetson Nano Install OpenCV
sidebar_label: Install OpenCV
---

## 选择 `OpenCV` 版本

官网下载的 `Jetson Nano` 的镜像已经默认安装了 `OpenCV4.1.1` 的版本

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-opencv4.1.1.png)
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-opencv4.1.1-libs.png)

但是我想安装新版本的 `OpenCV` ，于是准备先删除当前的版本

``` shell
sudo find / -iname "*opencv*"
```

查看下系统中与 `OpenCV` 相关的文件，我们需要删除的是 **`/usr/include/opencv4/`** 以及 **`/usr/lib/aarch64-linux-gnu/`** 中的诸多文件

- **删除默认版本 `OpenCV`**
``` shell
sudo apt-get purge libopencv*
sudo apt autoremove
sudo apt-get update
```

之后再 `pkg-config opencv4 --modversion`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-opencv4.1.1-no-package-found.png)

`OpenCV4.1.1` 就卸载掉了

## 安装 `OpenCV`

- 如果图方便，可以直接到 **https://github.com/Qengineering/Jetson-Nano-image** 下载一个已经预装了各种环境的镜像刷到 `Jetson Nano` 里，非常的省事儿

**当然也可以自己折腾👉**

### 安装 `dphys-swapfile` 工具确保编译通过

参照 **[Install OpenCV 4.5 on Jetson Nano](https://qengineering.eu/install-opencv-4.5-on-jetson-nano.html)** 中的内容，安装 `OpenCV4.5` 需要超过 `4GB` 的运行内存和超过 `2GB` 的交换空间

- 检查内存
``` shell
free -m
```
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-free-m.png)

我们需要增加一些交换空间的内存，可以使用 `dphys-swapfile` 来获取临时的空间

- 安装 `dphys-swapfile`
``` shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install dphys-swapfile
```

- 修改 `/sbin/dphys-swapfile`
``` shell
sudo vim /sbin/dphys-swapfile
```
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-sbin-dphys-swapfile.png)

- 修改 `/etc/dphys-swapfile`
``` shell
sudo vim /etc/dphys-swapfile
```
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-etc-dphys-swapfile.png)

修改之后
``` shell
sudo reboot
```

重启后再次 `free -m`，内存空间已经变化
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-free-m-02.png)

### 开始编译
- **[Qengineering/Install-OpenCV-Jetson-Nano](https://github.com/Qengineering/Install-OpenCV-Jetson-Nano)** 仓库中已经编写了脚本，能够很方便的安装，但是想要开启 `Qt5 GUI` 的支持，还是得自己编译一下

#### 安装依赖
- 显示 `CUDA` 的位置

``` shell
sudo sh -c "echo '/usr/local/cuda/lib64' >> /etc/ld.so.conf.d/nvidia-tegra.conf"
sudo ldconfig
```

- 安装依赖，需要的依赖超级多，不过为了编译顺利通过，慢慢装

``` shell
sudo apt-get install build-essential cmake git unzip pkg-config zlib1g-dev
sudo apt-get install libjpeg-dev libjpeg8-dev libjpeg-turbo8-dev
sudo apt-get install libpng-dev libtiff-dev libglew-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev
sudo apt-get install libgtk2.0-dev libgtk-3-dev libcanberra-gtk*
sudo apt-get install python-dev python-numpy python-pip
sudo apt-get install python3-dev python3-numpy python3-pip
sudo apt-get install libxvidcore-dev libx264-dev libgtk-3-dev
sudo apt-get install libtbb2 libtbb-dev libdc1394-22-dev libxine2-dev
sudo apt-get install gstreamer1.0-tools libgstreamer-plugins-base1.0-dev
sudo apt-get install libgstreamer-plugins-good1.0-dev
sudo apt-get install libv4l-dev v4l-utils v4l2ucp qv4l2
sudo apt-get install libtesseract-dev libxine2-dev libpostproc-dev
sudo apt-get install libavresample-dev libvorbis-dev
sudo apt-get install libfaac-dev libmp3lame-dev libtheora-dev
sudo apt-get install libopencore-amrnb-dev libopencore-amrwb-dev
sudo apt-get install libopenblas-dev libatlas-base-dev libblas-dev
sudo apt-get install liblapack-dev liblapacke-dev libeigen3-dev gfortran
sudo apt-get install libhdf5-dev libprotobuf-dev protobuf-compiler
sudo apt-get install libgoogle-glog-dev libgflags-dev
```

:::info 👻
建议写个脚本来安装依赖，一项项装比较麻烦
:::

- 安装 `Qt5` ，前面这么麻烦就是为了这个

``` shell
sudo apt-get install qt5-default
```

#### 下载 `OpenCV`
``` shell
cd ~/workspace/
mkdir opencv && cd opencv # 个人分类习惯
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.5.4.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.5.4.zip
unzip opencv.zip
unzip opencv_contrib.zip
```

#### 编译

``` shell
cd opencv4.5.4
mkdir build
cd build
```

- 配置 `cmake` 选项，这里会从网上下载一些包，保持网络畅通，必要时开一下代理

``` shell
cmake -D CMAKE_BUILD_TYPE=RELEASE \
-D CMAKE_INSTALL_PREFIX=/usr \
-D OPENCV_EXTRA_MODULES_PATH=~/workspace/opencv/opencv_contrib-4.5.4/modules \
-D EIGEN_INCLUDE_PATH=/usr/include/eigen3 \
-D WITH_OPENCL=OFF \
-D WITH_CUDA=ON \
-D CUDA_ARCH_BIN=5.3 \
-D CUDA_ARCH_PTX="" \
-D WITH_CUDNN=ON \
-D WITH_CUBLAS=ON \
-D ENABLE_FAST_MATH=ON \
-D CUDA_FAST_MATH=ON \
-D OPENCV_DNN_CUDA=ON \
-D ENABLE_NEON=ON \
-D WITH_QT=OFF \
-D WITH_OPENMP=ON \
-D BUILD_TIFF=ON \
-D WITH_FFMPEG=ON \
-D WITH_GSTREAMER=ON \
-D WITH_TBB=ON \
-D BUILD_TBB=ON \
-D BUILD_TESTS=OFF \
-D WITH_EIGEN=ON \
-D WITH_V4L=ON \
-D WITH_LIBV4L=ON \
-D OPENCV_ENABLE_NONFREE=ON \
-D INSTALL_C_EXAMPLES=OFF \
-D INSTALL_PYTHON_EXAMPLES=OFF \
-D BUILD_opencv_python3=TRUE \
-D OPENCV_GENERATE_PKGCONFIG=ON \
-D BUILD_EXAMPLES=OFF ..
```

`cmake` 选项配置完成后

- 编译

```
make -j4
```

接下来是漫长的编译时间，大概需要3个小时左右，编译完成后

```
sudo make install
sudo ldconfig
```

### 还原之前修改的内存空间

```
sudo /etc/init.d/dphys-swapfile stop
sudo apt-get remove --purge dphys-swapfile
reboot
```

重启后， `OpenCV` 安装完成



## 参考

- **[Install OpenCV 4.5 on Jetson Nano](https://qengineering.eu/install-opencv-4.5-on-jetson-nano.html)**
- **[Qengineering/Install-OpenCV-Jetson-Nano](https://github.com/Qengineering/Install-OpenCV-Jetson-Nano)**
- **[Jetson Nano DNN image](https://github.com/Qengineering/Jetson-Nano-image)**
- **[mdegans/nano_build_opencv](https://github.com/mdegans/nano_build_opencv)**
- **[ubuntu下查询OpenCV版本以及路径](https://www.cnblogs.com/qilai/p/13663484.html)**