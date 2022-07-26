module.default = {
  sidebar:[
    {
      title: 'javaScript进阶',   // 必要的
      path: '/js/advance/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      collapsable: true, // 可选的, 默认值是 true,
      sidebarDepth: 2,    // 可选的, 默认值是 1
      children: [
        {
          title: '函数',   // 必要的
          path: '/js/advance/function',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            {
              title: '内存管理',   // 必要的
              path: '/js/advance/function/内存管理',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
            },
            {
              title: '函数式编程',   // 必要的
              path: '/js/advance/function/函数式编程',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
            },
            {
              title: '防抖和节流',   // 必要的
              path: '/js/advance/function/防抖和节流',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
            },
            {
              title: '高阶函数',   // 必要的
              path: '/js/advance/function/高阶函数',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
            }
          ]
        },
        {
          title: '异步编程',   // 必要的
          path: '/js/advance/async',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            {
              title: 'Event Loop事件循环',   // 必要的
              path: '/js/advance/async/Event Loop事件循环',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: true, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
            }
          ]
        }
      ]
    }
  ]
}
