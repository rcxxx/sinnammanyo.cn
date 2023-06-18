---
id: ros-traditional_point_cloud_object_segmentation
title: Traditional Point Cloud Object Segmentation
sidebar_label: Segmentation
---

## 传统方法实现点云分割
参考 **`Fast range image-based segmentation of sparse 3D laser scans for online operation` [(pdf)](https://www.researchgate.net/publication/311758635_Fast_range_image-based_segmentation_of_sparse_3D_laser_scans_for_online_operation)** 中的方法在 `range image` 中实现目标分割

## 复现过程
- 构建 `range image`

文中直接从 `velodyne` 传感器的数据构建 `range image`，但是我能使用的数据是已经转换为 `sensor_msgs/pointcloud2` 的点云数据，所以这里要从点云数据中构建 `range image`

首先要知道所使用传感器的一些参数，测试代数据包所使用的传感器是 **[`velodyne HDL-64E`](https://velodynelidar.com/products/hdl-64e/)** ，在官网上有给出该传感器的一些参数（如下图），后续将会用到

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/velodyne-HDL-64E-parameters.png)

将点云数据转换到 `range image` 的方法参考了这个仓库中的方法
- **`GitHub repository` 📦 :[versatran01/cloud2range](https://github.com/versatran01/cloud2range)**

需要用到的参数如下
``` cpp
/*-- range image shape 4500x64 --*/
int n_beams_        = 64;
int range_img_cols_ = 4500;   // 360 / 0.08

double min_range_   = 0.0;
double max_range_   = 120.0;

double min_angle_   = -(26.9*0.5);  // -1/2 Vertical FOV
double max_angle_   =  (26.9*0.5);  //  1/2 Vertical FOV

double angular_resolution_h_ = 0.08;   // azimuth
double angular_resolution_v_ = 0.4;    // altitude
```

通过点云中每个点的位置信息 $(x,y,z)$ 可以求出每个点相对于传感器的位置在 `range image` 中的对应点

- 计算点 $p$ 的 $arctan(\frac{z}{\sqrt{x^2 + y^2}})$ 可以求出 $p$ 相对于 xy 平面的角度，即垂直方向的角度
- 点 $p$ 的 $arctan(\frac{y}{x})$ 则表示水平方向的角度，这里要把角度转换到 $[0, 2\pi]$ 之间，即当 $y<0$ 的时 $angle = angle + 2\pi$
- 计算点到传感器的距离 $range = \sqrt{x^2 + y^2 + z^2}$

## clustering

参考文章开源的代码进行聚类，仓库地址
- **`GitHub repository` 📦 :[PRBonn/depth_clustering](https://github.com/PRBonn/depth_clustering)**

这篇文章使用的方法是使用广度优先搜索（BFS）来对一个 `range image` 进行聚类，在源码中，这个 `range image` 以 `OpenCV Mat` 的形式表示，也就是一个二维的矩阵，文中的方法一次遍历就能完成聚类，相当于遍历了所有点云的点，复杂度为 $O(N)$

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/pictures/fig-03.png)

- 具体实现为源码中 **[`src/image_labelers/linear_image_labeler.h`](https://github.com/PRBonn/depth_clustering/blob/master/src/image_labelers/linear_image_labeler.h)** 中的 **`ComputeLabels()`** 函数

遍历时进行 `BFS` 操作，先将起始点填入队列中，如果这个队列非空，那么就创建一个队首点的复制，然后执行 `pop` 操作，判断这个点的 `N4领域（即上下左右相邻的四个点）` 上的点是否与当前点满足一定的条件，并将满足条件的相邻点添加到队列中，如此循环，当循环结束时图像中对应的点已经打上了相同的标签，遍历过程会跳过已经被标记过的点，并更新标签，如此在遍历结束时，整张图像都已经被打上了不同的标签，即完成了聚类

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/pictures/fig-04.png)

- 具体实现为源码中 **[`src/image_labelers/linear_image_labeler.h`](https://github.com/PRBonn/depth_clustering/blob/master/src/image_labelers/linear_image_labeler.h)** 中的 **`LabelOneComponent()`** 函数

判断相邻点是否满足的条件在文中有详细说明，通过手动设定一个阈值，并通过传感器返回的深度值，计算出两个点所连直线与第一个点的传感器光束直线的夹角，看这个夹角是否满足阈值

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/pictures/fig-01.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/pictures/fig-02.png)

- 具体实现为源码中 **[`src/image_labelers/diff_helpers/line_dist_diff.cpp`](https://github.com/PRBonn/depth_clustering/blob/master/src/image_labelers/diff_helpers/line_dist_diff.cpp)** 中的 **`LineDistDiff::DiffAt()`** 函数


## references

