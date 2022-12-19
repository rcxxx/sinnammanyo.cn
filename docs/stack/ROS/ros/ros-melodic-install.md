---
id: ros-install
title: Ubuntu18.04 安装 ROS melodic
sidebar_label: install
---

## 用Anaconda创建一个python的虚拟环境

ros 所依赖的 python 版本为 python2.7

``` bash
conda create -n ros-melodic python=2.7
source activate ros-melodic
```

## 安装 ros melodic
将 ros 添加至软件源

``` bash
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```

添加秘钥

``` bash
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

更新软件源

``` bash
sudo apt update
```

安装 ros

``` bash
sudo apt install ros-melodic-desktop-full
```

设置环境变量

``` bash
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
- 如果你只是想更改当前终端的环境，则可以
  
  ``` bash
  source /opt/ros/melodic/setup.bash
  ```
- 这里会将所开启的虚拟环境关闭掉，重启开启
  ``` bash
  source activate ros-melodic
  ```

安装依赖和软件包

``` bash
sudo apt install python-rosdep python-rosinstall python-rosinstall-generator python-wstool build-essential
```

初始化 rosdep

``` bash
sudo apt install python-rosdep
```

- 安装完成后，执行初始化
  
``` bash
sudo rosdep init
rosdep update
```

:::info :computer:
这个过程建议开启科学上网
:::

## 验证
运行

### 启动 ros master
``` bash
roscore
```

### 启动小海龟仿真器
开启一个新的终端，激活对应环境后开启仿真器
``` bash
source activate ros-melodic
rosrun turtlesim turtlesim_node
```
会出现一只小海龟在茫茫的大海里:turtle:

### 启动小海龟控制节点
同样开启一个新的终端，激活对应环境
``` bash
source activate ros-melodic
rosrun turtlesim turtle_teleop_key
```

根据终端中的提示，可以用上下左右控制小海龟的移动

如果一切正常的话， ros 就安装成功了

## 参考
- **[ros官方wiki](http://wiki.ros.org/melodic/Installation/Ubuntu)**
- **[古月居的视频教程](https://www.bilibili.com/video/BV1zt411G7Vn?p=5)**