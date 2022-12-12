---
id: ubuntu-18-04-starting-script
title: Ubuntu-18.04 开机自启动脚本
sidebar_label: 自启动脚本
---

### gnome-session-properties
**Ubuntu 启动应用程序首选项**可以在系统启动时自动执行设置好的指令

可以通过此方法实现开机自动执行脚本，达到自启动的效果

### gnome-terminal
- **[Terminal Help](https://help.gnome.org/users/gnome-terminal/stable/)**

`gnome-terminal` 是 `Ubuntu` 系统默认安装的终端模拟器，将shell可视化，并拓展其功能

命令行中通过 `gnome-terminal` 可以新建一个终端，可以通过其执行脚本文件

### bash
**`bash` 可以用来执行命令或者是可执行文件**
- 执行可执行文件可以直接 **`bash -c "cmd strig"`**
- 执行命令则可以用 **`bash -c "cmd strig"`**
  - `"cmd strig"` 中是 `shell` 命令字符串，可以用 `;` 分开多条指令
  - `"cmd strig"` 中也可以是可执行文件，但要使用文件的绝对路径，并且文件要有相应的权限

例如可以使用

``` shell
bash -c "cd ~;chmod 777 /home/user/xxx.sh;/home/user/xxx.sh;read"
```

来执行 `/home/user/xxx.sh` 文件，用 `;` 分开了多条命令，最后使用 `read`，当按下回车键时终端才会退出

## 实现脚本自启动

终端输入 `gnome-session-properties` 打开启动应用程序首选项，新建一个自启动程序

在 `Command` 中填入下列指令，`.sh` 文件替换为相应的路径

```
gnome-terminal -- bash -c 'chmod 777 xxx.sh;xxx.sh;read'
```

保存退出，重启即生效

### `conda command not found`
设置自启动脚本时，如果脚本中运行的程序需要使用到 `Anaconda` 环境的话，直接启动脚本很可能会出现 `conda command not found` 的问题

安装 `conda` 的时候会在 `~/.bashrc` 中写入类似这样的内容

``` shell
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/USERNAME/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/USERNAME/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/USERNAME/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/USERNAME/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```

我尝试在脚本最前面加上 `source ~/.bashrc`，再次尝试时仍然找不到 `conda` 的指令，于是我尝试将自己 `~/.bashrc` 中的相应内容直接复制到脚本中执行，脚本成功自启动

## 参考
- **[Ubuntu开机自启动脚本/命令的几种方案](https://blog.csdn.net/weixin_43455581/article/details/107815743)**
- **[Shell、Xterm、Gnome-Terminal、Konsole简介](https://www.linuxidc.com/Linux/2017-08/146064.htm)**
- **[gnome-terminal 命令](https://www.cnblogs.com/chay/p/10303873.html)**
- **[【bash】关于shell中 bash -c 执行命令或者可执行文件](https://blog.csdn.net/michaelwoshi/article/details/108272139)**
- **[Activating conda environment in "startup applications" script](https://askubuntu.com/questions/1114695/activating-conda-environment-in-startup-applications-script)**
- **[cron job to run under conda virtual environment](https://unix.stackexchange.com/questions/454957/cron-job-to-run-under-conda-virtual-environment/572951#572951)**
