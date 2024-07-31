import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
// 2d人物
import { oml2dPlugin } from 'vuepress-plugin-oh-my-live2d';

export default defineUserConfig({
  lang: 'en-US',
  head: [["link", {
    rel: 'icon',
    href: '/images/logo.png'
  }]],
  title: '迷失的小狗',
  description: '道阻且长，行则将至',
  sidebarDepth: 5,
  theme: defaultTheme({
    logo: '/images/logo.png',

    navbar: [

      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端',
        // link: '/',
        prefix: '/article/',
        children: [
          {
            text: 'js框架',
            link: '/article/web/',
            children: [
              {
                text: 'React基础',
                link: '/article/web/react/basic/'
              },
              {
                text: 'React进阶',
                link: '/article/web/react/jinjie/'
              },
              {
                text: 'Vue',
                link: '/article/web/vue/'
              }
            ]
          },
          {
            text: 'js',
            link: '/article/js/',
            children: [
              {
                text: 'JavaScript进阶',
                link: '/article/js/js高级知识/'
              },
            ]
          },
          {

            text: '性能优化',
            link: '/article/web/webyouhua/',
            children: [
              {
                text: '字体优化-谷歌字体优化',
                link: '/article/web/webyouhua/google_font/'
              }
            ]

          },
          {
            text: '工具',
            link: '/article/tools/',
            children: [
              {
                text: 'Git',
                link: '/article/tools/git/'
              }
            ]
          }
        ]
      },
      {
        text: '后端',
        link: '/category/',
        children: [
          {
            // link: '/category/server/',
            children: [
              {
                text: 'Node',
                link: '/category/server/node/express/'
              },
              {
                text: 'Java',
                link: '/category/server/java/'
              },
              {
                text: 'Python 基础语法',
                link: '/category/server/python/'
              }
            ]
          }
        ]
      },
      {
        text: '其他领域',
        link: '/other/',
        children: [
          { text: '阅读', link: '/other/ruanzhishi/reading/' }
        ]
      },
      {
        text: '社交',
        link: '#',
        children: [
          {
            text: 'Github',
            link: 'https://github.com/chuckbiu'
          },
          {
            text: '微信: yunzilou_ui',
            link: '#'
          }
        ]
      },
    ],
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page) => page.frontmatter.category || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({
            title: 'Categories',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({
            title: 'Tags',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'article',
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: () => ({
            title: 'Articles',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'timeline',
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: 'Timeline',
          frontmatter: () => ({
            title: 'Timeline',
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
    oml2dPlugin({
      // 在这里配置选项
      models: [
        {
          "path": "https://model.oml2d.com/Pio/model.json",
          "scale": 0.4,
          "position": [0, 50],
          "stageStyle": {
            "height": 300
          }
        }
      ]
    })
  ],

  bundler: viteBundler(),
})
