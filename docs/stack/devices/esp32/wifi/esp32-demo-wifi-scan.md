---
id: esp32-demo-wifi-scan
title: ''
sidebar_label: Wi-Fi Scan
---

# ESP32 Demo Wi-Fi Scan

name | version 
---------|:----------:
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

关于项目 `CMake` 的配置可以参照
- *[在 CLion 中配置 ESP_CMake 项目](https://sinnammanyo.cn/stack/devices/esp32/esp32-idf-Clion-env)*

## Wi-Fi Init
**头文件**
``` c
#include "esp_wifi.h"
#include "nvs_flash.h"
```

``` c
ESP_LOGI("WIFI", "0. 初始化NVS存储");
esp_err_t ret = nvs_flash_init();
if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
{
    ESP_ERROR_CHECK(nvs_flash_erase());
    ret = nvs_flash_init();
}
ESP_ERROR_CHECK(ret);

ESP_LOGI("WIFI", "1. Wi-Fi 初始化");
ESP_ERROR_CHECK(esp_netif_init());
ESP_ERROR_CHECK(esp_event_loop_create_default());
esp_netif_create_default_wifi_sta();

wifi_init_config_t wifi_config = WIFI_INIT_CONFIG_DEFAULT();
ESP_ERROR_CHECK(esp_wifi_init(&wifi_config));

ESP_LOGI("WIFI", "创建 APP TASK 和 Event Group");
s_wifi_envent_group = xEventGroupCreate();
xTaskCreate(app_task, "APP TASK", 1024 * 12, NULL, 1, NULL);

ESP_LOGI("WIFI", "2. Wi-Fi 配置");
ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));

ESP_LOGI("WIFI", "3. Wi-Fi 启动");
ESP_ERROR_CHECK(esp_wifi_start());
```

## Wi-Fi Scan
**头文件**
``` c
#include "esp_wifi.h"
```
- 设置国家/地区
``` c
esp_err_t esp_wifi_set_country(const wifi_country_t *country);
```
- 开始扫描
``` c
esp_err_t esp_wifi_scan_start(const wifi_scan_config_t *config, bool block);
```
- 返回扫描到的 ap 数量
``` c
esp_err_t esp_wifi_scan_get_ap_num(uint16_t *number);
```

- 返回扫描记录
``` c
esp_err_t esp_wifi_scan_get_ap_records(uint16_t *number, wifi_ap_record_t *ap_records);
```
- `wifi_ap_record_t *ap_records` 结构体定义
``` c
/** @brief Description of a WiFi AP */
typedef struct {
    uint8_t bssid[6];                     /**< MAC address of AP */
    uint8_t ssid[33];                     /**< SSID of AP */
    uint8_t primary;                      /**< channel of AP */
    wifi_second_chan_t second;            /**< secondary channel of AP */
    int8_t  rssi;                         /**< signal strength of AP */
    wifi_auth_mode_t authmode;            /**< authmode of AP */
    wifi_cipher_type_t pairwise_cipher;   /**< pairwise cipher of AP */
    wifi_cipher_type_t group_cipher;      /**< group cipher of AP */
    wifi_ant_t ant;                       /**< antenna used to receive beacon from AP */
    uint32_t phy_11b:1;                   /**< bit: 0 flag to identify if 11b mode is enabled or not */
    uint32_t phy_11g:1;                   /**< bit: 1 flag to identify if 11g mode is enabled or not */
    uint32_t phy_11n:1;                   /**< bit: 2 flag to identify if 11n mode is enabled or not */
    uint32_t phy_lr:1;                    /**< bit: 3 flag to identify if low rate is enabled or not */
    uint32_t phy_11ax:1;                  /**< bit: 4 flag to identify if 11ax mode is enabled or not */
    uint32_t wps:1;                       /**< bit: 5 flag to identify if WPS is supported or not */
    uint32_t ftm_responder:1;             /**< bit: 6 flag to identify if FTM is supported in responder mode */
    uint32_t ftm_initiator:1;             /**< bit: 7 flag to identify if FTM is supported in initiator mode */
    uint32_t reserved:24;                 /**< bit: 8..31 reserved */
    wifi_country_t country;               /**< country information of AP */
    wifi_he_ap_info_t he_ap;              /**< HE AP info */
} wifi_ap_record_t;
```

### 示例程序

``` c
#include <stdio.h>
#include <esp_wifi.h>
#include <string.h>

#include "esp_log.h"
#include "nvs_flash.h"

void app_main(void)
{
    ESP_LOGI("WIFI", "0. 初始化 NVS 存储");
    /* 如果使能 Wi-Fi NVS flash，
     * 所有通过 Wi-Fi API 设置的 Wi-Fi 配置都会被存储到 flash 中，
     * Wi-Fi 驱动程序在下次开机或重启时将自动加载这些配置。
     * */
    nvs_flash_init();

    ESP_LOGI("WIFI", "1. Wi-Fi 初始化阶段");
    // 创建一个 LwIP 核心任务，并初始化 LwIP 相关工作
    esp_netif_init();
    // 创建一个系统事件任务，并初始化应用程序事件的回调函数
    esp_event_loop_create_default();
    // 创建有 TCP/IP 堆栈的默认网络接口实例绑定 station
    esp_netif_create_default_wifi_sta();
    // 创建 Wi-Fi 驱动程序任务，并初始化 Wi-Fi 驱动程序
    wifi_init_config_t wifi_config = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&wifi_config);

    ESP_LOGI("WIFI", "2. Wi-Fi 配置阶段");
    // 将 Wi-Fi 模式配置为 station 模式
    esp_wifi_set_mode(WIFI_MODE_STA);

    ESP_LOGI("WIFI", "3. Wi-Fi 启动阶段");
    // 启动 Wi-Fi 驱动程序
    esp_wifi_start();

    ESP_LOGI("WIFI", "4. Wi-Fi 扫描");
    // 设置国家/地区信息
    wifi_country_t country_config = {
            .cc = "CN",
            .schan = 1,
            .nchan = 13,
            .policy = WIFI_COUNTRY_POLICY_AUTO,
    };
    esp_wifi_set_country(&country_config);

    wifi_scan_config_t scan_config = {
            .show_hidden=true
    };
    esp_wifi_scan_start(&scan_config, true);
    uint16_t ap_num = 0;
    ESP_ERROR_CHECK(esp_wifi_scan_get_ap_num(&ap_num));
    ESP_LOGI("WIFI", "AP Count: %d", ap_num);

    uint16_t max_aps = 20;
    wifi_ap_record_t ap_records[max_aps];
    memset(ap_records, 0, sizeof(ap_records));

    uint16_t aps_count = max_aps;
    ESP_ERROR_CHECK(esp_wifi_scan_get_ap_records(&aps_count, ap_records));

    ESP_LOGI("WIFI", "AP Count: %d", aps_count);
    printf("%30s %s %s %s\n", "SSID", "频道", "强度", "MAC地址");

    for (int i = 0; i < aps_count; ++i) {
        printf(
                "%30s  %3d  %3d  %02X-%02X-%02X-%02X-%02X-%02X\n",
                ap_records[i].ssid,
                ap_records[i].primary,
                ap_records[i].rssi,
                ap_records[i].bssid[0],
                ap_records[i].bssid[1],
                ap_records[i].bssid[2],
                ap_records[i].bssid[3],
                ap_records[i].bssid[4],
                ap_records[i].bssid[5]
        );
    }
}
```

执行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-wifi/scan-result.png)

