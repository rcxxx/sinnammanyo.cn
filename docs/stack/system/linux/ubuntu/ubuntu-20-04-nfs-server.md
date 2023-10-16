---
id: ubuntu-20-04-nfs-server
title: Ubuntu20.04 安装并配置 nfs server
sidebar_label: nfs-server
---

## 安装

``` bash
sudo apt-get update
sudo apt install nfs-kernel-server
```

## 配置

- **创建一个用于共享 nfs 服务的目录**

```
sudo mkdir ~/nfs
```

- **修改 nfs 服务配置文件**

``` bash
sudo vim /etc/exports
```

在其中加入如下内容

``` bash
/nfs  *(rw,sync,no_root_squash,no_subtree_check)
```

- `[/nfs]` 制定 nfs 共享的目录
- `[*]` 允许所有的网段，也可以指定固定的 ip 地址
- `[rw]` 读写权限
- `[sync]` 同步写入内存和硬盘
- `[no_root_squash]` root用户具有对根目录的完全管理访问权限
- `[no_subtree_check]` 不检查父目录的权限

- **检查配置项是否正确**

``` bash
sudo exportfs -ar
sudo exportfs -rv
```

- **重启 nfs 服务**

``` bash
no_subtree_check
```

- **查看正在共享的目录**

``` bash
showmount -e localhost
```

## 客户端挂载 nfs 目录

``` bash
mount -t nfs -o nolock <ip>:/nfs /nfs
```

- `[<ip>:/nfs]` 主机的 ip + 目录路径
- `[/nfs]` 客户端要挂载的目标路径 

## 客户端卸载 nfs 目录

``` bash
umount <ip>:/nfs
umount /nfs
```

## 参考
- **[Ubuntu最新版本(Ubuntu22.04LTS)安装nfs服务器及使用教程](https://blog.csdn.net/wkd_007/article/details/129092820)**
- **[如何在 Ubuntu 20.04 上安装和配置 NFS 服务器](https://blog.csdn.net/weixin_43025343/article/details/123488573)**
