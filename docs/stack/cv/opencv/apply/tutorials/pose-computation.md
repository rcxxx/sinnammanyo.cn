---
id: opencv-solvePnP-pose-computation
title: cv::solvePnP() 实现姿态估计
sidebar_label: pose computation
---

## cv::solvePnP()
- **[Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.x/d5/d1f/calib3d_solvePnP.html)**

`PnP` 求解器根据给定的几组点，以及相机的内参，求解出相关的位姿信息，其中包括相机坐标系，图像坐标系以及世界坐标系之间的转换关系

``` cpp
solvePnP( InputArray objectPoints,       // 输入的世界坐标点集合
                    InputArray imagePoints,         // 输入的二维图像坐标点集
                    InputArray cameraMatrix,        // 相机的内参
                    InputArray distCoeffs,          // 相机的畸变参数
                    OutputArray rvec,               // 输出的旋转向量 rotation
                    OutputArray tvec,               // 输出的平移向量 translation
                    bool useExtrinsicGuess = false, // 用于求解PNP_迭代的参数，如果为 true 则会不断优化求解结果
                    int flags = SOLVEPNP_ITERATIVE  // 求解的方法，具体可以查阅文档
                    );
```
- **https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga549c2075fac14829ff4a58bc931c033d**

### 基本使用

- 相机的内参矩阵可以表示为

$$
\begin{pmatrix}
    f_x & 0 & c_x \\\\
    0 & f_y & c_y \\\\
    0 & 0 & 1 \\\\
\end{pmatrix}
$$

- 畸变参数 `k1，k2，k3，p1，p2` 分别为径向和切向畸变系数，可以用一个 `1x5` 的矩阵表示

这两组参数一般通过标定相机获得

#### 求解已知平面

首先定义平面的长宽 `w`，`h`，然后定义世界坐标系的原点，并得到平面4个定点与原点的关系，假设定义坐标系原点为平面中心

- 定义世界坐标系下的点集如下

``` cpp
float w, h;
vector<cv::Point3f> object_point;
object_point.clear();
object_point.push_back(cv::Point3f(-w / 2, -h / 2, 0));
object_point.push_back(cv::Point3f(w / 2, -h / 2, 0));
object_point.push_back(cv::Point3f(w / 2, h / 2, 0));
object_point.push_back(cv::Point3f(-w / 2, h / 2, 0));
```

获取图像坐标系下对应的点集

``` cpp
vector<cv::Point2f> image_point;
```

创建旋转 `rotation` 以及平移 `translation` 向量

``` cpp
cv::Mat rvec = cv::Mat::zeros(3, 3, CV_64FC1);
cv::Mat tvec = cv::Mat::zeros(3, 1, CV_64FC1);
```

- 求解

``` cpp
cv::solvePnP(object_point, image_point, camera_matrix, distortion_coeffs, rvec, tvec, cv::SOLVEPNP_IPPE_SQUARE);
```

#### 坐标转换

##### 从世界坐标转换至图像坐标

`OpenCV` 中提供了计算点投影的方法 **`cv::projectPoints()`**

``` cpp
void projectPoints( InputArray objectPoints,
                                 InputArray rvec, InputArray tvec,
                                 InputArray cameraMatrix, InputArray distCoeffs,
                                 OutputArray imagePoints,
                                 OutputArray jacobian = noArray(),
                                 double aspectRatio = 0 );
```
- 参数可以直接使用 `solvePnP` 求解出的相关参数，`imagePoints` 即为转换后的图像坐标点集

##### 从图像坐标转换至世界坐标

图像坐标 (u,v) 与世界坐标 (x,y,z) 转换的公式为

$$
\begin{bmatrix}
x \\
y \\
z 
\end{bmatrix} = R^{-1}(M_{camera}^{-1} * S * 
\begin{bmatrix}
u \\
v \\
1 
\end{bmatrix} - t)
$$

- $R$ 为旋转矩阵，可由旋转向量 `rvec` 求解
- $M_{camera}$ 为相机的内参矩阵
- $S$ 为目标点在相机坐标系Z方向的值，即目标点到相机平面的距离，可以通过已知参数求解
- $t$ 为求解的平移向量 `tvec`

