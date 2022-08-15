## 函数
### 内存管理

> 内存分为新生代和老生代
> 新生代：短时间存活的新变量会存放到新生代，内存极小
> 老生代：生存时间较长的变量会存放到老生代，几乎占据所有内存


> 怎么判断一个变量可以回收？
> 1.全局变量会到程序执行完毕，才会回收
> 2.普通变量当他们失去引用

> 新生代和老生代如何转化
> 1.新生代发现本次复制，会占用超过百分之二十五的to空间
> 2.这个对象已经经历一次回收

### 如何检测内存

::: tip

浏览器端:  window.performance.memory

node端：process.memoryUsage()

:::

### 函数式编程

> 函数式编程：把功能分解为一系列独立的函数，通过函数间相互调用来完成功能

> 函数式编程的函数要求
> 1.保证纯函数：一个函数的返回结果只依赖于他的参数，同样的输入必定有同样的输出
> 2.减少函数副作用：会影响外部的数据，如全局变量

::: tip

typeof 和 instanceof 的区别？
    
    typeof 返回一个字符串，说明变量的数据类型，对于array 和 null 一律返回object类型。
           类型：number boolean  string function object undefined
    instanceof 返回值是布尔值，用于判断一个变量是否属于某个对象的实例
            let arr = new Array();
            arr instanceof Array     // true
栈  堆   池

    栈：存放变量（基本数据类型大小固定，操作简单所以放入栈中存储）
    堆：存放复杂对象（引用类型变量大小不固定，所以分配给堆中，申请空间时自己确定大小）
    池：存放常量（常量池）
    闭包中的变量不保存在栈中，而是保存在堆内存中

    闭包：能够读取其他函数内部变量的函数
    function A () {
      let a= 1;
      function B() {
        console.log(a);
      }
      return B;
    }
    let res = A();
    函数A 返回函数B,并且函数B中引用了函数A的变量，那么函数B被称为闭包



:::

*** Object.create()  : 创建一个对象 ***

### 工程化的函数式编程
```js
// 普通
// es6
function class1() {}
export default class1;
import class1 from './model.js'
// common.js
module.export = class1;
const class1 = require('./model.js');


// 函数式编程（独立）
// es6
export function fun1 () {}
export function fun2 () {}
import{fun1} from './model.js'
import * as  all from './model.js';
// 引用
all.fun1()

// common.js
function fun1() {}
function fun2 () {}
const all = require('./model.js');
const fun1 = reuqire('./model.js').fun1;
```
### compose 和 Pipe函数
```js
function add(x) {
  return x + 1
}
function multiply(x) {
  return x * 10
}
// compose函数  先执行右边的函数在执行左边的函数
function compose(a, b) {
  return function(x) {
      return a(b(x))
  }
}
const calculate = compose(add, multiply)

function compose() {
  // 将参数组转为数组类型
  const args = Array.prototype.slice.call(arguments)
  return function(x) {
      if(args.length < 1) return x
      return args.reduceRight((a, b) =>  b(a), x)
  }
}
const calculate = compose(add, multiply)
console.log(calculate(1)) // 11

// Pipe管道函数 先执行左边的函数 在执行右边的函数
function pipe() {
  const args = Array.prototype.slice.call(arguments)
  return function(x) {
      if(args.length < 1) return x
      return args.reduce((a, b) =>  b(a), x)
  }
}
const calculate = pipe(add, multiply)
console.log(pipe(1)) // 20
```


### 防抖和节流

```js
/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    console.log('触发');
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}
```

### 高阶函数
> 如果一个函数接受另外一个函数作为参数，那么称这个函数为高阶函数
> 如： forEach  Map   reduce   filter

### forEach  
```js
var arr = [1,2,3];
Array.propotype.myForEach = function(callback) {
  // 先判断this.length的长度
  // 在判断callback是否存在 和 callback类型是否为function类型
  var len = this.length;
  if(typeof callback !== 'function') {
    throw new Error('必须是函数类型')
  }
  for(var i = 0; i<len; i++>) {
    // 把this指向绑定，指向当前组件
    callback.call(this, this[i], i)
  }
}
```

### map函数

``` js
var arr = [1,2,3];
Array.propotype.myForEach = function(callback) {
  var len = this.length;
  var arr = [];
  if(typeof callback !== 'function') {
    throw new Error('必须是函数类型')
  }
  for(var i = 0; i<len; i++>) {
    // 把this指向绑定，指向当前组件
    arr.push(callback.call(this, this[i], i));
  }
  return arr; 
}
```

