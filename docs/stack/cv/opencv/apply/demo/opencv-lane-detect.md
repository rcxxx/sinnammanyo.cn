---
id: opencv-lane-detect
title: OpenCV 实现简单车道线检测
sidebar_label: 车道线检测
---

## 读取图像
直接读取图像并转为灰度图像

``` cpp
Mat gray_img;
cvtColor(src_img, gray_img, COLOR_BGR2GRAY);

imshow("src_img", src_img);
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-src.png)

## 提取边缘
**使用 `Canny` 边缘检测方法提取边缘**

由于车道线与周围路边有很鲜明的对比，属于强边缘，可以适当提高 canny 算子的阈值，排除掉大部分的干扰

``` cpp
Mat edge_img;
Canny(gray_img, edge_img, 250, 400);    // 设置较高的阈值 只保留较强的边缘

imshow("edge_img", edge_img);
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-edge.png)

## 设置 ROI 区域

当车辆行驶在道路中时，车道线所处的位置其实是相对固定的，所以可以对图像设置感兴趣区域，进一步排除噪声

设置图像掩码 `mask` 区域

``` cpp
// 设置梯形区域的四个顶点，用来填充图像
vector<vector<Point> > roi_points{{Point(0, src_img.rows),
                Point(src_img.cols * 0.5 - src_img.cols * 0.02, src_img.rows * 0.5),
                Point(src_img.cols * 0.5 + src_img.cols * 0.02,src_img.rows * 0.5),
                Point(src_img.cols, src_img.rows)}};
Mat mask_img = Mat::zeros(Size(src_img.cols, src_img.rows), CV_8UC1);
fillPoly(mask_img, roi_points, Scalar(255));    // 多边形区域填充

imshow("mask_img", mask_img);
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-mask.png)

将 `mask` 与 边缘图进行与运算，得出 ROI 区域的边缘图像

``` cpp
Mat bin_img;
bitwise_and(edge_img, mask_img, bin_img);

imshow("bin_img", bin_img);
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-bin.png)


## 霍夫变换提取直线
对最终得出的边缘图像进行累计概率霍夫变换

设置参数，并绘制提取出的直线

``` cpp
vector<Vec4f> plines;
HoughLinesP(bin_img, plines, 6, CV_PI / 180.0, 160, 40, 25);
for (size_t i = 0; i < plines.size(); i++) {
    Vec4f hline = plines[i];
    line(src_img, Point(hline[0], hline[1]), Point(hline[2], hline[3]), Scalar(100, 200, 0), 2, 8, 0);
}
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-HoughLinesP.png)

关于 `HoughLinesP()` 参数的设置，可以看这里


提取出直线后，需要对这些直线进行分组，区分它们是左边的车道线还是右边的车道线

- `HoughLinesP()` 函数会返回一个有 4 个元素的 `vector` ，分别存储一条线段的两个端点的坐标值 $x_{1} , y_{1} ,x_{2} , y_{2}$

斜率定义为 

$$
slope = \frac{y_{2} - y_{1}}{x_{2} - x_{1}}
$$

在图象中，斜率为负的直线为左车道线，斜率为正的则为右车道线

并且两侧车道线的斜率都会在一定的范围内，可以通过设置这个范围，过滤掉一些不想要的直线

``` cpp
vector<Point> left_ps;
vector<Point> right_ps;

vector<Vec4f> plines;
HoughLinesP(bin_img, plines, 6, CV_PI / 180.0, 160, 40, 25);
for (size_t i = 0; i < plines.size(); i++) {
    Vec4f hline = plines[i];
    float slope = (hline[3] - hline[1]) / (hline[2] - hline[0]);
    if (fabs(slope) < 0.5){continue;}

    if (slope < 0){
        left_ps.push_back(Point(hline[0], hline[1]));
        left_ps.push_back(Point(hline[2], hline[3]));
    } else {
        right_ps.push_back(Point(hline[0], hline[1]));
        right_ps.push_back(Point(hline[2], hline[3]));
    }
}
```

绘制分组好的左右两侧线段的特征点，得到如下效果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-left-right-line.png)

图中将左侧的特征点标记为蓝色，右侧的特征点标记为橙色

## 最小二乘法拟合直线
上一步我们已经分组好了左右两侧车道线的特征点，并存放在两个 `vector` 中，对这些特征点进行最小二乘拟合，分别得出最优的两侧车道线

我们可以直接使用 OpenCV 自带的函数 `cv::fitLine()` 实现最小二乘法拟合

``` cpp
Vec4f left_line = fitline(src_img, left_ps);        // 自定义拟合函数，将拟合出的直线保存为线段
Vec4f right_line = fitline(src_img, right_ps);

