---
id: esp32-CLion-flash-seria-port-permission
title: ''
sidebar_label: CLion Flash Settings
---

## CLion & esp32 执行烧录前执行脚本赋予串口权限

使用 `esp32` 时，`CLion` 虽然能很方便的执行编译，烧录，监测等功能，但是串口权限问题成为了一个非常不方便的点（Ubuntu系统下）

每次拔插硬件之后就会导致设置过的串口权限失效

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/flash-auto-permission/connect-error.png)

尤其是等编译完之后发现权限忘记设置了，就需要再次执行，然后再次编译

```
sudo chmod 777 /dev/ttyUSB*
# 或者是
sudo chmod 777 /dev/ttyACM*
```

非常不方便，但是 `CLion` 有一个在执行功能前执行脚本的设置，可以保证在需要烧录的时候先执行一个脚本赋予串口权限，这样就不用担心忘记给权限的问题

先新建一个脚本

```sh title="flash_permission.sh"
echo "your password" | sudo -S chmod 777 /dev/ttyUSB*
echo "your password" | sudo -S chmod 777 /dev/ttyACM*
```

给串口执行权限

```
sudo chmod 777 flash_permission.sh
```

然后打开 `CLion` 设置

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/flash-auto-permission/flash-setting.png)

在执行前添加运行外部工具，将编辑好的脚本添加进去

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/flash-auto-permission/add-external-tools.png)

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/flash-auto-permission/add-script.png)

然后将位置调整到编译之前

之后使用快捷键 `Shift + F10` 之间运行烧录任务，成功赋予串口权限，之后每次拔插硬件就不要再进行权限的设置了，直接编译后烧录即可

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/flash-auto-permission/conncet-success.png)
