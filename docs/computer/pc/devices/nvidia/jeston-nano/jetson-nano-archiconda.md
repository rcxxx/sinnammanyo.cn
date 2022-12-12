---
id: jetson-nano-archiconda
title: Jetson Nano Archiconda
sidebar_label: Jetson Nano Archiconda
---

`Anaconda` 是一个非常好用的包管理工具，但是其官方不支持 `aarch64` 架构，也就是说无法在 `Jetson Nano` 上安装 `Anaconda`

但是在网上搜索了一下，真的有一个项目将 `conda` 移植到了 `aarch64` 平台，下面是链接

- **[`Archiconda/build-tools`](https://github.com/Archiconda/build-tools)**

下载之后就正常的当做 `conda` 来使用即可

``` shell
cd Downloads/
wget https://github.com/Archiconda/build-tools/releases/download/0.2.3/Archiconda3-0.2.3-Linux-aarch64.sh
sh Archiconda3-0.2.3-Linux-aarch64.sh
```

安装后即可正常使用

### 使用补充
修改 `~/.bashrc` 实现启动终端时询问是否启用 `conda` 环境

``` bash
# # >>> MODIFIED conda initialize >>>

# !! MOD !! ask user if they wish to use miniconda
read -p "Use conda for python3? [y/n]" condaAnswer
echo "$condaAnswer"
if [ "$condaAnswer" = "y" ]; then  

    # !! Contents within this block are managed by 'conda init' !!
    __conda_setup="$('/home/pete/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
    if [ $? -eq 0 ]; then
        eval "$__conda_setup"
    else
        if [ -f "/home/pete/miniconda3/etc/profile.d/conda.sh" ]; then
            . "/home/pete/miniconda3/etc/profile.d/conda.sh"
        else
            export PATH="/home/pete/miniconda3/bin:$PATH"
        fi
    fi
    unset __conda_setup

# !! MOD !! ask user if they wish to use miniconda
fi
# <<< conda initialize <<<
```

修改后新建终端将会询问是否启用 `conda` 环境


## 参考
- **[`Archiconda/build-tools`](https://github.com/Archiconda/build-tools)**
- **[在Jetson Nano (TX1/TX2)上使用Anaconda与PyTorch 1.1.0](https://zhuanlan.zhihu.com/p/64868319)**
- [How to decide whether to use miniconda on ubuntu terminal startup](https://stackoverflow.com/questions/57030934/how-to-decide-whether-to-use-miniconda-on-ubuntu-terminal-startup)
