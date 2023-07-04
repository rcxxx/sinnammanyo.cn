/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsProjects = {
'🧪 projects': [
    {
      type: 'category',
      label: "🧪 Projects",
      link: {
        type: 'generated-index',
        slug: '/category/projects',
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "🕗 3D打印延时摄影",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'studio/3D打印延时摄影/octoprint-octolapse-auto-snapshot',
          },
          items: [
            'studio/3D打印延时摄影/octoprint-octolapse-auto-snapshot',
            'studio/3D打印延时摄影/raspberry-pi-octoprint',
            'studio/3D打印延时摄影/gphoto2-get-capture',
          ],
        },
        {
          type: "category",
          label: "😻 猫粮机",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'studio/猫粮机/Cat-food-machine-based-on-MegFLow',
          },
          items: [
            'studio/猫粮机/Cat-food-machine-based-on-MegFLow',
            'studio/猫粮机/Cat-food-machine-based-on-MegFLow_02',
          ],
        },
        {
          type: "category",
          label: "🗑️ 垃圾桶",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'studio/垃圾桶/foolish-trash-bin',
          },
          items: [
            'studio/垃圾桶/foolish-trash-bin',
          ],
        },
        {
          type: "category",
          label: "🧶 云逗猫",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'studio/云逗猫/cloud-tease-cat-danmu-hunter',
          },
          items: [
            'studio/云逗猫/cloud-tease-cat-danmu-hunter',
            'studio/云逗猫/cloud-tease-cat-aliyun-mqtt',
          ],
        },
      ],
    },
    // // RC & RM
    // {
    //   type: 'category',
    //   label: 'RC & RM',
    //   link: {
    //     type: 'generated-index',
    //     slug: '/category/RC-RM',
    //   },
    //   collapsed: true,
    //   items: [
    //     {
    //       type: "category",
    //       label: "RoboCon",
    //       collapsed: true,
    //       link: {
    //         type: 'doc',
    //         id: 'project/robocon/about-rc',
    //       },
    //       items: [
    //         'project/robocon/about-rc',
    //       ],
    //     },
    //     {
    //       type: "category",
    //       label: "RoboMaster",
    //       collapsed: true,
    //       link: {
    //         type: 'doc',
    //         id: 'project/robomaster/about-rm',
    //       },
    //       items: [
    //         'project/robomaster/visual-group-learning-suggestions',
    //         'project/robomaster/rm-2018-buff-simulation',
    //         //'project/robomaster/rm-2019-armor',
    //         //'project/robomaster/rm-2020-engineering',
    //       ],
    //     },
    //   ],
    // },
  ],
}

module.exports = sidebarsProjects;