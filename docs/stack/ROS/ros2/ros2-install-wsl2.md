---
id: ros2-install-wsl2
title: Win11 WSL2 Ubuntu20.04 Install ROS2
sidebar_label: install on WSL
---

## WSL2 安装 Ubuntu20.04
- **[Win11 WSL2 Install Ubuntu22.04](https://sinnammanyo.cn/stack/system/win/win11-wsl-ubuntu2204)**

## ROS2 安装
- **[ROS 2 Documentation](http://docs.ros.org/en/humble/index.html)**

### 设置语言环境

Ubuntu20.04 默认的语言环境是 `C.UTF-8` ，是 C 语言默认的语言环境，字符集排序使用的是传统的字典序

``` bash
locale
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/locale-C-UTF-8.png)

ROS2 需要将语言环境设置为 `en-US.UTF-8` ，字符排序使用的是根据 `Unicode` 规范的字符排序

``` bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
locale
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/locale-en_US-UTF-8.png)

### 添加 apt 软件源

- 启用 Ubuntu Universe 存储库

``` bash
sudo apt install software-properties-common
sudo add-apt-repository universe
```

- 添加 ROS2 GPG 密钥

``` bash
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

这里会出现链接不上 `raw.githubusercontent.com` 的问题

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/raw.githubusercontent.png)

到下面的链接，搜索框中输入 `raw.githubusercontent.com` ，会查询出一组地址
- *[https://www.ipaddress.com/](https://www.ipaddress.com/)*

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/raw.githubusercontent-hosts.png)

- 修改 `hosts` 文件，添加上面查到的地址和域名
``` bash
sudo gedit /etc/hosts
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/add-hosts.png)

再次执行

``` bash
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```

- 添加存储库到软件源列表

``` bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### 安装 ROS2

``` bash
sudo apt update
sudo apt upgrade
```

:::note

Ubuntu20.04 不能从源安装 ros-humble，需要从源码编译，如果要安装 Humble，建议升级为 Ubuntu22.04

:::

- 安装 ROS2 Foxy Desktop(ROS, RViz, Demo, tutorials)

``` bash
sudo apt install ros-foxy-desktop python3-argcomplete
```

### 测试例程

- 设置运行环境

``` bash
source /opt/ros/foxy/setup.bash
```

- 执行 C++ 的示例节点 `talker`

``` bash
source /opt/ros/foxy/setup.bash
ros2 run demo_nodes_cpp talker
```

- 再打开一个终端执行 Python 的示例节点 `listener`

``` bash
source /opt/ros/foxy/setup.bash
ros2 run demo_nodes_py listener
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-ros2/talker-listener-test.png)


## 参考
- **[Installation » Ubuntu (Debian)](http://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html#)**