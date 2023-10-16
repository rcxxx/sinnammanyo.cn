---
id: win11-nfs-server
title: Win11 启用 nfs server 
sidebar_label: nfs-server
---

### 下载工具 WinNFSd

> - **[winnfsd/winnfsd](https://github.com/winnfsd/winnfsd)**


``` powershell
Usage: WinNFSd.exe [-id <uid> <gid>] [-log on | off] [-pathFile <file>] [-addr <ip>] [export path] [alias path]
```

实际使用可以简化命令行

``` powershell
ipconfig.exe

WinNFSd.exe [export path] [alias path]
```

然后在 Linux 的 nfs 客户端中挂载

``` bash
mount -t nfs [-addr <ip>]:/[alias path] [path]
```
- `[-addr <ip>]` 为本机的 ip 地址
- `[alias path]` 为启动服务时配置的目录别名
- `[path]` 为想要挂载的目标路径

- 客户端卸载 nfs 目录

``` bash
umount [-addr <ip>]:/[alias path]
umount [path]
```

## 参考
- **[winnfsd/winnfsd](https://github.com/winnfsd/winnfsd)**
- **[Windows10 WSL2搭建支持nfs的hi3518开发环境](https://zhuanlan.zhihu.com/p/349253238)**
