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
apply:  参数不定
call: 参数确定
var 
```
### 面试题(精准、全面)
 1. 什么是？ 题目概念
 2. 有什么用？应用场景
 3. 优缺点？ 生化用的
<!-- ::: tip -->
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
<!-- ::: -->