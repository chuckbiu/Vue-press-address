---

#  prev:
#   text: GitHub
#   link: https://github.com
---
# this的绑定规则 🎈

## 一 this到底指向什么 



带个疑问：我们采用三种方式对函数进行调用，为啥产生了三种不同的结果

```js
function foo() {
    console.log(this); 
}
// 方式一：默认调用
foo() // window

// 方式二：对象调用
var obj = {
    name: 'obj'
}
obj.foo = foo
obj.foo() // obj
new foo() // {}
```

带出结果

- this是在运行时被绑定的
- 函数在调用是，js会默认给this绑定一个值
- this的绑定和调用方式跟调用的位置有关系，跟编写位置无关系

## 二 this绑定规则（掌握）

#### 2.1 函数中this绑定

1. 默认绑定
2. 隐式绑定
3. 显示绑定
4. new绑定

#### 2.2 默认绑定

​		独立函数调用触发

```js
  // 默认绑定
    // 方式1
    // function fn() {
    //     console.log('默认绑定', this); 
    // }
    // fn()   // Window 


    // 方式2 
    var obj = {
        name: 'obj',
        fn: function() {
            console.log('默认绑定', this);
        }
    }
    var baz = obj.fn
    // baz() // Window  因为这里也是自身调用


    // 方式3
    // 严格模式 独立模式下独立函数调用，this指向的是undefined
    function fn() {
        'use strict'
        console.log('严格模式', this); 
    }
    // fn()   // undefined


    // 方式4 高阶函数
    function test(fn) {
        fn()
    }
    test(obj.fn) // Window 本质还是 
```

![](.\assets\Snipaste_2024-07-03_16-31-25.png)

#### 2.3 隐式绑定

```js
 // 隐式绑定
let obj = {
    name: 'zs',
    sayName: function () {
        console.log('隐式绑定', this)
    }
}
let abj = {
    name: 'ls',
    SafeArray: obj.sayName
}
abj.SafeArray()  // 隐式绑定 abj = {name: 'ls', SafeArray: ƒ}
```

#### 2.4 new 绑定

```js
  /*
    1. 创建新的空对象
    2. 将this指向这个空对象
    3. 执行函数体中的代码
    4. 没有显示返回非空对象时，默认返回这个对象
    */

    function foo(){
        this.name = 'why'
        console.log('foo函数', this); 
    }
    new foo() // foo函数 {name: "why"}
```

#### 2.5  显示绑定

```
var obj = {
	name: 'obj',
}
function foo(a, b, c) {
    console.log('foo', this)
    console.log(a, b, c)
}
// 执行函数并且函数中的this指向
// obj.foo = foo;
// obj.foo();
// foo.call(obj); // 显示绑定 params 就是 绑定this 基本类似会进行包装类型
// foo.apply(obj);
// foo.call(obj, 1,2,3)
// foo.apply(obj, [1,2,3])
   foo.bind(obj, 1,2,3)()
/*
call 和 apply 都是改变this指向
call 和 apply 都是立即执行

区别：apply 数组 跟 call 参数列表
fn.apply(thisArg, [arg1, arg2, ...])
fn.call(thisArg, arg1, arg2, ...)
fn.bind(thisArg, arg1, arg2, ...)()
*/
```

#### 2.6  规则优先级 (了解)

new 绑定 >bind  >  call/apply > 隐式绑定 > 默认绑定

```js
function foo() {
    console.log(this);
}
const abj = {
    name: 'abj',
    foo: foo
}
const dbj = {
    name: 'dj'}
// 比较优先级
const obj = { name: 'obj', foo: foo }

// foo(); // window
// abj.foo(); // abj

// obj.foo.call(abj); // abj call优先于显示绑定

let fbj = obj.foo.bind(abj); //
// fbj.call(dbj)  //  abj bind优先于call绑定
new fbj() // 优先级 new > bind
```

## 三 this规则之外

#### 忽略显示绑定

情况一：我们传入一个null 或 undefined 那么这个显示绑定就会被忽略，使用默认规则

```js
function foo(){
    console.log(this);
}   

foo.call(undefined) // window 严格模式是 undefined

foo.call(null) // window

foo.bind(undefined)() // window
```

#### 间接函数引用

```js

function foo(){
    console.log(this);
}   

let obj1 = {
    name: 'obj1',
    foo: foo
};
let obj2 = {
    name: 'obj2'
};
( obj2.foo = obj1.foo )();// window
```

## 四 箭头函数 arrow function（掌握）

箭头函数是es6 新增的写法

不会绑定this, arguments属性；箭头函数没有自己的this，箭头函数的this是继承自外层作用域的this

不能作为构造函数来使用（不能和new一起来使用， 会抛出错误）；

#### 4.0 **箭头简单使用**

```js
 // 箭头函数的写法
var fn = () => {
    console.log(this); // window
}
fn();
fn.call({ name: 'why' });
// 箭头函数没有自己的this，箭头函数的this是继承自外层作用域的this
// 你这里使用call来换取this，结果还是window

var obj = {
    name: 'why',
    sayHello: () => {
        console.log(this); // window
    }
}
obj.sayHello(); 
```

#### 4.1 箭头函数编写优化

```js
 // 优化1 如果一个参数()可以省略
// const fn = item => { console.log(this);} 
// 优化2 如果函数体只有一行代码，可以省略大括号
// const fn = () => console.log(this)
// 优化3 如果函数体只有一行代码，并且是return语句，可以省略大括号和return（对象必须加（））
const fn = () => ({ name: 'why' })
fn();
```

#### 4.2 实际应用

​		请求函数封装

```js
function request(url, callback){
    const items = ['111', '222', '333']
    callback(items)
}
// es6之前写法
// const obj = {
//     params: [],
//     network: function(){
//         _this = this
//         request('https://www.baidu.com', function(items){
//             console.log(_this) // window
//             _this.params = items
//         })
//     }
// }
// 箭头函数轻松解决
const obj = {
    params: [],
    network: function(){
        request('https://www.baidu.com', (items) => {
            console.log(this) // obj 因为此处的 obj.network() function
            this.params = items
        })
    }
}
obj.network()
console.log(obj)
```

五 面试题 一

```js
var name = 'window'

var person = {
    name: 'person',
    sayName: function () {
        console.log(this.name)
    }
}

function sayName() {
    var sss = person.sayName
    sss() 

    person.sayName() 

    // (person.sayName)() // person

    // (b = person.sayName)() //window
}
sayName()
```

