---
id: opencv-dnn-yolov4
title: 使用 CV::DNN 模块读取 YOLO v4 权重进行实时目标检测
sidebar_label: DNN YOLO-v4
---

## 准备工作

使用 DNN 模块需要编译 `opencv_contrib` 

可以参考
- [Install（仅CPU）](https://sinnammanyo.cn/personal-site/docs/opencv/opencv-install-cpu)


如果需要开启 GPU 加速，可以参考
- [Install（GPU）](https://sinnammanyo.cn/personal-site/docs/opencv/opencv-install-gpu)

`cmake` 参数应添加下面这些

``` shell
-DWITH_CUDA=ON \
-DOPENCV_DNN_CUDA=ON \
-DENABLE_FAST_MATH=1 \
-DCUDA_FAST_MATH=1 \
-DWITH_CUBLAS=1 \
```

在你有 GPU 的情况下这样可以启用 GPU 加速运算

## DNN模块简单介绍


## 下载文件
先下载 `YOLO v4` 的配置文件和预训练的权重

- [yolov4.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov4.cfg)
- [yolov4.weights](https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights)

模型配置文件 `yolov4.cfg` 也可以在 `opencv_extra` 的 `testdata/dnn` 目录中找到

然后下载 `coco_classes.txt` 文件，因为预训练的权重使用的是 `coco` 数据集

- [coco_classes.txt](https://github.com/bubbliiiing/yolov4-pytorch/blob/master/model_data/coco_classes.txt)

## 尝试实现
- 设置模型文件等的路径
``` cpp
String yolov4_cfg = argv[1]     // 配置文件
String yolov4_weights = argv[2] // 权重文件
String coco_classes = argv[3]   // 标签集
String file_name = argv[4]      // 测试图片文件
```

- 加载模型，设置计算后台和目标设备
```cpp
dnn::Net net = dnn::readNetFromDarknet(yolov4_cfg, yolov4_weights);
net.setPreferableBackend(dnn::DNN_BACKEND_CUDA);
net.setPreferableTarget(dnn::DNN_TARGET_CUDA);
```

- 获取网络的输出层名称
```cpp
vector<String> out_names = net.getUnconnectedOutLayersNames();
for (size_t i = 0; i < out_names.size() ; ++i) {
    cout<< "output layer name: " << out_names[i].c_str() <<endl;
}
```

- 加载模型的标签集
```cpp
vector<String> class_names;
std::ifstream ifs_classes(coco_classes);
if (ifs_classes.is_open()) {
    string class_name = "";
    while (getline(ifs_classes, class_name)) {
        class_names.push_back(class_name);
    }
}
```

- 加载测试图片
``` cpp
Mat src_img = imread(file_name);
```

- 将图像从Mat类型转换为blob类型，并传入神经网络模型
``` cpp
Mat input_blob = dnn::blobFromImage(src_img, 1 / 255.F, src_img.size(), Scalar(), true, false);

net.setInput(input_blob);
```

- 执行前向传播
``` cpp
vector<Mat> outs;
net.forward(outs, out_names);
```

- 计算FPS
``` cpp
// runtime and FPS
vector<double> layers_time;
double freq = getTickFrequency() / 1000;
double time = net.getPerfProfile(layers_time) / freq;
String run_time = "run time: " + to_string(time) + "ms";
putText(src_img, run_time, Point(20, 20), 0, 0.5, Scalar::all(255));
```

- 获取 box、label
``` cpp
vector<Rect> boxes;         // box
vector<int> class_id;       // label
vector<float> confidences;  // confidence level

for (size_t i = 0; i < outs.size(); ++i) {
    float* data = (float*)(outs[i].data);

    for (int j = 0; j < outs[i].rows; ++j, data += outs[i].cols) {
        Mat scores = outs[i].row(j).colRange(5, outs[i].cols);
        Point id_point;
        double confidence;

        minMaxLoc(scores, nullptr, &confidence, nullptr, &id_point);
        if (confidence > 0.5) {
            int center_x = int(data[0] * src_img.cols);
            int center_y = int(data[1] * src_img.rows);
            int width = int(data[2] * src_img.cols);
            int height = int(data[3] * src_img.rows);
            int tl_x = center_x - width / 2;
            int tl_y = center_y - height / 2;

            boxes.push_back(Rect(tl_x, tl_y, width, height));
            class_id.push_back(id_point.x);
            confidences.push_back(float(confidence));
        }
    }
}
```

- 极大值非抑制后绘制 box、label
``` cpp
vector<int> max_idx;
dnn::NMSBoxes(boxes, confidences, 0.5, 0.2f , max_idx);
for (size_t i = 0; i < max_idx.size(); ++i) {
    int idx = max_idx[i];
    Rect box = boxes[idx];
    String label = class_names[class_id[idx]];

    putText(src_img, label.c_str(), box.tl(), FONT_HERSHEY_SIMPLEX, 1.0, Scalar(255, 0, 0), 2, 8);
    rectangle(src_img, box, Scalar::all(255), 2, 8, 0);
}
```

- imshow
``` cpp
imshow("src_img", src_img);
waitKey(0);
```

### 测试

编译程序后执行，依次输入文件路径
``` shell
./opencv-dnn-test <yolov4_cfg_path> <yolov4_weights_path> <coco_classes_path> <file_name_path>
```

测试结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/ubuntu/opencv/opencv_yolo_test.png)

## 参考

- [基于OpenCV和YOLOv3深度学习的目标检测](https://blog.csdn.net/qq_27158179/article/details/81915740)
- [dnn模块之基于YOLOv3（Tiny）模型的（实时）对象检测](https://blog.csdn.net/weixin_45224869/article/details/106148983)
- [opencv-python dnn模块使用CUDA加速](https://blog.csdn.net/qq_43019451/article/details/105894552)
- [How to run OpenCV DNN on NVidia GPU](https://answers.opencv.org/question/201456/how-to-run-opencv-dnn-on-nvidia-gpu/?answer=201461)
- [How to use OpenCV’s “dnn” module with NVIDIA GPUs, CUDA, and cuDNN](https://www.pyimagesearch.com/2020/02/03/how-to-use-opencvs-dnn-module-with-nvidia-gpus-cuda-and-cudnn/)
- [AlexeyAB/darknet](https://github.com/AlexeyAB/darknet)
- [bubbliiiing/yolov4-pytorch](https://github.com/bubbliiiing/yolov4-pytorch)