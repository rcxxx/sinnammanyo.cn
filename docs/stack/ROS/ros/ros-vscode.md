---
id: ros-vscode
title: 使用VSCode 进行 ROS 开发
sidebar_label: ROS & VSCode
---

**默认看到这篇教程时已经安装了 `VSCode` 并且配置好了 `ROS-melodic` 环境**

如果没有可以参考下面两个链接
- [安装 VSCode](https://sinnammanyo.cn/VSCode-config/)
- [安装 ROS-melodic](https://sinnammanyo.cn/personal-site/docs/ros/ros-install)

## 安装 ROS 插件

在 VSCode 拓展中搜索 ROS

找到这个拓展
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/vscode-ros.png)

安装完成后重启 VSCode 并打开一个 `catkin_workspace`

此拓展会自动识别出 ROS 的工作空间并且并创建一个 `.vscode` 文件夹

- `.vscode` 的结构如下

``` bash
.vscode/
├── c_cpp_properties.json
└── settings.json
```

- `c_cpp_properties.json` 文件中配置 `C/C++` 相关的路径
- `settings.json` 文件中配置 `Python` 相关的路径

之后就可以在工作空间用 VSCode 进行开发了

## `catkin_make` 

按下快捷键 **`ctrl + shift + b`** 后选择 `catkin_make:build` 可以执行 `catkin_make` 命令

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/vscode-ros-build.png)

## ROS 相关操作

**`ctrl + shift + p`** 后输入 `ROS:` 就能看到 ROS 相关的命令行操作

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/vscode-ros-ROS.png)
