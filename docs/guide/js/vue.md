
## Vue导学

::: tip
  LRU: 最近最少使用， 记录一个页面自上次访问以来所经历的时间T，当必须淘汰一个页面时，选择现有页面中T值最大的，即最近最少使用的页面予以淘汰。
:::

### 初识vue

::: tip
  命名规则

  camelCase:(小驼峰)js函数、变量
  PascalCase:(大驼峰)js类、组件文件名称
  kebab-case:(短横拼音法)HTML  引用的组件名

  条件渲染

  v-if： 是惰性的，直到条件变为真才开始渲染条件块
  v-show:适中都会渲染并保留在DOM中
  v-for的优先级 大于v-if

  ref：只有在dom渲染完模板之后才可以调用ref
  
:::

::: tip

::: 计算属性
  技术属性： 
  
      是基于其内部的 响应式依赖 进行缓存的
      只在相关的 响应式依赖发生改变时  他们才会重新求值

  方法

      无缓存
      每次吃法重新渲染时，调用方法将总会再次执行函数

  watch监听
  
      如果computed监听的数据变动太大 会影响渲染，这个时候适合用watch监听

:::

```js
// 自定义指令

Vue.directive("demo", {
  // 只调用一次，指令第一次绑定到元素时调用。
  // 在这里可以进行一次性的初始化设置。
  bind:function(el, binding, vnode) {},
  // 被绑定元素插入父节点时调用
  // (仅保证父节点存在，但不一定已被插入文档中)
  inserted:function(el, binding,vnode) {}
  // 所在组件的VNode 更新时调用
  // 但是可能发生在其子VNode 更新之前
  // 指令的值可能发生了改变，也可能没有，
  // 但是可以通过比较更新前后的值来忽略不必要的模板更新
  update:function(el, binding,vnode, oldVnode) {},
  // 指令所在组件的 VNode 及其子VNode 全部更新后调用。
  componentUpdate:function(el, binding,vnode, oldvnode) {},
  // 只调用一次，指令与元素解绑时调用
  unbind:function(el, binding,vnode) {}


  // 根据oldVnode   和  vnode 比较  是否有必要更新dom
})
```

```js
Vue.directive("resize", {
  inserted(el, binding) {
    const callback = binding.value;
    const direction = binding.arg;
    // 增加监听
    window.addEventListener("resize", ()=> callback(window.innerHeight));
    // 回调
    el._onResize = callback;
  },
  unbind(el) {
    // 如果不存在_onResize回调
    if(!el._onResize) {return}
    window.removeEventListener("resize", el._onResize);

    delete el._onResize;
  }
})

```

```js
// 组件通信

```

### 组件设计
::: tip
  依赖注入

      优点：祖先组件不需要知道哪些后代组件使用它提供的属性
      后代组件不需要知道被注入的属性来自哪里

:::

``` js 

  // <!-- 插槽 -->
  // v-slot:name  简写成（#:name）
  // 组件通信 

  this.$root.pri;  // 访问根组件数据
  this.$root.pri = 2;  // 写入根组件的数据
  this.$root.sm;   // 访问 根组件的 计算属性
  this.$root.prism()  // 调用根组件的方法

  this.$parent.pri;   // 获取 父组件 的数据
  this.$parent.pri = 2;   // 写入 父组件的数据
  this.$parent.sm;     // 访问  父组件  的计算属性
  this.$parent.prism();   // 调用 父组件 的方法

  // 依赖注入：声明了当前组件依赖的父组件们的外部prop有哪些。
  export default {
    name:'s-layout',
    provide() {
      return {
        fish:{
          love:'tame'
        }
      }
    }
  }
  
  export default {
    name:'s-course-tab',
    inject:["fish"],
    methods:{
      say() {
        alert(this.fish.love)
      }
    }
  }
  
```


