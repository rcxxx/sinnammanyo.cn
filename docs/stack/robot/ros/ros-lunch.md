---
id: ros-launch
title: ' '
sidebar_label: Launch
---

## `roslaunch` 的使用
ros 中可以编写启动文件，可以用下面的指令运行

```
roslaunch package_name file.launch
```

### `.launch` 文件
`roslaunch` 所执行的 `.launch` 文件是以 `XML` 格式描述的

这个文件必须含有一个根元素 `<launch>` ，文件中的其他内容都会包含在这个根元素中

``` XML
<launch>
    ......
<launch>
```

`.launch` 文件中可以启动 ROS 节点，其语法与终端运行 ROS 节点相似

``` XML
<node pkg="package-name" type="executable-name" name="node-name" />
```
  - `pkg` 功能包名称
  - `type` 可执行文件名称，即节点
  - `name` 节点运行名称，此参数会覆盖掉 `ros:init` 中定义的名称

除了上述的参数外，还有一些可能会用到的参数
  - `output = "screen"` 将节点的标准输出打印到终端屏幕，默认输出为日志文档
  - `respawn = "true"` 复位属性，该节点停止时，会自动重启，默认为false
  - `required = "true"` 必要节点，当该节点终止时，launch文件中的其他节点也被终止
  - `ns = "namespace"` 命名空间，为节点内的相对名称添加命名空间前缀
  - `args = "arguments"` 节点需要的输入参数

### 使用 `roslaunch` 运行节点

## reference
- [roslaunch - ROS Wiki](http://wiki.ros.org/roslaunch/)
- [roslaunch/Tutorials - ROS Wiki](http://wiki.ros.org/roslaunch/Tutorials)
- [ROS探索总结（五十六）—— launch文件](https://www.guyuehome.com/2195)
- [ROS入门之——浅谈launch](https://blog.csdn.net/weixin_41995979/article/details/81784987)
- [机器人操作系统ROS从入门到放弃(六)：使用roslaunch](https://www.jianshu.com/p/13efab3f67e0)
- [roslaunch 介绍](https://zhuanlan.zhihu.com/p/98663550)