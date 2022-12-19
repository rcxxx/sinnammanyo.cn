---
id: intel-realsense-start
title: Intel Realsense D435i Start
sidebar_label: D435i
---

## Intel Realsense D435i 相机基本使用

- **[Intel® RealSense™ Depth Camera D435i](https://www.intelrealsense.com/depth-camera-d435i/)**
- **[产品手册](https://www.intelrealsense.com/wp-content/uploads/2020/06/Intel-RealSense-D400-Series-Datasheet-June-2020.pdf)**
- **[GitHub--IntelRealSense/librealsense](https://github.com/IntelRealSense/librealsense)**

### 安装SDK
- **[Linux Distribution](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md)**

## Examples

### `rs2::frame` to `cv::Mat`

- **[`rs-imshow.cpp`](https://github.com/IntelRealSense/librealsense/blob/master/wrappers/opencv/imshow/rs-imshow.cpp)**

``` cpp
rs2::frame depth;

// Query frame size (width and height)
const int w = depth.as<rs2::video_frame>().get_width();
const int h = depth.as<rs2::video_frame>().get_height();

// Create OpenCV matrix of size (w,h) from the colorized depth data
cv::Mat image(Size(w, h), CV_8UC3, (void*)depth.get_data(), cv::Mat::AUTO_STEP);
// new-style cast
cv::Mat image(Size(w, h), CV_8UC3, const_cast<void*>(depth.get_data()), cv::Mat::AUTO_STEP);
```

## 参考

- **[Intel® RealSense™ Depth Camera D435i](https://www.intelrealsense.com/depth-camera-d435i/)**
- **[产品手册](https://www.intelrealsense.com/wp-content/uploads/2020/06/Intel-RealSense-D400-Series-Datasheet-June-2020.pdf)**
- **[GitHub--IntelRealSense/librealsense](https://github.com/IntelRealSense/librealsense)**
- **[Linux Distribution](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md)**
- **[rs-imshow.cpp](https://github.com/IntelRealSense/librealsense/blob/master/wrappers/opencv/imshow/rs-imshow.cpp)**