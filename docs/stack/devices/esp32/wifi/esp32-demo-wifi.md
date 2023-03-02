---
id: esp32-demo-wifi
title: ''
sidebar_label: Demo Wifi
---

# ESP32 Demo Wi-Fi

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

## ESP32 Wi-Fi Station General Scenario

### 初始化 NVS 存储
- *[Wi-Fi NVS Flash](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/wifi.html#wi-fi-nvs-flash)*

使能 NVS Flash，下一次开机或者是重启后能自动加载配置

``` c
esp_err_t nvs_flash_init(void)
```


### Wi-Fi/LwIP 初始化阶段

- 创建一个 LwIP 核心任务，并初始化 LwIP 相关工作

``` c
esp_err_t esp_netif_init(void)
```

-创建一个系统事件任务，并初始化应用程序事件的回调函数

``` c
esp_err_t esp_event_loop_create_default(void)
```

-创建有 TCP/IP 堆栈的默认网络接口实例绑定 station

``` c
esp_netif_t* esp_netif_create_default_wifi_sta(void)
```

-创建 Wi-Fi 驱动程序任务，并初始化 Wi-Fi 驱动程序

``` c
esp_err_t esp_wifi_init(const wifi_init_config_t *config)
```

### Wi-Fi 配置阶段
- 将 Wi-Fi 模式配置为 station 模式

``` c
esp_err_t esp_wifi_set_mode(wifi_mode_t mode);
```

### Wi-Fi 启动阶段
- 启动 Wi-Fi 驱动程序

``` c
esp_err_t esp_wifi_start(void);
```

### Wi-Fi 扫描阶段
- *[ESP32 Wi-Fi Scan](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/wifi.html#esp32-wi-fi-scan)*

#### 设置国家/地区信息
- *[Wi-Fi Country Code](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/wifi.html#wi-fi-country-code)*

``` c
esp_err_t esp_wifi_set_country(const wifi_country_t *country);
```

#### 扫描（前端）
``` c
esp_err_t esp_wifi_scan_start(const wifi_scan_config_t *config, bool block);
```

扫描结果通过两个接口返回 `ap` 的数量以及信息

``` c
esp_err_t esp_wifi_scan_get_ap_num(uint16_t *number);

esp_err_t esp_wifi_scan_get_ap_records(uint16_t *number, wifi_ap_record_t *ap_records);
```

### 实现 Wi-Fi 扫描代码如下

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
    esp_wifi_set_mode(WIFI_MODE_STA);

    ESP_LOGI("WIFI", "3. Wi-Fi 启动阶段");
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

烧录执行结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/demo-wifi/scan-result.png)

### Wi-Fi 连接阶段


## 参考
- **[WIFI扫描 - 乐鑫 ESP32 物联网开发框架 ESP-IDF 开发入门 - 孤独的二进制出品](https://www.bilibili.com/video/BV16G4y1g72w/?spm_id_from=333.788&vd_source=4cca3a7520260c460d94cf70a3f0a5ba)**
- **[API 指南 » Wi-Fi 驱动程序](https://docs.espressif.com/projects/esp-idf/zh_CN/release-v4.4/esp32/api-guides/wifi.html)**
- **[ESP-IDF创建工程](https://blog.csdn.net/qq_44711012/article/details/111937684)**