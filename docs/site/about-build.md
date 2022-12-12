---
id: about-build
title: 使用 Docusaurus 搭建个人知识库
sidebar_label: 搭建
---
## Docusaurus 简介
**`Docusaurus`** 是一个静态网站生成器，支持用 **`jsx`** 语法的 **`markdown`** ，无缝结合 **`React`**, 可以引入自定义的组件

## 安装Docusaurus
- **`Docusaurus`** [官方文档](https://v2.docusaurus.io/docs/)
- **`Docusaurus`** [官方中文文档](https://www.docusaurus.cn/docs/)

文档中有详细的安装流程，以及配置流程，建议以官方文档为准

## 我的安装和配置
我所用系统是 **`Windows`** ，如果是 **`Linux`** 或是 **`Mac`** 用户，建议对比其他教程进行安装
- 安装步骤可能有区别外，配置部分应该是一样的
### 安装所需环境
#### nodejs >= 14
- [nodejs下载](https://nodejs.org/en/download/)
#### yarn >= 1.5 
- [yarn下载](https://classic.yarnpkg.com/en/)

### 创建站点
安装Docusaurus的最简单方法是使用命令行工具，该工具会搭建Docusaurus网站骨架。在新的空存储库中或现有存储库中的任何位置运行此命令，将创建一个包含支架文件的新目录
- **`npx @docusaurus/init@latest init [name] [template]`**
- **`[name]`** 为你想要创建的目录 **`[template]`** 为你想要用的模板

例如
- **`npx @docusaurus/init@latest init my-website classic`**
- 这里 **`[template]`** 选择使用 **`classic`** 模板，也可以选择 **`facebook`**、**`bootstrap`** 等模板

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

### 配置站点信息
#### 将站点配置为知识库
由于我只是想搭建个人知识库，因为已经搭建好了[个人博客](https://sinnammanyo.cn/)，所以 **`docusaurus.config.js`** 中的 **`presets`** 被我设置成这样
  ``` js title="docusaurus.config.js"
  presets: [
      [
      '@docusaurus/preset-classic',
      {

          docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: "https://github.com/rcxxx/docs/tree/master",
          },

          theme: {
          customCss: require.resolve('./src/css/custom.css'),
          },
      },
      ],
  ],
  ```
- 删除了 **`blog`** 页面，只保留 **`Docs`**

去掉顶部导航栏的 **`blog`** ,找到 **`navbar`**，注释或者删掉 **`{to: 'blog', label: 'Blog', position: 'left'},`**
  ``` js title="docusaurus.config.js" {10}
  navbar: {
    title: "Rcxxx's Notes",
    items: [
      {
        to: 'docs/',
        activeBasePath: 'docs',
        label: 'Docs',
        position: 'left',
      },
      // {to: 'blog', label: 'Blog', position: 'left'},
      {
        href: 'https://github.com/rcxxx/my-learning-notes',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
  ``` 
#### 修改一些站点的标签
- **`navbar`** 栏中也有一些属性需要设置
  - **`title`** 页面左上角的标题 —— 可以设置logo，具体见[文档](https://v2.docusaurus.io/docs/theme-classic)
  - **`href`** 右上角 **`GitHub`** 中的链接以及标签 —— **`items`** 中可以自己添加想要的标签
- **`footer`** 中配置页脚
- 更多个性化的配置可以根据文档进行配置
- 简洁至上

### [将站点部署到GitHub](https://sinnammanyo.cn/personal-site/docs/about-deploy)

## 参考
- **[使用 Docusaurus 搭建个人博客](https://www.zxuqian.cn/deploy-a-docusaurus-site)**

