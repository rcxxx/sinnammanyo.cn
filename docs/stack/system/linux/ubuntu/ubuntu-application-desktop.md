---
id: ubuntu-application-desktop
title: ''
sidebar_label: Add Application
---

## Ubuntu 添加软件到 Application

Ubuntu 的应用程序启动器实际上是 `/usr/share/applications/` 目录

``` shell
ls /usr/share/applications/
```

可以看到所有的应用程序，而有一些应用程序是直接打包好的，不是直接安装的，使用可执行文件启动，例如腾讯云的对象存储管理工具 `COSBrowser`

- *[COSBrowser 简介](https://cloud.tencent.com/document/product/436/11366)*

可以通过创建一个相应的 `.desktop` 文件，给可执行文件添加快捷方式

```
sudo vim /usr/share/applications/cosbrowser.desktop
```

写入内容

``` shell
[Desktop Entry]
Encoding=UTF-8
Name=cosbrowser
Exec=~/cosbrowser-2.8.3-linux/cosbrowser.AppImage
Terminal=false
Type=Application
Categories=Application;Development;
```
- Name 为你想要的应用程序的名字
- Exex 中填入可执行文件的路径
- `Terminal=false` 表示不伴随终端启动

之后就能在 `应用程序显示` 中找到你设置的程序

还有一些可选配置，例如 `Icon` 等，可以参照规范进行配置
- *[Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html)*

## 参考
- **[Desktop Entry Specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html)**
- **[unbuntu手动创建桌面快捷方式desktop文件详解](https://blog.csdn.net/u011198687/article/details/121806095)**
