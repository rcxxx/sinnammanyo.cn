---
id: ros-subscriber
title: ROS订阅者 Subscriber 的编程实现
sidebar_label: Subscriber
---

## 什么是订阅者（Subscriber）
订阅 `subscribe` 是指订阅者 `subscriber` 节点想要接收来自某个话题的数据

为了可以正常执行订阅的操作，订阅者 `subscriber` 节点必须在节点管理器上注册自己想要订阅的话题等多种信息，并从节点管理器接收来自发布者 `publisher` 的数据信息

:::info 💡
同一个话题可以有多个发布者也可以有多个订阅者，但一般情况下发布者只有一个，而订阅者是一个或者多个
:::

订阅者的工作过程如下

1. 向节点管理器注册节点

2. 订阅话题，告诉管理器要接收哪个话题的数据

3. 节点运行时就接收数据，然后去处理数据（一般来说会注册回调函数，当有数据的时候就在回调函数中处理）

## 如何实现一个 Subscriber
- 初始化 ROS 节点

- 订阅需要的话题

- 循环等待话题消息，接收到消息后进入回调函数

- 在回调函数中完成消息处理

## 编程实现
创建功能包

在学习 `publisher` 时已经创建了 `learning_topic` 功能包

## 源文件

在 `learning_topic` 功能包的 `src` 目录中新建 `pose_subscriber.cpp` 文件

编辑 `pose_subscriber.cpp`，添加如下内容

``` cpp
/**
 * @file pose_subscriber.cpp
 * @brief 该例程将订阅 turtle1/pose 话题，消息类型 turtlesim::Pose
 * @date 2021-01-02 
 */

#include <ros/ros.h>
#include <turtlesim/Pose.h>

// 接收到订阅的消息后，会进入消息回调函数
void poseCallback(const turtlesim::Pose::ConstPtr& msg){
    // 将接收到的消息打印出来
    ROS_INFO("Turtle pose: x%0.6f, y:%0.6f", msg->x, masg->y);
}

int main(int argc, char **argv) {
    // ROS 节点初始化
    ros::init(argc, argv, "pose_subscriber");

    // 创建节点句柄
    ros::NodeHandle node;

    // 创建一个 subscriber
    // 订阅名为 /turtle1/pose 的 topic
    // 注册回调函数 poseCallback
    ros::Subscriber pose_sub = node.subscribe("/turtle1/pose", 10, poseCallback);

    // 循环等待回调函数
    ros::spin();
    
    return 0;
}
```

### 配置 `CMakeList.txt`

配置 `CMakeList.txt` 中的编译规则，在文件中的 `build` 部分添加以下内容

``` CMakeList
add_executable(pose_subscriber src/pose_subscriber.cpp)
target_link_libraries(pose_subscriber ${catkin_LIBRARIES})
```

### 编译

``` bash
cd ~/catkin_ws/
catkin_make
source ~/catkin_ws/devel/setup.bash
```

### 运行

``` bash
cd ~/catkin_ws/
roscore
```

开启一个新的终端，启动小海龟仿真节点

``` bash
rosrun turtlesim turtlesim_node
```

同样开启一个新的终端，执行 `velocity_publisher` 发布命令

``` bash
cd ~/catkin_ws/
source devel/setup.bash
rosrun learning_topic velocity_publisher
```

可以看到小海龟按照一定的角度与速度运动

再开启一个新终端，执行 `pose_subscriber` 订阅消息

``` bash
cd ~/catkin_ws/
source devel/setup.bash
rosrun learning_topic pose_subscriber
```

可以看到在此终端中随着海龟的运动，海龟的位置信息在不断更新

## 参考
- [ROS入门](https://blog.csdn.net/jiejiemcu/article/details/105349782)
- [古月居的视频教程](https://www.bilibili.com/video/BV1zt411G7Vn?p=5)