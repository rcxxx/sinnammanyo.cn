---
id: about-build
title: 使用 Docusaurus 搭建个人知识库
sidebar_label: 搭建
---
## Docusaurus 简介
**`Docusaurus`** 是一个静态网站生成器，支持用 **`jsx`** 语法的 **`markdown`** ，无缝结合 **`React`**, 可以引入自定义的组件

## 安装Docusaurus
- **`Docusaurus`** [官方文档](https://v2.docusaurus.io/docs/)

文档中有详细的安装流程，以及配置流程，建议以官方文档为准

## 我的安装和配置
我所用系统是 **`Windows`** ，如果是 **`Linux`** 或是 **`Mac`** 用户，建议对比其他教程进行安装
- 安装步骤可能有区别外，配置部分应该是一样的
### 安装所需环境
#### nodejs
- [nodejs下载](https://nodejs.org/en/download/)
#### yarn
- [yarn下载](https://classic.yarnpkg.com/en/)

### 创建站点
安装 Docusaurus 的最简单方法是使用命令行工具，该工具会搭建 Docusaurus 网站骨架。在新的空存储库中或现有存储库中的任何位置运行此命令，将创建一个包含支架文件的新目录
- **`npx create-docusaurus@latest [name] classic`**
- **`[name]`** 为你想要创建的目录

或者使用 yarn
- **`yarn create docusaurus`**

### 运行站点
要在编辑文件时预览更改，可以运行本地服务

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="yarn"
  values={[
      {label: 'npm', value: 'npm'},
      {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

  ``` bash
  cd my-website
  npm run start
  ```
  </TabItem>
  <TabItem value="yarn">

  ``` bash
  cd my-website
  yarn run start
  ```
  </TabItem>
</Tabs>

之后会在浏览器中打开地址为 **`http://localhost:3000`** 的页面，正常的话则安装完成

### [将站点部署到GitHub](https://sinnammanyo.cn/docs/site/about-deploy)

## 参考
- **[使用 Docusaurus 搭建个人博客](https://www.zxuqian.cn/deploy-a-docusaurus-site)**
- **[`Docusaurus` 中文文档](https://docusaurus.io/zh-CN/docs)**

