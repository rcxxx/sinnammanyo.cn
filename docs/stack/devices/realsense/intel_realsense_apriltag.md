---
id: intel-realsense-apriltag
title: D435i use apriltag with OpenCV
sidebar_label: D435i apriltag
---

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/realsense/realsense-apriltag.png)

## apriltag
官方网站

- **[AprilTag](https://april.eecs.umich.edu/software/apriltag)**

项目地址

- **[AprilRobotics/apriltag](https://github.com/AprilRobotics/apriltag)**

### 编译安装

``` bash
git clone https://github.com/AprilRobotics/apriltag.git
cd apriltag
mkdir build
cd build/
cmake -DCMAKE_INSTALL_PREFIX=/usr/local -DCMAKE_BUILD_TYPE=Release ..
NUM_CPU=$(nproc)
make -j$(($NUM_CPU - 1))
sudo make install
```

## librealsense2-AprilTag-OpenCV

参考链接
- **[AprilTag User Guide](https://github.com/AprilRobotics/apriltag/wiki/AprilTag-User-Guide)**
- **[opencv_demo.cc](https://github.com/AprilRobotics/apriltag/blob/master/example/opencv_demo.cc)**

配置 `apriltag`
``` cpp
// aprilTag config
apriltag_detector_t *td = apriltag_detector_create();
apriltag_family_t   *tf = tag36h11_create();
apriltag_detector_add_family(td, tf);
td->nthreads = 4;
```

- `apriltag_family_t` 为标签的不同分类合集，这里选择 `tag36h11`，具体可以参考 **User Guide** 中的 **[choosing-a-tag-family](https://github.com/AprilRobotics/apriltag/wiki/AprilTag-User-Guide#choosing-a-tag-family)**

创建 `img_header`
``` cpp
cv::Mat gray_img;
cv::cvtColor(color_img, gray_img, cv::COLOR_BGR2GRAY);
// Make an image_u8_t header for the Mat data
image_u8_t img_header = { .width = gray_img.cols,
    .height = gray_img.rows,
    .stride = gray_img.cols,
    .buf = gray_img.data
};
```

执行检测
``` cpp
zarray_t *detections = apriltag_detector_detect(td, &img_header);
```

绘制结果
``` cpp
for(int i = 0; i < zarray_size(detections); ++i){
    apriltag_detection_t *det;
    zarray_get(detections, i, &det);
    for(size_t i = 0; i < 4; ++i){
        cv::line(color_img, cv::Point(static_cast<int>(det->p[i][0]), static_cast<int>(det->p[i][1])),
                cv::Point(static_cast<int>(det->p[(i+1)%4][0]), static_cast<int>(det->p[(i+1)%4][1])),
                cv::Scalar(0xff, 0xff, 0), 2);
    }

    stringstream ss;
    ss << det->id;
    cv::String text = ss.str();
    int fontface = cv::FONT_HERSHEY_SCRIPT_SIMPLEX;
    double fontscale = 1.0;
    int baseline;
    cv::Size textsize = cv::getTextSize(text, fontface, fontscale, 2,
                                    &baseline);
    putText(color_img, text, cv::Point( static_cast<int>(det->c[0]-textsize.width/2),
                                        static_cast<int>(det->c[1]+textsize.height/2)),
                                        fontface, fontscale, cv::Scalar(0xff, 0x99, 0), 2);
}

imshow("color_img", color_img);
```

最终效果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/realsense/realsense-apriltag.png)

## 参考

- **[AprilTag](https://april.eecs.umich.edu/software/apriltag)**
- **[AprilRobotics/apriltag](https://github.com/AprilRobotics/apriltag)**
- **[AprilTag User Guide](https://github.com/AprilRobotics/apriltag/wiki/AprilTag-User-Guide)**
- **[opencv_demo.cc](https://github.com/AprilRobotics/apriltag/blob/master/example/opencv_demo.cc)**
- **[choosing-a-tag-family](https://github.com/AprilRobotics/apriltag/wiki/AprilTag-User-Guide#choosing-a-tag-family)**