```js
// Mixins
// 是可以轻松被一个子类或一组子类继承功能的类
// 同名钩子函数将合并为一个数组，混入对象的钩子将在组件自身钩子之前调用。
// 二者的methods,components 和 directives， 将被合并为同一个对象。若对象键名冲突时，去组件对象的键值对

const mixin = {
  created: function() {
    console.log("mixin created");
  },
  methods:{
    foo: function() {
      console.log('foo')
    }
  }
};
Vue.mixin(mixin);
```

```js
// 插件

Vue.use(plugin);

vue

```

### 异步更新队列

``` js
let active;

let watch = function(cb) {
  active = cb;
  active();
  active = null;
}

let queue = {};
let queueJob = job => {
  if(!queue.includes(job)) {
    queue.push(job);
  }
};
let flushJobs = () => {
  let job;
  while ((job = queue.shift()) !== undefined) {
    job()
  }
}

```
### nextTick

::: tip
Vue.nextTick([callback, context])
vm.$nextTick([callback])

1.将回调延迟到下次DOM更新循环之后执行。
2.通常用于再修改数据之后使用这个方法，在回调中获取更新后的DOM

:::

## computed & watch源码分析
vue2 => vue3
Object.defineProperty => proxy
### computed函数

> 存在缓存

```js
let computed = (fn) => {
  let value;
  let dirty = true;  //是否缓存
  return {
    get value() {
      // 实现缓存
      if(dirty) {
        // 依赖收集  把fn函数执行一遍
        value = fn()
        dirty = false;
      }
      // dirty = true;
      return value
    }
  }
}
let count = ref(0)
let computedValue = computed(()=> count.value + 3)

```

## Vuex
:::tip
    State:响应式

    Mutaions:由commit触发，必须是同步函数

    Getter: 由state派生出的状态 store的计算属性

    Actions: 由dispatch触发 可以包含任意异步操作  不直接变更状态 可以通过mutation变化
:::

```js
import {mapState, mapGetters, mapMutations, mapActions} from './vuex';

// 简化代码
computed: {
  ...mapState({
    count:  state => state.count
  })
  ...mapGetters(['doubleCount'])
},
methods:{
  ...mapMutations(["doubleCount"]),
  ...mapActions(['asyncAddCount'])
}

```
```js
// store.js

export class Store {
  constructor(options = {}) {
    let {state, mutations } = option;
    this._vm = state;
    this._mutions = mutations;
  }
  get state () {
    return this._vm;
  }
  commit(type. payload) {
    const entry = this._mutaions[type];
    if(!entry) {
      return;
    }
    entry(this.state, payload);
  }
}


```

```js
// 跨模块访问
module:{
  foo:{
    namespaced:true,
    getters: {
      // 在这个模块的getter中，getter被局部化了
      // 可以使用getter的第四个参数来调用：rootGetters
      someGetter(state, getters, rootState, rootGetters) {
        getter.someOtherGetter 
        rootGetters.someOtherGetter
      },
      someOthers: state=> {...}
    },
    actions:{
      // 在这个模块中， dispatch和commit 也被局部化了
      someAction({dispatch, commit, getters, rootGetters}) {
        getters.someGetter
        rootGetters.someGetter

        dispatch('someOtherAction')
        dispatch('someOtherAction', null, {root:null})

        commit('someMutation')
        commit('someMutation', null, {root:true})

      },
      someOtherAction(ctx, payload) {}
    }
  }
}
```
::: tip
路由  Vue-Router  有一个监听器  change


window上：

    onhashchange事件url中的hash变化
    监听
    window.onhashchange = function() {
      console.log(location.hash);
    }
    修改
    location.hash = './home'
    onpopstate事件:监听history中地址的改变
    监听
    window.addEvenListener("popstate", ()=> {
      console.log(window.location.pathname);
    })
    触发时机
    1.点击浏览器前进、后退按钮
    2. history.back()
    3. history.forward()
    4. history.go()

    history.pushState({}, "title", "anotherpage.html");
    history.replaceState({}, "title", "anotherpage.html");
    以上两个api不会触发 popstate事件
:::

```js

```


