---
id: about-theme
title: 个性化 Docusaurus 主题配置
sidebar_label: 主题配置
---

### 配置站点信息
<details>
<summary>
  docusaurus.config.js
</summary>

```js
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Rcxxx's Personal Site",
  tagline: '',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/icons/game.png',
  url: 'https://sinnammanyo.cn',
  baseUrl: '/',
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rcxxx', // Usually your GitHub org/user name.
  projectName: 'rcxxx.github.io', // Usually your repo name.
  deploymentBranch: 'master',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
        path: 'docs/docs',
          sidebarPath: require.resolve('./sidebars/sidebars.js'),
          remarkPlugins: [[require('remark-math'),{ strict: false }], require('mdx-mermaid')],
          rehypePlugins: [require('rehype-katex')],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rcxxx/sinnammanyo.cn/tree/master',
        },
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            frontMatter.hide_reading_time
              ? undefined
              : defaultReadingTime({content}),
          remarkPlugins: [[require('remark-math'),{ strict: false }], require('mdx-mermaid')],
          rehypePlugins: [require('rehype-katex')],
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '🔖所有文章',
          editUrl:
            'https://github.com/rcxxx/sinnammanyo.cn/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'notes',
        path: 'docs/notes',
        routeBasePath: 'notes',
        sidebarPath: require.resolve('./sidebars/sidebars_notes.js'),
        editUrl:
        'https://github.com/rcxxx/sinnammanyo.cn/tree/master',
      },
    ],
        [
      '@docusaurus/plugin-content-docs',
      {
        id: 'stack',
        path: 'docs/stack',
        routeBasePath: 'stack',
        sidebarPath: require.resolve('./sidebars/sidebars_stack.js'),
        remarkPlugins: [[require('remark-math'),{ strict: false }], require('mdx-mermaid')],
        rehypePlugins: [require('rehype-katex')],
        editUrl:
        'https://github.com/rcxxx/sinnammanyo.cn/tree/master',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
      },
      navbar: {
        title: 'Home',
        logo: {
          alt: 'My Site Logo',
          src: 'img/icons/rikka_ssss_pixel_art.png',
        },
        items: [
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'},
          {
            type: 'dropdown',
            to: '/docs',
            label: '🛸 Stack',
            position: 'left',
            items: [
              {label: '🔌 Devices', to:'stack/category/devices'},
              {label: '💽 System', to:'stack/category/devices'},
              {label: '⌨️ Programming', to:'stack/category/C-C_plus_plus'},
              {label: '👀 CV & Robot', to:'stack/category/OpenCV'},
              {label: '🧠 ML & DL', to:'stack/category/ml-dl'},
              {label: '🔩 Handmade', to:'stack/category/Fusion 360'},
            ],
          },
          {
            type: 'dropdown',
            label: '✒️ Notes',
            position: 'left',
            items: [
              {label: '📚 读书笔记', to:'notes/'},
            //   {label: '✏️ 随笔', to:'ReadingNote/'},
            ],
          },
          {
            to: 'docs/category/just-paly',
            position: 'right',
            className: 'heafer-life-icon',
            
          },
          {
            to: 'docs/category/studio',
            position: 'right',
            className: 'heafer-studio-icon'
          },
          {
            href: 'https://github.com/rcxxx/sinnammanyo.cn',
            position: 'right',
            className: 'header-github-link',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'My GitHub',
                href: 'https://github.com/rcxxx',
              },              
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 🌈RCXXX. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
```

</details>

配置参考了这些文档
- _[配置](https://docusaurus.io/zh-CN/docs/configuration)_
- _[文档多实例](https://docusaurus.io/zh-CN/docs/docs-multi-instance)_
- _[侧边栏](https://docusaurus.io/zh-CN/docs/sidebar)_
- _[数学公式](https://docusaurus.io/zh-CN/docs/markdown-features/math-equations)_

#### 文档归档

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/site/docs-struct.png)

文档分为三个实例
1. 技术栈文档
2. 笔记文档
3. 其他文档

在 `docusaurus.config.js` 以插件形式配置，方便文档文件夹分类

<details>
<summary>
  docusaurus.config.js
</summary>

``` js
// ...
plugins: [
[
    '@docusaurus/plugin-content-docs',
    {
        id: 'notes',
        path: 'docs/notes',
        routeBasePath: 'notes',
        sidebarPath: require.resolve('./sidebars/sidebars_notes.js'),
        },
    ],
    [
        '@docusaurus/plugin-content-docs',
        {
        id: 'stack',
        path: 'docs/stack',
        routeBasePath: 'stack',
        sidebarPath: require.resolve('./sidebars/sidebars_stack.js'),
        },
    ],
],
// ...
```

</details>

### 修改主页面

`/src/pages/index.js` 将被渲染为主页面，也可以通过配置文件将主页面删除，使其变为文档页或者博客列表页

我对 `index.js` 的修改主要分为一下几个部分
- 导航栏部分，对文档的分类整理，方便跳转
- 网站标题部分，作简单的自我介绍
- 社交途径部分，游戏机样式的小组件，包含一些社交信息
  - _GameBoy 样式卡片组件实现_
- ~~最新视频，在视频平台发布的最新视频~~
- ~~最新项目，最新完成的项目~~

### Swizzle 组件
- _[Swizzle](https://docusaurus.io/zh-CN/docs/swizzling)_

**重写组件**
``` bash
yarn run swizzle @docusaurus/theme-classic [组件名] -- --eject
```

可以从本地的 `node_modules/@docusaurus/theme-classic/src/theme/` 路径中直接复制相应组件

**拓展组建**
``` bash
yarn run swizzle @docusaurus/theme-classic [组件名] -- --wrap
```

将会生成一个带 `Wrapper` 后缀的组件，可以在原先组建的内容上进行拓展

#### DocItem

