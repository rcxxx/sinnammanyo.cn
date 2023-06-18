---
id: ros-bag-to-pcd
title: ROS 中解析 bag 包中的点云数据
sidebar_label: extract pcd file in bag
---

## ROS bag
- 有关 `rosbag` 的介绍 —— **[rosbag - ROS Wiki](http://wiki.ros.org/rosbag/)**
- 有关 `rosbag` 的使用 —— **[rosbag 详细使用教程](https://zhuanlan.zhihu.com/p/151444739)**

## rosbag 解析点云数据
先查看一下需要解析的 `bag包` 中的数据

``` shell
rosbag info <filename>.bag
```

我用来测试的 `bag包` 输出如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/ros-info-bag.png)

在 `topics` 部分可以找到 `velodyne_points     108 msgs    : sensor_msgs/PointCloud2` 这样的 `PointCloud2` 消息类型，就是我们想要解析的点云数据

解析命令如下
``` shell
rosrun pcl_ros bag_to_pcd <filename>.bag <topics/> <save_path>
```
- `<filename>.bag` 你的 `bag包` 名字
- `<topics/>` 需要解析的节点名称
- `<save_path>` 存储路径

例如我自己的解析命令为

``` shell
rosrun pcl_ros bag_to_pcd test.bag velodyne_points test_pcd
```

解析完成后终端显示如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/bag_to_pcd.png)

可以使用 `pcl_viewer` 查看 `pcd` 数据

``` shell
pcl_viewer <filename>.pcd
```

预览结果
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/pcl_viewer.png)

## reference
- **[[学习点云]ROS中解析bag包中的点云文件到pcd格式](https://blog.csdn.net/KYJL888/article/details/103118213?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242)**
- **[ROS 机器人技术 - rosbag 详细使用教程！](https://zhuanlan.zhihu.com/p/151444739)**
