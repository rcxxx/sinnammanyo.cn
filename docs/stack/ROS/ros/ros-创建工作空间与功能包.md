---
id: ros-workspace-and-pkg
title: 工作空间与功能包的创建
sidebar_label: 工作空间 & 功能包
---

## 工作空间
一个ROS工作空间的结构如下

``` bash
<workspace>
    ├── build
    │   └── ...
    ├── devel
    │   └── ...
    ├── install
    │   └── ...
    └── src
        └── ...
```

- `src/` 代码空间，用来放置功能包、功能包配置等文件
- `build/` 放置编译过程中产生的中间文件
- `devel/` 放置编译生成的可执行文件、库、脚本等，最终编译后的文件都在其中运行
- `install/` 安装空间，类似于安装目录，与 `devel/` 有重复，在 `ROS 1` 中不常用

## 创建工作空间

``` bash
mkdir -p ~/catkin_ws/src
```
- `catkin_ws` 名称是自己定义的，但 `/src` 是必须要创建的目录

进入目录并初始化工作空间

``` bash
cd ~/catkin_ws/src
catkin_init_workspace
```

现在工作空间已经初始化成功，但还是一个空的空间，还需要对工作空间进行编译

进入工作空间根目录进行编译

``` bash
cd ~/catkin_ws/
catkin_make
```
- 这里可能出现一个问题，使用 `Anaconda` 创建的虚拟环境时，安装 `ROS` 的时候可能 `catkin_pkg` 是没有安装的，导致编译的时候报错
  - `pip install catkin_pkg` 后重新编译即可

生成安装空间 `/install`

``` bash
catkin_make install
```
- 在 `ROS 1` 中 `/install` 目录与 `devel/` 目录是有一定重复的，不常用

## 创建功能包
创建功能包的命令

`catkin_create_pkg <package_name> [depend1] [depend2] [depend2]`
- `<package_name>` 为功能包的名称

- `[depend]` 为依赖的项

创建一个 `test_pkg`

``` bash
cd ~/catkin_ws/src
catkin_create_pkg test_pkg std_msgs roscpp rospy
```

编译功能包

``` bash
cd ~/catkin_ws/
catkin_make
```

``` bash
source ~/catkin_ws/devel/setup.bash
echo $ROS_PACKAGE_PATH
```

## 参考
- [古月居的视频教程](https://www.bilibili.com/video/BV1zt411G7Vn?p=5)