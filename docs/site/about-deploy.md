---
id: about-deploy
title: 将 Docusaurus 部署到 GitHub Pages
sidebar_label: 部署
---
> 参考官方文档 
- **[Deployment](https://v2.docusaurus.io/docs/deployment)**

### 生成静态文件

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="local-serve"
  defaultValue="yarn"
  values={[
      {label: 'npm', value: 'npm'},
      {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

  ``` bash
  npm run build
  ```

  </TabItem>
  <TabItem value="yarn">

  ``` bash
  yarn run build
  ```

  </TabItem>
</Tabs>

运行后将在 **`/build`** 目录中生成静态文件

可以将站点部署到 **[GitHub Pages](https://pages.github.com/)** 上

在部署前，先在本地测试

<Tabs
  groupId="local-serve"
  defaultValue="yarn"
  values={[
      {label: 'npm', value: 'npm'},
      {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

  ``` bash
  npm run serve
  ```

  </TabItem>
  <TabItem value="yarn">

  ``` bash
  yarn run serve
  ```

  </TabItem>
</Tabs>

---

### 部署到GitHub Pages
**`Docusaurus`** 提供了一种发布到 **`GitHub Pages`** 的简便方法

#### 修改 **`docusaurus.config.js`** 中的相关配置
``` js
  url: 'https://github.com/username/projectName/',
  baseUrl: '/projectName/',
  organizationName: 'username', // Usually your GitHub org/user name.
  projectName: 'projectName', // Usually your repo name.
  deploymentBranch: 'master',  
```

名称               | 描述
-------------------|-------------------------
`organizationName` | GitHub用户名
`projectName`      | GitHub存储库的名称
`url`              | GitHub页面的URL
`baseUrl`          | 项目的基本URL，填 /projectName/
`deploymentBranch` | 部署时的分支

:::tip
这里 **`projectName`** 的储存库一般为 username.github.io，如果你有自己的域名，可以去仓库的 **`settings`** 里设置 **`GitHub Pages`** 的自定义域名，记得在自己的域名控制台添加一条解析规则
:::

都配置好之后，就可以将 **`Docusaurus`** 部署到 **`GitHub Pages`** 上了，执行
``` bash
GIT_USER=<GITHUB_USERNAME> yarn deploy
```
等待运行完成就部署完成了，就可以通过你配置好的 **`url`** 访问你的页面了

### 利用 Git Action 实现自动部署
**[GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions)** 允许在存储库中自动化，自定义和执行软件开发工作流程

假设我们的源文件储存在 **[`rcxxx/sinnammanyo.cn`](https://github.com/rcxxx/sinnammanyo.cn)** 仓库中，而页面部署在 **[`rcxxx/rcxxx.github.io`](https://github.com/rcxxx/rcxxx.github.io)** 中，可以参考以下配置流程


1. 生成一个新的 [SSH key](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
``` bash
ssh-keygen -t rsa -C "your_email@example.com"
```

执行后一路默认，将在用户根目录生成 `ssh key`，linux 将会生成在 `~/.ssh/`， windows 将生成在 `/c/Users/username/.ssh/`

- `id_rsa.pub` 为公钥

需要添加到源仓库中，`Setting -> Deploy keys -> Add Deploy key`
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/start-docusaurus/add-id_rsa-pub.png)

- `id_rsa` 为私钥

需要添加到部署仓库 `github.io` 中，`Setting -> Secrets -> Actions -> New repository secret`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog/start-docusaurus/add-id_rsa.png)

注意这里 secret 的 Name 需要记住，可以直接取名为 `GH_PAGES_DEPLOY`，后续的自动化工作流中将会用到这个 Name

- 在你的源仓库中创建 `.github/workflows/deploy.yml` 工作流文件

```yml title=".github/workflows/deploy.yml"
name: Deploy to GitHub Pages

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test-deploy:
    if: github.event_name != 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Test build website
        run: yarn build
  deploy:
    if: github.event_name != 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: yarn
      - uses: webfactory/ssh-agent@v0.5.0
        with:
          ssh-private-key: ${{ secrets.GH_PAGES_DEPLOY }}
      - name: Deploy to GitHub Pages
        env:
          USE_SSH: true
        run: |
          git config --global user.email "actions@github.com"   # 修改为你的邮箱地址
          git config --global user.name "gh-actions"            # 修改为你的用户名
          yarn install --frozen-lockfile
          yarn deploy
```

git config --global user.email "actions@github.com" 修改为你 GitHub 的邮箱
git config --global user.name "gh-actions" 修改为你 GitHub 的用户名

一切就绪之后，当你向源仓库中推送文档的变更时，`GitHub Action` 将自动识别工作流，并执行站点的部署

## 参考
- **[Docusaurus 中文文档](https://www.docusaurus.cn/docs/deployment)**
- **[Docusaurus 的 GitHub 操作](https://evantay.com/blog/docusaurus-gh-action/)**
- **[Docusaurus 配置 GitHub Action 自动发布](https://blog.alanwei.com/blog/2021/03/21/docusaurus-github-deploy/)**
- **[docusaurus搭建博客，利用GitHub Actions自动部署GitHub Pages](https://juejin.cn/post/6936846407051509774)**
- **[GitHub Actions](https://docs.github.com/en/actions)**
- **[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)**