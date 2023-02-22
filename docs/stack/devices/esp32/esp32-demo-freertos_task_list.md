---
id: esp32-demo-freertos_task_list
title: ''
sidebar_label: freertos_task_list
---

## ESP32 Demo FreeRTOS Task List

name | version 
---------|----------
 System | **[Ubuntu 20.04](https://releases.ubuntu.com/20.04/)**
 CMake  | **[3.10](https://cmake.org/)** ≥
 ESP-IDF | **[master--v5.1](https://github.com/espressif/esp-idf)**
 ESP-IDF Programming GuideLogo | **[v5.1](https://docs.espressif.com/projects/esp-idf/en/release-v5.1/esp32/index.html)**
 Device | ESP32-S3-WROOM-1

 **创建空项目**

- 激活环境
``` shell
. ~/esp/esp-idf/export.sh 
```

- 创建项目
``` shell
idf.py create-project ${project_name}
```

示例代码

``` c title="FreeRTOS_Task_List.c"
#include <stdio.h>
#include <stdlib.h>
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"

void esp_task_list(void)
{
    char *p_buffer = (char *)calloc(1, 2048);
    printf("*****************heap:%lu******************\n", esp_get_free_heap_size());
    vTaskList(p_buffer);
    printf("Task           State   Prio    Stack    Num\n");
    printf("-------------------------------------------\n");
    printf("%s", p_buffer);
    printf("*******************************************\n");
    free(p_buffer);
}

void app_main(void)
{
   while (1) {
       esp_task_list();
       vTaskDelay(3000 / portTICK_PERIOD_MS);
   }
}
```

:::warning

> 使用 vTaskList() 前需使能:
> - `make menuconfig` -> `Component config` -> `FreeRTOS` -> Enable FreeRTOS trace facility
> - `make menuconfig` -> `Component config` -> `FreeRTOS` -> Enable FreeRTOS trace facility -> Enable FreeRTOS stats formatting functions
> 
> 通过上面配置，等同于使能 FreeRTOSConfig.h 中如下两个宏:
> configUSE_TRACE_FACILITY 和 configUSE_STATS_FORMATTING_FUNCTIONS

:::

- 可以直接在 `CMakeLists.txt` 中使用 `add_compile_definitions` 使能这两个宏

``` makefile title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.16)

add_compile_definitions(configUSE_TRACE_FACILITY=1)
add_compile_definitions(configUSE_STATS_FORMATTING_FUNCTIONS=1)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(FreeRTOS_Task_List)
```

编译运行后执行结果，结果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/result.png)

## 补充

CLion 配置项目完成之后的编译，烧录操作还算正常，但是监测功能在使用的时候出现结果为空的情况

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/result-none.png)

并且每次修改代码之后，都要依次选择编译、烧录、监测三个功能，相当繁琐，经过跟 `ChatGPT` 的交流之后，找到一个方法可以一次解决所有问题

在 CLion 的运行/调试配置中，可以使用脚本文本方式来自定义编译、烧录和监控 ESP-IDF 项目

1. 点击 CLion 工具栏，在下拉菜单中选择 `编辑配置（Edit Configurations）`。

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/edit-cfg.png)

2. 左上角的加号 `添加配置（Add New Configuration）`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/add-new.png)

3. 选择添加 `Shell Script`
   
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/shell-script.png)

4. 选择脚本文本

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freertos-task-list/script-text.png)

5. 在 `脚本文本` 一栏中填入终端命令语句

``` bash
. ~/esp/esp-idf/export.sh && idf.py build && idf.py -p /dev/ttyACM0 -b 115200 flash && idf.py -p /dev/ttyACM0 -b 115200 monitor
```
- `. ~/esp/esp-idf/export.sh` 激活环境的脚本，脚本路径根据自己的安装位置修改
- `idf.py build` 编译项目
- `idf.py -p /dev/ttyACM0 -b 115200 flash` 烧录项目，端口以及波特率根据自己的需求修改
- `idf.py -p /dev/ttyACM0 -b 115200 monitor` 监测项目，同上

然后即可点击 run，直接执行三步操作

### 结束监测

**终端中的 `monitor` 监测使用快捷键 `CTRL + ]`退出监测**

## 参考
- **[FreeRTOS 接口: vTaskList() - 可优化内存和 task 栈溢出定位](https://blog.csdn.net/espressif/article/details/104719907)**
- **[ChatGPT](https://chat.openai.com/auth/login)**