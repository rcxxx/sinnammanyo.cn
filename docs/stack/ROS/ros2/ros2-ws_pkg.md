---
id: ros2-ws_pkg
title: ROS2 工作空间与功能包
sidebar_label: 工作空间与功能包
---

- **[ROS 2 Documentation](https://docs.ros.org/en/humble/)**

## 功能空间

一个ROS2工作空间的结构如下

``` bash
<workspace>
    ├── src
    │   └── ...
    ├── install
    │   └── ...
    ├── build
    │   └── ...
    └── log
        └── ...
```

- src 代码空间
- install 安装空间
- build 编译空间
- log 日志空间

### 创建工作空间

**创建文件目录**

``` bash
mkdir -p {path}/{ws_name}/src

# eg
mkdir -p dev_ws/src
```

**克隆教程代码**

```
cd dev_ws/src
git clone https://gitee.com/guyuehome/ros2_21_tutorials.git
```

**安装依赖**

```
sudo apt install -y python3-pip
sudo pip3 install rosdepc
sudo rosdepc init
rosdepc update
cd ..
rosdepc install -i --from-path src --rosdistro humble -y
```

由于我是 `Ubuntu18.04` 版本的系统，安装的是 `ROS2-eloquent` 使用最后一行命令的时候有报错

```
rosdepc install -i --from-path src/ --rosdistro humble -y
...
---------------------------------------------------------------------------
WARNING: given --rosdistro humble but ROS_DISTRO is "eloquent". Ignoring environment.
ERROR: the following packages/stacks could not have their rosdep keys resolved
to system dependencies:
learning_tf: No definition of [tf_transformations] for OS version [bionic]
learning_urdf: No definition of [xacro] for OS version [bionic]

```

修改命令为

```
rosdepc install -i --from-path ~/workspace/ROS_2/dev_ws/src/ --ignore-src -r --rosdistro=eloquent -y
```

执行后 `ERROR` 依然存在，但是出现了以下内容

```
---------------------------------------------------------------------------
ERROR: the following packages/stacks could not have their rosdep keys resolved
to system dependencies:
learning_tf: Cannot locate rosdep definition for [tf_transformations]
learning_urdf: Cannot locate rosdep definition for [xacro]
Continuing to install resolvable dependencies...
#All required rosdeps installed successfully
---------------------------------------------------------------------------

```
- `#All required rosdeps installed successfully`

算是解决了问题 = =

**编译工作空间**

```
sudo apt install python3-colcon-ros
colcon build
```

编译完成后，`ws` 目录下出现对应的目录文件，编译完成之后需要设置一下环境变量

```
source install/local_setup.sh # 仅在当前终端生效
echo " source {path}/dev_ws/install/local_setup.sh" >> ~/.bashrc # 所有终端均生效
```



## 参考
- **[https://www.cnblogs.com/mhbb/p/13221654.html](https://www.cnblogs.com/mhbb/p/13221654.html)**
