---
id: cc-boost-install
title: C++ 标准库拓展boost库
sidebar_label: install
---

boost库是为C++语言标准库提供扩展的一些C++程序库的总称

## Windows10+VS2017配置boost库
boost[官网](https://www.boost.org/)

在官网下载页面找到自己需要下载的版本，这里选择[1.67.0版本](https://www.boost.org/users/history/version_1_67_0.html)

选择 **`Windows Binaries`** ，即下载Windows的可执行文件，这个是预先构建好的安装程序，直接安装到指定目录下即可，不需要从源码编译

![](https://raw.githubusercontent.com/rcxxx/my-img/main/img/screenshot/download-boost.png)

之后在**VS2017**项目属性中配置包含目录和库目录即可

![](https://raw.githubusercontent.com/rcxxx/my-img/main/img/screenshot/vs2017-config-boost.png)

---
## 从源码编译boost库