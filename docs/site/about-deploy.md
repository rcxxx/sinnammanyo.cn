---
id: about-deploy
title: 将 Docusaurus 部署到 GitHub Pages
sidebar_label: 部署
---
## 官方文档 [Deployment](https://v2.docusaurus.io/docs/deployment)
## 我的方案
### 配置Git

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
```

名称               | 描述
-------------------|-------------------------
`organizationName` | GitHub用户名
`projectName`      | GitHub存储库的名称
`url`              | GitHub页面的URL
`baseUrl`          | 项目的基本URL，填 /projectName/

:::tip
这里 **`projectName`** 的储存库一般为 username.github.io，如果你有自己的域名，可以去仓库的 **`settings`** 里设置 **`GitHub Pages`** 的自定义域名，记得在自己的域名控制台添加一条解析规则
:::

都配置好之后，就可以将 **`Docusaurus`** 部署到 **`GitHub Pages`** 上了，执行
``` bash
GIT_USER=<GITHUB_USERNAME> yarn deploy
```
等待运行完成就部署完成了，就可以通过你配置好的 **`url`** 访问你的页面了

这里有一些可选参数

名称                | 描述
--------------------|---------------------------------------------------------------------------
`USE_SSH`           | 设置为true使用SSH而不是默认的HTTPS来连接到GitHub存储库。
`DEPLOYMENT_BRANCH` | 网站将被部署到的分支，默认是`gh-pages`分支，存储库`github.io`以结尾的默认为`master`分支
`CURRENT_BRANCH`    | 包含将部署的最新文档更改的分支。通常为`master`，但它可以是除`gh-pages`之外的任何分支。如果此变量未设置任何内容，则将使用当前分支。
`GIT_PASS`          | `GIT_USER`的密码（或令牌）

---

### 利用 Git Action 实现自动部署
**[GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions)** 允许在存储库中自动化，自定义和执行软件开发工作流程

假设我们的源文件储存在仓库的 **`master`** 分支中，而页面部署在 **`gh-pages`** 分支，可以参考如下操作
1. 生成一个新的 [SSH key](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
-  **`ssh-keygen -t rsa -C "user@email.com"`**
   - 输入后终端提示你选择 **`SSH key`** 的保存路径，默认为 **`~/.ssh/id_rsa`**，建议将 **`id_rsa`** 修改为其他名称，例如 **`~/.ssh/id_rsa_action`**，接下来两个提示回车默认即可
   - 这里不用默认名称是为了不与默认的全局**SSH key**冲突，具体问题参考[👉这里](https://www.jianshu.com/p/f7f4142a1556)

2. 将生成的 **`id_rsa_action.pub`** 添加到你仓库的 **`settings -> Deploy keys`**
   - 记得勾选 `Allow write access` ，不然会出现公钥只读的错误

3. 将生成的 **`id_rsa_action`** 添加到你仓库的 **`settings -> Secrets`**
   - 将 **`Name`** 设置为 **`GH_PAGES_DEPLOY`**

4. 在你源文件的跟目录下创建 **`.github/workflows/`** 这个目录，在目录中创建一个 **`.yml`** 文件
   - 这里创建为 **`doc-action.yml`**

5. 在文件中写入如下内容
  ``` yml title="doc-action.yml"
  name: doc-action

  on:
    pull_request:
      branches: [master]
    push:
      branches: [master]

  jobs:
    checks:
      if: github.event_name != 'push'
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
          with:
            node-version: '14.x'
        - name: Test Build
          run: |
            if [ -e yarn.lock ]; then
            yarn install --frozen-lockfile
            elif [ -e package-lock.json ]; then
            npm ci
            else
            npm i
            fi
            npm run build
    gh-release:
      if: github.event_name != 'pull_request'
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
          with:
            node-version: '14.x'
        - name: Add key to allow access to repository
          env:
            SSH_AUTH_SOCK: /tmp/ssh_agent.sock
          run: |
            mkdir -p ~/.ssh
            ssh-keyscan github.com >> ~/.ssh/known_hosts
            echo "${{ secrets.GH_PAGES_DEPLOY }}" > ~/.ssh/id_rsa
            chmod 600 ~/.ssh/id_rsa
            cat <<EOT >> ~/.ssh/config
            Host github.com
            HostName github.com
            IdentityFile ~/.ssh/id_rsa
            EOT
        - name: Release to GitHub Pages
          env:
            USE_SSH: true
            GIT_USER: user
          run: |
            git config --global user.email "user@email.com"
            git config --global user.name "user"
            if [ -e yarn.lock ]; then
            yarn install --frozen-lockfile
            elif [ -e package-lock.json ]; then
            npm ci
            else
            npm i
            fi
            npx docusaurus deploy
  ```
- 有几个地方要修改
  - **`GIT_USER: user`** 中的**user**修改为你**GitHub**的用户名
  - **`git config --global user.email "user@email.com"`** 修改为你**GitHub**的邮箱
  - **`git config --global user.name "user"`** 中的**user**修改为你**GitHub**的用户名

设置完毕后，当**master** 分支有新的拉取请求，会自动确保 **Docusaurus** 构建成功

每当有新的内容被推送到 **master** 分支，将会自动构建并且部署到 **`gh-pages`**

等待 **Git Action** 执行完毕，就可以在网页上看到你的站点了

## 参考
- **[Docusaurus 中文文档](https://www.docusaurus.cn/docs/deployment)**
- **[Docusaurus 的 GitHub 操作](https://evantay.com/blog/docusaurus-gh-action/)**
- **[Docusaurus 配置 GitHub Action 自动发布](https://blog.alanwei.com/blog/2021/03/21/docusaurus-github-deploy/)**
- **[docusaurus搭建博客，利用GitHub Actions自动部署GitHub Pages](https://juejin.cn/post/6936846407051509774)**
- **[GitHub Actions](https://docs.github.com/en/actions)**
- **[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)**