/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsReadingNote = {
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
      ],
    }
  ],
}

module.exports = sidebarsReadingNote;