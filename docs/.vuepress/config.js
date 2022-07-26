/*
 * @Description: 配置页面
 * @Version: 2.0
 * @Autor: 吕玲
 * @Date: 2022-07-06 20:49:03
 * @LastEditors: Seven
 * @LastEditTime: 2022-07-26 09:58:10
 */
// const staticData = require('./staticData');
module.exports = {
  base: '',
  title: 'QianXi Blog',
  description: 'Just so so blog',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'js', link: '/js/' }
    ],
    sidebar: [
      // ['javaScript进阶', 'javaScript进阶']
      {
        title: 'javaScript',   // 必要的
        path: '/js',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        // collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          {
            title: 'JavaScript进阶',   // 必要的
            path: '/js/advance',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            // collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
              {
                title: 'JavaScript进阶',   // 必要的
                path: '/js/advance/JavaScript进阶',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                // collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
               
              }
            ]
           
          },
          {
            title: 'd3知识图谱可视化',   // 必要的
            path: '/js/D3/d3知识图谱可视化',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            // collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
           
          }
        ]
      }
    ]
  }
}