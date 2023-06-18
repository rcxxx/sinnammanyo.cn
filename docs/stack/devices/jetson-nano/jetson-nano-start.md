---
id: jetson-nano-start
title: Nvidia Jetson Nano
sidebar_label: Jetson Nano Start
---

## **[`Jetson-Nano`](https://developer.nvidia.com/zh-cn/embedded/jetson-nano-developer-kit)**
![](https://developer.nvidia.com/sites/default/files/akamai/embedded/images/jetsonNano/JetsonNano-DevKit_Front-Top_Right_trimmed.jpg)


- `Jetson Nano` 是 `Nvidia` 所推出的低配 `GPU` 运算平台，体积小，功耗低，适合用来做一些算力需求不高的网络计算任务

## Start
有关 `Jetson Nano` 的系统安装，可以参考官方的教程
- **[Jetson Nano 开发者套件入门](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#write)**

也可以参考亚博智能的安装教程
- **[2.Jetson Nano烧写系统镜像](https://www.yahboom.com/build.html?id=2493&cid=301)**

### 准备工作
1. 电源线：可以是 `5V⎓2A` 的 `MicroUSB` 线，也可以是 `5V⎓4A` 的 `DC` 供电线
   - 如果使用 `MicroUSB` 线供电，注意要将 `J48` 针脚上的跳线帽 **拿开**，避免短接，如果使用 `DC` 线供电，则要将 `J48` 针脚用跳线帽 **短接**
2. SD卡
   - 推荐使用 `32GB` 以上的 `SD卡`，用来进行操作系统的安装

3. `HDMI`/`DP` 视屏线以及相应的显示器
4. 键盘和鼠标

### 系统安装
- 软件安装
  - **[`SD Memory Card Formatter`](https://www.sdcard.org/downloads/formatter/sd-memory-card-formatter-for-windows-download/)**

  - **[`balenaEtcher`](https://www.balena.io/etcher/)**

  - **[`MobaXterm`](https://mobaxterm.mobatek.net/)**

- 镜像下载
  - 在 **[Jetson 下载中心](https://developer.nvidia.com/zh-cn/embedded/downloads)** 中，选择 `JETSON NANO 开发者工具>` 下载相应的镜像



- 烧录镜像

1. 启动 `SD Memory Card Formatter` 对 `SD卡` 进行格式化

![](https://developer.nvidia.com/sites/default/files/akamai/embedded/images/jetsonNano/gettingStarted/Jetson_Nano-Getting_Started-Windows-SD_Card_Formatter.png)

2. 启动 `Etcher` 选择下载好的镜像
3. 选择要烧录镜像的 `SD卡`
4. 点击 `Flash!` 等待烧录完成
   - 烧录完成后，由于文件系统不一致，`Windows` 会提示你无法找到驱动器，这时候不用管，弹出驱动器即可

![](https://developer.nvidia.com/sites/default/files/akamai/embedded/images/jetsonNano/gettingStarted/Jetson_Nano-Getting_Started-Windows-Etcher_Select_Drive.png)

### 系统设置
有关系统初始化可以参考官方的教程
- [安装和首次启动](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#setup)

系统为熟悉的 `Ubuntu` 系统，之前已经记录过不少，这里就不再多说

### VNC远程桌面配置
可以参考亚博智能的文章
- [Jetson nano通过vnc远程桌面控制](https://www.yahboom.com/build.html?id=2500&cid=301)

- 安装vino

``` bash
sudo apt update && sudo apt install vino
sudo ln -s ../vino-server.service /usr/lib/systemd/user/graphical-session.target.wants
gsettings set org.gnome.Vino prompt-enabled false
gsettings set org.gnome.Vino require-encryption false
```

编辑 `org.gnome.Vino.gschema.xml`，在最后一个 `</key>` 后添加如下内容
- `sudo vim /usr/share/glib-2.0/schemas/org.gnome.Vino.gschema.xml`

``` xml
<key name='enabled' type='b'>
  <summary>Enable remote access to the desktop</summary>
  <description>
    If true, allows remote access to the desktop via the RFB
    protocol. Users on remote machines may then connect to the
    desktop using a VNC viewer.
  </description>
  <default>false</default>
</key>
```
- 添加后按 `ESC` 进入命令模式，输入 `:wq` 退出

命令行继续输入

``` bash
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
/usr/lib/vino/vino-server
```

这样就启动了 `VNC` 服务

接下来设置登录密码和开机自启动，将下面的 `thepassword`
``` bash
gsettings set org.gnome.Vino authentication-methods "['vnc']"
gsettings set org.gnome.Vino vnc-password $(echo -n 'thepassword'|base64)
```

- 设置开机自启动

```
gsettings set org.gnome.Vino enabled true
mkdir -p ~/.config/autostart
vim ~/.config/autostart/vino-server.desktop
```

- 将下面的内容添加到 `vino-server.desktop` 中
```
[Desktop Entry]
Type=Application
Name=Vino VNC server
Exec=/usr/lib/vino/vino-server
NoDisplay=true
```

- 然后 `sudo reboot` 重启，打开 `MobaXterm` 测试 VNC 远程桌面与 ssh 链接

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-vnc-remote.png)

成功连接

:::info
这里推荐下载 **[Todesk](https://www.todesk.com/linux.html)** 来进行远程桌面链接，不用配置，但对网络连接要求比较高，可以根据自己需求选择
:::

## 参考
- **[Jetson Nano 开发者套件入门](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#intro)**
- **[Jetson nano通过vnc远程桌面控制](https://www.yahboom.com/build.html?id=2500&cid=301)**