---
id: about-vscode
title: vscode 的正确打开方式
sidebar_label: vscode
---

## 如何安装 vscode
可以参考这篇博客，讲了安装方法，介绍了一些插件
- **[最终你一定会爱上VSCode](https://sinnammanyo.cn/VSCode-config/)**

## 配置 vscode

### 修改终端为 Git bash(win)
``` json
"terminal.integrated.profiles.windows": {
    "PowerShell": null,
    "Command Prompt": null,
    "Git-Bash": {
        "path": "D:\\Program Files\\Git\\bin\\bash.exe",
        "args": []
    }
},
"terminal.integrated.defaultProfile.windows": "Git-Bash",
```

## 美化 vscode
这里主要记录一下美化 vscode 的过程

**主题**
- [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)

**图标**
- [Material Theme Icons](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme-icons)

都可以直接在 vscode 的拓展商店里直接下载

自定义的配置方法参考 `Material Theme` 主题的文档，在 `vscode` 的 `settings.json` 中即可进行配置

这里贴出我自己的配置，可以根据自己喜欢的配色进行修改（持续更新配置中······）

``` json

```

## 插件

## reference

- **[VSCode自定义配色方案](https://www.cnblogs.com/garvenc/p/vscode_customize_color_theme.html)**
- **[Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)**
