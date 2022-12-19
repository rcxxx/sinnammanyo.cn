---
id: rm-2020-engineering
title: RoboMaster2020弹药箱定位
sidebar_label: RM2020工程视觉
---
# 弹药箱自动对位

## 前言
工程夹取弹药箱的操作一般都是让操作手来实现，这样往往需要设计的时候在上层机构中额外增加一个类似倒车影像的设备，还需要操作手大量的练习，如果能将这个流程变成自动化的操作，肯定很酷

## 目标分析
弹药箱为一个棱长为200mm的正方体，一般为黑、白、灰三种颜色组成，表面不反光，无明显特征。如下图所示


比赛过程中弹药箱将被放置于资源岛的凹槽内，如下图所示


这种情况下弹药箱被部分遮挡

## 基本思路
刚开始我是准备用神经网络来实现弹药箱的识别，这需要准备一个有关于弹药箱的数据集，数据集的收集和标注工作量巨大，考虑到弹药箱会被资源岛部分遮挡，会影响到识别效果，并且场景的光线多变，最终没有选择这个方案。

另一个方案是使用深度相机，将相机安装在机器人的固定位置，通过相机返回的深度数据，排除掉太近或是太远的目标，从而实现弹药箱的定位，并制定夹取策略，这个方案相较于第一个方案更容易实现，并且受光线的影响也比较小，最终确定了这个方案。

## 准备工作
### 物资清单
| 名称     | 描述                |
|--------|---------------------|
| 运算设备 | Intel NUC           |
| 深度相机 | Intel realense d435 |
| 通讯模块 | USB转TTL            |

### 操作系统等

| 名称        | 版本           |
|-------------|----------------|
| 操作系统    | Ubuntu18.04LTS |
| 语言        | C++、Python     |
| OpenCV      | 4.1.0          |
| Qt          | 5.12           |
| librealense | librealense2   |

#### 深度相机驱动安装
- 参考[官网文档](https://github.com/IntelRealSense/librealsense/tree/master/doc)

打开终端输入

``` bash

```

## 代码实现
:::info 看这里
篇幅过长有些影响阅读体验，本文尽量只总结部分的处理，完整项目代码[看这边👉](https://github.com/rcxxx/engineering_vision)
:::

### 对齐深度图像
- 参考[官方示例程序](https://github.com/IntelRealSense/librealsense/tree/master/examples/align)

Intel Realense D435相机可以直接获取到相对应的深度图像，需要先将获取到的深度图像与RGB图像进行对齐

``` cpp
//  realsenseD435 拍摄到的帧
frameset frames = pipe.wait_for_frames();

//  获取RGB图
//  对齐图像
frameset aligned_set = align_to.process(frames);
frame color_frames = aligned_set.get_color_frame();

//  帧转化为Mat 尺寸为RGB帧的尺寸
Mat color_img = Mat(Size(color_frames.as<video_frame>().get_width(),color_frames.as<video_frame>().get_height()), 
        CV_8UC3,
        (void*)color_frames.get_data(),
        Mat::AUTO_STEP);

cvtColor(color_img, color_img, COLOR_BGR2RGB);
imshow("color_img", color_img);

depth_frame depth_frames = aligned_set.get_depth_frame();
// 从着色的深度数据中创建OpenCV Mat
frame depth_frames_show = depth_frames.apply_filter(color_map);
Mat depth_img = Mat(Size(depth_frames_show.as<video_frame>().get_width(),depth_frames_show.as<video_frame>().get_height()),
        CV_8UC3,
        (void*)depth_frames_show.get_data(),
        Mat::AUTO_STEP);

imshow("depth_img", depth_img);
```

对其深度图像与RGB图像后效果如下


### 对应深度范围删除前景背景
对齐图像之后可以很方便的获取每个像素的深度值，很容易就可以提取出弹药箱的位置，三维降二维

``` cpp
Mat bin_img = Mat::zeros(color_img.rows, color_img.cols, CV_8UC1);
		
for (int i = 0; i < color_img.cols; ++i) {
    for (int j = 0; j < color_img.rows; ++j) {
        float distance = depth_frames.get_distance(i, j);
        if (min_dist <= distance & distance <= max_dist) {
            bin_img.at<uchar>(j, i) = 255;
        }
        else {
            bin_img.at<uchar>(j, i) = 0;
        }
    }
}
```

将距离过近或过远的点删除后，效果如下



### 定位弹药箱
弹药箱周围的前景与背景都删除掉之后，图象中还会留下1-3个弹药箱，可以使用最小包围矩形来完成弹药箱位置的选取

``` cpp

```

### 夹取策略



### 最终效果