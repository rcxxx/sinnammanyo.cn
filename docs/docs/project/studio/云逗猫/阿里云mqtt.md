---
id: cloud-tease-cat-aliyun-mqtt
title: 远程逗猫 —— 小程序 mqtt IoT
sidebar_label: 阿里云 IoT
---

import BrowserWindow from '@site/src/components/BrowserWindow';
import BVideo from "@site/src/components/BVideo";

<BrowserWindow>

### 视频演示

<BVideo src="" bsrc=""/>

### 项目地址

</BrowserWindow>

## 配置
所使用的物联网平台为阿里云物联网平台

根据已准备好的物联网平台设备信息，创建链接参数

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cloud-tease-cat/device-info.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cloud-tease-cat/mqtt-param.png)

创建 `mqtt_cfg.yaml` 文件

``` yaml title ="mqtt_cfg.yaml"
# DeviceSecret
productKey: ""
deviceName: ""
deviceSecret: ""

# MQTT Connection Parameters
clientId: ""
username: ""
mqttHostUrl: ""
port: 1883
passwd: ""
```
- 根据阿里云给出的信息，分别填写这些参数

## Python 接入阿里云 MQTT 订阅话题

- 导入所需的包

``` py
import yaml
import time
import sys
import json
import paho.mqtt.client as mqtt
```

- 导入配置信息

``` py
cfg = yaml.load(open(sys.path[0] + '/mqtt_cfg.yaml', 'r', encoding='utf-8').read(), Loader=yaml.FullLoader)

productKey = cfg['productKey']
deviceName = cfg['deviceName']
deviceSecret = cfg['deviceSecret']
subTopic = "/" + productKey + "/" + deviceName + "/user/get"

clientId = cfg['clientId']
username = cfg['username']
mqttHostUrl = cfg['mqttHostUrl']
port = cfg['port']
passwd= cfg['passwd']
```

- `connect_mqtt()`

``` py
keepAlive = 300

def connect_mqtt() -> mqtt:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Host! ......")
            print("Connect aliyun IoT Cloud Sucess")

        else:
            print("Connect failed...  error code is:" + str(rc))
    
    client = mqtt.Client(clientId)
    client.username_pw_set(username=username, password=passwd)
    client.on_connect = on_connect
    client.connect(mqttHostUrl, port, keepAlive)
    return client
```

- `subscribe()`

``` py
def subscribe(client: mqtt):
    def on_message(client, userdata, msg):
        topic = msg.topic
        payload = msg.payload.decode()
        print("receive message ---------- topic is : " + topic)
        print("receive message ---------- payload is : " + payload)

    print("Waiting for reception")
    client.subscribe(subTopic)
    client.on_message = on_message
```

- `run()`

``` py
def run():
    client = connect_mqtt()
    client.loop_start()
    time.sleep(2)
    subscribe(client)
    while True:
        time.sleep(1)

if __name__ == '__main__':
    run()
```

即可订阅 `"/user/get"` 话题，如需要在接收到消息后，执行操作，在 `on_message()` 函数执行操作即可

### 加入串口控制的完整程序

``` py
import yaml
import time
import sys
import json
import paho.mqtt.client as mqtt

cfg = yaml.load(open(sys.path[0] + '/mqtt_cfg.yaml', 'r', encoding='utf-8').read(), Loader=yaml.FullLoader)

productKey = cfg['productKey']
deviceName = cfg['deviceName']
deviceSecret = cfg['deviceSecret']
subTopic = "/" + productKey + "/" + deviceName + "/user/get"

clientId = cfg['clientId']
username = cfg['username']
mqttHostUrl = cfg['mqttHostUrl']
port = cfg['port']
passwd= cfg['passwd']

keepAlive = 300

import serial

ser = serial.Serial(port='/dev/ttyUSB0',
                    baudrate=115200,
                    timeout=0.5)

KEYS = {'小球':[0xA5, 0xA5, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00],
        '激光笔':[0xA5, 0xA5, 0x05, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00],
        '逗猫棒':[0xA5, 0xA5, 0x0A, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00]}

def connect_mqtt() -> mqtt:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("[Connect]: Connected to MQTT Host! ......")
            print("[Connect]: Connect aliyun IoT Cloud Sucess")

        else:
            print("[Connect]: Connect failed...  error code is:" + str(rc))
    client = mqtt.Client(clientId)
    client.username_pw_set(username=username, password=passwd)
    client.on_connect = on_connect
    client.connect(mqttHostUrl, port, keepAlive)
    return client

def subscribe(client: mqtt):
    def on_message(client, userdata, msg):
        topic = msg.topic
        payload = msg.payload.decode()
        print("\033[0;;42m[Message]\033[0m: receive message ---------- topic is : " + topic)
        print("\033[0;;42m[Message]\033[0m: receive message ---------- payload is : " + payload)
        payload_dict = json.loads(payload)
        if 'stick' in payload_dict['params']:
            data = KEYS['逗猫棒']
            ser.write(bytes(data))
            print("\033[0;36m[Publisher]:  Use item: stick\033[0m")
        elif 'ball' in payload_dict['params']:
            data = KEYS['小球']
            ser.write(bytes(data))
            print("\033[0;36m[Publisher]:  Use item: ball\033[0m")
        elif 'laser' in payload_dict['params']:
            data = KEYS['激光笔']
            ser.write(bytes(data))
            print("\033[0;36m[Publisher]:  Use item: laser\033[0m")


    print("[Subscribe]: Waiting for reception")
    client.subscribe(subTopic)
    client.on_message = on_message

def run():
    client = connect_mqtt()
    client.loop_start()
    time.sleep(2)
    subscribe(client)
    while True:
        time.sleep(1)

if __name__ == '__main__':
    run()
```

## 参考
- **[Paho-MQTT Python接入示例](https://help.aliyun.com/document_detail/438290.html?spm=a2c4g.606639.0.0.4e4b1f4ffcwdtD)**
- **[如何在 Python 中使用 MQTT](https://www.emqx.com/zh/blog/how-to-use-mqtt-in-python)**