### 函数柯里化

> 定义：将一个接受多个参数的函数转成接收一个单一参数(最初函数的第一个参数)的函数。并且接收余下的参数 而且返回结果的新函数的技术
> 意义：1.不方便传入参数时， 2.写的方法传入的参数固定
```js
// 回调
function a(b) {
}
Promise.resolve().then(a(b))   // 这里是调用a方法，而不是给其一个函数，所以不可取
Promise.resolve().then(a.bind(this, 123)) // 通过bind绑定传 函数

// 实例
// 验证表单输入值-是否是纯数字
function inputTest(reg, value) {}

const numberTest = inputTest.bind(this, /^[0-9]*$/)
numberTest(123)

```

```js
// 实现柯里化
function aCurry (num1) {
  return function (num2) {
    console.log(num1, num2)
  }
}
function a(num1, num2) {
}
aCurry(1)(2)

// 手写实现bind函数  参数thisArg是传过来的this
Function.prototype.mybind = function(thisArg) {
  // 这里的this 不是thisArg 而是调用bind的函数 
  // a.bind() this指向 a
  if(typeof this !== 'function') {
    return;
  }
  var _that = this;
  // 获取参数数组，因为第一个参数是this，所以这里要把this筛选掉
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // 这里的args参数要做拼接，因为这个匿名函数还有可能有参数传过来
    // 新参数和老参数拼接
    return _that.apply(thisArg, args.concat(Array.prototype.slice.call(arguments)))
  }
}
```
## 异步编程
### event Loop 事件
> javascript 单线程非阻塞的脚本语言
> 宏任务
> 微任务 

### 异步编程-发布订阅


### 深入理解Promise


### Generator函数及其异步应用

> 线程是操作系统能够运算调度的最小单位
> 一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程执行不同的任务

> 协程是一种基于线程之上，却又比线程更加轻量级的存在，由程序员自己管理的轻量级线程叫做“用户空间线程”

> yield: 当成return，但是与return的本质不一样
> funcation关键字与函数名之间有一个 星号
> 需要使用.next()的方法进行启动
> 返回值value属性  done属性1. true:表示函数已经执行完成 2.false:表示函数还没有执行完成

```js
function* gen(x){
  var y = yield x + 2;
  return y;

}

var gen = gen(1);
gen.next();  // {value: 3, done:false}
gen.next();  // {value:undefined, done:true}
gen.next(2); // {value: 4, done:false}

// 调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止

// next方法还可以接受参数，向 Generator 函数体内输入数据，作为上个阶段异步任务的返回结果

```

### 基于Thunk函数的Generator自动执行器

> Thunk 函数是自动执行 Generator 函数的一种方法 
> 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。


### Web Worker多线程机制

> 主线程：ui  样式渲染
> 多线程：js执行
> 浏览器的16ms渲染帧
> 渲染帧流程：脚本执行（js）-DOM树构建/样式计算（css）-布局（layout）-重绘（paint，如3D）-合成（composite，合成各层的渲染结果）



## 设计模式
### 提高复用性
```js
function mover() {
  this.status = [];
  this.actionHandle = {
    left:moverLeft,
    right:moveRight,
    top:moveTop,
    bottom:moveBottom,
  }
}
mover.prototype.run = function() {
  this.status = Array.prototype.slice.call(arguments);
  this.status.forEach((action) => {
    this.actionHandle[action]();
  })
}
new mover().run('left')

```
### 提高可扩展性
```js
1.适配器模式--方法名不通用 
//  用适配代替更改的思想


2. 装饰者模式
apply:  第一个参数默认为this， 剩余参数以数组的形式传过来
call:  第一个参数默认为this，后续参数随便传
call 和 apply作用  改变this指向
```
## 面试题(精准、全面)
 1. 什么是？ 题目概念
 2. 有什么用？应用场景
 3. 优缺点？ 生化用的
   

