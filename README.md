# 关于站点

这个站点是基于 **[Docusaurus 2](https://v2.docusaurus.io/)** 构建的静态网站，我对其中一些元素进行了修改，使之变成了一个整理学习笔记的知识库

如果喜欢我的站点风格，可以直接复制我的整个仓库，然后再进行更加个性化的修改

### Nodejs & yarn
使用前确保你的系统中已经安装了 `Nodejs` 和 `yarn`

- [nodejs下载](https://nodejs.org/en/download/)

``` shell
sudo mkdir /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/node /usr/local/bin/node
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npm /usr/local/bin/npm
sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npx /usr/local/bin/npx
```

- [yarn下载](https://classic.yarnpkg.com/en/)

``` shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

### Installation

``` bash
yarn install
```

### Build

```
$ yarn build
```
### 本地预览

```
$ yarn start
```

会在你的浏览器窗口中打开一个窗口进行预览，并展示实实时更新

### Deployment

## 参考
- **[Node.js Downloads](https://nodejs.org/en/download/)**
- **[yarn Installation](https://classic.yarnpkg.com/en/docs/install/#debian-stable)**
