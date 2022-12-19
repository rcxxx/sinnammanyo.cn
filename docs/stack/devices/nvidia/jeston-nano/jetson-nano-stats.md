---
id: jetson-nano-stats
title: Jetson Nano stats
sidebar_label: Jtop
---

我在使用 `Jetson Nano` 的时候，想像安装了 `GPU` 的设备一样查看相关信息时

我在终端输入

``` shell
nvidia-smi
```

得到如下结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/nvidia-smi-not-found.png)

这跟有GPU的PC上驱动版本不对时的情况一样，我有点纳闷，这镜像不是官方下载的吗，怎么驱动版本还会不对，于是我上网搜了一下，看到了这个链接

- **[Command nvidia-smi on Jetson Nano not working?](https://forums.developer.nvidia.com/t/command-nvidia-smi-on-jetson-nano-not-working/119702)**

里面提到 `nvidia-smi` 适用于桌面的 `GPU`，对于 `jetson` 系列的设备，可以使用 `tegrastats` 指令，我试了一下

```
tegrastats
```

大概是这个效果，感觉不是很直观

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-tegrastats.png)

于是我又查了一下，看到了这个链接

- **[Monitor GPU usage](https://forums.developer.nvidia.com/t/monitor-gpu-usage/72250)**

里面提到了 `jetson_stats` 这个工具，于是按着 **[rbonghi/jetson_stats](https://github.com/rbonghi/jetson_stats)** 里的说法安装了这个工具

重启设备以后

```
jtop
```

即可查看 `GPU` 的状态，非常的直观，放张对比图

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/jeston/nano/jetson-nano-jtop.png)

嗯，相当直观

## 参考
- **[rbonghi/jetson_stats](https://github.com/rbonghi/jetson_stats)**
- **[Monitor GPU usage](https://forums.developer.nvidia.com/t/monitor-gpu-usage/72250)**
- **[Command nvidia-smi on Jetson Nano not working?](https://forums.developer.nvidia.com/t/command-nvidia-smi-on-jetson-nano-not-working/119702)**