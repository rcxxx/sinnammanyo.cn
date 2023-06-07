---
id: win11-wsl-clash-proxy
title: Win11 WSL2 configure proxy with Clash
sidebar_label: WSL2 Proxy Configure
---

>- 使用网络应用时需要注意一些注意事项，无论是从 Windows 应用访问 Linux 网络应用还是从 Linux 应用访问 Windows 网络应用，都可能需要标识正在使用的虚拟机的 IP 地址，该地址将与本地物理机的 IP 地址不同。

---

## WSL2 访问 Windows 网络

通过以下命令来获取主机的 ip 地址

``` bash
cat /etc/resolv.conf
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/wsl2-nameserver.png)

`nameserver` 后面即为主机的 ip 地址

## 配置 Clash

>- 使用远程 IP 地址连接到应用程序时，它们将被视为来自局域网 （LAN） 的连接。这意味着您需要确保应用程序可以接受 LAN 连接。

以 Clash for Windows 为例，需要打开 `Allow LAN` 选项，以及记住配置好的端口号

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/clash-allow-lan.png)

## 配置 Windows Defender 防火墙

需要在 `Windows Defender 防火墙` 中允许 `Clash` 的访问

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/Windows-Defender-clash.png)

以管理员身份运行 PowerShell 并输入

``` powershell
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/wsl2-Windows-Defender-allow.png)

此命令将在 `高级安全 Windows Defender 防火墙` 中添加 WSL 的入站规则，效果如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/Windows-Defender-inp.png)

## 配置 WSL2 Ubuntu22.04 代理

编辑 `~/.bashrc` 文件，在最后加入如下内容，`7890` 为配置好的代理端口

``` bash
# 获取 Windows 系统的 IP 地址
win_ip=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')

# 配置代理
export http_proxy="http://${win_ip}:7890"
export https_proxy="http://${win_ip}:7890"
```

- 执行 `source ~/.bashrc` 使配置生效

测试

``` bash
env | grep -i proxy
curl www.google.com
wget www.google.com
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/win11/wsl2-proxy/wsl2-proxy-test.png)

### 快捷配置方式

可以在 `~/.bashrc` 中创建函数，用命令行快速的执行代理的配置与取消

``` bash
function setproxy() {
  host_ip=$(cat /etc/resolv.conf |grep "nameserver" | awk '{print $2}')
  export http_proxy=http://$host_ip:7890
  export https_proxy=http://$host_ip:7890
  echo "Proxy set up"
  echo $(env | grep -i proxy)
}

function unsetproxy() {
  unset http_proxy
  unset https_proxy

  echo "Proxy canceled"
}
```

命令行如下使用

``` bash
# 设置代理
setproxy

# 取消代理
unsetproxy
```

## 愉快使用

---

## 参考
- **[使用 WSL 访问网络应用程序](https://learn.microsoft.com/en-us/windows/wsl/networking)**
- **[Add "allow" rule to Windows firewall for WSL2 network #4585](https://github.com/microsoft/WSL/issues/4585)**
