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
 CMake  | **[3.24](https://cmake.org/)** ≥
 OpenCV | **[4.6.0](https://github.com/opencv/opencv/releases/tag/4.6.0)**
 Python | **[3.8.0](https://www.python.org/downloads/release/python-380/)**
 YOLOv8 | **[ultralytics](https://github.com/ultralytics/ultralytics)**

## 获取 ONNX 模型

### clone 源码

```
git clone https://github.com/ultralytics/ultralytics.git
```

### 安装

```
cd ultralytics/
pip install -r requirements.txt
pip install ultralytics
```

### 下载模型

```
yolo predict model=yolov8n.pt source="https://ultralytics.com/images/bus.jpg"
```
- `model={}` 填入所需要的模型，如果本地没有则会从仓库下载

### export 导出 onnx 模型

- 安装 onnx

```
pip install onnx
pip install onnxsim
```

- 导出模型

```
yolo export \
model=yolov8s.pt \
imgsz=[480,640] \
format=onnx \
opset=12
```

## OpenCV-DNN 导入 ONNX 模型

### Class YoloNet()

``` cpp title="yolov8_onnx.hpp"
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
                                              float _score_threshold = 0.2,
                                              float _NMS_threshold = 0.4,
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
                confidences.push_back(max_class_score);
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
        for(auto i = 0; i< nms_result.size(); ++i){
            int idx = nms_result[i];

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
//        if (idx.class_id == 15 || idx.class_id == 16) {
            auto bbox = idx.box;
            auto classId = idx.class_id;
            cv::rectangle(src_img, bbox, idx.color, 2);
            cv::rectangle(src_img, cv::Point(bbox.x, bbox.y + 10), cv::Point(bbox.x + bbox.width, bbox.y), idx.color, cv::FILLED);
            cv::putText(src_img, yolo.classList()[classId], cv::Point(bbox.x, bbox.y + 5), cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(0, 0, 0));
//        }
    }

    cv::imshow("src_img", src_img);
    cv::waitKey(0);

    return 0;
}
```

输出结果如下

## 参考
- **[ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)**
- **[ultralytics/examples/YOLOv8-CPP-Inference](https://github.com/ultralytics/ultralytics/tree/main/examples/YOLOv8-CPP-Inference)**
