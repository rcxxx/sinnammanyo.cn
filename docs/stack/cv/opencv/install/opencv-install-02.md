---
id: opencv-install-gpu
title: OpenCV 开发环境配置
sidebar_label: Install-GPU
---

Name | Version |
---------|:--------:|
 系统版本 | Ubuntu20.04LTS |
 OpenCV | 4.7.0 |
 CUDA | 12.0 |
 CUDNN | 8.8.1 |

## OpenCV

- [OpenCV官网](https://opencv.org/)


## 从源码编译OpenCV - 开启GPU支持

### 安装前先安装显卡驱动以及CUDA、CUDNN
可以参考这里👉

- [Nvidia GPU Computing Toolkit v12.0](https://developer.nvidia.com/cuda-12-0-0-download-archive)
- CUDNN

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

- **<Highlight color="#FFA500">[可选]</Highlight>** 如果你的 Python 环境使用 `Anaconda` 或者是其他的 python 环境管理应用，记得启用你的虚拟环境，这里会配置 python 包的路径，编译支持 CUDA 的 opencv-python 版本

``` bash
conda activate {env-name}
```

配置 `cmake` 参数，修改 `opencv_extra` 和 `opencv_contrib` 的路径

``` bash
cmake -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=/usr/local \
    -DOPENCV_GENERATE_PKGCONFIG=YES \
    -DWITH_QT=ON \
    -DWITH_OPENGL=ON \
    -DWITH_TBB=ON \
    -DWITH_OPENCL=ON \
    -DWITH_FFMPEG=ON \
    -DWITH_CUDA=ON \
    -DOPENCV_DNN_CUDA=ON \
    -DCUDA_ARCH_BIN=5.0,5.2,6.0,6.1,7.0,7.5,8.0,8.6,8.9,9.0 \
    -DENABLE_FAST_MATH=ON \
    -DCUDA_FAST_MATH=ON \
    -DWITH_CUBLAS=ON \
    -DWITH_GTK=ON \
    -DCUDA_TOOLKIT_ROOT_DIR=/usr/local/cuda \
    -DCUDA_ARCH_PTX="" \
    -DBUILD_WITH_DEBUG_INFO=ON \
    -DBUILD_opencv_python3=ON \
    -DPYTHON3_NUMPY_INCLUDE_DIRS=$(python3 -c "import numpy; print(numpy.get_include())") \
    -DPYTHON3_PACKAGES_PATH=$(python3 -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())") \
    -DPYTHON3_LIBRARY=$(python3 -c "from distutils.sysconfig import get_config_var;from os.path import dirname,join ; print(join(dirname(get_config_var('LIBPC')),get_config_var('LDLIBRARY')))") \
    -DINSTALL_TESTS=ON \
    -DOPENCV_TEST_DATA_PATH=../opencv_extra-4.7.0/testdata \
    -DOPENCV_EXTRA_MODULES_PATH=../opencv_contrib-4.7.0/modules \
    ../opencv-4.7.0
```

配置完成后的部分终端输出内容

``` bash
--   NVIDIA CUDA:                   YES (ver 12.0, CUFFT CUBLAS FAST_MATH)
--     NVIDIA GPU arch:             50 52 60 61 70 75 80 86 89 90
--     NVIDIA PTX archs:
-- 
--   cuDNN:                         YES (ver 8.8.1)
-- 
--   OpenCL:                        YES (no extra features)
--     Include path:                ~/workspace/opencv/4.7.0/opencv-4.7.0/3rdparty/include/opencl/1.2
--     Link libraries:              Dynamic load
-- 
--   Python 3:
--     Interpreter:                 ~/anaconda3/envs/opencv-cuda/bin/python3 (ver 3.8.16)
--     Libraries:                   ~/anaconda3/envs/opencv-cuda/lib/libpython3.8.so (ver 3.8.16)
--     numpy:                       ~/anaconda3/envs/opencv-cuda/lib/python3.8/site-packages/numpy/core/include (ver 1.24.2)
--     install path:                ~/anaconda3/envs/opencv-cuda/lib/python3.8/site-packages/cv2/python-3.8
-- 
--   Python (for build):            ~/anaconda3/envs/opencv-cuda/bin/python3
-- 
--   Java:                          
--     ant:                         NO
--     JNI:                         NO
--     Java wrappers:               NO
--     Java tests:                  NO
-- 
--   Install to:                    /usr/local
-- -----------------------------------------------------------------
-- 
-- Configuring done
-- Generating done
```

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


### 测试 opencv-python 安装

```bash
python -c "import cv2;print(cv2.getBuildInformation())"
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/opencv/cv2test.png)

python 包安装成功

### 配置环境变量
**`sudo gedit /etc/ld.so.conf.d/opencv.conf`**

- 打开 `opencv.conf` 在其中添加 `/usr/local/lib`

**`sudo gedit /etc/bash.bashrc`**

- 打开 `bash.bashrc` 在最后面添加

``` bash
PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig 
export PKG_CONFIG_PATH
```

- **`sudo ldconfig`** 使配置生效


### 测试安装

``` bash
pkg-config --libs opencv4
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/opencv/pkg-config%20--libs-opencv4.png)


安装完成

## 参考
- **[Building OpenCV for Tegra with CUDA](https://docs.opencv.org/4.4.0/d6/d15/tutorial_building_tegra_cuda.html)**
- **[在 Linux 系统中编译安装 OpenCV](https://zhuanlan.zhihu.com/p/392751819)**

export const Highlight = ({children, color}) => ( <span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: '#fff',
    padding: '0.2rem',
    }}>{children}</span> );