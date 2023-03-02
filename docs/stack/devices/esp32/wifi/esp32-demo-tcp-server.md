---
id: esp32-demo-tcp-server
title: ''
sidebar_label: Tcp Server
---

# ESP32 Demo Tcp Server

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

## Wi-Fi connect

``` c
wifi_init_sta();
```

连接 Wi-Fi 成功后将得到相应的 ip 地址，作为后续 TCP Server 的 ip 地址

## TCP server on lwIP socket

## TCP server IPV4

### recv / send Loop

``` c
// 接收
static inline ssize_t recv(int s,void *mem,size_t len,int flags)
{ return lwip_recv(s,mem,len,flags); }

// 发送
static inline ssize_t send(int s,const void *dataptr,size_t size,int flags)
{ return lwip_send(s,dataptr,size,flags); }
```

### TCP server task

``` c
// 创建
static inline int socket(int domain,int type,int protocol)
{ return lwip_socket(domain,type,protocol); }

// 绑定
static inline int bind(int s,const struct sockaddr *name, socklen_t namelen)
{ return lwip_bind(s,name,namelen); }

// 监听
static inline int listen(int s,int backlog)
{ return lwip_listen(s,backlog); }

// 认证
static inline int accept(int s,struct sockaddr *addr,socklen_t *addrlen)
{ return lwip_accept(s,addr,addrlen); }

// 关闭
static inline int shutdown(int s,int how)
{ return lwip_shutdown(s,how); }

int     close (int __fildes);
```

### 完整代码

