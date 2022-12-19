---
id: pcl-install
title: 从源码编译 PCL库
sidebar_label: 安装
---

## About-PCL
- [官网](http://www.pointclouds.org)
- [PCL-Gtihub](https://github.com/PointCloudLibrary)

## 从源码编译

### 安装依赖

根据参考文档的 [Dependencies](https://pcl-tutorials.readthedocs.io/en/latest/compiling_pcl_posix.html#dependencies) 部分，可以找到 `PCL` 库所需要依赖的库

``` shell
sudo apt-get install libflann1.9 libflann-dev libboost-all-dev libeigen3-dev libvtk6.3-qt libvtk6.3 libvtk6-dev
```

根据实际版本信息再做出调整

### 获取源码

这里我选择编译 `pcl-1.10.0` 的版本
  - [下载链接](https://github.com/PointCloudLibrary/pcl/releases/tag/pcl-1.10.0)

解压后打开终端进入目录

:::info 💡
- 编译时最好关掉 `conda` 的虚拟环境，可能出现 `xxxxxxx 未定义的引用`
:::

### 编译

``` shell
cd pcl-pcl-1.10.0 && mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make -j4
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl-build.png)

编译完成后

```
sudo make install
```

### 测试

参考 [Ubuntu 16.04 安装 PCL 库并测试](https://zhuanlan.zhihu.com/p/92164338) 中的测试方法

编译 `demo` 后运行

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl-test.png)

可以根据鼠标改变图形的大小，方向

编译安装完成

## reference
- [Compiling PCL from source on POSIX compliant systems](https://pcl-tutorials.readthedocs.io/en/latest/compiling_pcl_posix.html#compiling-pcl-from-source-on-posix-compliant-systems)

- [Ubuntu 16.04 安装 PCL 库并测试](https://zhuanlan.zhihu.com/p/92164338)