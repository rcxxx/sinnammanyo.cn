---
id: ros-topic-话题消息定义与使用
title: ROS 话题消息的定义与使用
sidebar_label: 自定义话题消息
---

## 如何自定义话题消息
### 创建 msg 文件，新建一个 `/msg` 文件夹

``` msg title="Person.msg"
string name
unit8 sex
unit8 age

unit8 ubknown = 8
unit8 male = 1
unit8 female = 2
```

### 在 package.xml 中添加功能包依赖
- `<build_depend>message_generation</build_depend>`

- `<exec_depend>message_runtime</exec_depend>`

### 在 CMakeLists.txt 中添加编译选项
- 在 find_package() 中添加 `message_generation`
- 在 **`Declare ROS messages, services and actions`** 部分添加
  - `add_message_files(FILES Person.msg)`
  - `generate_messages(DEPENDENCIES std_msgs)`

- 在 catkin_package() 中添加 `message_runtime`
  - 取消掉 `CATKIN_DEPENDS` 部分的注释

### 编译生成语言相关文件 
在 `catkin_ws/` 根目录下

``` bash
catkin_make
```

- 编译时可能报错，提示

``` bash
  File "/opt/ros/melodic/lib/python2.7/dist-packages/genmsg/template_tools.py", line 39, in <module>
    import em
ImportError: No module named em
    ···
    ···
  File "/opt/ros/melodic/lib/python2.7/dist-packages/genpy/message.py", line 48, in <module>
    import yaml
ImportError: No module named yaml
```

按照提示安装相关依赖
- `python -m pip install empy`

- `pip install pyyaml`

再次编译后成功

---

## 创建 Publisher & Subscriber

在 `learning_topic` 功能包的 `src` 目录中新建 `person_publisher.cpp` 和 `person_subscriber.cpp` 文件

编辑内容如下

``` cpp title="person_publisher.cpp"
/**
 * @file person_publisher.cpp
 * @brief 该例程将发布 /person_info 话题，自定义消息类型 learning_topic::Person
 */

#include <ros/ros.h>
#include "learning_topic/Person.h"

int main(int argc, char **argv) {
    // ROS 节点初始化
    ros::init(argc, argv, "person_publisher");

    // 创建节点句柄
    ros::NodeHandle node;

    // 创建一个 publisher 注册
    // 发布名为 /person_info 的 topic
    // learning_topic::Person
    // 队列长度是 10
    ros::Publisher person_info_pub = node.advertise<learning_topic::Person>("/person_info", 10);

    // 设置循环的频率
    ros::Rate loop_rate(1);

    int count = 0;
    while (ros::ok())
    {
        // 初始化 geometry_msgs::Twist 类型的消息
        learning_topic::Person person_msg;
        person_msg.name = "Tom";
        person_msg.age = 18;
        person_msg.sex = learning_topic::Person::male;

        // 发布消息
        person_info_pub.publish(person_msg);
        ROS_INFO("Publsh Person Info: name:%s  age:%d  sex:%d", person_msg.name.c_str(), person_msg.age, person_msg.sex);

        // 按照循环频率延时
        loop_rate.sleep();
    }
    
    return 0;
}
```

``` cpp title="person_subscriber.cpp"
/**
 * @file person_subscriber.cpp
 * @brief 该例程将订阅 /person_info 话题，自定义消息类型 learning_topic::Person
 */

#include <ros/ros.h>
#include "learning_topic/Person.h"

// 接收到订阅的消息后，会进入消息回调函数

void personInfoCallback(const learning_topic::Person::ConstPtr& msg){
    // 将接收到的消息打印出来
    ROS_INFO("Subcribe Person Info: name:%s  age:%d  sex:%d", msg->name.c_str(), msg->age, msg->sex);
}

int main(int argc, char **argv) {
    // ROS 节点初始化
    ros::init(argc, argv, "person_subscriber");

    // 创建节点句柄
    ros::NodeHandle node;

    // 创建一个 subscriber
    // 订阅名为 /person_info 的 topic
    // 注册回调函数 personInfoCallback
    ros::Subscriber person_info_sub = node.subscribe("/person_info", 10, personInfoCallback);

    // 循环等待回调函数
    ros::spin();
    
    return 0;
}
```

## 配置 `CMakeList.txt`
编辑 `learning_topic/CMakeList.txt` ，在文件中的 `build` 部分添加以下内容

``` makefile 
add_executable(person_publisher src/person_publisher.cpp)
target_link_libraries(person_publisher ${catkin_LIBRARIES})
add_dependencies(person_publisher ${PROJECT_NAME}_generate_messages_cpp)

add_executable(person_subscriber src/person_subscriber.cpp)
target_link_libraries(person_subscriber ${catkin_LIBRARIES})
add_dependencies(person_subscriber ${PROJECT_NAME}_generate_messages_cpp)
```

-自定义的话题消息编译时会生成一些动态文件，需要用 `add_dependencies()` 来进行链接

## 编译功能包

``` bash
cd ~/catkin_ws/
catkin_make
source ~/catkin_ws/devel/setup.bash
```

## 运行
开启三个终端分别运行

``` bash title="终端 1 roscore"
cd ~/catkin_ws/
roscore
```

``` bash title="终端 2 person_publisher"
cd ~/catkin_ws/
source devel/setup.bash
rosrun learning_topic person_publisher
```

``` bash title="终端 3 person_subscriber"
cd ~/catkin_ws/
source devel/setup.bash
rosrun learning_topic person_subscriber
```

效果如下
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B6%88%E6%81%AF.png)

可以看到自定义的消息结构成功的发布和订阅
