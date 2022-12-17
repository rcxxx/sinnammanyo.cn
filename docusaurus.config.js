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
          sidebarPath: require.resolve('./sidebars.js'),
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
        id: 'ReadingNote',
        path: 'reading_note',
        routeBasePath: 'ReadingNote',
        sidebarPath: require.resolve('./sidebarsReadingNote.js'),
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
            label: '📝Docs',
            position: 'left',
            items: [
              {label: '💻 PC', to:'docs/category/devices'},
              {label: '⌨️ programming', to:'docs/category/C-C_plus_plus'},
              {label: '👀 CV', to:'docs/category/OpenCV'},
              {label: '🎖️ robot', to:'docs/category/ROS'},
              {label: '🔨 3D Modeling', to:'docs/category/Fusion 360'},
            ],
          },
          {
            type: 'dropdown',
            label: '✒️Notes',
            to: '/ReadingNote',
            position: 'left',
            items: [
              {label: '📚 读书笔记', to:'ReadingNote/'},
            //   {label: '✏️ 随笔', to:'ReadingNote/'},
            ],
          },
          {
            to: 'docs/category/just-paly',
            position: 'right',
            className: 'heafer-life-icon',
            
          },
          {
            to: 'docs/category/summary',
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
