--- 
id: ros-pcl-topic
title: ROS 发布和订阅 pcl 话题消息
sidebar_label: pcl pub&sub topic
---

## PCL 在 ros 中的数据类型
- [PCL Overview —— ROS Wiki](http://wiki.ros.org/pcl/Overview)

先在此链接中对所需要的数据类型稍作了解


### 创建功能包
在 `ros` 工作空间的 `src/` 目录下创建一个功能包 `pcl_test`

该功能包有四个依赖项 `pcl_conversions`、`pcl_ros`、`roscpp`、`sensor_msgs` 

``` shell
cd src/
catkin_create_pkg pcl_test pcl_conversions pcl_ros roscpp sensor_msgs
```

- 编译功能包

``` shell
cd ..
catkin_make
```

### `subscriber` 实现
#### 创建节点

在 `src/pcl_test/src` 目录下创建 `pcl_topic.cpp` 文件

- 包含头文件
  
``` cpp
#include <ros/ros.h>
/*---< PCL >---*/
#include <pcl_ros/point_cloud.h>
#include <pcl/point_types.h>
```

我们目的是将接收到底点云数据处理后再发布出去
- 想把点云数据数据在 `rviz` 中可视化，要将要发布的点云数据转换为 `sensor_msgs::PointCloud2` 形式，可视化的时候不会出现警告
- 包含头文件

``` cpp
#include <sensor_msgs/PointCloud2.h>
```

要将 `sensor_msgs::PointCloud2` 转换为 `pcl` 中的点云格式，还需要用到 `pcl_conversions`
- 包含头文件

``` cpp
#include <pcl_conversions/pcl_conversions.h>
```

定义 `publihser` 和 `callback` 回调函数，执行订阅话题之后的操作

``` cpp
ros::Publisher pub;

void callback(const sensor_msgs::PointCloud2ConstPtr& input_msg)
{
  pcl::PCLPointCloud2* point_cloud = new pcl::PCLPointCloud2;
  pcl_conversions::toPCL(*input_msg, *point_cloud);

  // 进行处理
  /*--- code ---*/
  // Publish
  sensor_msgs::PointCloud2 output_msg;
  pcl_conversions::fromPCL(*point_cloud, output_msg);
  pub.publish(output_msg);
  std::cout<<"published  💭💭💭"<<std::endl;
  ROS_INFO("Cloud: width = %d, height = %d\n", output_msg.width, output_msg.height);
}
```
- 这里订阅 `sensor_msgs::PointCloud2` 的消息类型，并转换为 `pcl::PCLPointCloud2` 类型执行处理（假设），再转换为 `sensor_msgs::PointCloud2` 执行发布


``` cpp title="main"
int main(int argc, char** argv){
  ros::init(argc, argv, "pcl_topic");

  ros::NodeHandle nh;

  // 订阅话题，执行回调函数 
  // "velodyne_points" 换为你需要订阅的话题名
  ros::Subscriber sub = nh.subscribe("velodyne_points", 1, callback);
  pub = nh.advertise<sensor_msgs::PointCloud2>("output", 1);

  ros::spin();

  return 0;
}
```

在功能包的 `CMakeLists.txt` 的 `build` 部分加入

``` CMakeLists
add_executable(pcl_topic src/pcl_topic.cpp)
target_link_libraries(pcl_topic ${catkin_LIBRARIES})
```

- 编译功能包

``` shell
catkin_make
```

运行
```
source devel/setup.bash
roscore
rosrun pcl_test pcl_topic
```

然后运行一个相应的 `bag` 包，执行发布

成功订阅话题

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/pcl_topic_sub.png)

在 `rviz` 中可视化

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros/pcl_topic_rviz.png)

<!--
### `publisher` 实现
-->

## reference
- [PCL with ROS using C++ —— turtlebot2-tutorials](https://dabit-industries.github.io/turtlebot2-tutorials/13-ROSPCL.html)
- [PCL Overview —— ROS Wiki](http://wiki.ros.org/pcl/Overview)
- [How to read a point cloud (.pcd) file and send it to a rosbag](https://answers.ros.org/question/325030/how-to-read-a-point-cloud-pcd-file-and-send-it-to-a-rosbag/)
- [How to use a PCL tutorial in ROS —— ROS Wiki](http://wiki.ros.org/pcl/Tutorials)
- [ROS系统学习11---点云数据的发送和接收](https://www.guyuehome.com/25024)
- [ROS与PCL中点云数据之间的转换](https://cloud.tencent.com/developer/article/1692529)
- [如何在ROS中使用PCL—数据格式（1）](https://cloud.tencent.com/developer/article/1477011)
- [在 rviz 中可视化 rosbag 数据](https://sinnammanyo.cn/personal-site/docs/ros/ros-point-cloud/ros-rosbag-play-rviz)
