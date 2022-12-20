---
id: esp32-demo-blink
title: ''
sidebar_label: Demo Blink
---

## ESP32 Demo LED Blink

### 源码

``` c
/* Blink Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "led_strip.h"
#include "sdkconfig.h"

static const char *TAG = "example";

/* Use project configuration menu (idf.py menuconfig) to choose the GPIO to blink,
   or you can edit the following line and set a number here.
*/
#define BLINK_GPIO CONFIG_BLINK_GPIO

static uint8_t s_led_state = 0;

#ifdef CONFIG_BLINK_LED_RMT
static led_strip_t *pStrip_a;

static void blink_led(void)
{
    /* If the addressable LED is enabled */
    if (s_led_state) {
        /* Set the LED pixel using RGB from 0 (0%) to 255 (100%) for each color */
        pStrip_a->set_pixel(pStrip_a, 0, 16, 16, 16);
        /* Refresh the strip to send data */
        pStrip_a->refresh(pStrip_a, 100);
    } else {
        /* Set all LED off to clear all pixels */
        pStrip_a->clear(pStrip_a, 50);
    }
}

static void configure_led(void)
{
    ESP_LOGI(TAG, "Example configured to blink addressable LED!");
    /* LED strip initialization with the GPIO and pixels number*/
    pStrip_a = led_strip_init(CONFIG_BLINK_LED_RMT_CHANNEL, BLINK_GPIO, 1);
    /* Set all LED off to clear all pixels */
    pStrip_a->clear(pStrip_a, 50);
}

#elif CONFIG_BLINK_LED_GPIO

static void blink_led(void)
{
    /* Set the GPIO level according to the state (LOW or HIGH)*/
    gpio_set_level(BLINK_GPIO, s_led_state);
}

static void configure_led(void)
{
    ESP_LOGI(TAG, "Example configured to blink GPIO LED!");
    gpio_reset_pin(BLINK_GPIO);
    /* Set the GPIO as a push/pull output */
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);
}

#endif

void app_main(void)
{

    /* Configure the peripheral according to the LED type */
    configure_led();

    while (1) {
        ESP_LOGI(TAG, "Turning the LED %s!", s_led_state == true ? "ON" : "OFF");
        blink_led();
        /* Toggle the LED state */
        s_led_state = !s_led_state;
        vTaskDelay(CONFIG_BLINK_PERIOD / portTICK_PERIOD_MS);
    }
}
```

### 实现

**定义 LED 的 GPIO，声明 LED 的初始状态**

``` c
#define BLINK_GPIO CONFIG_BLINK_GPIO

static uint8_t s_led_state = 0;
```

**LED 初始化**

``` c
static void configure_led(void)
{
    ESP_LOGI(TAG, "Example configured to blink GPIO LED!");
    gpio_reset_pin(BLINK_GPIO);
    /* Set the GPIO as a push/pull output */
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);
}
```

**通过设置引脚的高低电平改变 LED 状态**

``` c
static void blink_led(void)
{
    /* Set the GPIO level according to the state (LOW or HIGH)*/
    gpio_set_level(BLINK_GPIO, s_led_state);
}
```

**循环取反设置LED状态，并执行延时**

``` c
while (1) {
    ESP_LOGI(TAG, "Turning the LED %s!", s_led_state == true ? "ON" : "OFF");
    blink_led();
    /* Toggle the LED state */
    s_led_state = !s_led_state;
    vTaskDelay(CONFIG_BLINK_PERIOD / portTICK_PERIOD_MS);
}
```

烧录程序后发现并没有 LED 闪烁的效果，原因是GPIO的引脚不对，官方例程中的GPIO设置为 `CONFIG_BLINK_GPIO=5`

测试后，针对我这块开发板，将其修改为 `2`

这里我们需要修改项目根目录下的 `sdkconfig` 文件

``` conf
···
#
# Example Configuration
#
CONFIG_BLINK_LED_GPIO=y
# CONFIG_BLINK_LED_RMT is not set
CONFIG_BLINK_GPIO=2
CONFIG_BLINK_PERIOD=1000
# end of Example Configuration
···
```

**修改后重新烧录程序，LED开始闪烁**

- 将编译模式修改为 `monitor` ，按 `ctrl + F9` 进入监测模式

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-blink/monitor.png)

**输出 log 信息**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-blink/monitor-output.png)


## 参考
- **[基于VScode的ESP32开发学习（一）：官方例程blink，周期闪烁led详解，优信esp32简单修改适配](https://blog.csdn.net/Aspiration_H/article/details/124226833)**

