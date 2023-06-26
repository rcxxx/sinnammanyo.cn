---
id: computer-network-architecture
title: 计算机网络体系结构
sidebar_label: 计算机网络体系结构
---

### 具有五层协议的体系结构
#### （1） 应用层
负责向用户提供应用程序的接口和网络服务

应用层协议定义的是应用进程间通信和交互的规则，例如：
- DNS 域名系统
- HTTP 协议
- SMTP 邮件传输协议

#### （2） 运输层
负责提供可靠的数据传输服务，包括数据传输的可靠性，数据流量的控制等

主要使用以下两种协议
- TCP 传输控制协议 —— 提供面向连接的、可靠的数据传输服务，数据传输单位为**报文段**
- UDP 用户数据报协议 —— 提供无连接的、**尽最大努力**的数据传输服务（不保证数据传输的可靠性），数据传输单位为**用户数据报**

:::tip 笔记

运行在 TCP 协议上的协议
- HTTP(Hypertext Transfer Protocol) Web服务器传输超文本到本地浏览器的传送协议。端口：80
- HTTPS(HTTP over SSL) HTTP协议的安全版本。端口：443
- FTP(File Transfer Protocol) 用于传输文件。端口：21
- SMTP(Simple Mail Transfer Protocol) 用于发送电子邮件。端口：25
- SSH(Secure Shell) 用于加密安全登录

运行在 UDP 协议上的协议
- DNS(Domain Name Service，域名服务) 用于完成地址查找、邮件转发等工作
- SNMP(Simple Network Management Protocol，简单网络管理协议) 用于网络信息的收集和网络管理
- NTP(Network Time Protocol，网络时间协议) 用于网络同步
- DHCP(Dynamic Host Configuration Protocol，动态主机配置协议) 动态配置IP地址

:::

#### （3） 网络层
网络层负责将数据包从源节点传输到目标节点，包括路由选择、拥塞控制等

采用IP数据报服务（通过IP寻址来建立两个节点之间的连接）

互联网使用的网络协议是无连接的**网际协议IP(Internet Protocol)**，与IP配套使用的有三个协议
- ARP(Address Resolution Protocol) 地址解析协议
- ICMP(Internet Control Message Protocol) 网际控制报文协议
- IGMP(Internet Group Management Protocol) 网际组管理协议

#### （4） 数据链路层
数据链路层负责在物理层上建立数据链路，包括数据的帧同步、流量控制、差错校验等

三个问题：
- 封装成帧：在一段数据的前后分别添加首部和尾部，然后构成一个帧，首部尾部用来进行帧定界
- 透明传输：避免找到错误的帧边界，使用字符填充（转义字符）
- 差错检测：为保证数据传输的可靠性，必须采用各种差错检测

#### （5） 物理层
物理层负责传输比特流，包括数据的编码、调制、解调、传输介质等。包括网线、光纤等

