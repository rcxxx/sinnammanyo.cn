---
id: ros-rosbag-play-rviz
title: 在 rviz 中可视化 rosbag 数据 
sidebar_label: rosbag可视化
---
### About rosbag
- **[rosbag - ROS Wiki](http://wiki.ros.org/rosbag)**
- **[ROS 机器人技术 - rosbag 详细使用教程！](https://zhuanlan.zhihu.com/p/151444739)**

### About rviz
- **[rviz - ROS Wiki](http://wiki.ros.org/rviz)**
- **[ROS技术点滴 —— Rviz三维可视化平台](https://zhuanlan.zhihu.com/p/48356612)**

## 可视化 rosbag 中的数据
- 启动 `roscore`

打开一个新的终端，激活对应环境
``` shell
roscore
```

- 打开 `rviz`

打开一个新的终端，激活对应环境

``` shell
rosrun rviz rviz
```
  - 直接 `rviz` 也可以打开

`rviz` 的界面长这样

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/rosrun-rviz.png)

准备一个 `rosbag` 数据包
- **[如何获取 `.bag` 文件](https://zhuanlan.zhihu.com/p/104875159)**

- `rosbag paly`

打开一个新的终端，激活对应环境

``` shell
rosbag play <filename>.bag -l
```
  - 其中 `-l` 表示循环播放

终端中会打印出这个 `.bag` 的相关信息

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/rosbag-play.png)

然后就可以在 `rviz` 中执行可视化

- 选择 `Global Options -> Fixed Frame` 选择为对应的话题消息
- 左下 `Add` 中选择 `By topic` 可以找到自己对应想可视化的数据
  - 这里选择可视化 `PointCloud2` 的点云数据数据

效果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/rosrun-rviz-point-cloud.png)

- 打开 `PointCloud2` 的下拉菜单，可以设置一些可视化的属性
  - 这里将 `Style` 设置为 `point` ，`Size(Pixels)` 设置为 `1.5`后效果如下
  
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/rosrun-rviz-point-cloud-set-stylr.png)

### 补充
不同的 `bag` 包中可能会有不一样的消息类型，开启可视化的时候注意设置对应的话题，不然可能出现 `Error` 的情况，无法可视化

---

## reference

- **[rosbag - ROS Wiki](http://wiki.ros.org/rosbag)**
- **[rviz - ROS Wiki](http://wiki.ros.org/rviz)**
- **[ROS下，安装rviz并用rviz播放bag文件实现并可视化](https://blog.csdn.net/qq_42585108/article/details/104853192)**
- **[Rosbag使用：bag文件可视化实现](https://blog.csdn.net/Walliam_Wu/article/details/108802822)**
- **[机器人操作系统ROS从入门到放弃(八):使用rviz进行可视化](https://www.jianshu.com/p/acbe1b8631dc)**
- **[ROS 中 rosbag 相关命令总结](https://www.jianshu.com/p/6dd2c08d688e)**
- **[ROS 机器人技术 - rosbag 详细使用教程！](https://zhuanlan.zhihu.com/p/151444739)**
- **[ROS技术点滴 —— Rviz三维可视化平台](https://zhuanlan.zhihu.com/p/48356612)**
- **[从零开始做自动驾驶定位(二): 数据集](https://zhuanlan.zhihu.com/p/104875159)**