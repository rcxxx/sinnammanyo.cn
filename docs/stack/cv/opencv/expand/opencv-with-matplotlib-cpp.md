---
id: opencv-with-matplotlib-cpp
title: 在 C++ 中使用 matplotlib 可视化 OpenCV 图像
sidebar_label: matplotlib 可视化
---

## 安装 matplotlib-cpp
- **[lava/matplotlib-cpp](https://github.com/lava/matplotlib-cpp)**

> Extremely simple yet powerful header-only C++ plotting library built on the popular matplotlib

配置过程可参考
- [安装 matplotlib-cpp](https://sinnammanyo.cn/stack/programming/py/package/python-matplotlib#安装-matplotlib-cpp)

## C++ OpenCV 中使用 matplotlib-cpp

- 显示单张图片

``` cpp
#include <opencv2/opencv.hpp>
#include "matplotlibcpp.h"

namespace plt = matplotlibcpp;

int main() {
    cv::Mat src_img = cv::Mat(200, 400, CV_8UC3);
    cv::cvtColor(src_img, src_img, cv::COLOR_BGR2RGB);
    src_img.setTo(cv::Scalar(0, 200, 200));

    plt::figure();
    plt::imshow(src_img.data, src_img.rows, src_img.cols, 3);
    plt::show();

    return 0;
}
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/opencv/expand/opencv-with-matplotlib-cpp/opencv-with-matplotlib-cpp-imshow.png)


- 使用 `subplot` 显示多张图片

``` cpp
#include <iostream>
#include <opencv2/opencv.hpp>
#include "matplotlibcpp.h"

namespace plt = matplotlibcpp;

int main() {
//    cv::Mat src_img = cv::imread("/mnt/c/Users/rcxxx/Pictures/wallpaper/other-2.png");
    cv::Mat src_img = cv::Mat(200, 400, CV_8UC3);
    cv::cvtColor(src_img, src_img, cv::COLOR_BGR2RGB);
    src_img.setTo(cv::Scalar(0, 200, 200));

    plt::figure();
    plt::subplot(1,2,1);
    plt::imshow(src_img.data, src_img.rows, src_img.cols, 3);

    plt::subplot(1,2,2);
    src_img.setTo(cv::Scalar(200, 0, 200));
    plt::imshow(src_img.data, src_img.rows, src_img.cols, 3);

    plt::tight_layout();
    plt::show();

    return 0;
}
```

直接运行，编译没有报错，但是程序直接结束了

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/opencv/expand/opencv-with-matplotlib-cpp/opencv-with-matplotlib-cpp-imshow-subplot-exit.png)

Debug 时发现问题出在 `matplotlibcpp.h` 中

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/opencv/expand/opencv-with-matplotlib-cpp/opencv-with-matplotlib-cpp-imshow-subplot-exit-debug.png)

将三行 `PyFloat_FromDouble` 修改为 `PyLong_FromDouble`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/opencv/expand/opencv-with-matplotlib-cpp/opencv-with-matplotlib-cpp-imshow-subplot-exit-float2long.png)

然后重新执行

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/opencv/expand/opencv-with-matplotlib-cpp/opencv-with-matplotlib-cpp-imshow-subplot.png)

## 参考

- **[lava/matplotlib-cpp](https://github.com/lava/matplotlib-cpp)**