line(dst_img, Point(left_line[0], left_line[1]), Point(left_line[2], left_line[3]), Scalar(255, 100, 0), 4, 8, 0);
line(dst_img, Point(right_line[0], right_line[1]), Point(right_line[2], right_line[3]), Scalar(0, 100, 255), 4, 8, 0);
```

拟合效果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-fitline.png)

已经很好的检测出了车道线的位置，

- 拟合直线函数
``` cpp
Vec4f fitline(Mat &src_img, vector<Point> points){
    Vec4f fit_line;
    fitLine(points, fit_line, DIST_L2, 0, 1e-2, 1e-2);

    Point p_0;
    p_0.x = fit_line[2];
    p_0.y = fit_line[3];
    cout << p_0.x <<endl <<p_0.y;
    double slope = fit_line[1] / fit_line[0];


    Point p_1, p_2;
    if (slope < 0)
    {
        p_1.x = 0;
        p_1.y = slope * (p_1.x - p_0.x) + p_0.y;
        p_2.x = src_img.cols * 0.5 - src_img.cols * 0.02;
        p_2.y = slope * (p_2.x - p_0.x) + p_0.y;
    }
    else
    {
        p_1.x = src_img.cols * 0.5 + src_img.cols * 0.02;
        p_1.y = slope * (p_1.x - p_0.x) + p_0.y;
        p_2.x = src_img.cols;
        p_2.y = slope * (p_2.x - p_0.x) + p_0.y;
    }

    Vec4f line;
    line[0] = p_1.x;
    line[1] = p_1.y;
    line[2] = p_2.x;
    line[3] = p_2.y;

    return line;
}
```

再将得到的左右两条车道线中间的区域做填充，对当前的车道就做出来很好的检测

``` cpp
Mat dst_mask_img;
src_img.copyTo(dst_mask_img);

vector<vector<Point> > dst_mask_points{{Point(left_line[0], left_line[1]),Point(left_line[2], left_line[3]),Point(right_line[0], right_line[1]),Point(right_line[2], right_line[3])}};
fillPoly(dst_mask_img, dst_mask_points, Scalar(50, 255, 50));

addWeighted(src_img, 0.7, dst_mask_img, 0.3, 0, dst_img );
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/%E8%BD%A6%E9%81%93%E7%BA%BF%E6%A3%80%E6%B5%8B/lane-poly.png)


## 总结
当前只是最较为单一的情况做出来车道线检测
- 用霍夫线变换检测直线的情况对弯道并不适用
  - 将方案改进为拟合曲线，应该能对弯道有用

- ROI 区域根据相机相对于车辆的位置不同还需要调整
- 仅仅进行车道线的检测还远远不够，之后还需要加入对路上的汽车进行目标检测，并计算安全距离等，道路上的各种交通信号标识也需要检测



## 参考
- **[Lane Detection with Deep Learning (Part 1)](https://towardsdatascience.com/lane-detection-with-deep-learning-part-1-9e096f3320b7)**
- **[Simple Lane Detection with OpenCV](https://medium.com/@mrhwick/simple-lane-detection-with-opencv-bfeb6ae54ec0)**
- **[Finding Lane Lines — Simple Pipeline For Lane Detection.](https://towardsdatascience.com/finding-lane-lines-simple-pipeline-for-lane-detection-d02b62e7572b)**
- **[Building a lane detection system using Python 3 and OpenCV](https://medium.com/@galen.ballew/opencv-lanedetection-419361364fc0)**
- **[Tutorial: Build a lane detector](https://towardsdatascience.com/tutorial-build-a-lane-detector-679fd8953132)**