``` c
#include <stdio.h>
#include <string.h>
#include <sys/param.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/event_groups.h"

#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "nvs_flash.h"

#include "lwip/err.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include <lwip/netdb.h>

/*---wifi---*/
#define ESP_WIFI_SSID       "ssid"
#define ESP_WIFI_PASS       "password"
#define ESP_MAXIMUM_RETRY   5
#define ESP_WIFI_SCAN_AUTH_MODE_THRESHOLD WIFI_AUTH_WPA2_PSK

static EventGroupHandle_t s_wifi_event_group;

#define WIFI_CONNECTED_BIT  BIT0
#define WIFI_FAIL_BIT       BIT1

static const char* WIFI_TAG = "wifi station";
static int s_retry_num = 0;

static void wifi_event_handler(void* arg, esp_event_base_t event_base,
                          int32_t event_id, void* event_data)
{
    if(event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if(event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        if(s_retry_num < ESP_MAXIMUM_RETRY) {
            esp_wifi_connect();
            s_retry_num++;
            ESP_LOGI(WIFI_TAG, "retry to connect to the AP");
        } else {
            xEventGroupSetBits(s_wifi_event_group, WIFI_FAIL_BIT);
        }
        ESP_LOGI(WIFI_TAG,"connect to the AP fail");
    } else if(event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ip_event_got_ip_t* event = (ip_event_got_ip_t*) event_data;
        ESP_LOGI(WIFI_TAG, "got ip:" IPSTR, IP2STR(&event->ip_info.ip));
        s_retry_num = 0;
        xEventGroupSetBits(s_wifi_event_group, WIFI_CONNECTED_BIT);
    }
}

void wifi_init_sta(void)
{
    s_wifi_event_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_netif_init());

    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,
                                                        ESP_EVENT_ANY_ID,
                                                        &wifi_event_handler,
                                                        NULL,
                                                        &instance_any_id));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT,
                                                        IP_EVENT_STA_GOT_IP,
                                                        &wifi_event_handler,
                                                        NULL,
                                                        &instance_got_ip));

    wifi_config_t wifi_config = {
            .sta = {
                    .ssid = ESP_WIFI_SSID,
                    .password = ESP_WIFI_PASS,
                    .threshold.authmode = ESP_WIFI_SCAN_AUTH_MODE_THRESHOLD,
                    .sae_pwe_h2e = WPA3_SAE_PWE_BOTH,
            },
    };
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA) );
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config) );
    ESP_ERROR_CHECK(esp_wifi_start() );

    ESP_LOGI(WIFI_TAG, "wifi_init_sta finished.");

    EventBits_t bits = xEventGroupWaitBits(s_wifi_event_group,
                                           WIFI_CONNECTED_BIT | WIFI_FAIL_BIT,
                                           pdFALSE,
                                           pdFALSE,
                                           portMAX_DELAY);

    if (bits & WIFI_CONNECTED_BIT) {
        ESP_LOGI(WIFI_TAG, "connected to ap SSID:%s password:%s",
                 ESP_WIFI_SSID, ESP_WIFI_PASS);
    } else if (bits & WIFI_FAIL_BIT) {
        ESP_LOGI(WIFI_TAG, "Failed to connect to SSID:%s, password:%s",
                 ESP_WIFI_SSID, ESP_WIFI_PASS);
    } else {
        ESP_LOGE(WIFI_TAG, "UNEXPECTED EVENT");
    }
}
/*---wifi---*/

/*---Tcp---*/
#define PORT                        1234
#define KEEPALIVE_IDLE              5
#define KEEPALIVE_INTERVAL          5
#define KEEPALIVE_COUNT             3

static const char* TCP_TAG = "TCP Server";

static void do_retransmit(const int sock)
{
    int len;
    char rx_buffer[128];

    do {
        len = recv(sock, rx_buffer, sizeof(rx_buffer) - 1,0);
        if (len < 0){
            ESP_LOGE(TCP_TAG, "Error occurred during receiving: errno %d", errno);
        } else if (len == 0) {
            ESP_LOGW(TCP_TAG, "Connection closed");
        } else {
            rx_buffer[len] = 0; // 接收到的内容 + '\0' 并视为字符串
            ESP_LOGI(TCP_TAG, "Received %d bytes: %s", len, rx_buffer);

            int to_write = len;
            while (to_write > 0) {
                int written = send(sock, rx_buffer + (len - to_write), to_write, 0);
                if (written < 0) {
                    ESP_LOGE(TCP_TAG, "Error occurred during sending: errno %d", errno);
                    // 回发失败
                    return;
                }
                to_write -= written;
            }
        }
    } while (len > 0);
}

static void tcp_server_task(void *pvParameters)
{
    char addr_str[128];
    int addr_family = (int)pvParameters;
    int ip_protocol = 0;
    int keepAlive = 1;
    int keepIdle = KEEPALIVE_IDLE;
    int keepInterval = KEEPALIVE_INTERVAL;
    int keepCount = KEEPALIVE_COUNT;
    struct sockaddr_storage dest_addr;

    if (addr_family == AF_INET) {
        struct sockaddr_in *dest_addr_ip4 = (struct sockaddr_in *)&dest_addr;
        dest_addr_ip4->sin_addr.s_addr = htonl(INADDR_ANY);
        dest_addr_ip4->sin_family = AF_INET;
        dest_addr_ip4->sin_port = htons(PORT);
        ip_protocol = IPPROTO_IP;
    }

    int listen_sock = socket(addr_family, SOCK_STREAM, ip_protocol);
    if (listen_sock < 0) {
        ESP_LOGE(TCP_TAG, "Unable to create socket: errno %d", errno);
        vTaskDelete(NULL);
        return;
    }
    int opt = 1;
    setsockopt(listen_sock, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    ESP_LOGI(TCP_TAG, "Socket created");

    int err = bind(listen_sock, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
    if (err != 0) {
        ESP_LOGE(TCP_TAG, "Socket unable to bind: errno %d", errno);
        ESP_LOGE(TCP_TAG, "IPPROTO: %d", addr_family);
        close(listen_sock);
        vTaskDelete(NULL);
    }
    ESP_LOGI(TCP_TAG, "Socket bound, port %d", PORT);

    err = listen(listen_sock, 1);
    if (err != 0) {
        ESP_LOGE(TCP_TAG, "Error occurred during listen: errno %d", errno);
        close(listen_sock);
        vTaskDelete(NULL);
    }

    while (1) {
        ESP_LOGI(TCP_TAG, "Socket listening");
        struct sockaddr_storage source_addr;
        socklen_t addr_len = sizeof(source_addr);

        int sock = accept(listen_sock, (struct sockaddr *)&source_addr, &addr_len);
        if (sock < 0) {
            ESP_LOGE(TCP_TAG, "Unable to accept connection: errno %d", errno);
            break;
        }

        // Set tcp keepalive option
        setsockopt(sock, SOL_SOCKET, SO_KEEPALIVE, &keepAlive, sizeof(int));
        setsockopt(sock, IPPROTO_TCP, TCP_KEEPIDLE, &keepIdle, sizeof(int));
        setsockopt(sock, IPPROTO_TCP, TCP_KEEPINTVL, &keepInterval, sizeof(int));
        setsockopt(sock, IPPROTO_TCP, TCP_KEEPCNT, &keepCount, sizeof(int));

        // Convert ip address to string
        if (source_addr.ss_family == PF_INET) {
            inet_ntoa_r(((struct sockaddr_in *)&source_addr)->sin_addr, addr_str, sizeof(addr_str) - 1);
        }
        ESP_LOGI(TCP_TAG, "Socket accepted ip address: %s", addr_str);

        do_retransmit(sock);

        shutdown(sock, 0);
        close(sock);
    }

    close(listen_sock);
    vTaskDelete(NULL);
}
/*---Tcp---*/

void app_main(void)
{
    esp_err_t ret = nvs_flash_init();
    if(ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND){
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    ESP_LOGI(WIFI_TAG, "ESP_WIFI_MODE_STA");
    wifi_init_sta();

    xTaskCreate(tcp_server_task, "tcp_server", 4096, (void*)AF_INET, 5, NULL);
}
```

**执行结果**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/esp32/wifi-tcp/tcp-server-result.png)

## 参考
- **[ESP32 WIFI教程五: TCP服务端](https://www.bilibili.com/video/BV1kG411E7DR/?spm_id_from=333.788&vd_source=4cca3a7520260c460d94cf70a3f0a5ba)**