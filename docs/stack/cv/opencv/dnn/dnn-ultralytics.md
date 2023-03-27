---
id: opencv-dnn-ultralytics
title: ''
sidebar_label: DNN YOLO-v8-ONNX
---

## 使用 CV::DNN 模块读取 ultralytics/YOLO-v8 ONNX 模型进行实时目标检测
### 运行环境
name | version 
---------|:----------:
 System | **[Ubuntu 20.04](https://releases.ubuntu.com/20.04/)**
 CMake  | **[3.24](https://cmake.org/)**
 OpenCV | **[4.7.0](https://github.com/opencv/opencv/releases/tag/4.7.0)**
 Python | **[3.8.0](https://www.python.org/downloads/release/python-380/)**
 YOLOv8 | **[ultralytics](https://github.com/ultralytics/ultralytics)**

## 获取 ONNX 模型

### clone 源码

``` bash
git clone https://github.com/ultralytics/ultralytics.git
```

### 安装

``` bash
cd ultralytics/
pip install -r requirements.txt
pip install ultralytics
```

### 下载模型

``` bash
yolo predict model=yolov8s.pt source="https://ultralytics.com/images/bus.jpg"
```
- `model={}` 填入所需要的模型，如果本地没有则会从仓库下载

### export 导出 onnx 模型

- 安装 onnx

``` bash
pip install onnx
pip install onnxsim
```

- 导出模型

``` bash
yolo export \
model=yolov8s.pt \
imgsz=[640,640] \
format=onnx \
opset=12
```

## OpenCV-DNN 导入 ONNX 模型

### Class YoloNet()

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="cc"
values={[
    {label: 'c++', value: 'cc'},
    {label: 'python', value: 'py'},
]}>
<TabItem value="cc">

``` cpp title="yolov8_onnx.hpp"
#ifndef YOLOV8_ONNX_OPENCV_YOLOV_8_ONNX_HPP
#define YOLOV8_ONNX_OPENCV_YOLOV_8_ONNX_HPP

#include <fstream>
#include <vector>
#include <string>
#include <random>

#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/dnn.hpp>

namespace yolov8_onnx {
    struct Detection
    {
        int class_id{0};
        std::string className{};
        float confidence{0.0};
        cv::Scalar color{};
        cv::Rect box{};
    };

    class Net
    {
    public:
        explicit Net(const std::string &onnx_model_path, const std::string &classes_txt_file_path,
                     const cv::Size &model_input_shape = {640, 640}, const bool &is_cuda = false);

        ~Net()= default;

        std::vector<yolov8_onnx::Detection> detect(cv::Mat &src,
                                              float _score_threshold = 0.45,
                                              float _NMS_threshold = 0.5,
                                              float _confidence_threshold = 0.4);
        inline std::vector<std::string> classList(){
            return this->class_list_;
        }

    private:
        cv::dnn::Net net;
        std::vector<std::string> class_list_;

        cv::Size2f model_shape_{};

        static cv::Mat format_img(const cv::Mat &_src);
    };
};

#endif //YOLOV8_ONNX_OPENCV_YOLOV_8_ONNX_HPP
```

``` cpp title="yolov8_onnx.cpp"
#include "yolov_8_onnx.hpp"

namespace yolov8_onnx {

    Net::Net(const std::string &onnx_model_path, const std::string &classes_txt_file_path,
             const cv::Size &model_input_shape, const bool &is_cuda) {
        // load models
        this->net = cv::dnn::readNetFromONNX(onnx_model_path);
        if (is_cuda)
        {
            std::cout << "\nRunning on CUDA" << std::endl;
            net.setPreferableBackend(cv::dnn::DNN_BACKEND_CUDA);
            net.setPreferableTarget(cv::dnn::DNN_TARGET_CUDA);
        }
        else
        {
            std::cout << "\nRunning on CPU" << std::endl;
            net.setPreferableBackend(cv::dnn::DNN_BACKEND_OPENCV);
            net.setPreferableTarget(cv::dnn::DNN_TARGET_CPU);
        }

        // load class_list
        std::ifstream ifs(classes_txt_file_path);
        if (ifs.is_open())
        {
            std::string line;
            while (getline(ifs, line))
            {
                this->class_list_.push_back(line);
            }
        }

        this->model_shape_ = model_input_shape;
    }

    std::vector<yolov8_onnx::Detection>
    Net::detect(cv::Mat &src,
                float _score_threshold,
                float _NMS_threshold,
                float _confidence_threshold) {
        // format image
        cv::Mat input = format_img(src);

        cv::Mat blob;
        cv::dnn::blobFromImage(input, blob, 1.0/255.0, this->model_shape_, cv::Scalar(), true, false);
        net.setInput(blob);

        std::vector<cv::Mat> outputs;
        net.forward(outputs, net.getUnconnectedOutLayersNames());

        // yolo_v8 has an output of shape (batchSize, 84,  8400) (Num classes + box[x,y,w,h])
        int rows = outputs[0].size[2];
        int dimensions = outputs[0].size[1];

        outputs[0] = outputs[0].reshape(1, dimensions);
        cv::transpose(outputs[0], outputs[0]);

        auto *data = (float *)outputs[0].data;

        float x_factor = static_cast<float >(input.cols) / this->model_shape_.width;
        float y_factor = static_cast<float >(input.rows) / this->model_shape_.height;

        std::vector<int> class_ids;
        std::vector<float> confidences;
        std::vector<cv::Rect> boxes;

        for (int i = 0; i < rows; ++i)
        {
            float *classes_scores = data+4;

            cv::Mat scores(1, static_cast<int>(this->class_list_.size()), CV_32FC1, classes_scores);
            cv::Point class_id;
            double max_class_score;

            minMaxLoc(scores, 0, &max_class_score, 0, &class_id);
            if (max_class_score > _score_threshold){
                confidences.push_back(static_cast<float>(max_class_score));
                class_ids.push_back(class_id.x);

                float x = data[0];
                float y = data[1];
                float w = data[2];
                float h = data[3];

                int left = static_cast<int>((x - 0.5 * w) * x_factor);
                int top = static_cast<int>(( y - 0.5 * h) * y_factor);

                int width = static_cast<int>(w * x_factor);
                int height = static_cast<int>(h * y_factor);

                boxes.emplace_back(left, top, width, height);
            }
            data += dimensions;
        }

        std::vector<int> nms_result;
        cv::dnn::NMSBoxes(boxes, confidences, _score_threshold, _NMS_threshold, nms_result);

        std::vector<yolov8_onnx::Detection> detections{};
        for(int idx : nms_result){
            yolov8_onnx::Detection result;
            result.class_id = class_ids[idx];
            result.confidence = confidences[idx];

            std::random_device rd;
            std::mt19937 gen(rd());
            std::uniform_int_distribution<int> dis(100, 255);
            result.color = cv::Scalar(dis(gen),
                                      dis(gen),
                                      dis(gen));

            result.className = class_list_[result.class_id];
            result.box = boxes[idx];

            detections.push_back(result);
        }

        return detections;
    }

    cv::Mat Net::format_img(const cv::Mat &_src) {
        int format_size = MAX(_src.cols, _src.rows);

        cv::Mat dst = cv::Mat::zeros(cv::Size(format_size, format_size), CV_8UC3);
        _src.copyTo(dst(cv::Rect(0, 0, _src.cols, _src.rows)));

        return dst;
    }
};
```
>- v8 与 v5 在 output 结构上有区别
>  // yolov5 has an output of shape (batchSize, 25200, 85) (Num classes + box[x,y,w,h] + confidence[c])
> // yolov8 has an output of shape (batchSize, 84,  8400) (Num classes + box[x,y,w,h])


``` cpp title="main.cpp"
#include <iostream>
#include <opencv2/opencv.hpp>

#include "yolov8/yolov_8_onnx.hpp"

int main() {
    std::string model_path = "../models/yolov8s.onnx";
    std::string classes_path = "../models/classes.txt";
    std::string img_path = "../img/bus.jpg";

    yolov8_onnx::Net yolo(model_path, classes_path);

    cv::Mat src_img = cv::imread(img_path);

    // YOLO detect
    std::vector<yolov8_onnx::Detection> results = yolo.detect(src_img);
    for (const auto &idx : results) {
        auto bbox = idx.box;
        auto classId = idx.class_id;
        cv::rectangle(src_img, bbox, idx.color, 2);
        cv::rectangle(src_img, cv::Point(bbox.x, bbox.y + 14), cv::Point(bbox.x + bbox.width, bbox.y), idx.color, cv::FILLED);
        cv::putText(src_img, yolo.classList()[classId], cv::Point(bbox.x, bbox.y + 10), cv::FONT_HERSHEY_SIMPLEX, 0.6, cv::Scalar(0, 0, 0));
    }

    cv::imshow("src_img", src_img);
    cv::waitKey(0);

    return 0;
}
```

``` cmake title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.24)
project(yolov8_onnx_opencv)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)

# Add include dir
include_directories(
        ${PROJECT_SOURCE_DIR}/modules
)

add_executable(yolov8_onnx_opencv src/main.cpp)

# Dependence lib
## Find and add opencv as required
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})
link_libraries(${OpenCV_LIBS})

# Add Subdirectories
add_subdirectory(${PROJECT_SOURCE_DIR}/modules/yolov8)

# Target
target_link_libraries(yolov8_onnx_opencv
        ${OpenCV_LIBS}
        yolov8)
```

输出结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolov8/yolov8-result.png)

</TabItem>
<TabItem value="py">

``` py title="yolov8_onnx.py"
import cv2
import numpy as np

from ultralytics.yolo.utils import yaml_load
from ultralytics.yolo.utils.checks import check_yaml

class Model:
    def __init__(self, _model_path, _size=(640,640)):
        self.model = cv2.dnn.readNetFromONNX(_model_path)
        self.CLASSES = yaml_load(check_yaml('coco128.yaml'))['names']
        self.size = _size
        self.colors = np.random.uniform(0, 255, size=(len(self.CLASSES), 3))

    def draw_bounding_box(self, _img, class_id, confidence, x, y, x_plus_w, y_plus_h):
        label = f'{self.CLASSES[class_id]} ({confidence:.2f})'
        color = self.colors[class_id]
        cv2.rectangle(_img, (x, y), (x_plus_w, y_plus_h), color, 2)
        cv2.putText(_img, label, (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    def det(self, _img ,_score_th=0.45, _NMS_th = 0.5):
        [height, width, _] = _img.shape
        length = max(height, width)
        img = np.zeros((length, length, 3), np.uint8)
        img[0:height, 0:width] = _img
        scale = length / self.size[0]
        blob = cv2.dnn.blobFromImage(img, scalefactor= 1/255, size=self.size)
        self.model.setInput(blob)
        outputs = self.model.forward()

        outputs = np.array([cv2.transpose(outputs[0])])
        rows = outputs.shape[1]

        boxes = []
        scores = []
        class_ids = []

        for i in range(rows):
            classes_scores = outputs[0][i][4:]
            (min_score, max_score, min_class_loc, (x, max_class_index)) = cv2.minMaxLoc(classes_scores)
            if max_score >= _score_th:
                box = [outputs[0][i][0] - (0.5 * outputs[0][i][2]),
                       outputs[0][i][1] - (0.5 * outputs[0][i][3]),
                       outputs[0][i][2],
                       outputs[0][i][3]]
                boxes.append(box)
                scores.append(max_score)
                class_ids.append(max_class_index)

        result_boxes = cv2.dnn.NMSBoxes(boxes, scores, _score_th, _NMS_th, 0.5)
        detections = []
        for i in range(len(result_boxes)):
            index = result_boxes[i]
            box = boxes[index]
            detection = {
                'class_id': class_ids[index],
                'class_name': self.CLASSES[class_ids[index]],
                'confidence': scores[index],
                'box': box,
                'scale': scale}
            detections.append(detection)
            self.draw_bounding_box(_img, class_ids[index], scores[index],
                                   round(box[0] * scale),
                                   round(box[1] * scale),
                                   round((box[0] + box[2]) * scale),
                                   round((box[1] + box[3]) * scale))

        return detections
```

``` py title="main.py"
import cv2
import numpy as np

from yolov8_onnx import Model

def main():
    net = Model('yolov8s-480x.onnx', _size=(640, 640))
    src_img = cv2.imread('bus.jpg')

    detections = net.det(src_img)

    for i in range(len(detections)):
        detection = detections[i]
        net.draw_bounding_box(src_img,
                              detection['class_id'],
                              detection['confidence'],
                              round(detection['box'][0] * detection['scale']),
                              round(detection['box'][1] * detection['scale']),
                              round((detection['box'][0] + detection['box'][2]) * detection['scale']),
                              round((detection['box'][1] + detection['box'][3]) * detection['scale'])
                              )

    cv2.imshow('image', src_img)
    cv2.waitKey(0)

if __name__ == '__main__':
    main()
    cv2.destroyAllWindows()

```

输出结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/yolov8/yolov8-result-py.png)

</TabItem>
</Tabs>

## 参考
- **[ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)**
- **[ultralytics/examples/YOLOv8-CPP-Inference](https://github.com/ultralytics/ultralytics/tree/main/examples/YOLOv8-CPP-Inference)**
