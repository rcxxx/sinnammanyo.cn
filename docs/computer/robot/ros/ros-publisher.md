---
id: ros-publisher
title: ROS发布者 Publisher 的编程实现
sidebar_label: Publisher
---

## 什么是发布者 （Publisher）
发布 `publish` 是指将数据发布到某个话题中

为了可以正常执行发布操作。发布者 `publisher` 必须在节点管理器上注册自己的话题等多种信息

`publisher` 的工作过程如下

1. 向节点管理器注册节点

2. 告诉管理器要向哪个话题发布数据

3. 节点运行时采集数据，然后发布到这个话题

## 如何实现一个 Publisher
- 初始化 ROS 节点

- 向 `ROS Master` 注册节点信息，包括发布的话题名和话题中的消息类型

- 创建消息数据

- 按照一定频率循环发布消息


## 编程实现

创建功能包

``` bash
cd ~/catkin_ws/src
catkin_create_pkg learning_topic roscpp rospy std_msgs geometry_msgs turtlesim
```

### 源文件

在 `learning_topic` 功能包的 `src` 目录中新建 `velocity_publisher.cpp` 文件

编辑 `velocity_publisher.cpp`，添加如下内容

``` cpp
/**
 * @file velocity_publisher.cpp
 * @brief 该例程将发布 turtle1/cmd_vel 话题，消息类型 geometry_msgs::Twist
 */

#include <ros/ros.h>
#include <geometry_msgs/Twist.h>

int main(int argc, char **argv) {
    // ROS 节点初始化
    ros::init(argc, argv, "velocity_publisher")

    // 创建节点句柄
    ros::NodeHandle node;

    // 创建一个 publisher 注册
    // 发布名为 /turtle1/cmd_vel 的 topic
    // 消息类型为 geometry_msgs::Twist
    // 队列长度是 10
    ros::Publisher turtle_vel_pub = node.advertise<geometry_msgs::Twist>("/turtle1/cmd_vel"，10)

    // 设置循环的频率
    ros::Rate loop_rate(10);

    int count = 0;
    while (ros::ok())
    {
        // 初始化 geometry_msgs::Twist 类型的消息
        geometry_msgs::Twist vel_msg;
        vel_msg.linear.x = 0.5;
        vel_msg.angular.z = 0.2;

        // 发布消息
        turtle_vel_pub.publish(vel_msg);
        ROS_INFO("Publsh turtle velocity command[%0.2f m/s, %0.2f rad/s]", vel_msg.linear.x, vel_msg.angular.z)

        // 按照循环频率延时
        loop_rate.sleep();
    }
    
    return 0;
}
```

### 配置 `CMakeList.txt`

配置 `CMakeList.txt` 中的编译规则，在文件中的 `build` 部分添加以下内容

:::note 💡
`CMakeList.txt` 文件中有很详细的注释，仔细阅读能了解编译是如何实现的
:::

将 `velocity_publisher.cpp` 编译成可执行文件

``` CMakeList
add_executable(velocity_publisher src/velocity_publisher.cpp)
```

将可执行文件与一些库进行链接

``` CMakeList
target_link_libraries(velocity_publisher ${catkin_LIBRARIES})
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

## 参考
- [ROS入门](https://blog.csdn.net/jiejiemcu/article/details/105349782)
- [古月居的视频教程](https://www.bilibili.com/video/BV1zt411G7Vn?p=5)
