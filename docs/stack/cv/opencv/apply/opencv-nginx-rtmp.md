---
id: opencv-nginx-rtmp-pull-stream
title: OpenCV Nginx 实现局域网视频推流/拉流
sidebar_label: rtmp 推拉流
---

### Nginx+RTMP 视频服务器

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/nginx-rtmp/nginx-status.png)


#### 安装 `Nginx`

``` shell
sudo apt-get update
sudo apt-get install nginx libnginx-mod-rtmp
```

- 验证安装

1. `Nginx` 安装完成后将会自动启动服务，可以通过 `systemctl status`

``` shell
sudo systemctl status nginx.service
```

2. 通过 `ifconfig` 查看 ip 地址

3. 浏览器输入 ip 地址查看运行情况

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/nginx-rtmp/welcome-nginx.png)

#### 配置 RTMP 服务器

1. 编辑 `nginx` 配置文件

``` shell
sudo vim /etc/nginx/nginx.conf
```

2. 文件末尾添加 rtmp 服务器配置

``` shell
rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            record off;
        }
    }
}
```

- `rtmp` 块定义了 RTMP 协议支持的服务器
- `server` 块定义服务器监听的端口，`listen` 即为定义端口
- `application` 定义应用程序名称
    - `live on` 指服务器开始接收来自客户端的 RTMP 流
    - `record off` 指不保存直播流到服务器

3. 修改配置文件完成后，重启 `nginx` 服务

``` shell
sudo systemctl reload nginx
```

### OpenCV + ffmpeg 实现局域网视频推流

``` py
import cv2
import subprocess

cap = cv2.VideoCapture(0)

# 设置视频流的分辨率和帧率
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 30)

# 创建RTMP推送流对象
rtmp_url = 'rtmp://[your_ip]:1935/live/stream'
command = ['ffmpeg', '-y',
           '-f', 'rawvideo',
           '-vcodec', 'rawvideo',
           '-pix_fmt', 'bgr24',
           '-s', '640x480',
           '-r', '30',
           '-i', '-',
           '-c:v', 'libx264', '-preset', 'ultrafast',
           '-f', 'flv', rtmp_url]
p = subprocess.Popen(command, stdin=subprocess.PIPE)

# 创建视频编码器对象
out = cv2.VideoWriter(rtmp_url,
                      cv2.CAP_FFMPEG,
                      cv2.VideoWriter_fourcc('H', '2', '6', '4'),
                      30.0,
                      (640, 480),
                      True)


# 循环获取摄像头帧，并进行推流
while True:
    # 读取摄像头帧
    ret, frame = cap.read()

    if ret:
        # 写入视频编码器
        out.write(frame)

        # 将帧写入RTMP推送流中
        p.stdin.write(frame.tostring())

        cv2.imshow('Local Stream', frame)
        # 按下q键退出循环
        if cv2.waitKey(1) == 27:
            break

    else:
        break

# 释放视频编码器和摄像头
out.release()
cap.release()

# 关闭所有窗口
cv2.destroyAllWindows()

# 终止RTMP推送流进程
p.terminate()
p.stdin.close()
p.wait()
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/nginx-rtmp/push-stream.png)

- 使用 OBS 之类的软件按照相应地址拉取视频流

### OpenCV 局域网拉取 RTMP 视屏流

```py
import cv2

rtmp_url = 'rtmp://[your_ip]:1935/live/stream'

cap = cv2.VideoCapture(rtmp_url)

while True:
    ret, frame = cap.read()

    if ret:
        cv2.imshow('RTMP Stream', frame)

        if cv2.waitKey(1) == 27:
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()
```

- 推流与拉流效果
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/nginx-rtmp/stream-result.png)


## 参考
- **[ubuntu20.04搭建Nginx+rtmp服务器](https://www.cnblogs.com/zhuzi1/p/17056030.html)**