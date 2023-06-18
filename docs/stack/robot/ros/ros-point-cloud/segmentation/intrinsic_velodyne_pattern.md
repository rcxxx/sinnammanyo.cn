---
id: ros-intrinsic_velodyne_pattern
title: ' '
sidebar_label: Multi Pass Segemntation
---

## 有关一种传感器固有问题的记录
最近在看一篇文献时文中提到一种传感器的固有模式所带来的问题

- **`paper` 📰 :[Fast Multi-Pass 3D Point Segmentation Based on a Structured MeshGraph for Ground Vehicles](https://www.researchgate.net/publication/328455207_Fast_Multi-Pass_3D_Point_Segmentation_Based_on_a_Structured_Mesh_Graph_for_Ground_Vehicles)**

### `Intrinsic Velodyne Pattern`
**velodyne lidar sensor**

文中所使用的传感器是 **[`velodyne HDL-64E`](https://velodynelidar.com/products/hdl-64e/)** ，在官网上有给出该传感器的一些参数（如下图），后续将会用到

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/velodyne-HDL-64E-parameters.png)

 文中提到，由于传感器的固有模式，传感器需要有不一样的俯仰角，最终传感器获取到的数据会出现下面这样的情况

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/paper-figure-01.png)

这样理解可能不太直观，在 `Rviz` 里查看了一个 `Velodyne` 传感器获取到的点云数据，大概长这样

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/velodyne_bird_eye_view.png)

观察图中的点云我们能够发现，在传感器 $0\degree$ 的位置附近，能够发现点云数据出现了一个锯齿状的断层，我在下面的图中标记出来这部分断层

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/multi_pass_segemntation/velodyne_bird_eye_view_edit.png)

看起来就跟论文中图一样，到此才直观的理解了论文中这部分内容的意思

## reference

- [一种基于激光雷达硬件结构的障碍物聚类分割方法](https://zhuanlan.zhihu.com/p/333670101)
- [Fast Multi-Pass 3D Point Segmentation Based on a Structured Mesh Graph for Ground Vehicles](https://www.researchgate.net/publication/328455207_Fast_Multi-Pass_3D_Point_Segmentation_Based_on_a_Structured_Mesh_Graph_for_Ground_Vehicles)
