---
id: esp32-demo-freertos_task_list
title: ''
sidebar_label: Task List
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

## vTaskList
``` c
void vTaskList( char *pcWriteBuffer );
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

## 参考
- **[FreeRTOS 接口: vTaskList() - 可优化内存和 task 栈溢出定位](https://blog.csdn.net/espressif/article/details/104719907)**
- **[ChatGPT](https://chat.openai.com/auth/login)**