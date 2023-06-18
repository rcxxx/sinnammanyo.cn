---
id: opencv-python-threading-video-stream
title: 多线程读取视屏流
sidebar_label: 视频流 - py
---

``` py title="eg"
import cv2
import threading
from threading import Thread

thread_lock = threading.Lock()
thread_exit = False

class capThread(Thread):
    def __init__(self, _cap=0):
        super(capThread, self).__init__()
        self.cap = cv2.VideoCapture(_cap)
        self.ret, self.frame = self.cap.read()

    def getFrame(self):
        return self.frame
    
    def run(self):
        global thread_exit
        while not thread_exit:
            self.ret, self.frame = self.cap.read()
            # cv2.imshow('frame', self.frame)

        self.cap.release()

def main():
    global thread_exit
    cap_t = capThread()
    cap_t.start()
    
    while not thread_exit:
        # 线程锁保证数据安全
        thread_lock.acquire()
        src_img = t.getFrame()
        thread_lock.release()

        # do something

        cv2.imshow('src_img', src_img)
        if cv2.waitKey(1) & 0xFF == 27:
            thread_exit = True
    t.join()

if __name__ == "__main__":
    main()
```