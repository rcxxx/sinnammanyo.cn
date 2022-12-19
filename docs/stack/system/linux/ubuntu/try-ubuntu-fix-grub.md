---
id: try-ubuntu-fix-grub
title: 启动盘 Try Ubuntu 修复 grub 引导
sidebar_label: 修复 grub 引导
---

有时候 Ubuntu 系统更新后，出现突然抽风进不了系统的问题，一般情况下是 grub 的引导文件丢失了，系统会进入紧急修复模式，即

```
grub rescue>_
```

这时候需要准备一个空闲的 U 盘，将其清空后解压一个 Ubuntu 的系统镜像进去（制作一个启动盘）

然后重启系统进入 Boot，选择进入启动盘，然后选择 `try ubuntu` 进入临时的 `ubuntu` 系统

链接网络，安装 `boot-repair` 进行引导文件的修复

```
sudo add-apt-repository ppa:yannubuntu/boot-repair && sudo apt-get update
```

启动 `boot-repair` 修复引导

```
sudo apt-get install -y boot-repair && (sudo boot-repair &)
```

选择几个选项后即开始引导修复，修复完成后重启即可

如果你安装了双系统，想在 `grub` 中找到 windows 的启动项

打开 terminal 更新下 grub 即可

```
sudo update-grub
```