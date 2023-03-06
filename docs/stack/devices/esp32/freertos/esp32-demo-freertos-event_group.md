---
id: esp32-demo-freertos-event_group
title: ''
sidebar_label: Event Group
---

## ESP32 Demo FreeRTOS Event Group

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
### Event bits / Event groups
事件组由 `EventGroupHandle_t` 类型的变量引用，定义如下

``` c
struct EventGroupDef_t;
typedef struct EventGroupDef_t   * EventGroupHandle_t;
···
typedef struct EventGroupDef_t
{
    EventBits_t uxEventBits;
    List_t xTasksWaitingForBits; /*< List of tasks waiting for a bit to be set. */

    #if ( configUSE_TRACE_FACILITY == 1 )
        UBaseType_t uxEventGroupNumber;
    #endif

    #if ( ( configSUPPORT_STATIC_ALLOCATION == 1 ) && ( configSUPPORT_DYNAMIC_ALLOCATION == 1 ) )
        uint8_t ucStaticallyAllocated; /*< Set to pdTRUE if the event group is statically allocated to ensure no attempt is made to free the memory. */
    #endif

    portMUX_TYPE xEventGroupLock; /* Spinlock required for SMP critical sections */
} EventGroup_t;
```

事件组中的所有事件都存储在 EventBits_t 类型的无符号整形变量中

``` c
typedef uint32_t TickType_t;
···
typedef TickType_t               EventBits_t;
```

可如下定义

``` c
#define FLAG_0 BIT0
#define FLAG_1 BIT1
#define FLAG_2 BIT2
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freetros-event-group/EventGroupDatatype.png)

- 前三个事件位被用来描述事件，事件位 2 被设置

### API

#### [xEventGroupCreate()](https://www.freertos.org/zh-cn-cmn-s/xEventGroupCreate.html)

**创建新事件组**

#### [xEventGroupWaitBits()](https://www.freertos.org/zh-cn-cmn-s/xEventGroupWaitBits.html)

**读取 RTOS 事件组中的位，选择性堵塞任务**

``` c
EventBits_t xEventGroupWaitBits(
                    const EventGroupHandle_t xEventGroup,
                    const EventBits_t uxBitsToWaitFor,
                    const BaseType_t xClearOnExit,
                    const BaseType_t xWaitForAllBits,
                    TickType_t xTicksToWait );
```
- xEventGroup 创建好的事件组
- uxBitsToWaitFor 事件组中的一个或多个要等待的事件位
- xClearOnExit 如果设置为 TRUE 并且事件没有超时，则会在返回值之前清除掉事件位
- xWaitForAllBits 为 TRUE 则 uxBitsToWaitFor 中所传参数必须都被设置，为 FALSE 则 uxBitsToWaitFor 任何位被设置即可
- xTicksToWait 等待的最大时间，相当于任务堵塞的时间

:::warning
无法从中断中调用
:::

#### [xEventGroupSetBits()](https://www.freertos.org/zh-cn-cmn-s/xEventGroupSetBits.html)

**设置 RTOS 事件组中的位**

``` c
EventBits_t xEventGroupSetBits( EventGroupHandle_t xEventGroup,
                                const EventBits_t uxBitsToSet );
```
- xEventGroup 创建好的事件组
- uxBitsToSet 要设置的事件位的值

:::warning
无法从中断中调用
:::

## 示例代码

``` c
#include <stdio.h>
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"

static EventGroupHandle_t s_event_group;

#define EVENT_FLAG BIT23

void task_1(void *pt)
{
    ESP_LOGI("Task 1", "创建完成");
    while (1) {
        ESP_LOGW("TASK_1", "Wait for Task 2 Set Bit");
        xEventGroupWaitBits(s_event_group,
                            EVENT_FLAG,
                            pdTRUE,
                            pdFALSE,
                            portMAX_DELAY);
        ESP_LOGW("TASK_1", "Done");
    }
}

void task_2(void *pt)
{
    ESP_LOGI("TASK_2", "创建完成");
    while (1) {
        ESP_LOGW("TASK_2", "Delay of 5 seconds");

        vTaskDelay(5000 / portTICK_PERIOD_MS);
        xEventGroupSetBits(s_event_group, EVENT_FLAG);
    }
}

void task_3(void *pt)
{
    ESP_LOGI("Task 3", "创建完成");
    while (1) {
        ESP_LOGI("TASK_3", "Keep Running");

        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void app_main(void)
{
    s_event_group = xEventGroupCreate();

    xTaskCreate(task_1, "task_1", 1024 * 12, NULL, 1, NULL);
    xTaskCreate(task_2, "task_2", 1024 * 12, NULL, 1, NULL);
    xTaskCreate(task_3, "task_3", 1024 * 12, NULL, 1, NULL);
}
```

**运行结果**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-freetros-event-group/EventGroupResult.png)

- task_1 中的 xEventGroupWaitBits 将会堵塞任务，直至任务超时，或者 task_2 中的 xEventGroupSetBits 设置事件位后，继续执行
- task_3 不被影响


## 参考
- **[freertos-事件位（或标志）和事件组](https://www.freertos.org/zh-cn-cmn-s/FreeRTOS-Event-Groups.html)**
- **[lonelybinary/bilibili_wifi_event_group.c](https://gist.github.com/lonelybinary/eab79c894ac021893107fbc407d55055)**
