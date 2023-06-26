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
    'docusaurus-plugin-sass',
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'projects',
        path: 'docs/projects',
        routeBasePath: 'projects',
        sidebarPath: require.resolve('./sidebars/sidebars_projects.js'),
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
            position: 'left'
          },
          {
            type: 'dropdown',
            to: '/docs',
            label: '📥 Stack',
            position: 'left',
            items: [
              {label: '💻 CS', to:'stack/category/cs'},
              {label: '⌨️ Programming', to:'stack/category/C-C_plus_plus'},
              {label: '📦 Tools', to:'stack/category/tools'},
              {label: '💽 System', to:'stack/category/system'},
              {label: '👀 CV', to:'stack/category/cv'},
              {label: '🧠 ML & DL', to:'stack/category/ml-dl'},
              {label: '🤖 Robot', to:'stack/category/robot'},
              {label: '🔌 Devices', to:'stack/category/devices'},
              {label: '🔩 3D Modeling', to:'stack/category/Fusion 360'},
            ],
          },
          {
            label: '🧪 Porjects',
            to: 'projects/category/projects',
            position: 'left',
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
            label: '🍺🍜🀄',
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
