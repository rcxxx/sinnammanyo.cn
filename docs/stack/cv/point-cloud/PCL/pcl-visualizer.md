---
id: pcl-visualizer
title: ''
sidebar_label: PCLVisualizer
---

## PCLVisualizer 示例

`PCLVisualizer` 是 `PCL` 的可视化类，提供了显示法线、绘制形状和多个视口等功能

这里记录一些 `PCLVisualizer` 类的使用

完整的示例代码可以在[**官方文档**](https://pcl-tutorials.readthedocs.io/en/latest/pcl_visualizer.html#)查看

### Visualising a single cloud

在示例中的函数 `pcl::visualization::PCLVisualizer::Ptr simpleVis ()` 定义了可视化单个 `PointXYZ Cloud` 的方法

``` cpp title="simpleVis"
pcl::visualization::PCLVisualizer::Ptr simpleVis (pcl::PointCloud<pcl::PointXYZ>::ConstPtr cloud)
{
    // --------------------------------------------
    // -----Open 3D viewer and add point cloud-----
    // --------------------------------------------
    pcl::visualization::PCLVisualizer::Ptr viewer (new pcl::visualization::PCLVisualizer ("3D Viewer"));
    viewer->setBackgroundColor (0, 0, 0);
    viewer->addPointCloud<pcl::PointXYZ> (cloud, "sample cloud");
    viewer->setPointCloudRenderingProperties (pcl::visualization::PCL_VISUALIZER_POINT_SIZE, 1, "sample cloud");
    viewer->addCoordinateSystem (1.0);
    viewer->initCameraParameters ();
    return (viewer);
}
```

#### 注释

``` cpp
pcl::visualization::PCLVisualizer::Ptr viewer (new pcl::visualization::PCLVisualizer ("3D Viewer"));
```
- 创建对象查看器 `PCLVisualizer` ，并存入智能指针

``` cpp
viewer->setBackgroundColor (0, 0, 0);
```
- 设置查看器的背景为黑色

``` cpp
viewer->addPointCloud<pcl::PointXYZ> (cloud, "sample cloud");
```
- 将点云添加到查看器，并为点云提供一个 `ID` 字符串，该 `ID` 可用于其他方法识别云
  - 可以通过多次调用 `addPointCloud()` 添加多个点云，如果要更新已经显示的点云，则需要调用 `updatePointCloud()`
  - PCL 1.1 版本之前需要先调用 `removePointCloud()` 并提供要更新的点云 `ID`

``` cpp
viewer->setPointCloudRenderingProperties (pcl::visualization::PCL_VISUALIZER_POINT_SIZE, 1, "sample cloud");
```
- 更改渲染属性，此方法可以控制查看器中渲染任何点云的方式
  - 这里 `PCL_VISUALIZER_POINT_SIZE` 表示设置渲染点的大小，具体属性可以在 `pcl::visualization::RenderingProperties` 这个枚举中查看

``` cpp
viewer->addCoordinateSystem (1.0);    
```
- 添加坐标系， `X(R) Y(G) Z(B)` ，可以通过 `scale` 参数控制坐标轴的大小，默认为 `1.0`

``` cpp
viewer->initCameraParameters ();
```
- 设置一些比较方便的相机参数


``` cpp
while (!viewer->wasStopped ())
{
    viewer->spinOnce (100);
    std::this_thread::sleep_for(100ms);
}
```
- 运行循环，每次调用 `spinOnce` 都会给观看者时间来处理事件，使其具有交互性

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-simple.png)

### RGB point clouds
函数 `pcl::visualization::PCLVisualizer::Ptr rgbVis()` 中定义了此方法如何实现

大部分代码没有多大变化

``` cpp
pcl::visualization::PointCloudColorHandlerRGBField<pcl::PointXYZRGB> rgb(cloud);
```
- 更改了点的类型，使用了为 `RGB` 数据提供空间的 `PointXYZRGB`

``` cpp
viewer->addPointCloud<pcl::PointXYZRGB> (cloud, rgb, "sample cloud");
```
- 添加点云时，指定了颜色处理参数

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-RBG.png)

### Custom colours
`rgbVis()` 中为点云提供单一颜色，可以为特定的点云提供自定义的颜色，从而能区分单个点云

示例函数为 `pcl::visualization::PCLVisualizer::Ptr customColourVis()`

大部分代码也没有什么变化

``` cpp
pcl::visualization::PointCloudColorHandlerCustom<pcl::PointXYZ> single_color(cloud, 0, 255, 0);
```
- 设置点云类型时指定了颜色

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-custom.png)

### Normals and other information
函数`pcl::visualization::PCLVisualizer::Ptr normalsVis()` 中展示了如何显示点云的法线

``` cpp
viewer->addPointCloudNormals<pcl::PointXYZRGB, pcl::Normal> (cloud, normals, 10, 0.05, "normals");
```
- 其他代码可参照 `rgbVis()` ，然后绘制了法线
  - 关于绘制法线实现的讲解 [Estimating Surface Normals in a PointCloud](https://pcl-tutorials.readthedocs.io/en/latest/normal_estimation.html#normal-estimation)

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-normals.png)

### Drawing Shapes
函数 `pcl::visualization::PCLVisualizer::Ptr shapesVis()` 定义了向查看器添加形状的方法

``` cpp
viewer->addLine<pcl::PointXYZRGB> ((*cloud)[0], (*cloud)[cloud->size() - 1], "line");
```
- 绘制直线

``` cpp
viewer->addSphere ((*cloud)[0], 0.2, 0.5, 0.5, 0.0, "sphere");
```
- 绘制圆

``` cpp
pcl::ModelCoefficients coeffs;
coeffs.values.push_back (0.0);
coeffs.values.push_back (0.0);
coeffs.values.push_back (1.0);
coeffs.values.push_back (0.0);
viewer->addPlane (coeffs, "plane");
```
- 绘制平面

``` cpp
  coeffs.values.clear ();
  coeffs.values.push_back (0.3);
  coeffs.values.push_back (0.3);
  coeffs.values.push_back (0.0);
  coeffs.values.push_back (0.0);
  coeffs.values.push_back (1.0);
  coeffs.values.push_back (0.0);
  coeffs.values.push_back (5.0);
  viewer->addCone (coeffs, "cone");
```
- 绘制圆锥

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-shapes.png)

### Multiple viewports
函数 `pcl::visualization::PCLVisualizer::Ptr viewportsVis()` 演示了在单独的窗口中绘制多个点云

- 运行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/pcl/visualisation-Viewports.png)

