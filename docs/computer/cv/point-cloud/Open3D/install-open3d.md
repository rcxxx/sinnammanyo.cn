---
id: open3d-install
title: 从源码编译 Open3D
sidebar_label: 安装
---

## About-Open3D
- [官网](http://www.open3d.org/)
- [Open3D-Gtihub](https://github.com/intel-isl/Open3D)
- [Open3D (C++ API) Documentation](http://www.open3d.org/docs/release/cpp_api/index.html)

## 从源码编译

### 获取源码

``` shell
git clone --recursive https://github.com/intel-isl/Open3D
```

`Open3D` 中包含了很多第三方库，可以手动更新这些子模块

``` shell
git submodule update --init --recursive
```

### 安装依赖
需要 `root` 权限运行目录下的一个安装脚本

``` shell
sudo su
util/install_deps_ubuntu.sh
```

### 编译
如果需要编译 `python` 绑定，则先激活对应的虚拟环境
  - 如果不需要可以通过 `-DBUILD_PYTHON_MODULE=OFF` 关闭
 
``` shell
mkdir build && cd build
```

- `cmake` [配置列表](http://www.open3d.org/docs/release/compilation.html#compilation-options)

如果只想保持默认，就不需要配置

``` shell
cmake ..
```

如果提示 `cmake` 版本过低，可以到 [`cmake download`](https://cmake.org/download/) 下载合适的版本

`cmake` 配置完成后

- 开始编译，编译过程中会克隆很多的第三方库，最好先配置一下 git 的代理，不然编译很难完成
  - [git配置代理](https://blog.csdn.net/xiaxinkai/article/details/112973262)

``` shell
make -j$(nproc-2)
```
  - 不用拉满全部的线程来编译，留两个线程来翻翻文档

编译完成后

``` shell
sudo make install
```

### 测试

- 测试用例 `test-visualizer.cpp`

``` cpp
#include <iostream>
#include <memory>
#include <thread>
#include <open3d/Open3D.h>

int main(int argc, char * argv[]) {
    std::cout << "Hello, Open3D!! " << std::endl;

    open3d::utility::SetVerbosityLevel(open3d::utility::VerbosityLevel::Debug);

    auto pcd = open3d::io::CreatePointCloudFromFile(argv[1]);
    
    // 1. test downsample
    auto downsampled = pcd->VoxelDownSample(0.05);
    {
        open3d::utility::ScopeTimer timer("FPFH estimation with Radius 0.25");
        open3d::pipelines::registration::ComputeFPFHFeature(*downsampled, open3d::geometry::KDTreeSearchParamRadius(0.25));
    }
    // 2. 估计点云的法向量
    {
        open3d::utility::ScopeTimer timer("Normal estimation with KNN20");
        for (int i = 0; i < 20; i++){
            downsampled->EstimateNormals(open3d::geometry::KDTreeSearchParamKNN(20));
        }
    }
    std::cout << downsampled->normals_[0] << std::endl;
    std::cout << downsampled->normals_[10] << std::endl;
    {
        open3d::utility::ScopeTimer timer("Normal estimation with Radius 0.01666");
        for(int i=0; i<20; i++){
            downsampled->EstimateNormals(open3d::geometry::KDTreeSearchParamRadius(0.01666));
        }
    }
    std::cout << downsampled->normals_[0] << std::endl;
    std::cout << downsampled->normals_[10] << std::endl;

    open3d::visualization::DrawGeometries({downsampled}, "TestPCD", 1920, 1080);

    
    return 0;
}
```

  - `CMakeLists.txt`
  ``` cmake
  cmake_minimum_required(VERSION 2.8)
  project(open3d_test)

  set(CMAKE_CXX_STANDARD 11)

  find_package( Open3D  REQUIRED)

  include_directories(${Open3D_INCLUDE_DIRS})
  link_directories(${Open3D_LIBRARY_DIRS})

  add_executable(test-visualizer test-visualizer.cpp)
  target_link_libraries(test-visualizer ${Open3D_LIBRARIES})

  target_include_directories(test-visualizer PUBLIC ${Open3D_INCLUDE_DIRS})
  ```

编译运行后

```
./test-visualizer <workspace-dir>/Open3D/examples/test_data/ICP/cloud_bin_0.pcd
```

结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/open3d/open3d-test.png)

开始愉快的新知识学习 ~~~

### 补充
编译测试Demo的时候，发现缺少了 `C++ fmt` 这个库，于是编译一下这个库
  - [`fmt-github`](https://github.com/fmtlib/fmt)

```
git clone  https://github.com/fmtlib/fmt.git
cd fmt/ && mkdir build && cd build
cmake ..
make
sudo make install 
```
- `fmt` 库会被安装到 `/usr/local/` 目录下

还缺少 `GLFW` 库，同样对这个库进行编译
  - [`glfw-github`](https://github.com/glfw/glfw)

```
git clone https://github.com/glfw/glfw.git
cd glfw/
mkdir glfw-build && cd glfw-build
cmake ..
make
sudo make install
```
- `GLFW` 库会被安装到 `/usr/local/` 目录下

## reference

- [Build from source](http://www.open3d.org/docs/release/compilation.html#system-requirements)
- [Ubuntu18.04 安装Open3D C++与Python版本](https://blog.csdn.net/zpwhust/article/details/106746669)
- [c++ fmt 库安装和使用示例](http://www.bubuko.com/infodetail-2664946.html)
- [Ubuntu上配置编译GLFW并运行实例](https://blog.csdn.net/xyh930929/article/details/83745958)
- [git配置http、socks5代理](https://blog.csdn.net/xiaxinkai/article/details/112973262)