## FreeRTOS Event Group Wi-Fi Scan
**使用 FreeRTOS 事件组执行 Wi-Fi 扫描**

``` c
#include <stdio.h>
#include <string.h>

#include "esp_log.h"
#include "esp_wifi.h"
#include "nvs_flash.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_task_wdt.h"
#include "freertos/event_groups.h"

static EventGroupHandle_t s_wifi_envent_group;

#define STA_START BIT0
#define SCAN_DONE BIT1

void run_on_event(void *handler_arg, esp_event_base_t base, int32_t id, void *event_data)
{
    ESP_LOGI("EVENT_HANDEL", "BASE:%s, ID:%ld", base, id);

    switch (id) {
        case WIFI_EVENT_STA_START:
            ESP_LOGW("EVENT_HANDEL", "WIFI_EVENT_STA_START");
            xEventGroupSetBits(s_wifi_envent_group, STA_START);
            break;
        case WIFI_EVENT_SCAN_DONE:
            ESP_LOGW("EVENT_HANDEL", "WIFI_EVENT_SCAN_DONE");
            xEventGroupSetBits(s_wifi_envent_group, SCAN_DONE);
            break;
        default:
            break;
    }
}

void app_task(void *pt)
{
    ESP_LOGI("APP_TASK", "APP Task Create Done");

    esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, run_on_event, NULL);

    while(1) {
        xEventGroupWaitBits(s_wifi_envent_group,
                            STA_START,
                            pdFALSE,
                            pdFALSE,
                            portMAX_DELAY);
        ESP_LOGW("APP_TASK", "接收到 STA_START 事件，执行 WIFI Scan");
        wifi_country_t country_config = {
                .cc = "CN",
                .schan = 1,
                .nchan = 13,
                .policy = WIFI_COUNTRY_POLICY_AUTO,
        };
        ESP_ERROR_CHECK(esp_wifi_set_country(&country_config));
        ESP_ERROR_CHECK(esp_wifi_scan_start(NULL, false));

        xEventGroupWaitBits(s_wifi_envent_group,
                            SCAN_DONE,
                            pdFALSE,
                            pdFALSE,
                            portMAX_DELAY);

        ESP_LOGW("APP_TASK", "接收到 SCAN_DONE 时间，输出 Scan 结果");
        uint16_t ap_num = 0;
        ESP_ERROR_CHECK(esp_wifi_scan_get_ap_num(&ap_num));
        ESP_LOGI("WIFI", "AP Count: %d", ap_num);

        uint16_t max_aps = 20;
        wifi_ap_record_t ap_records[max_aps];
        memset(ap_records, 0, sizeof(ap_records));

        uint16_t aps_count = max_aps;
        ESP_ERROR_CHECK(esp_wifi_scan_get_ap_records(&aps_count, ap_records));

        ESP_LOGI("WIFI", "AP Count: %d", aps_count);
        printf("%30s %s %s %s\n", "SSID", "频道", "强度", "MAC地址");

        for (int i = 0; i < aps_count; ++i) {
            printf(
                    "%30s  %3d  %3d  %02X-%02X-%02X-%02X-%02X-%02X\n",
                    ap_records[i].ssid,
                    ap_records[i].primary,
                    ap_records[i].rssi,
                    ap_records[i].bssid[0],
                    ap_records[i].bssid[1],
                    ap_records[i].bssid[2],
                    ap_records[i].bssid[3],
                    ap_records[i].bssid[4],
                    ap_records[i].bssid[5]
            );
        }

        vTaskDelete(NULL);
    }
}

void app_main(void)
{
    ESP_LOGI("WIFI", "0. 初始化NVS存储");
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    ESP_LOGI("WIFI", "1. Wi-Fi 初始化");
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t wifi_config = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&wifi_config));

    ESP_LOGI("WIFI", "创建 APP TASK 和 Event Group");
    s_wifi_envent_group = xEventGroupCreate();
    xTaskCreate(app_task, "APP TASK", 1024 * 12, NULL, 1, NULL);

    ESP_LOGI("WIFI", "2. Wi-Fi 配置");
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));

    ESP_LOGI("WIFI", "3. Wi-Fi 启动");
    ESP_ERROR_CHECK(esp_wifi_start());

    while(1)
    {
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
```

## 参考
- **[WIFI扫描 - 乐鑫 ESP32 物联网开发框架 ESP-IDF 开发入门 - 孤独的二进制出品](https://www.bilibili.com/video/BV16G4y1g72w/?spm_id_from=333.788&vd_source=4cca3a7520260c460d94cf70a3f0a5ba)**
