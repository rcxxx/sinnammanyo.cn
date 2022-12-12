---
id: ros2-install
title: Ubuntu18.04 安装 ROS2
sidebar_label: install
---

### 安装

设置编码方式

``` bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 
export LANG=en_US.UTF-8
```

添加软件源

``` bash
sudo apt update && sudo apt install curl gnupg lsb-release 

sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

这时候会出现
- `curl: (7) Failed to connect to raw.githubusercontent.com port 443: 拒绝连接`

需要将 `raw.githubusercontent.com` 的IP地址和域名添加到 `hosts` 文件中
- 参照 **[解决”Failed to connect to raw.githubusercontent.com“报错](https://www.guyuehome.com/37844)** 中的方法解决

之后继续获取秘钥

``` bash
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

安装 `ROS2-eloquent`
- 这里与古月居教程不一样是因为使用的 `Ubuntu` 版本原因，根据自己的 `Ubuntu` 需要修改命令行

``` bash
sudo apt update
sudo apt install ros-eloquent-desktop
```

更新环境变量
``` bash
source /opt/ros/eloquent/setup.bash
```

如果不想每次启动终端都要重新设置一次的话，可以将命令写入 `~/.bashrc` 文件中，使用ROS需要频繁的打开终端
```
echo " source /opt/ros/eloquent/setup.bash" >> ~/.bashrc
```

安装完成

### 测试
测试ROS经典的小乌龟之前，先来测试一下 `Hello World`

启动一个终端，启动 `talker` 节点

```
ros2 run demo_nodes_cpp talker
```

启动另一个终端，启动 `listener` 节点

```
ros2 run demo_nodes_cpp listener
```

测试结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros2/ros2-talker-listener.png)

成功运行对应节点

接下来试试小海龟

```
ros2 run turtlesim turtlesim_node 
ros2 run turtlesim turtle_teleop_key 
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/ros2/ros2-turtlesim-demo.png)

小海龟也成功跑起来，开始愉快的 `ROS2` 学习

## 参考
- **[【古月居】古月·ROS2入门21讲](https://www.bilibili.com/video/BV16B4y1Q7jQ?p=3&spm_id_from=pageDriver&vd_source=4cca3a7520260c460d94cf70a3f0a5ba)**
- **[解决”Failed to connect to raw.githubusercontent.com“报错](https://www.guyuehome.com/37844)**
- **[Ubuntu18.04安装ros2](https://blog.csdn.net/notfindjob/article/details/123089235)**