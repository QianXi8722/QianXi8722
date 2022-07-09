/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2022-07-06 20:49:03
 * @LastEditors: Seven
 * @LastEditTime: 2022-07-09 20:43:06
 */
module.exports = {
  base: './',
  title: 'lv ling blgo',
  description: 'Just laji blog',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'js', link: '/js/' }
    ],
    sidebar: {
      '/js/': [
        ['函数式编程', '函数式编程3']
      ]
    }
  }
}