---
id: jetson-nano-UART
title: Jetson Nano UART ttyTHS*
sidebar_label: UART
---

## /dev/ttyTHS*
`Nano` 的 `40pin` 针脚的 `8` 和 `10` 号引脚分别为 `UART_2TX` 和 `UART_2RX`，可以直接作为串口端口使用

使用过程中端口的权限默认为仅写入，如果要使用串口，则需要修改相应的端口权限

``` bash
sudo chmod a=wr /dev/ttyTHS*
# 或者直接给 666 或 777
sudo chmod 666 /dev/ttyTHS*
```

然后串口就可以直接使用

## 系统启动时开启权限
当想在系统启动时直接赋予串口端口权限，已保证直接启动的程序可以正常的使用串口端口，有几种方法可以实现

- `sh` 文件

在脚本中写入

``` shell
echo "password" | sudo -S sudo chmod 666 /dev/ttyTHS* &
```

这样执行脚本的时候就可以直接赋予串口端口权限

- 将用户加入用户组

``` bash
ls -l /dev/ttyTHS1 # /dev/ttyTHS2
```

查看相关端口的所属用户组，一般为 `root dialout`

``` bash
sudo usermod -aG dialout $USER
```

设置后重启生效

:::danger ❌

但是在使用过程中，我发现重启后串口端口的权限并没有被正确的设置，导致串口相关的程序也一直崩溃

:::

- NVIDIA论坛上的 **[相关回答](https://forums.developer.nvidia.com/t/read-write-permission-ttyths1/81623/5)** 解决了这个问题

前面所做的设置都是有效的，但是一个叫 `nvgetty` 的服务随后又将 `ttyTHS*` 的权限修改了，在停止并且禁用该服务之后，前面的设置将正常生效

``` bash
systemctl stop nvgetty
systemctl disable nvgetty
reboot
```

然后需要重复其前面的步骤...

## 参考
- **[Read & write permission ttyTHS1](https://forums.developer.nvidia.com/t/read-write-permission-ttyths1/81623)**
- **[Nvidia Jetson Nano GPIO](https://sinnammanyo.cn/personal-site/docs/computer/pc/devices/nvidia/jeston-nano/jetson-nano-gpio)**
- **[ubuntu14.04 放开串口权限](https://www.cnblogs.com/lvchaoshun/p/5911903.html)**
- **[Python 串口库 pyserial](https://sinnammanyo.cn/personal-site/docs/computer/programming/py/python-serial)**