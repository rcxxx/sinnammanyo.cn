---
id: esp32-freertos-task
title: ''
sidebar_label: Task
---

# ESP32 FreeRTOS Task

## FreeRTOS

`[FreeRTOS](https://www.freertos.org/)` 是完全免费的实时操作系统
- *[开发者文档](https://www.freertos.org/zh-cn-cmn-s/features.html)*

ESP-IDF 中已经移植了 FreeRTOS

## Task Create
``` c
BaseType_t xTaskCreate(    TaskFunction_t pvTaskCode,
                        const char * const pcName,
                        configSTACK_DEPTH_TYPE usStackDepth,
                        void *pvParameters,
                        UBaseType_t uxPriority,
                        TaskHandle_t *pxCreatedTask
                        );
```
- `pvTaskCode` 任务入口函数指针
- `pcName` 任务名称
- `usStackDepth` 分配的堆栈空间
- `pvParameters` 传递给任务函数的参数
- `uxPriority` 任务优先级
- `pxCreatedTask` 任务句柄

用法示例

``` c
void appTask( void * pvParameters )
{
    while(1) {
        ESP_LOGI("app", "Running......");
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}

void app_main(void)
{
    BaseType_t xReturned;
    TaskHandle_t xHandle = NULL;

    xReturned = xTaskCreate(appTask, "appTask", 1024 * 2, NULL, 1, xHandle);
}
```

## Task Delete
``` c
void vTaskDelete( TaskHandle_t xTask );
```

用法示例

``` c
void appTask( void * pvParameters )
{
    // ...
}

void app_main(void)
{
    BaseType_t xReturned;
    TaskHandle_t xHandle = NULL;

    xReturned = xTaskCreate(appTask, "appTask", 1024 * 2, NULL, 1, xHandle);

    // if (xReturned == pdPASS){
    //     vTaskDelete(xHandle);
    // }
    if (xHandle != NULL) {
        vTaskDelete(xHandle);
    }
}
```

或者在任务结束时自行 delete

``` c
void appTask( void * pvParameters )
{
    // ...
    vTaskDelete(NULL);
}

void app_main(void){
    xTaskCreate(appTask, "appTask", 1024 * 2, NULL, 1, NULL);

}
```

## Task Param Input

- int 整型

``` c
void appTask_int(void *pvParameters)
{
    int num = *((int*)pvParameters);
    ESP_LOGI("App Task", "num: %d\n", num);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    vTaskDelete(NULL);
}

void app_main(void)
{
    int num = 1;
    xTaskCreate(appTask_int, "App Task int", 1024 * 2, (void *)&num, 1, NULL);

}
```

- array 数组

``` c
void appTask_array( void * pvParameters )
{
    int *p_array = (int *)pvParameters;
    ESP_LOGI("App Task", "array %d\n", *p_array);
    for (int i = 0; i < sizeof(p_array); ++i){
        ESP_LOGI("App Task", "num %d: %d\n", i+1, *(p_array + i));
    }
    vTaskDelay(500 / portTICK_PERIOD_MS);
    vTaskDelete(NULL);
}

void app_main(void)
{
    int nums[] = {1, 2, 3, 4};
    xTaskCreate(appTask_array, "App Task array", 1024 * 2, (void *)nums, 1, NULL);
    vTaskDelay(2000 / portTICK_PERIOD_MS);
}
```

- struct 结构体

``` c
typedef struct Num_Struct {
    int num_1;
    int num_2;
}Num_t;

void appTask_struct( void * pvParameters )
{
    Num_t *p_num_t = (Num_t *)pvParameters;
    ESP_LOGI("App Task", "num 1: %d, num 2: %d\n", p_num_t->num_1, p_num_t->num_2);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    vTaskDelete(NULL);
}

void app_main(void)
{
    Num_t num_t = {
        .num_1 = 1,
        .num_2 = 2,
    };
    xTaskCreate(appTask, "appTask", 1024 * 2, (void *)&num_t, 1, NULL);
}
```

- 字符串

``` c
void appTask_str( void * pvParameters )
{
    char *p_text = (char *)pvParameters;
    ESP_LOGI("App Task", "message: %s\n", p_text);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    vTaskDelete(NULL);
}

void app_main(void)
{
    const char *p_text = "Hello World!";
    xTaskCreate(appTask_str, "App Task str", 1024 * 2, (void *)p_text, 1, NULL);
}
```

:::caution

由于使用指针进行参数传递，能够传入各种需要的参数，但是需要保证在任务结束之前，传入的指针参数不能被修改

:::