若 `solvePnP` 的求解对象为一个固定的平面，则世界坐标系下的 $z$ 即固定为 $z_{const}$

公式简化为

$$
\begin{aligned}
\begin{bmatrix}
x \\
y \\
z_{const} 
\end{bmatrix} &= R^{-1}(M_{camera}^{-1} * S * 
\begin{bmatrix}
u \\
v \\
1 
\end{bmatrix} - t) \\
S \begin{bmatrix}
u \\
v \\
1 
\end{bmatrix} &=M_{camera} (R *  \begin{bmatrix}
x \\
y \\
z_{const} 
\end{bmatrix}
 + t)
\end{aligned}
$$

变换可得

$$
R^{-1}M_{camera}^{-1}S 
\begin{bmatrix}
u \\
v \\
1 
\end{bmatrix} = \begin{bmatrix}
x \\
y \\
z_{const} 
\end{bmatrix} + R^{-1}t
$$

- 把 $R^{-1}M_{camera}^{-1}$ 记为 $M_1$ ，$R^{-1}t$ 记为 $M_2$

可得

$$
\begin{aligned}
M_1[2]^{-1}S * 1 &= z_{const} * M_2[2] \\
S &= (z_{const} * M_2[2]) | M_1[2]
\end{aligned}
$$
- 即求得 $S$

已知所有参数，即可求解图像坐标到世界坐标的转换

代码实现如下
``` cpp
cv::Mat rotation_matrix = cv::Mat(3,3,cv::DataType<double>::type);
cv::Rodrigues(this->rvec, rotation_matrix);     // 由 rvec 求解 R

cv::Mat uv_pt = cv::Mat::ones(3,1,cv::DataType<double>::type);
uv_pt.at<double>(0,0) = static_cast<double>(img_point.x); // img_point 为图像坐标点
uv_pt.at<double>(1,0) = static_cast<double>(img_point.y);

cv::Mat M_1, M_2;
double S, z_const = 0;
M_1 = rotation_matrix.inv() * camera_matrix.inv() * uv_pt;  // M_1
M_2 = rotation_matrix.inv() * tvec;                         // M_2
/* S = (z_const + M_2[2]) / M_1[2] */
S = z_const + M_2.at<double>(2,0);
S /= M_1.at<double>(2,0);


/* world_pt = R^{-1}(M_{camera}^{-1} * S * uv_pt - t) */
cv::Mat world_pt = rotation_matrix.inv() * (S * camera_matrix.inv() * uv_pt - tvec);

cv::Point3f world_point = cv::Point3f(world_pt.at<double>(0, 0), world_pt.at<double>(1, 0), world_pt.at<double>(2, 0));
```
- 此方法求解存在一定误差，尝试用别的方法修正深度值 $S$ 能减小误差

#### 求解角度


## 参考
- **[Perspective-n-Point (PnP) pose computation](https://docs.opencv.org/4.x/d5/d1f/calib3d_solvePnP.html)**
- **[Finds an object pose from 3D-2D point correspondences.](https://docs.opencv.org/4.x/d9/d0c/group__calib3d.html#ga549c2075fac14829ff4a58bc931c033d)**
- **[Projects points using fisheye model.](https://docs.opencv.org/4.x/db/d58/group__calib3d__fisheye.html#gab1ad1dc30c42ee1a50ce570019baf2c4)**
- **[c++opencv利用相机位姿估计实现2D图像像素坐标到3D世界坐标的转换](https://wenku.baidu.com/view/09121c81f624ccbff121dd36a32d7375a417c660.html)**
- **[相机标定(二)——图像坐标与世界坐标转换](https://www.guyuehome.com/7832)**
- **[image coordinate to world coordinate opencv](https://answers.opencv.org/question/62779/image-coordinate-to-world-coordinate-opencv/)**
- **[世界坐标系和图像坐标系的对应关系](https://blog.csdn.net/Bettyshasha/article/details/99061007)**
- **[用solvepnp求距离和角度](https://www.jianshu.com/p/1bf329da535b)**

