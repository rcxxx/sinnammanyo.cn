---
id: cmake-learn
title: CMake learning note
sidebar_label: 入门
---

## About-CMake
- [官网](https://cmake.org/)

## 一个最简单的 `CMakeLists.txt`

``` cmake
cmake_minimum_required(VERSION 3.10) #支持的 CMake 最低版本

project(helloworld VERSION 1.0) #项目名称及自定义版本号
add_executable(hello_cmake main.cpp) #生成的可执行文件
```

- 编写 `main.cpp` 

``` cpp
#include <iostream>

int main(){
    std::cout<<"Hello World!"<<std::endl;

    return 0;
}
```

```
mkdir build && cd build
cmake ..
make
./hello_cmake
```

终端输出

```
Hello World!
```

## 如何编写 `CMakeLists.txt`

- 指定 cmake 版本

``` cmake
# cmake_minimum_required(VERSION {V})
cmake_minimum_required(VERSION 3.10)
```

- 指定项目名以及版本号

```
# project({name} VERSION { } LANGUAGES { })
project(hello_world VERSION 1.0 LANGUAGES CXX)
```


- 指定 C++ 标准

```
# set(CMAKE_CXX_STANDARD { })
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```

- 添加以及链接库（library）

```
add_library(<name> [STATIC | SHARED | MODULE]
            [EXCLUDE_FROM_ALL]
            [<source>...])
```

- 添加子目录

```
add_subdirectory(source_dir [binary_dir] [EXCLUDE_FROM_ALL])
```

- 

```

```

## reference
- **[CMake 如何入门？](https://www.zhihu.com/question/58949190)**
- **[cmake-examples](https://github.com/ttroy50/cmake-examples/tree/master/01-basic/A-hello-cmake)**
- **[CMake简明教程(中文版)](https://zhuanlan.zhihu.com/p/492932151)**
- **[如何使用CMake构建c++项目](https://zhuanlan.zhihu.com/p/472025535)**