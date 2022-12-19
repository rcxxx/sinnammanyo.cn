---
id: python-定时任务实现
title:  Python 实现定时任务
sidebar_label: 定时任务
---

之前在使用 `Jetson Nano` 的时候涉及到了定时任务
- 用某个引脚输出持续 n 秒的高电平 —— **[Nvidia Jetson Nano GPIO](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-gpio)**

实现的时候遇到了一些问题，于是做下记录

## `time.sleep()`
> Python time sleep() 函数推迟调用线程的运行，可通过参数secs指秒数，在给定的秒数内暂停执行

``` py
time.sleep(_t)  # _t 代表需要等待的时间
```

- `sleep()` 参数可以是一个浮点数，以指示更精确的睡眠时间，实际的暂停时间可能比请求的少
- `sleep()` 所实现的等待方法是 **阻塞** 的

例如下面的程序

``` py
import Jetson.GPIO as GPIO
import time

def main():
    print("Press CTRL+C to exit")
    # 设置模式为 BOARD
    GPIO.setmode(GPIO.BOARD)
    
    # 设置引脚 37 为输出
    io = 37
    GPIO.setup(io, GPIO.OUT)
    try:
        while True:
            GPIO.output(io, GPIO.HIGH)
            time.sleep(2)
            GPIO.output(io, GPIO.LOW)
            time.sleep(2)
    finally:
        # 清除设置
        GPIO.cleanup()

if __name__ == '__main__':
    main()
```

程序将控制 `Jetson Nano` 的引脚循环输出高低电平，间隔时间为 2s，调用 `sleep()` 函数让整个程序等待两秒

## threading.timer()
> Timer() 是Thread的派生类，用于在指定时间后调用一个方法，等待的时间间隔可能与指定的时间间隔不完全相同

``` py
class threading.Timer(interval, function, args=None, kwargs=None)
```
- `interval` 指定的时间
- `function` 调用的方法
- `args/kwargs` 调用的方法的参数

``` py
def hello(str):
    print(str)

t = Timer(30.0, hello, ("hello, world",))
t.start()   # 30s 后将会执行 hello 方法
```
- `timer()` 通过调用 `start()` 方法，来启动
- 可以调用 `cancel()` 方法在任务执行前取消操作

``` py
def hello(str):
    print(str)

t = Timer(30.0, hello, ("hello, world",))
t.start()
t.cancel()  # cancel 取消了任务的执行
```

## 参考
- **[Python time sleep() Method](https://www.tutorialspoint.com/python/time_sleep.htm)**
- **[threading — Thread-based parallelism](https://docs.python.org/3/library/threading.html?highlight=timer#timer-objects)**
- **[【python】详解threading模块：timer类的使用（五）](https://blog.csdn.net/brucewong0516/article/details/84589616)**