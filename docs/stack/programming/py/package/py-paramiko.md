---
id: python-paramiko
title:  Python paramiko 
sidebar_label: paramiko
---

> Paramiko is a pure-Python 1 (3.6+) implementation of the SSHv2 protocol 2, providing both client and server functionality. It provides the foundation for the high-level SSH library Fabric, which is what we recommend you use for common client use-cases such as running remote shell commands or transferring files.
> - **[Welcome to Paramiko!](https://www.paramiko.org/)**
>
> paramiko 可以直接在 Python 代码中使用 SSH 协议对远程服务器执行操作，实现一些自动化操作
>

## 安装 paramiko

``` bash
pip3 install paramiko
```

## 使用 paramiko

- 示例，打印 ssh 远程服务端系统信息

``` py
import paramiko


def main():
    # 实例化 SSH Client
    ssh_client = paramiko.SSHClient()
    # 自动添加策略，保存服务器的主机名和密钥信息
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    host_name = '192.168.124.180'
    port = 22
    username = 'root'
    password = '1'
    # 连接 SSH 服务端， connect 方法连接服务器
    ssh_client.connect(host_name, port, username, password)

    # 打开一个 channel 执行命令，
    stdin, stdout, stderr = ssh_client.exec_command('cat /etc/issue')

    print(stdout.read().decode('utf-8'))
    # 关闭SSHClient连接
    ssh_client.close()


if __name__ == '__main__':
    main()

```

``` bash title="输出"
Ubuntu 20.04.6 LTS \n \l
```

## 参考

- **[Welcome to Paramiko’s documentation!](https://docs.paramiko.org/en/latest/)**
- **[Python自动化运维 - paramiko模块介绍及使用](https://zhuanlan.zhihu.com/p/313718499)**
