---
id: python-matplotlib
title:  Python 绘图库 matplotlib
sidebar_label: matplotlib
---

> Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. Matplotlib makes easy things easy and hard things possible.
> - **[Matplotlib — Visualization with Python](https://matplotlib.org/)**
> - **[documentation](https://matplotlib.org/stable/index.html)**

## 安装 matplotlib

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="pip"
values={[
    {label: 'pip', value: 'pip'},
    {label: 'conda', value: 'conda'},
]}>
<TabItem value="pip">

``` bash
pip install matplotlib
```

</TabItem>
<TabItem value="conda">

``` bash
conda install -c conda-forge matplotlib
```

</TabItem>
</Tabs>

## 使用


## 安装 matplotlib-cpp
- **[lava/matplotlib-cpp](https://github.com/lava/matplotlib-cpp)**

> Extremely simple yet powerful header-only C++ plotting library built on the popular matplotlib

**下载源码并编译安装**

```
git clone https://github.com/lava/matplotlib-cpp.git
mkdir build && cd build
cmake ..
make
sudo make install
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/py/package/matplotlib/install-matplotlib-cpp.png)

头文件 `matplotlibcpp.h` 被安装到了 `/usr/local/include` 目录中，使用时直接包含

**`CMakeLists.txt` 中需要添加 Python 库路径， Numpy 包路径**

``` bash
cmake_minimum_required(VERSION 3.24)
project(matplotlib_cpp_demo)

set(CMAKE_CXX_STANDARD 17)

# Dependence lib
## Add matplotlib-cpp
set(PYTHON_INCLUDE_DIRS $ENV{HOME}/anaconda3/envs/py310/include/python3.10)
set(NumPy_INCLUDE_DIRS $ENV{HOME}/anaconda3/envs/py310/lib/python3.10/site-packages/numpy/core/include)
set(PYTHON_LIBRARIES $ENV{HOME}/anaconda3/envs/py310/lib/libpython3.10.so)

add_executable(matplotlib_cpp_demo ${PROJECT_SOURCE_DIR}/main.cpp)

# Target include
target_include_directories(matplotlib_cpp_demo PRIVATE
        ${PYTHON_INCLUDE_DIRS}
        ${NumPy_INCLUDE_DIRS}
        )

# Target lib
target_link_libraries(matplotlib_cpp_demo
        ${PYTHON_LIBRARIES}
        )
```
- 路径根据实际情况进行调整

**绘制折线图**

``` cpp
#include "matplotlibcpp.h"

namespace plt = matplotlibcpp;

int main() {
    plt::plot({1,3,2,4});
    plt::show();
}
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/py/package/matplotlib/matplotlib-cpp-plot.png)

配置完成，其他使用方法可以参照其 `README`
- **[Usage](https://github.com/lava/matplotlib-cpp#usage)**

## 参考

- **[Matplotlib — Visualization with Python](https://matplotlib.org/)**
- **[lava/matplotlib-cpp](https://github.com/lava/matplotlib-cpp)**
