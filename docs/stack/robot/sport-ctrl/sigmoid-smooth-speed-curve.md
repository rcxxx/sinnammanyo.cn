---
id: sport-ctrl-smooth-speed-curve
title: Sigmoid 函数平滑速度曲线
sidebar_label: Sigmoid speed curve
---

## 前言
最近在做运动控制相关的项目，由于轮式倒立摆的结构限制，在启动和停止时难免出现点头的动作，分析后觉得可能会影响其他传感器，于是想解决这个问题，于是在网上看到一个一杯啤酒加减速很少摇晃的 GIF

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/Rn2emu.gif)

- 图片来源 [https://www.eet-china.com/mp/a40736.html](https://www.eet-china.com/mp/a40736.html) 侵删

于是想使用类似的方式来进行加减速的控制，减少运行时的晃动，原文中的方案能够复现，但是涉及到多个参数，较难调整，后续看到了使用 sigmoid 函数来进行速度控制的方法

## Sigmoid 函数

之前在学习机器学习时，接触过 Sigmoid 激活函数，其函数图像是中心对称的平滑曲线

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/sigmoid.png)

其函数定义为

$$
\sigma(x) =\frac{1}{(1 + e^{(-x)})}
$$

通过调整不同的参数，可以调整函数的曲线，调整其平滑程度，取值范围等

**1. Y 方向拉伸，即修改最大值**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/change_a.png)

**2. Y 方向平移**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/change_c.png)

**3. X 方向平移**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/change_b.png)

**4. X 方向拉伸**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/planning/sigmoid-speed-curve/change_k.png)

## 应用



## 参考
- **[一文教你快速搞懂速度曲线规划之S形曲线（超详细+图文+推导+附件代码）](https://blog.csdn.net/u010632165/article/details/104951091)**
- **[电机控制 | S曲线加减速](https://www.cnblogs.com/Tuple-Joe/p/13533324.html)**
- **[机器学习中的数学——激活函数（一）：Sigmoid函数](https://blog.csdn.net/hy592070616/article/details/120617176)**
- **[Home — Matplotlib for C++ documentation](https://matplotlib-cpp.readthedocs.io/en/latest/index.html)**

