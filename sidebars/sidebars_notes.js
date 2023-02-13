/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsNotes = {
  'ReadingNote': [
    'README',
    {
      type: "category",
      link: {
        type: 'generated-index',
        slug: '/category/沈从文/',
      },
      label: "沈从文",
      collapsed: false,
      items: [
        'chinese/沈从文/边城',        
        'chinese/沈从文/月下小景',
        'chinese/沈从文/月下',
      ],
    },

    {
      type: "category",
      link: {
        type: 'generated-index',
        slug: '/category/王小波/',
      },
      label: "王小波",
      collapsed: false,
      items: [
        'chinese/王小波/绿毛水怪',
        'chinese/王小波/黄金时代',
      ],
    },

    {
      type: "category",
      link: {
        type: 'generated-index',
        slug: '/category/村上春树/',
      },
      label: "村上春树",
      collapsed: false,
      items: [
        'others/村上春树/挪威的森林',
      ],
    },

    {
      type: "category",
      link: {
        type: 'generated-index',
        slug: '/category/川端康成/',
      },
      label: "川端康成",
      collapsed: false,
      items: [
        'others/川端康成/雪国',
      ],
    },
  ],
}

module.exports = sidebarsNotes;