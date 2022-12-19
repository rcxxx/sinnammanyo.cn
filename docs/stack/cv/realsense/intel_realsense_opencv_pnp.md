---
id: intel-realsense-intrinsics
title: D435i apriltag Pose Estimation
sidebar_label: apriltag Pose Estimation
---

## 使用 apriltag 标签进行姿态估计

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/realsense/realsense-apriltag-pose.png)

`apriltag` 检测

- **[D435i use apriltag with OpenCV](https://sinnammanyo.cn/personal-site/docs/computer/cv/realsense/intel-realsense-apriltag)**

成功检测 `apriltag` 后，参照 **[#pose-estimation](https://github.com/AprilRobotics/apriltag/wiki/AprilTag-User-Guide#pose-estimation)** 中的方法，可以使用 `apriltag` 提供的 `estimate_tag_pose` 方法进行姿态估计，也可以使用 `OpenCV` 的 `PnP` 求解器，两种方法都需要获得相机的内参

### 获取 D435i 相机内参
根据 `PnP` 求解器的接口
``` cpp
bool solvePnP( InputArray objectPoints, InputArray imagePoints,
                            InputArray cameraMatrix, InputArray distCoeffs,
                            OutputArray rvec, OutputArray tvec,
                            bool useExtrinsicGuess = false, int flags = SOLVEPNP_ITERATIVE );
```
- **https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga549c2075fac14829ff4a58bc931c033d**

我们需要获得相机的内参矩阵 `cameraMatrix` 以及畸变参数 `distCoeffs`

- **[相机内参和外参](https://zhuanlan.zhihu.com/p/144307108)**

相机的内参矩阵可以表示为

$$
\begin{pmatrix}
    f_x & 0 & c_x \\\\
    0 & f_y & c_y \\\\
    0 & 0 & 1 \\\\
\end{pmatrix}
$$

畸变参数 `k1，k2，k3，p1，p2` 分别为径向和切向畸变系数，可以用一个 `1x5` 的矩阵表示

一般来说这两个参数需要通过相机标定来获得，但是 `realsense` 给出了接口来获取不同分辨率参数下的不同相机参数
 
参照 **`Projection in RealSense SDK 2.0`** **[#intrinsic-camera-parameters](https://github.com/IntelRealSense/librealsense/wiki/Projection-in-RealSense-SDK-2.0#intrinsic-camera-parameters)** 可以获得相机的 `fx`，`fy`，`ppx(cx)`，`ppy(cy)` 以及畸变参数 `coeffs`
- **[example](https://github.com/IntelRealSense/librealsense/blob/5e73f7bb906a3cbec8ae43e888f182cc56c18692/examples/sensor-control/api_how_to.h#L209)**
- **[Get Video Stream Intrinsics](https://github.com/IntelRealSense/librealsense/wiki/API-How-To#get-video-stream-intrinsics)**

获取相关的参数后，需要将其转换为 `cv::Mat` 的格式，作为 `PnP` 求解器的输入参数

``` cpp
rs2_intrinsics intrinsics = pipeProfile.get_stream(RS2_STREAM_COLOR).as<rs2::video_stream_profile>().get_intrinsics();
//读取相机内参和畸变矩阵
float fx = static_cast<float>(intrinsics.fx);
float fy = static_cast<float>(intrinsics.fy);
float cx = static_cast<float>(intrinsics.ppx);
float cy = static_cast<float>(intrinsics.ppy);

cv::Mat camera_matrix = (cv::Mat_<float>(3, 3) <<   fx, 0,  cx,
                                                                                                        0,  fy, cy,
                                                                                                        0,  0,  1);

// intrinsics.coeffs[0~4] == 0
cv::Mat distortion_coeffs = (cv::Mat_<float>(1, 5) << 0, 0, 0, 0, 0);
```
- `intrinsics.coeffs` 是一个长度为5的数组，测试后发现里面的数据都是 `0`

获取相机内参之后就可以使用求解器进行姿态估计了

### 姿态估计
- 参考 **[Apriltag使用](https://blog.csdn.net/u010949023/article/details/116597057)**

使用 `PnP` 求解
``` cpp
cv::Mat rvec = cv::Mat::zeros(3, 3, CV_64FC1);
cv::Mat tvec = cv::Mat::zeros(3, 1, CV_64FC1);

vector<cv::Point3f> object_point;
vector<cv::Point2f> image_point;

const float tag_size = 100; // mm apriltag 的尺寸

object_point.clear();
object_point.push_back(cv::Point3f(-tag_size / 2, -tag_size / 2, 0));
object_point.push_back(cv::Point3f(tag_size / 2, -tag_size / 2, 0));
object_point.push_back(cv::Point3f(tag_size / 2, tag_size / 2, 0));
object_point.push_back(cv::Point3f(-tag_size / 2, tag_size / 2, 0));

apriltag_detection_t *det; // apriltag 的检测结果

image_point.clear();
image_point.push_back(cv::Point2d(det->p[0][0], det->p[0][1]));
image_point.push_back(cv::Point2d(det->p[1][0], det->p[1][1]));
image_point.push_back(cv::Point2d(det->p[2][0], det->p[2][1]));
image_point.push_back(cv::Point2d(det->p[3][0], det->p[3][1]));

cv::solvePnP(object_point, image_point, camera_matrix, distortion_coeffs, rvec, tvec, cv::SOLVEPNP_IPPE_SQUARE);
```

通过求解器就得到了能将世界坐标系下的点转换至图像坐标的旋转向量 `rvec` 以及平移向量 `tvec`
- 使用 `cv::SOLVEPNP_IPPE_SQUARE` 的求解方式，用于共面对象点的平面姿态估计，世界坐标的原点应该设置在对象平面的中心，Z 轴向上
  - **[Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.x/d5/d1f/calib3d_solvePnP.html)**

求解结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/realsense/realsense-apriltag-pose.png)

## 参考
- **[D435i use apriltag with OpenCV](https://sinnammanyo.cn/personal-site/docs/computer/cv/realsense/intel-realsense-apriltag)**
- **[相机内参和外参](https://zhuanlan.zhihu.com/p/144307108)**
- **[#intrinsic-camera-parameters](https://github.com/IntelRealSense/librealsense/wiki/Projection-in-RealSense-SDK-2.0#intrinsic-camera-parameters)**
- **[How to get the fx,fy,cx,cy of the D435 #2930](https://github.com/IntelRealSense/librealsense/issues/2930)**
- **https://github.com/IntelRealSense/librealsense/blob/5e73f7bb906a3cbec8ae43e888f182cc56c18692/examples/sensor-control/api_how_to.h#L209**
- **[Get Video Stream Intrinsics](https://github.com/IntelRealSense/librealsense/wiki/API-How-To#get-video-stream-intrinsics)**
- **[Apriltag使用](https://blog.csdn.net/u010949023/article/details/116597057)**
- **[Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.x/d5/d1f/calib3d_solvePnP.html)**


