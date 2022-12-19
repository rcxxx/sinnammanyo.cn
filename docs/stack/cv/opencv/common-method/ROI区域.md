---
id: opencv-roi
title: 感兴趣区域——ROI
sidebar_label: ROI操作
---
## ROI（region of interest）
roi可以在图像中选定一个范围，从而只对图像的选定范围进行操作，而不影响到区域外的图像
## ROI的使用
roi区域有两种设置方法
1. 使用矩形区域`Rect`标记

``` cpp
Mat src_img;
Rect roi_rect = Rect(x, y, w, h);
Mat roi_img = src_img(roi_rect);
```

2. 指定感兴趣行、列的范围`range`

``` cpp
Mat src_img;
Mat roi_img = src_img(Range(x,x+w, y, y+h));
```

- 示例
通过ROI区域操作图像
``` cpp
#include <opencv2/opencv.hpp>

using namespace cv;

int main()
{
    Mat src_img = Mat::zeros(Size(200, 200), CV_8UC3); // 创建背景
    imshow("src_img", src_img);
    
    Size _s = Size(src_img.cols*0.5, src_img.rows);
    Rect center_rect = Rect(Point(0,0), _s);
    Mat roi_img = src_img(center_rect); // 设置 roi 区域
    
    Mat withe_img(Mat(_s, CV_8UC3, Scalar(255,255,255))); // 创建白色图
    withe_img.copyTo(roi_img); // 将白色图拷贝到 roi 中
    
    imshow("src_img_2", src_img);
    waitKey(0);
    
    return 0;
}
```
效果如下

![](https://raw.githubusercontent.com/rcxxx/my-img/main/img/screenshot/opencv-roi.png
)

使用`ROI`操作只对图像的左边进行操作，而不影响到右边的部分

## 使用`mask`
