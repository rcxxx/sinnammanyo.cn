/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  '🚩site': [
    'README',
    {
      type: "category",
      label: "搭建知识库",
      collapsed: false,
      items: [
        'site/about-build',
        'site/about-deploy',
        'site/about-theme',
        'site/about-write',
      ],
    }
  ],

  'life': [
    {
      type: 'category',
      label: "🎮 就知道玩",
      link: {
        type: 'generated-index',
        slug: '/category/just-paly',
      },
      collapsed: true,
      items: [
        'life/play/go-out-and-play',
        {
          type: "category",
          label: 'LEGO',
          collapsed: true,
          items: [
            'life/play/LEGO/koenigsegg-76900',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: "🍻 就知道吃",
      link: {
        type: 'generated-index',
        slug: '/category/just-eat',
      },
      collapsed: true,
      items: [
        'life/foods/always-eating',
      ],
    },
  ],

  '💯project': [
    {
      type: 'category',
      label: "工作室",
      link: {
        type: 'generated-index',
        slug: '/category/studio',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "3D打印延时摄影",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'project/studio/3D打印延时摄影/octoprint-octolapse-auto-snapshot',
          },
          items: [
            'project/studio/3D打印延时摄影/octoprint-octolapse-auto-snapshot',
            'project/studio/3D打印延时摄影/raspberry-pi-octoprint',
            'project/studio/3D打印延时摄影/gphoto2-get-capture',
          ],
        },
        {
          type: "category",
          label: "猫粮机",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'project/studio/猫粮机/Cat-food-machine-based-on-MegFLow',
          },
          items: [
            'project/studio/猫粮机/Cat-food-machine-based-on-MegFLow',
            'project/studio/猫粮机/Cat-food-machine-based-on-MegFLow_02',
          ],
        },
        {
          type: "category",
          label: "垃圾桶",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'project/studio/垃圾桶/foolish-trash-bin',
          },
          items: [
            'project/studio/垃圾桶/foolish-trash-bin',
          ],
        },
      ],
    },
    // RC & RM
    {
      type: 'category',
      label: 'RC & RM',
      link: {
        type: 'generated-index',
        slug: '/category/RC-RM',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "RoboCon",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'project/robocon/about-rc',
          },
          items: [
            'project/robocon/about-rc',
          ],
        },
        {
          type: "category",
          label: "RoboMaster",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'project/robomaster/about-rm',
          },
          items: [
            'project/robomaster/visual-group-learning-suggestions',
            'project/robomaster/rm-2018-buff-simulation',
            //'project/robomaster/rm-2019-armor',
            //'project/robomaster/rm-2020-engineering',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: "毕业设计",
      collapsed: true,
      link: {
        type: 'doc',
        id: 'project/毕业设计/graduation-reference',
      },
      items: [
        'project/毕业设计/graduation-reference'
      ],
    },
  ],
};

module.exports = sidebars;
