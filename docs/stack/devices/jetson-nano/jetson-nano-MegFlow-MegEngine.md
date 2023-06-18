---
id: jetson-nano-megflow-megengine
title: Jetson Nano Install MegFlow && MegEngine
sidebar_label: Install MegFlow && MegEngine
---

由于 `Nano` 是 `aarch64` 架构的，所以需要对应的 `whl` 包，如果你的系统环境跟我的一样的话，可以到下面的链接下载预先构建好的包

名称 | 版本 |
:---------:|:----------:
 Jetson Nano | B01 
 CUDA | 10.2 
 Python | 3.8 

- **[rcxxx/MegFlow -- aarch64-whl](https://github.com/rcxxx/MegFlow/releases/tag/aarch64-whl)**

## 安装

- **创建虚拟环境**

``` shell
conda create -n {name} python=3.8
conda activate {name}
```

### MegFlow

> MegFlow 提供快速视觉应用落地流程，最快 15 分钟搭建起视频分析服务 ...

- **[MegEngine/MegFlow](https://github.com/MegEngine/MegFlow)**

#### 安装

``` shell
python3 -m pip install megflow-{file_name}.whl --force-reinstall
```

- 测试安装

``` shell
$ python
Python 3.8.12 | packaged by conda-forge | (default, Oct 12 2021, 23:40:23)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import megflow
>>>
```

测试 `megflow_run`

``` shell
megflow_run -h
megflow_run 1.0.0

megengine <megengine@megvii.com>

USAGE:
    megflow_run_inner [OPTIONS]

OPTIONS:
    -c, --config <CONFIG_PATH>    Config path
        --debug <DEBUG>           Debug mode
        --dump                    The path to dump graph
    -h, --help                    Print help information
    -m, --module <MODULE_PATH>    Module path
    -p, --plugin <PLUGIN_PATH>    Plugin path
    -V, --version                 Print version information
```

有些环境会提示你没有对应的 `python` 库，需要 `export` 一下

```
export LD_LIBRARY_PATH=`conda info --base`/pkgs/python-{your_version}/lib:${LD_LIBRARY_PATH}
megflow_run -h
...
```

- 下载 **`MegFlow`** 源码

``` shell
cd {worksapce}
git clone https://github.com/MegEngine/MegFlow.git
```

- 运行 `logical_test`

``` shell
cd MegFlow/flow-python/examples
megflow_run -p logical_test
```
正常的话会输出 **`==== logical_test pass ====`**

- **`MegFlow` 安装完成**

### MegEngine

> MegEngine 是一个快速、可拓展、易于使用且支持自动求导的深度学习框架 ...

- **[MegEngine/MegEngine](https://github.com/MegEngine/MegEngine)**

#### 安装

```
python3 -m pip install MegEngine-{file_name}.whl
```

**测试安装**

```
python
Python 3.8.12 | packaged by conda-forge | (default, Oct 12 2021, 23:40:23)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import megengine as mge
>>> mge.__version__
'1.7.0'
```

- **`MegEngine` 安装完成**


<!-- compiled `whl` package built on `Jetson Nano`

- [x] **[MegEngine/MegFlow](https://github.com/MegEngine/MegFlow)**

- [x] **[MegEngine/MegEngine](https://github.com/MegEngine/MegEngine)** -->