---
id: doker-ubuntu20-install
title: Ubuntu20.04 安装 Doker
sidebar_label: Ubuntu20.04 Install
---


## 启用 Docker 软件源，导入 GPG key

更新软件包，安装依赖

``` bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

导入 `GPG key`，添加软件源

``` bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

## 安装
- 安装最新版本 `docker`

``` bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

- 安装指定版本 `docker`

``` bash
sudo apt update
apt list -a docker-ce
sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io
```

## 验证安装

``` bash
sudo systemctl status docker
```

得到大概这样的输出

```
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset>
     Active: active (running) since Sun 2022-06-26 18:54:05 CST; 51s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 7292 (dockerd)
      Tasks: 13
     Memory: 31.1M
     CGroup: /system.slice/docker.service
             └─7292 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/cont>
```

## 参考
- **[如何在 Ubuntu 20.04 上安装和使用 Docker](https://zhuanlan.zhihu.com/p/143156163)**