::: tip
一.浏览器是如何渲染页面的？
 cssOM(css object model) 
 采用css代码 将每个选择器 转呈现为树状结构，是css样式表的对象
 表示，提供api操作css

 W3C中css包括两个部分：
 1.model:描述样式表和规则的模型部分
 2.view： 和元素视图相关的api

 Dom树构建：
    1. 通过网络获取字节流和字符，2.对字符序列 进行分词操作
    3.得到node节点，构建dom树
 cssOM： 
    依赖Dom,浏览器会从父节点递归方式向下添加css样式
  常用方法：
    document.styleSheets() 
    insertRule()  向rule列表中前置
    removeRule()  删除rule列表中内容
  view：窗口部分   滚动部分   布局部分

  浏览器将域名通过网络通信 从服务器拿到html后
      根据html构建dom树 和cssOM树  ，构建DOM的期间 遇到js
      阻塞dom cssOm 优先加载js
  渲染树：是dom和cssOM合并而成的，根据渲染树计算每个元素的布局渲     染到屏幕
  在构建渲染树的时候，js会操作DOM或者cssOM引起浏览器对页面进行重绘 和重排

  重绘：渲染树节点会发生改变 但不影响空间位置的大小（颜色，字体）
  重排：位置大小都发生变化
:::

::: tip
js 如何阻塞DOM 和 cssOM？
DOM树的构造 通过栈 结构实现的

  在js解析之前 渲染引擎如果遇到js 不管是否操作cssOM都会对
  css文件下载  生成cssOm 再去解析js  js依赖css

减少阻塞

  css和js 写在html文件的内联标签中 减少下载时间----慎用

  通过webpack压缩代码

  在html解析阶段用不到的js代码 可以外部引用script方式，
  async异步不会阻塞页面
::: 

::: tip
前端各种布局优缺点 ：

1.静态布局：

    固定宽高，单位px，当窗口变化时，会出现滚动条，有遮挡
    写移动端的时候，针对于不同的手机 写多套样式   

2.flex布局：

    代码量少 容易上手  兼容性较差

3.自适应布局

    @media  媒体查询 针对不同设备 定义对应的 尺寸和大小响应式布局

4.流式布局：

    单位用百分比计算 页面由明细那变化将不能正常显示
5.响应式布局

    meta name="viewport" 页面随窗口变化 自动调整
选择布局方式：
    pc 静态布局
    移动端：弹性布局 和 自适应布局 响应式
    pc和移动兼容：响应式 弹性布局 和自适应

:::

::: tip
实现浏览器 标签页的通信

    前端： cookie  localStorage websql  sessionStorage

    后端： 能够存储数据的都能实现标签页通讯
          数据库类
:::


## js章节复习课
::: tip
函数式

    优点：js中函数便于差分组合 可扩展性好
    缺点：管理难度大，复杂逻辑难以组织划分

面向对象式

    优点：模块分明  逻辑清晰  方便组织庞大的业务
    缺点：不好配合tree-shaking js对于面向对象实现不完美

异步的目的

    作为js特产，弥补了js单线程，但是他也带来了执行顺序问题
:::

```js
// 复习异步
function a() {
  return 123;
}
function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(456)
    })
  })
}
function c() {
  return 789;
}

var arr = [a,b,c]
// 方法abc
async function asyncRun() {
  var result = []
  for(var i=0; i< arr.length; i++) {
    var _data = await arr[i]()
    result.push(_data);
  }
  return result
}

asyncRun().then((res) => {
  console.log(res)
})
```

## 数据结构 和 栈操作
::: tip

数据结构： 计算机存储、组织数据的方式，是描述客观事物的行为特征

理解：

    数据：广义概念，一切事物都可以用数据化描述
    结构：数据共同作用的方式，以及数据之间的关系
 
数据两个特征：
 
    可以输入到计算机中
    能够被计算机识别和处理
  
数据的组成：
 
    数据元素：数据的基本单位
    数据对象：相同特征的数据元素的集合，是数据的一个子集
    数据项：独立含义的数据的最小单位
 
程序设计 = 数据结构 + 算法

逻辑结构：数据对象中，数据元素之间的相互关系

    四种结构：
    集合结构：数据元素属于一个集合，他们之间没有其他关系
    线性结构：一对一，有序数据的集合
    树形结构：一对多， DOM
    图形结构：多对多

线性结构： 表中各个节点具有线性关系

    特点：
    非空集
    只有一个起点 和 一个终点
    所有节点只有一个前驱节点 和 一个后继节点
    线性表典型的线性结构，栈 队列 和 串都属于线性结构

非线性结构：

    特点：
    非空集
    节点可能又多个前驱和后继节点
    起点和重点可以有多个
    树形和图形都属于非线性结构


:::
