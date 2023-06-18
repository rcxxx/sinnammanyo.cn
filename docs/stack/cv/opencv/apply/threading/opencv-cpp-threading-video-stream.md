---
id: opencv-cpp-threading-video-stream
title: 多线程读取视屏流
sidebar_label: 视频流 - cpp
---

适用于图像处理时间较长，但需要较为实时的图像更新，如读取网络串流，开启独立的子线程用来更新图像，主线程再进行处理

``` cpp title="video_capture_threading.hpp"
#ifndef VIDEO_CAPTURE_THREADING_HPP
#define VIDEO_CAPTURE_THREADING_HPP

#include <opencv2/opencv.hpp>

class VideoCaptureThreading {
public:
    explicit VideoCaptureThreading(int _cap_id, float _scale = 1.0);

    explicit VideoCaptureThreading(const cv::String& filename, float _scale);

    void updateFrame();

    inline cv::Mat getFrame(){
        return this->frame_scale;
    }

    inline cv::Mat getFrameOriginal(){
        return this->frame;
    }

    void exit();
private:
    cv::VideoCapture cap;
    cv::Mat frame;
    cv::Mat frame_scale;

    float scale = 1.0;
    bool is_threading_exit = false;
};


#endif //VIDEO_CAPTURE_THREADING_HPP
```

``` cpp title="video_capture_threading.cpp"
#include "video_capture_threading.hpp"

VideoCaptureThreading::VideoCaptureThreading(int _cap_id, float _scale = 1.0) {
    this->cap = cv::VideoCapture(_cap_id);
    this->scale = _scale;
}

VideoCaptureThreading::VideoCaptureThreading(const cv::String& filename, float _scale = 1.0) {
    this->cap = cv::VideoCapture(filename);
    this->scale = _scale;
}

void VideoCaptureThreading::updateFrame() {
    while (!is_threading_exit){
        this->cap >> this->frame;
        if (this->scale != 1.0) {
            cv::resize(this->frame, this->frame_scale, cv::Size(this->frame.cols * this->scale, this->frame.rows * this->scale));
        } else {
            this->frame_scale = this->frame;
        }
    }

    printf("VideoCapture thread closed");
    this->cap.release();
}

void VideoCaptureThreading::exit() {
    this->is_threading_exit = true;
}

```

``` cpp title="main.cpp"
#include <iostream>
#include <thread>
#include <opencv2/opencv.hpp>
#include "capture_threading/video_capture_threading.hpp"

int main() {
    std::mutex mtx;
    VideoCaptureThreading cap(0);
    std::thread cap_thread(&VideoCaptureThreading::updateFrame, &cap);

    while (true) {
        cv::Mat src_img;
        mtx.lock();
        src_img = cap.getFrameOriginal();
        mtx.unlock();

        cv::imshow("src_img", src_img);
        if((char)cv::waitKey(1) == 27){
            cap.exit();
            break;
        }
    }

    cap_thread.join();

    return 0;
}
```