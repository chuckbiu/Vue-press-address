Vue

[TOC]



# 一、vue基础

## 第一部分、Vue核心

#### 安装（略）

### 0、学前基础

vue是什么，是一套用于构建用户界面的渐进式js框架

渐进式：vue可以自底向上逐层的应用

- 简单应用：只需一个轻量小巧的核心库
- 复杂应用：可以引入各式各样的vue插件

特点：**组件化**模式、**声明式**编码、**虚拟DOM+Diff算法**

学习vue前要掌握的js基础知识：

- es6语法规范

- es6模块化
- 包管理器
- 原型、原型链
- 数组常用方法
- axios
- promise

### 1、初识vue



*浏览器配置f12生产提示阻止

```js
vue.config.productionTip=false;//阻止vue在启动时生成生产提示。
```

*favicon.ico页签图标

##### 1-1、插值语法

用于解析标签体内容。

格式：{{msg}}

❤️插值里面放js表达式

区分js表达式和js代码(语句)

- 表达式：一个表达式会生成一个值，可以放在任何一个需要值的地方；

  - a

  - a+b

  - demo(1)

  - x===y  ? 'a':'b'

- js代码(语句)
  - if(){}
  - for(){}

```js
dome.toUpperCase()//js中让小写字母转为大写字母
```

##### 1-2、指令语法

用于解析标签、(包括:标签属性、标签体内容、绑定事件...)。

写链接时要v-bind（或者：）

```html
//将url通过绑定的形式绑定给href这个属性
<a v-bind:href="url">链接</a>
<a :href="url">链接</a>
```

###  2、数据绑定

##### 2-1、单向绑定 v-bind

数据只能从data流向页面

##### 2-2、双向绑定 v-model

数据不仅能从data流向页面，还可以从页面流向data

备注：

1. v-model:value 可以简写为v-model，因为v-model默认收集的就是value值
2. 双向绑定一般都应用在表单类元素(输入类元素)上(如：input、select等)

##### 2-3、简写

```html
<input type="text" v-bind:value="name">//单向绑定
<input type="text" v-model:value="name">//双向绑定
<input type="text" :value="name">//v-bind简写
<input type="text" v-model="name">//v-model简写
```

### 3、el与data的两种写法

```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>el与data两种写法</title>
		<script type="text/javascript" src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>hello,{{name}}</h1>
		</div>
	</body>
	<script type="text/javascript">
		// el的两种写法
		var vm new Vue({
			el:"#app",//挂载点的第一种写法
			// vm.$mount('#app'),//挂载点的第二种写法
			//data的第一种写法:对象式
			data:{
				name:'timi'
			},
			
			// data的第二种写法:函数式
					/* data:function(){
						console.log(this)//此处的this是Vue的实例对象,如果是箭头函数的话这个this就是全局window
						return{
							name:'timi2'
						}
					} */
		})
	</script>
</html>

```

##### 	3-1、el有两种写法：

​		(1)、new Vue时候配置el属性

​		(2)、先创建Vue实例，随后再通过vm.$mount('#app')指定el的值

##### 	3-2、data有两种写法：

​		(1)、对象式

​		(2)、函数式

​		如何选择：目前哪种写法都可以,以后学习到组件时,data必须使用函数式,否则会报错

##### 	3-3、一个重要的原则：

​		由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

### 4、理解MVVM模型

M：模型，对应data中的数据

- Plain JavaScript Objective：一般js对象

V：视图，模板

- DOM：页面文件

VM：视图模型，Vue实例对象

- DOM Listeners：DOM监听
- Data Bindings：数据绑定



##### 4-1、发现

1. data中所有属性，最后都出现在了vm身上(即vm里面有什么插值语法就能写什么)
2. vm身上所有属性及Vue原型(-proto-)上所有属性，在Vue模板中都可以直接使用

### 5、数据代理

#### 5-1、回顾Objective.defineProperty方法

Objective.defineProperty：给对象添加属性，给对象定义属性

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>回顾Objective.defineProperty方法</title>
	</head>
	<body>
		<!-- 
		 总结:通过改变number变量改变对象属性值靠getter,直接改变对象属性靠setter-->
		<script type="text/javascript">
			let number =18
			let person = {
				name:'张三',
				sex:'男',
			}
			//其中age是不能枚举的 
			Object.defineProperty(person,'age',{
				// value:18,
				// enumerable:true,//控制属性是否可用枚举，默认值false
				// writable:true,//控制属性是否能被修改，默认值为false
				// configurable:true,//属性能否被删除，默认为false
				//当有人读取person的age属性时,get函数(getter)就会被调用,且返回值就是age的值
				get(){
					console.log('有人读取了age属性了')
					return number
				}
				//当有人修改person的age属性时,set函数(setter)就会被调用,且会收到修改的具体值
				set(value){
					console.log('有人修改了age属性,且值是',value)
					number=value
				}
			})
			//方法一:验证是否能枚举
			// console.log(Object.keys(person))
			//方法二:通过for循坏验证是否能枚举
			/* for(let key in person){
				console.log('for循坏对象:',key,person[key])
			}
			console.log(person) */
		</script>
	</body>
</html>

```

#### 5-2、何为数据代理

数据代理：通过一个对象代理对另一个对象中属性的操作  读/写

下面演示一个对象obj2代理obj的操作

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>何为数据代理</title>
	</head>
	<body>
		<script type="text/javascript">
			let obj ={x:100}
			let obj2={y:200}
			
			Object.defineProperty(obj2,'x'{
				get(){
					return obj.x
				},
				set(value){
					obj.x=value
				}
			})
		</script>
	</body>
</html>

```

#### 5-3、Vue中的数据代理

vm._data=options.data=data//第三个data是外面的data

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Vue中的数据代理</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>学校名称:{{name}}</h2>
			<h2>学校地址:{{address}}</h2>
		</div>
	</body>
	<script type="text/javascript">
		let data={
			name:'111',
			address:'222',
		}
		const vm =new Vue({
			el:'#app',
			data//这里是调用前面的data
		})
	</script>
</html>

```



一旦data中的数据发生改变，那么页面找那个用到该数据的地方也会自动更新。





总结

1、Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）

2、Vue中数据代理的好处：更加方便的操作data中的数据

3、基本原理：①通过Objective.defineProperty()把data对象中所有属性添加到vm上。②为每一个添加到vm上的属性，都指定一个getter和setter。③在getter和setter内部去操作（读/写）data中对应的属性。

### 6、this关键字

#### 6-1、this.属性名称         

​		指的是访问类中的成员变量，用来区分成员变量和局部变量（重名问题）

#### 6-2、this.方法名称        

​		用来访问本类的成员方法

#### 6-3、this()

​		访问本类的构造方法

​		()中可以有参数的 如果有参数 就是调用指定的有参构造

### 7、事件处理

#### 7-1、事件的基本操作

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>事件的基本使用</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>欢迎{{name}}</h2>
			<button type="button" @click="showInfo1">点我提示信息1(不传参)</button>
			<button type="button" @click="showInfo2(66,$event)">点我提示信息2(传参)</button>
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				name:'111',
			},
			methods:{
				showInfo1(){
					alert(1111)
					// console.log(event.target.innerText)
					// console.log(this)//此处的this是vm，如果是箭头函数的话，此处的this是window
				},
				showInfo2(number,a){
					// alert(2222)
					// console.log(event.target.innerText)
					console.log(number,a)
				},
			}
		})
	</script>
</html>

```

事件的基本使用总结：

1、使用v-on:xxx或@xxx绑定事件，其中xx是事件名；

2、事件的回调需要配置在methods对象中，最终会在vm上；

3、methods中配置的函数，不要用箭头函数！否则this就不是vm了；

4、methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象；

5、@click="demo"和@click="demo($event)"效果一致，但后者可以传参；

#### 7-1.1、事件绑定

如果事件绑定里面的事件不写小括号表示传的参数为$event，如果小括号里面有值则表示该值的调用事件

```
@click="demo"和@click="demo(event)一样
@click="demo(n)  调用n值产生的事件
```

#### 7-2、事件修饰符

Vue中的事件修饰符:
		 1.prevent:阻止默认事件(常用);
		 2.stop:阻止事件冒泡(常用);
		 3、once:事件只触发一次(常用);
		 4、capture:使用事件的捕获模式;
		 5、self:只有event.target是当前操作的元素时才触发事件;
		 6、passive:事件的默认行为立即执行,无需等待事件回调执行完毕;

事件修饰符小技巧：修饰符能连续写的

```html
<a href="https://www.baidu.com"  @click.prevent.stop="showInfo">点我提示信息</a>  //两个修饰符连着写，先调用前面的修饰符，然后再调用后面的

```

案例如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>事件修饰符</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<style type="text/css">
		*{
			margin-top: 20px;
		}
		.demo1{
			height: 50px;
			background-color: skyblue;
		}
		.box1{
			padding: 5px;
			background-color: skyblue;
		}
		.box2{
			padding: 5px;
			background-color: orange;
		}
		.list{
			width: 200px;
			height: 200px;
			background-color: orange;
			overflow: auto;
			/* overflow 是自动滚动条 */
			
		}
		li{
			height: 100px;
			
		}
	</style>
	<body>
		<div id="app">
			<h2>欢迎{{name}}</h2>
			
			<!-- 阻止默认事件(常用) -->
			<a href="https://www.baidu.com" @click.prevent="showInfo">点我提示信息</a>
			
			<!-- 阻止事件冒泡(常用) -->
			<div class="demo1" @click="showInfo">
				<button type="button" @click.stop="showInfo">点我提示信息</button> 
			</div>
			
			<!-- 事件只触发一次(常用) -->
			<button type="button"@click.once="showInfo">点我提示信息</button>
			
			<!-- 使用事件的捕获模式 -->
			<!-- 事件的捕获阶段为由外向内,冒泡阶段为由内向外 -->
			<div class="box1" @click.capture="showMsg(1)">
				div1
				<div class="box2" @click="showMsg(2)">
					div2
				</div>
			</div>
			<!-- 只有event.target是当前操作的元素时才触发事件 -->
			<div class="demo1" @click.self="showInfo">
				<button type="button" @click="showInfo">点我提示信息</button> 
			</div>
			
			<!-- 事件的默认行为立即执行,无需等待事件回调执行完毕 -->
			<ul class="list" @scroll.passive="demo">
			<!-- <ul class="list" @whell="demo"> --><!-- 这个是鼠标滚动轮的滚动 -->
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
			</ul>
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				name:'111',
			},
			methods:{
				showInfo(event){
					// console.log(event.target)//这里是self修饰符的使用案例
					// event.stopPropagation()//阻止stop修饰符的使用案例
					// event.preventDefault()//阻止Vue在启动时生成生产提示。
					alert('欢迎进入百度搜索')
				},
				showMsg(msg){
					console.log(msg)
				},
				demo(){
					for (let i = 0; i < 10000; i++) {
						console.log('#')
					}
					console.log('累坏了')
				}
			}
		})
	</script>
</html>

```

#### 7-3、键盘事件

	键盘事件按键：
			 @keydown是你按下按键不用你手抬起来就触发事件
			 @keyup是你按下按键松手了才触发的事件
			 @keyup.enter 点号后面的叫别名
	1、Vue中常用的按键别名:
			回车 =>enter
			删除 =>delete (捕获“删除”和“退格”按键)
			退出 =>esc
			空格 =>space
			换行 =>tab tab会移动焦点(必须配合keydown使用)
			 上  =>up
			 下  =>down
			 左  =>left
			 右  =>right
	
	2、Vue未提供别名的按键,可以使用按键原始的key值去绑定,但注意要装维kebab-case(短横线命名)
			
	3、系统修饰键(用法特殊):ctrl、alt、shift、meta(windows电脑的win键)
			(1).配合keyup使用:按下修饰键的同时,再按下其他键,随后释放其他键,事件才会被触发。
			(2).配合keydown使用:正常触发事件。
					
	4、也可以使用keyCode去指定具体的按键(不推荐,已被web标准库删除)
			
	5、Vue.config.keyCodes.自定义键名 =键码, 可以去定制按键别名

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>键盘事件</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>欢迎{{name}}</h2>
			<input type="text" placeholder="按下回车提示输入" @keyup="showInfo"/>
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				name:'111',
			},
			methods:{
				showInfo(e){
					// if(e.keyCode !=13)return //keyCode获取键盘事件的代表符号 13然后判断是否按了回车按钮
					// console.log(e.target.value)
					console.log(e.key,e.keyCode)
				}
			}
		})
	</script>
</html>
```

键盘事件小技巧：

系统修饰也能连续写

```html
<input type="text" placeholder="按下回车提示输入" @keyup.ctrl.y="showInfo"/>//此时按下ctrl+y才能提示输入
```

### 8、计算属性

#### 8-1、插值语法实现

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>姓名案例_插值语法实现</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<!-- slice(0,3)这个函数用来截取长度 -->
		<div id="app">
			姓:<input type="text" v-model="firstName"/><br>
			名:<input type="text" v-model="lastName"/><br>
			<!-- 全名:<span>{{firstName.slice(0,3)}}-{{lastName}}</span> -->
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				firstName:'张',
				lastName:'三',
			},
		})
	</script>
</html>
```

#### 8-2、methods实现

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>姓名案例_methods实现</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			姓:<input type="text" v-model="firstName"/><br>
			名:<input type="text" v-model="lastName"/><br>
			全名:<span>{{fullName()}}</span>
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				firstName:'张',
				lastName:'三',
			},
			methods:{
				fullName(){
				return this.firstName+'-'+this.lastName
				}
			},
		})
	</script>
</html>
```

#### 8-3、computed计算属性

计算属性：
	1.定义：要用的属性不存在，要通过已有属性计算得来。
	2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
	3.get函数什么时候执行？
				(1).初次读取时会执行一次。
				(2).当依赖的数据发生改变时会被再次调用。
	4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
	5.备注：
			(1).计算属性最终会出现在vm上，直接读取使用即可。
			(2).如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起**计算**时依赖的数据发生改变。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>姓名案例_计算属性基本实现</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			姓:<input type="text" v-model="firstName"/><br>
			名:<input type="text" v-model="lastName"/><br>
			全名:<span>{{fullName}}</span>
		</div>
	</body>
	<script type="text/javascript">
		const vm =new Vue({
			el:'#app',
			data:{
				firstName:'张',
				lastName:'三',
			},
			computed:{
				fullName:{
					//get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
					//get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
					get(){
						console.log('get被调用了')
						// console.log(this) //此处的this是vm
						return this.firstName + '-' + this.lastName
					},
					//set什么时候调用? 当fullName被修改时。
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				}
			}
		})
	</script>
</html>
```

#### 8-4、计算属性简写

把computed里面的东西进行简写，确定只读取不修改(只有get没有set)

```js
//完整写法
/* fullName:{
	get(){
		console.log('get被调用了')
		return this.firstName + '-' + this.lastName
	},
	set(value){
		console.log('set',value)
		const arr = value.split('-')
		this.firstName = arr[0]
		this.lastName = arr[1]
	}
} */


//简写   确定只读取不修改(只有get没有set)
fullName(){
	console.log('get被调用了')
	return this.firstName + '-' + this.lastName
}
```

### 9、监视属性

#### 9-1、watch监视属性

监视属性watch：
	1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
	2.监视的属性必须存在，才能进行监视！！
	3.监视的两种写法：
			(1).new Vue时传入watch配置
			(2).通过vm.$watch监视

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>天气案例_监视属性</title>
		<!-- 引入Vue -->
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>今天天气很{{info}}</h2>
			<button @click="changeWeather">切换天气</button>
		</div>
	</body>
	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				isHot:true,
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			/* watch:{
				isHot:{
					immediate:true, //初始化时让handler调用一下,默认为false
					//handler什么时候调用？当isHot发生改变时。
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}
			} */
		})

		vm.$watch('isHot',{
			immediate:true, //初始化时让handler调用一下
			//handler什么时候调用？当isHot发生改变时。
			handler(newValue,oldValue){
				console.log('isHot被修改了',newValue,oldValue)
			}
		})
	</script>
</html>
```

#### 9-2、深度监视属性

一、深度监视：
		(1).Vue中的watch默认不监测对象内部值的改变（一层）。
		(2).配置deep:true可以监测对象内部值改变（多层）。
二、备注：
		(1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
		(2).使用watch时根据数据的具体结构，决定是否采用深度监视。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>天气案例_深度监视</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>今天天气很{{info}}</h2>
			<button @click="changeWeather">切换天气</button>
			<hr/>
			<h3>a的值是:{{numbers.a}}</h3>
			<button @click="numbers.a++">点我让a+1</button>
			<h3>b的值是:{{numbers.b}}</h3>
			<button @click="numbers.b++">点我让b+1</button>
			<button @click="numbers = {a:666,b:888}">彻底替换掉numbers</button>
			{{numbers.c.d.e}}
		</div>
	</body>
	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				isHot:true,
				numbers:{
					a:1,
					b:1,
					c:{
						d:{
							e:100
						}
					}
				}
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			watch:{
				isHot:{
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				},
				//监视多级结构中某个属性的变化
				/* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
				//监视多级结构中所有属性的变化
				numbers:{
					deep:true,
					handler(){
						console.log('numbers改变了')
					}
				}
			}
		})
	</script>
</html>
```

#### 9-3、监视属性简写

当配置项里面不需要immediate和deep时可以简写

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>天气案例_监视属性_简写</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>今天天气很{{info}}</h2>
			<button @click="changeWeather">切换天气</button>
		</div>
	</body>
	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				isHot:true,
			},
			computed:{
				info(){
					return this.isHot ? '炎热' : '凉爽'
				}
			},
			methods: {
				changeWeather(){
					this.isHot = !this.isHot
				}
			},
			watch:{
				//完整写法
				/* isHot:{
					// immediate:true, //初始化时让handler调用一下
					// deep:true,//深度监视
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}, */
				//简写
				isHot(newValue,oldValue){
					console.log('isHot被修改了',newValue,oldValue,this)
				}
			}
		})

		//完整写法
		/* vm.$watch('isHot',{
			deep:true,//深度监视
			handler(newValue,oldValue){
				console.log('isHot被修改了',newValue,oldValue)
			}
		}) */

		//简写，这里的this指的是window
		/* vm.$watch('isHot',(newValue,oldValue)=>{
			console.log('isHot被修改了',newValue,oldValue,this)
		}) */
	</script>
</html>
```

#### 9-4、computed与watch比较

一、computed和watch之间的区别：
		1.computed能完成的功能，watch都可以完成。
		2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

二、两个重要的小原则：
		1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
		2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_watch实现</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			姓：<input type="text" v-model="firstName"> <br/><br/>
			名：<input type="text" v-model="lastName"> <br/><br/>
			全名：<span>{{fullName}}</span> <br/><br/>
		</div>
	</body>
	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				firstName:'张',
				lastName:'三',
				fullName:'张-三'
			},
			watch:{
				/* firstName(val){
						this.fullName = val + '-' + this.lastName
					}
				}, */
				firstName(val){
					setTimeout(()=>{
						console.log(this)
						this.fullName = val + '-' + this.lastName
					},1000);
				},
				lastName(val){
					this.fullName = this.firstName + '-' + val
				}
			}
		})
	</script>
</html>
```

### 10、绑定样式

#### 10-1、style与class样式

	1. class样式
				写法:class="xxx" xxx可以是字符串、对象、数组。
						字符串写法适用于：类名不确定，要动态获取。
						对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
						数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
	 2. style样式
				:style="{fontSize: xxx}"其中xxx是动态值。
				:style="[a,b]"其中a、b是样式对象(key)，且样式对象必须是存在的。

案例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>绑定样式</title>
		<style>
			.basic{
				width: 400px;
				height: 100px;
				border: 1px solid black;
			}
			
			.happy{
				border: 4px solid red;;
				background-color: rgba(255, 255, 0, 0.644);
				background: linear-gradient(30deg,yellow,pink,orange,yellow);
			}
			.sad{
				border: 4px dashed rgb(2, 197, 2);
				background-color: gray;
			}
			.normal{
				background-color: skyblue;
			}

			.a1{
				background-color: yellowgreen;
			}
			.a2{
				font-size: 30px;
				text-shadow:2px 2px 10px red;
			}
			.a3{
				border-radius: 20px;
			}
		</style>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
			<div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
			<div class="basic" :class="classArr">{{name}}</div> <br/><br/>

			<!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
			<div class="basic" :class="classObj">{{name}}</div> <br/><br/>

			<!-- 绑定style样式--对象写法 -->
			<div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
			<!-- 绑定style样式--数组写法 -->
			<div class="basic" :style="styleArr">{{name}}</div>
		</div>
	</body>

	<script type="text/javascript">	
		const vm = new Vue({
			el:'#app',
			data:{
				name:'111',
				mood:'normal',
				classArr:['a1','a2','a3'],
				classObj:{
					a1:false,
					a2:false,
				},
				styleObj:{
					fontSize: '40px',
					color:'red',
				},
				styleObj2:{
					backgroundColor:'orange'
				},
				styleArr:[
					{
						fontSize: '40px',
						color:'blue',
					},
					{
						backgroundColor:'gray'
					}
				]
			},
			methods: {
				changeMood(){
					const arr = ['happy','sad','normal']
					const index = Math.floor(Math.random()*3)
					this.mood = arr[index]
				}
			},
		})
	</script>
	
</html>
```

### 11、条件渲染

#### 11-1、隐藏div的方法：

1、div的**visibility**控制div的隐藏和显示

```css
    style="visibility: none;"
```

2、设置display属性  可以是div隐藏后释放占用的页面空间

```css
style="display: none;"
```

3、opacity设置元素透明度为0

```css
style="opacity:0;"
```

#### 11-2、v-if 和v-show

条件渲染：
1.v-if
		写法：
			(1).v-if="表达式" 
			(2).v-else-if="表达式"
			(3).v-else="表达式"
		适用于：切换频率较低的场景。
		特点：不展示的DOM元素直接被移除。v-if是通过控制dom节点的存在与否来控制元素的显隐。
		注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

2.v-show
		写法：v-show="表达式"
		适用于：切换频率较高的场景。
		特点：不展示的DOM元素未被移除，仅仅是通过设置DOM元素的display样式设置显隐。（display中block为显示，none为隐藏）
3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>条件渲染</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>当前的n值是:{{n}}</h2>
			<button @click="n++">点我n+1</button>
			<!-- 使用v-show做条件渲染 -->
			<!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
			<!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->

			<!-- 使用v-if做条件渲染 -->
			<!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
			<!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->

			<!-- v-else和v-else-if -->
			<!-- <div v-if="n === 1">Angular</div>
			<div v-else-if="n === 2">React</div>
			<div v-else-if="n === 3">Vue</div>
			<div v-else>哈哈</div> -->

			<!-- template只能与v-if配合使用，不能和v-show配合 ,template不影响结构，把template改为div影响结构-->
			<template v-if="n === 1">
				<h2>你好</h2>
				<h2>111</h2>
				<h2>北京</h2>
			</template>

		</div>
	</body>

	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				name:'111',
				n:0
			}
		})
	</script>
</html>

```

### 12、列表渲染

#### 12-1、基本列表

v-for指令:
		1.用于展示列表数据
		2.语法：v-for="(item, index) in xxx" :key="yyy"
		3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

案例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>基本列表</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 遍历数组 -->
			<h2>人员列表（遍历数组）</h2>
			<ul>
				<!-- <li v-for="p in persons" :key="p.id">{{p.name}}-{{p.age}}</li> -->
				<li v-for="(p,index) of persons" :key="index">
				{{p.name}}-{{p.age}}
				</li>
			</ul>
			
			<!-- 遍历对象 -->
			<h2>汽车信息（遍历对象）</h2>
			<ul>
				<li v-for="(value,k) of car" :key='k'>
				{{k}}-{{value}}
				</li>
			</ul>
			
			<!-- 遍历字符串 -->
			<h2>测试遍历字符串（用得少）</h2>
			<ul>
				<li v-for="(char,index) of str" :key="index">
				{{char}}-{{index}}
				</li>
			</ul>
			
			<!-- 遍历指定次数 -->
			<h2>测试遍历指定次数（用得少）</h2>
			<ul>
				<li v-for="(number,index) of 5" :key="index">
				{{index}}-{{number}}
				</li>
			</ul>
		</div>

		<script type="text/javascript">
			new Vue({
				el:'#app',
				data:{
					persons:[
						{id:'001',name:'张三',age:18},
						{id:'002',name:'李四',age:19},
						{id:'003',name:'王五',age:20},
					],
					car:{
						name:'奥迪A8',
						price:'70万',
						color:'黑色'
					},
					str:'hello'
				}
			})
		</script>
</html>
```

#### 12-2、key的原理

![202203071105550](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/202203071105550.jpg)

###### 面试题：react、vue中的key有什么作用？（key的内部原理）

1、虚拟DOM中key的作用：
		key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

​	**对比规则**：
​		(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
​						①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
​						②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

​				  (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
​								创建新的真实DOM，随后渲染到到页面。
​					

2、用index作为key或者不声明key的时候（此时默认key的value值为index时）可能会引发的问题：

​    (1).若对数据进行：逆序添加、逆序删除等破坏顺序操作:
​    				会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

​    (2).如果结构中还包含输入类的DOM：
​    				会产生错误DOM更新 ==> 界面有问题。

3、开发中如何选择key?:
    			(1).最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
    			(2).如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>key的原理</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 遍历数组 -->
			<h2>人员列表（遍历数组）</h2>
			<button type="button" @click.once="add">添加一个老刘</button>
			<ul>
				<li v-for="(p,index) of persons" :key="index">
				{{p.name}}-{{p.age}}
				</li>
			</ul>
			
		</div>

		<script type="text/javascript">
			new Vue({
				el:'#app',
				data:{
					persons:[
						{id:'001',name:'张三',age:18},
						{id:'002',name:'李四',age:19},
						{id:'003',name:'王五',age:20},
					],
				},
				methods:{
					add(){
						const p={
							id:'004',
							name:'老刘',
							age:40
						}
						this.persons.unshift(p)
					}
				}
			})
		</script>
</html>
```

#### 12-3、列表过滤

filter()：**用于把Array中的某些元素过滤掉，然后返回剩下的元素**

'abc'.indexOf(a)   **判断字符出现的索引位置，没有就返回-1**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>列表过滤</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>人员列表</h2>
			<input type="text" placeholder="请输入名字" v-model="keyWord">
			<ul>
				<li v-for="(p,index) of filPerons" :key="index">
					{{p.name}}-{{p.age}}-{{p.sex}}
				</li>
			</ul>
		</div>

		<script type="text/javascript">
			Vue.config.productionTip = false
			
			//用watch实现
			//#region 
			/* new Vue({
				el:'#app',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					],
					filPerons:[]
				},
				watch:{
					keyWord:{
						immediate:true,
						handler(val){
							this.filPerons = this.persons.filter((p)=>{
								return p.name.indexOf(val) !== -1
							})
						}
					}
				}
			}) */
			//#endregion
			
			//用computed实现
			new Vue({
				el:'#app',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					]
				},
				computed:{
					filPerons(){
						return this.persons.filter((p)=>{
							return p.name.indexOf(this.keyWord) !== -1
						})
					}
				}
			}) 
		</script>
</html>
```

#### 12-4、列表排序

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>列表排序</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>人员列表</h2>
			<input type="text" placeholder="请输入名字" v-model="keyWord">
			<button @click="sortType = 2">年龄升序</button>
			<button @click="sortType = 1">年龄降序</button>
			<button @click="sortType = 0">原顺序</button>
			<ul>
				<li v-for="(p,index) of filPerons" :key="p.id">
					{{p.name}}-{{p.age}}-{{p.sex}}
					<input type="text">
				</li>
			</ul>
		</div>

		<script type="text/javascript">
			new Vue({
				el:'#app',
				data:{
					keyWord:'',
					sortType:0, //0原顺序 1降序 2升序
					persons:[
						{id:'001',name:'马冬梅',age:30,sex:'女'},
						{id:'002',name:'周冬雨',age:31,sex:'女'},
						{id:'003',name:'周杰伦',age:18,sex:'男'},
						{id:'004',name:'温兆伦',age:19,sex:'男'}
					]
				},
				computed:{
					filPerons(){
						const arr = this.persons.filter((p)=>{
							return p.name.indexOf(this.keyWord) !== -1
						})
						//判断一下是否需要排序
						if(this.sortType){
							arr.sort((p1,p2)=>{
								return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
							})
						}
						return arr
					}
				}
			}) 
		</script>
</html>
```

#### 12-5、更新时的一个问题

Vue里面原本就有一个watch，而侦听属性的watch是给程序员用的。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>更新时的一个问题</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>人员列表</h2>
			<button @click="updateMei">更新马冬梅的信息</button>
			<ul>
				<li v-for="(p,index) of persons" :key="p.id">
					{{p.name}}-{{p.age}}-{{p.sex}}
				</li>
			</ul>
		</div>

		<script type="text/javascript">
			Vue.config.productionTip = false
			
			const vm = new Vue({
				el:'#app',
				data:{
					persons:[
						{id:'001',name:'马冬梅',age:30,sex:'女'},
						{id:'002',name:'周冬雨',age:31,sex:'女'},
						{id:'003',name:'周杰伦',age:18,sex:'男'},
						{id:'004',name:'温兆伦',age:19,sex:'男'}
					]
				},
				methods: {
					updateMei(){
						// this.persons[0].name = '马老师' //奏效
						// this.persons[0].age = 50 //奏效
						// this.persons[0].sex = '男' //奏效
						// this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
						this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})//这是最后得出的结论
					}
				}
			}) 

		</script>
</html>
```

#### 12-6、模拟一个Vue数据监测

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
	</head>
	<body>
		<script type="text/javascript" >

			let data = {
				name:'111',
				address:'222',
			}

			//创建一个监视的实例对象，用于监视data中属性的变化
			const obs = new Observer(data)		
			console.log(obs)	

			//准备一个vm实例对象
			let vm = {}
			vm._data = data = obs

			function Observer(obj){
				//汇总对象中所有的属性形成一个数组
				const keys = Object.keys(obj)
				//遍历
				keys.forEach((k)=>{
					Object.defineProperty(this,k,{
						get(){
							return obj[k]
						},
						set(val){
							console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
							obj[k] = val
						}
					})
				})
			}
		</script>
	</body>
</html>
```

#### 12-7、Vue监测数据改变的原理__对象

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Vue监测数据改变的原理</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>学校名称：{{name}}</h2>
			<h2>学校地址：{{address}}</h2>
		</div>
	</body>

	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				name:'111',
				address:'222',
				student:{
					name:'tom',
					age:{
						rAge:40,
						sAge:29,
					},
					friends:[
						{name:'jerry',age:35}
					]
				}
			}
		})
	</script>
</html>
```

#### 12-8、Vue.set()方法

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Vue.set()使用方法</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>学校信息</h1>
			<h2>学校名称：{{school.name}}</h2>
			<h2>学校地址：{{school.address}}</h2>
			<h2>校长是：{{school.leader}}</h2>
			<hr/>
			<h1>学生信息</h1>
			<button @click="addSex">添加一个性别属性，默认值是男</button>
			<h2>姓名：{{student.name}}</h2>
			<h2 v-if="student.sex">性别：{{student.sex}}</h2>
			<h2>年龄：真实{{student.age.rAge}}，对外{{student.age.sAge}}</h2>
			<h2>朋友们</h2>
			<ul>
				<li v-for="(f,index) in student.friends" :key="index">
					{{f.name}}--{{f.age}}
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				school:{
					name:'111',
					address:'222',
				},
				student:{
					name:'tom',
					age:{
						rAge:40,
						sAge:29,
					},
					friends:[
						{name:'jerry',age:35},
						{name:'tony',age:36}
					]
				}
			},
			methods: {
				addSex(){
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				}
			}
		})
	</script>
</html>
```

#### 12-9、Vue监测数据改变的原理__数组

在Vue修改数组中的某个元素一定要用如下方法：
							1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
							2.Vue.set() 或 vm.$set()

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Vue监测数据改变的原理_数组</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>学生信息</h1>
			<h2>爱好</h2>
			<ul>
				<li v-for="(h,index) in student.hobby" :key="index">
					{{h}}
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			data:{
				student:{
					hobby:['抽烟','喝酒','烫头'],
				}
			},
		})
	</script>
</html>
```

#### 12-10、总结Vue数据监测

Vue监视数据的原理：

1.vue会监视data中所有层次的数据。

2.如何监测对象中的数据？
	通过setter实现监视，且要在new Vue时就传入要监测的数据。
		(1).对象中后追加的属性，Vue默认不做响应式处理
		(2).如需给后添加的属性做响应式，请使用如下API：
			Vue.set(target，propertyName/index，value) 

​				或

​			vm.$set(target，propertyName/index，value)

3.如何监测数组中的数据？
		通过包裹数组更新元素的方法实现，本质就是做了两件事：
				(1).调用原生对应的方法对数组进行更新。
				(2).重新解析模板，进而更新页面。

4.在Vue修改数组中的某个元素一定要用如下方法：
				1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
				2.Vue.set() 或 vm.$set()
	特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>总结数据监视</title>
		<style>
			button{
				margin-top: 10px;
			}
		</style>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>学生信息</h1>
			<button @click="student.age++">年龄+1岁</button> <br/>
			<button @click="addSex">添加性别属性，默认值：男</button> <br/>
			<button @click="student.sex = '未知' ">修改性别</button> <br/>
			<button @click="addFriend">在列表首位添加一个朋友</button> <br/>
			<button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
			<button @click="addHobby">添加一个爱好</button> <br/>
			<button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
			<button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
			<h3>姓名：{{student.name}}</h3>
			<h3>年龄：{{student.age}}</h3>
			<h3 v-if="student.sex">性别：{{student.sex}}</h3>
			<h3>爱好：</h3>
			<ul>
				<li v-for="(h,index) in student.hobby" :key="index">
					{{h}}
				</li>
			</ul>
			<h3>朋友们：</h3>
			<ul>
				<li v-for="(f,index) in student.friends" :key="index">
					{{f.name}}--{{f.age}}
				</li>
			</ul>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

		const vm = new Vue({
			el:'#app',
			data:{
				student:{
					name:'tom',
					age:18,
					hobby:['抽烟','喝酒','烫头'],
					friends:[
						{name:'jerry',age:35},
						{name:'tony',age:36}
					]
				}
			},
			methods: {
				addSex(){
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				},
				addFriend(){
					this.student.friends.unshift({name:'jack',age:70})
				},
				updateFirstFriendName(){
					this.student.friends[0].name = '张三'
				},
				addHobby(){
					this.student.hobby.push('学习')
				},
				updateHobby(){
					// this.student.hobby.splice(0,1,'开车')
					// Vue.set(this.student.hobby,0,'开车')
					this.$set(this.student.hobby,0,'开车')
				},
				removeSmoke(){
					this.student.hobby = this.student.hobby.filter((h)=>{
						return h !== '抽烟'
					})
				}
			}
		})
	</script>
</html>
```

#### 12-11、数据劫持

数据劫持：
指的是在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果。比较典型的是Object.defineProperty()和 ES2016 中新增的Proxy对象。数据劫持最著名的应用当属双向绑定，这也是一个已经被讨论烂了的面试必考题。例如 **Vue 2.x 使用的是Object.defineProperty()**(Vue 在 3.x 版本之后改用 Proxy 进行实现)。

**Vue的双向绑定**就是利用 Object.defineProperty()，并且把内部解耦为 `Observer`, `Dep`, 并使用 `Watcher` 相连。

数组的以下几个方法不会触发 set：（push、pop、shift、unshift、splice、sort、reverse   ）  

Vue 把这些方法定义为变异方法 ，指的是会修改原来数组的方法。与之对应则是非变异方法 ，例如 filter, concat, slice 等，它们都不会修改原始数组，而会返回一个新的数组。



### 13、收集表单数据

收集表单数据：					

```
若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。

若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
若：<input type="checkbox"/>
			1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
			2.配置input的value属性:
				(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
				(2)v-model的初始值是数组，那么收集的的就是value组成的数组
```

​		备注：v-model的三个修饰符：
​					  lazy：失去焦点再收集数据
​				  	number：输入字符串转为有效的数字
​					  trim：输入首尾空格过滤

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>收集表单数据</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<form @submit.prevent="demo">
				账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
				密码：<input type="password" v-model="userInfo.password"> <br/><br/>
				年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
				性别：
				男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
				女<input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br/><br/>
				爱好：
				学习<input type="checkbox" v-model="userInfo.hobby" value="study">
				打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
				吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
				<br/><br/>
				所属校区
				<select v-model="userInfo.city">
					<option value="">请选择校区</option>
					<option value="beijing">北京</option>
					<option value="shanghai">上海</option>
					<option value="shenzhen">深圳</option>
					<option value="wuhan">武汉</option>
				</select>
				<br/><br/>
				其他信息：
				<textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
				<input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="###">《用户协议》</a>
				<button>提交</button>
			</form>
		</div>
	</body>

	<script type="text/javascript">
		new Vue({
			el:'#app',
			data:{
				userInfo:{
					account:'',
					password:'',
					age:18,
					sex:'female',
					hobby:[],
					city:'beijing',
					other:'',
					agree:''
				}
			},
			methods: {
				demo(){
					console.log(JSON.stringify(this.userInfo))
				}
			}
		})
	</script>
</html>
```

### 14、过滤器

过滤器：(定义、语法、备注)
				定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
				语法：
						1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
						2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
				备注：
						1.过滤器也可以接收额外参数、多个过滤器也可以串联
						2.并没有改变原本的数据, 是产生新的对应的数据

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>过滤器</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
		<script type="text/javascript" src="Vue/js/dayjs.min.js"></script>
	</head>
	<body>
		<div id="app">
			<h2>显示格式化后的时间</h2>
			<!-- 计算属性实现 -->
			<h3>现在是：{{fmtTime}}</h3>
			<!-- methods实现 -->
			<h3>现在是：{{getFmtTime()}}</h3>
			<!-- 过滤器实现 -->
			<h3>现在是：{{time | timeFormater}}</h3>
			<!-- 过滤器实现（传参） -->
			<h3>现在是：{{time | timeFormater('YYYY_MM_DD')}}</h3>
			<!-- 多个过滤器的串联 -->
			<h3>现在是1：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
			<h3 :x="msg | mySlice">学校名字</h3>
		</div>

		<div id="app2">
			<h2>{{msg | mySlice}}</h2>
		</div>
	</body>

	<script type="text/javascript">
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})
		
		new Vue({
			el:'#app',
			data:{
				time:1621561377603, //时间戳
				msg:'你好，111'
			},
			computed: {
				fmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			methods: {
				getFmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			//局部过滤器
			filters:{
				timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){//如果str有值使用str传的，如果没有则使用这里的''里面默认的值
					// console.log('@',value)
					return dayjs(value).format(str)
				}
			}
		})

		new Vue({
			el:'#app2',
			data:{
				msg:'hello,222!'
			}
		})
	</script>
</html>
```

### 15、内置指令

有哪些？

```
v-bind	  : 单向绑定解析表达式, 可简写为 :xxx
v-model	  : 双向数据绑定
v-for  	  : 遍历数组/对象/字符串
v-on      : 绑定事件监听, 可简写为@
v-if 	  : 条件渲染（动态控制节点是否存存在）
v-else 	  : 条件渲染（动态控制节点是否存存在）
v-show 	  : 条件渲染 (动态控制节点是否展示)
v-text指令 : 向其所在的节点中渲染文本内容。
v-html指令 : 向指定节点中渲染包含html结构的内容。
v-cloak指令: 解决网速慢时页面展示出{{xxx}}的问题
v-once指令 : 所在节点初次动态渲染后，就视为静态内容
v-pre指令  : 跳过其所在节点的编译过程
```

#### 15-1、v-text指令

v-text指令：
			1.作用：向其所在的节点中渲染文本内容。
			2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-text指令</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<div>你好，{{name}}</div>
			<div v-text="name"></div>
			<div v-text="str"></div>
		</div>
	</body>

	<script type="text/javascript">	
		new Vue({
			el:'#app',
			data:{
				name:'111',
				str:'<h3>你好啊！</h3>'
			}
		})
	</script>
</html>
```

#### 15-2、v-html指令

##### v-html的安全性(cookie)

v-html指令：
			1.作用：向指定节点中渲染包含html结构的内容。
			2.与插值语法的区别：
					(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
					(2).v-html可以识别html结构。
			3.严重注意：v-html有安全性问题！！！！
					(1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
					(2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-html指令</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<div>你好，{{name}}</div>
			<div v-html="str"></div>
			<div v-html="str2"></div>
		</div>
	</body>

	<script type="text/javascript">
		new Vue({
			el:'#app',
			data:{
				name:'111',
				str:'<h3>你好啊！</h3>',
				str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了，快来！</a>',
			}
		})
	</script>
</html>
```

#### 15-3、v-cloak指令

v-cloak指令（没有值）：
			1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
			2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-cloak指令</title>
		<style>
			[v-cloak]{
				display:none;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<h2 v-cloak>{{name}}</h2>
		</div>
		<!-- 这里可以调整延迟时间为5s -->
		<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>
	</body>
	<script type="text/javascript">
		console.log(1)
		new Vue({
			el:'#app',
			data:{
				name:'111'
			}
		})
	</script>
</html>
```

#### 15-4、v-once指令

v-once指令：
			1.v-once所在节点在初次动态渲染后，就视为静态内容了。
			2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-once指令</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 这里只会渲染一次打开页面后就让值定格在1了-->
			<h2 v-once>初始化的n值是:{{n}}</h2>
			<h2>当前的n值是:{{n}}</h2>
			<button @click="n++">点我n+1</button>
		</div>
	</body>

	<script type="text/javascript">
		new Vue({
			el:'#app',
			data:{
				n:1
			}
		})
	</script>
</html>
```

#### 15-5、v-pre指令

v-pre指令：
		1.跳过其所在节点的编译过程。
		2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>v-pre指令</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2 v-pre>Vue其实很简单</h2>
			<h2 >当前的n值是:{{n}}</h2>
			<button @click="n++">点我n+1</button>
		</div>
	</body>
	<script type="text/javascript">
		new Vue({
			el:'#app',
			data:{
				n:1
			}
		})
	</script>
</html>
```

### 16、自定义指令

#### 16-1、回顾一个DOM操作

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Document</title>
		<style>
			.demo{
				background-color: orange;
			}
		</style>
	</head>
	<body>
		<button id="btn">点我创建一个输入框</button>
		
		<script type="text/javascript" >
			const btn = document.getElementById('btn')
			btn.onclick = ()=>{
				const input = document.createElement('input')

				input.className = 'demo'
				input.value = 99
				input.onclick = ()=>{alert(1)}
				
				document.body.appendChild(input)

				input.focus()
				// input.parentElement.style.backgroundColor = 'skyblue'
				console.log(input.parentElement)
				
			}
		</script>
	</body>
</html>
```

#### 16-2、自定义指令操作

自定义指令总结：
	一、定义语法：

(1).**局部指令**：

```
new Vue({	
	directives:{指令名:配置对象}      		
}) 
或
new Vue({
	directives{指令名:回调函数}
})
```

(2).**全局指令**：

```
Vue.directive(指令名,配置对象)
或
Vue.directive(指令名,回调函数)
```

​	二、配置对象中常用的3个回调：
​				(1).**bind**：指令与元素成功绑定时调用。
​				(2).**inserted**：指令所在元素被插入页面时调用。
​				(3).**update**：指令所在模板结构被重新解析时调用。

​	三、备注：
​				1.指令定义时不加v-，但使用时要加v-；
​				2.指令名如果是多个单词，要使用**kebab-case**命名方式，不要用camelCase命名。                  （user-name式命名）

**案例如下：**

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>自定义指令</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<!-- 
				需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
				需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
		-->
		<div id="app">
			<h2>{{name}}</h2>
			<h2>当前的n值是：<span v-text="n"></span> </h2>
			<!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
			<h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
			<button @click="n++">点我n+1</button>
			<hr/>
			<input type="text" v-fbind:value="n">
		</div>
	</body>
	
	<script type="text/javascript">
		//定义全局指令
		/* Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		}) */
		
		/* Vue.directive('big',function(element,binding){
			console.log('big',this)//注意此处的this是window
			// console.log('big')
			element.innerText=binding.value*10
		}) */

		new Vue({
			el:'#app',
			data:{
				name:'尚硅谷',
				n:1
			},
			directives:{
				//big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
				/* 'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
				}, */
				big(element,binding){  //element表示为元素，binding表示为指令与元素的一个关系绑定
					console.log('big',this) //注意(directives)此处的this是window
					// console.log('big')
					// console.dir(a)//console.dir(i) 表示输出(i)这个值到控制台
					// console.log(a instanceof HTMLElement)//instanceof是判断a是不是HTMLElement(网页元素)的实例
					element.innerText = binding.value * 10
				},
				fbind:{
					//指令与元素成功绑定时（一上来）
					bind(element,binding){
						element.value = binding.value
					},
					//指令所在元素被插入页面时
					inserted(element,binding){
						element.focus()
					},
					//指令所在的模板被重新解析时
					update(element,binding){
						element.value = binding.value
						// element.focus()//点击按钮后焦点依旧在这里
					}
				}
			}
		})
		
	</script>
</html>
```

### 17、生命周期

#### 17-1、引入生命周期

**生命周期**：
				1.又名：生命周期回调函数、生命周期函数、**生命周期钩子**。
				2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
				3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。

​				4.生命周期函数中的this指向是vm 或 组件实例对象。
​				5.第一次放入页面叫挂载，后面的叫更新

**什么是挂载(mounted)？**
				Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted

案例如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>引出生命周期</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2 v-if="a">你好啊</h2>
			<h2 :style="{opacity}">欢迎学习Vue</h2>
		</div>
	</body>

	<script type="text/javascript">
		 const vm = new Vue({
			el:'#app',
			data:{
				a:false,
				opacity:1
			},
			methods: {
				
			},
			//Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
			mounted(){
				console.log('mounted',this)
				setInterval(() => {
					this.opacity -= 0.01
					if(this.opacity <= 0) this.opacity = 1
				},16)
			},
		})

		//通过外部的定时器实现（不推荐）
		/* setInterval(() => {
			vm.opacity -= 0.01
			if(vm.opacity <= 0) vm.opacity = 1
		},16) */
	</script>
</html>
```

#### 17-2、分析生命周期(挂载、更新、与销毁)



```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>分析生命周期</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app" :x="n">
			<h2 v-text="n"></h2>
			<h2>当前的n值是：{{n}}</h2>
			<button @click="add">点我n+1</button>
			<button @click="bye">点我销毁vm</button>
		</div>
	</body>

	<script type="text/javascript">
		new Vue({
			el:'#app',
			//template是母版，使用时用render函数渲染
			// template:`
			// 	<div> //不能使用template做完组件代替根元素 ，但是可以做为非根元素使用
			// 		<h2>当前的n值是：{{n}}</h2>
			// 		<button @click="add">点我n+1</button>
			// 	</div>
			// `,
			data:{
				n:1
			},
			methods: {
				add(){
					console.log('add')
					this.n++
				},
				bye(){
					console.log('bye')
					this.$destroy()
					//当vm.$destroy被调用时，完全销毁一个实例，清理它与其他实例的连接，解绑了(自定义)事件监听器。
				}
			},
			watch:{
				n(){
					console.log('n变了')
				}
			},
			beforeCreate() {
				console.log('beforeCreate')
				//此处没有vm中的_data、methods中的配置方法。
			},
			created() {
				console.log('created')
				//此处开始有vm和_data、methods中的配置方法以及数据监测和数据代理。
			},
			beforeMount() {
				console.log('beforeMount')
				//此处呈现的是未经Vue编译的DOM结构，所有对DOM的操作都是不奏效的
			},
			mounted() {
				console.log('mounted')
				//页面中呈现的是经Vue编译的DOM，至此初始化结束
				//在此处可以进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作。
			},
			beforeUpdate() {
				console.log('beforeUpdate')
				//此处页面是新的，但是页面是旧的
			},
			updated() {
				console.log('updated')
			},
			beforeDestroy() {
				console.log('beforeDestroy')
				// 此时vm中的data、methods、指令等均可用，此时方法修改不会触发更新。
				//在此阶段，一般进行关闭定时器、取消订阅消息、解绑自定义事件等。
			},
			destroyed() {
				console.log('destroyed')
				此时已经移除监听、子组件、(自定义)事件监听器。
			},
		})
	</script>
</html>
```

#### 17-3、总结生命周期

```
vm的一生(vm的生命周期)：
		将要创建==>调用beforeCreate函数
		创建完毕==>调用created函数
   (重要)将要挂载==>调用beforeMount函数
		挂载完毕==>调用mounted函数=====>【重要的钩子】
		将要更新==>调用beforeUpdate函数
		更新完毕==>调用updated函数
   (重要)将要销毁==>调用beforeDestroy函数=>重要的钩子
		销毁完毕==>调用destroyed函数
```

**常用的生命周期钩子**：
			1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
			2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
**关于销毁Vue实例**
​		1.销毁后借助Vue开发者工具看不到任何信息。
​		2.销毁后自定义事件会失效，但原生DOM事件依然有效。
​		3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>引出生命周期</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h2 :style="{opacity}">欢迎学习Vue</h2>
			<button @click="opacity = 1">透明度设置为1</button>
			<button @click="stop">点我停止变换</button>
		</div>
	</body>

	<script type="text/javascript">
		 new Vue({
			el:'#app',
			data:{
				opacity:1
			},
			methods: {
				stop(){
					this.$destroy()
				}
			},
			//Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
			mounted(){
				console.log('mounted',this)
				this.timer = setInterval(() => {
					console.log('setInterval')
					this.opacity -= 0.01
					if(this.opacity <= 0) this.opacity = 1
				},16)
			},
			beforeDestroy() {
				clearInterval(this.timer)
				console.log('vm即将驾鹤西游了')
			},
		})

	</script>
</html>
```

## 第二部分、Vue组件化编程

### 1、模块与组件、模块化与组件化

#### 1-1、模块：

	1. 理解: 向外提供特定功能的 js 程序, 一般就是一个 js 文件 
	2. 为什么: js 文件很多很复杂 
	3. 作用: 复用 js, 简化 js 的编写, 提高 js 运行效率 

#### 1-2、组件：

    1. 理解: 用来实现局部(特定)功能效果的代码集合(html/css/js/image…..) 
    2. 为什么: 一个界面的功能很复杂
    3. 作用: 复用编码, 简化项目编码, 提高运行效率。

#### 1-3、模块化：

当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用。

#### 1-4、组件化：

当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用。

### 2、非单文件组件

#### 2-1、基本使用

一个文件包含有n个组件。

Vue中使用组件的三大步骤：
		一、**定义组件(创建组件)**
		二、**注册组件**
		三、**使用组件(写组件标签)**

```
一、如何定义一个组件？
		使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
		区别如下：
			1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
			2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
			备注：使用template可以配置组件结构。

二、如何注册组件？
	1.局部注册：靠new Vue的时候传入components选项
	2.全局注册：靠Vue.component('组件名',组件)

三、编写组件标签：
		<school></school>
```

案例如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>基本使用</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<hello></hello>
			<hr>
			<h1>{{msg}}</h1>
			<hr>
			<!-- 第三步：编写组件标签 -->
			<school></school>
			<hr>
			<!-- 第三步：编写组件标签 -->
			<student></student>
		</div>

		<div id="root">
			<hello></hello>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false

		//第一步：创建school组件
		const school = Vue.extend({
			template:`
				<div class="demo">
					<h2>学校名称：{{schoolName}}</h2>
					<h2>学校地址：{{address}}</h2>
					<button @click="showName">点我提示学校名</button>	
				</div>
			`,
			// el:'#app', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
			data(){
				return {
					schoolName:'111',
					address:'002'
				}
			},
			methods: {
				showName(){
					alert(this.schoolName)
				}
			},
		})

		//第一步：创建student组件
		const student = Vue.extend({
			template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
				</div>
			`,
			data(){
				return {
					studentName:'张三',
					age:18
				}
			}
		})
		
		//第一步：创建hello组件
		const hello = Vue.extend({
			template:`
				<div>	
					<h2>你好啊！{{name}}</h2>
				</div>
			`,
			data(){
				return {
					name:'Tom'
				}
			}
		})
		
		//第二步：全局注册组件
		Vue.component('hello',hello)

		//创建vm
		new Vue({
			el:'#app',
			data:{
				msg:'你好啊！'
			},
			//第二步：注册组件（局部注册）
			components:{
				school,
				student
			}
		})

		new Vue({
			el:'#root',
		})
	</script>
	<!-- 使用对象是引用数据，你用我用大家用，函数返回值，是复印了一份新的给你，你随便改，影响不了原本 -->
</html>
```

#### 2-2、几个注意点

1.**关于组件名**:
			一个单词组成：
						第一种写法(首字母小写)：school
						第二种写法(首字母大写)：School
			多个单词组成：
						第一种写法(kebab-case命名)：**my-school**
						第二种写法(CamelCase命名)：**MySchool** (需要Vue脚手架支持)
			备注：
			(1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
			(2).可以使用name配置项指定组件在开发者工具中呈现的名字。
2.**关于组件标签**:
		第一种写法：<school></school>
		第二种写法：<school/>
		备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。
3.**一个简写方式**：
	const school = Vue.extend(options) 可简写为：**const school = options**

案例如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>几个注意点</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>{{msg}}</h1>
			<school></school>
		</div>
	</body>

	<script type="text/javascript">
		//定义组件
		const s = Vue.extend({
			name:'222',
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
				</div>
			`,
			data(){
				return {
					name:'111',
					address:'002'
				}
			}
		})

		new Vue({
			el:'#app',
			data:{
				msg:'欢迎学习Vue!'
			},
			components:{
				school:s
			}
		})
	</script>
</html>
```

#### 2-3、组件的嵌套

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>组件的嵌套</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="root"></div>
	</body>

	<script type="text/javascript">
		//定义student组件
		const student = Vue.extend({
			name:'student',
			template:`
				<div>
					<h2>学生姓名：{{name}}</h2>	
					<h2>学生年龄：{{age}}</h2>	
				</div>
			`,
			data(){
				return {
					name:'222',
					age:18
				}
			}
		})
		
		//定义school组件
		const school = Vue.extend({
			name:'school',
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<student></student>
				</div>
			`,
			data(){
				return {
					name:'111',
					address:'111'
				}
			},
			//注册组件（局部）
			components:{
				student
			}
		})

		//定义hello组件
		const hello = Vue.extend({
			template:`<h1>{{msg}}</h1>`,
			data(){
				return {
					msg:'欢迎来学习！'
				}
			}
		})
		
		//定义app组件
		const app = Vue.extend({
			template:`
				<div>	
					<hello></hello>
					<school></school>
				</div>
			`,
			components:{
				school,
				hello
			}
		})

		//创建vm
		new Vue({
			template:'<app></app>',
			el:'#root',
			//注册组件（局部）
			components:{app}
		})
	</script>
</html>
```

#### 2-4、VueComponent

关于VueComponent：
				1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
				2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。
				3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！
				4.关于this指向：
						(1).组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
						(2).new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
				5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。Vue的实例对象，以后简称vm。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>VueComponent</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="root">
			<school></school>
			<hello></hello>
		</div>
	</body>

	<script type="text/javascript">
		//定义school组件
		const school = Vue.extend({
			name:'school',
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<button @click="showName">点我提示学校名</button>
				</div>
			`,
			data(){
				return {
					name:'111',
					address:'001'
				}
			},
			methods: {
				showName(){
					console.log('showName',this)
				}
			},
		})

		const test = Vue.extend({
			template:`<span>111</span>`
		})

		//定义hello组件
		const hello = Vue.extend({
			template:`
				<div>
					<h2>{{msg}}</h2>
					<test></test>	
				</div>
			`,
			data(){
				return {
					msg:'你好啊！'
				}
			},
			components:{test}
		})


		// console.log('@',school)
		// console.log('#',hello)

		//创建vm
		const vm = new Vue({
			el:'#root',
			components:{school,hello}
		})
	</script>
</html>
```

#### 2-5、一个重要的内置关系

Demo.prototype   显示原型属性
Demo.__proto- -    隐式原型属性
实例的隐式原型属性，永远指向自己缔造者的原型对象
通过隐式原型链获取原型的属性，从自身沿着原型链一直找直到window的原型为空
通过显示原型链给原型(或者原型的原型)添加属性

```
1.一个重要的内置关系：
VueComponent.prototype.__proto__ === Vue.prototype
```

2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。



```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>一个重要的内置关系</title>
		<script type="text/javascript" src="Vue/js/vue.js"></script>
	</head>
	<body>
		<div id="root">
			<school></school>
		</div>
	</body>

	<script type="text/javascript">
		Vue.prototype.x = 99

		//定义school组件
		const school = Vue.extend({
			name:'school',
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<button @click="showX">点我输出x</button>
				</div>
			`,
			data(){
				return {
					name:'111',
					address:'001'
				}
			},
			methods: {
				showX(){
					console.log(this.x)
				}
			},
		})

		//创建一个vm
		const vm = new Vue({
			el:'#root',
			data:{
				msg:'你好'
			},
			components:{school}
		})

		
		//定义一个构造函数
		/* function Demo(){
			this.a = 1
			this.b = 2
		}
		//创建一个Demo的实例对象
		const d = new Demo()

		console.log(Demo.prototype) //显示原型属性

		console.log(d.__proto__) //隐式原型属性

		console.log(Demo.prototype === d.__proto__)

		//程序员通过显示原型属性操作原型对象，追加一个x属性，值为99
		Demo.prototype.x = 99

		console.log('@',d) */

	</script>
</html>
```

### 3、ES6模块暴露与模块引入

#### **3-1、ES6一共有三种模块暴露方法**

#####   **(1)统一暴露**

**模块 module1**：`module1.js`

```js
function fun1() {
    console.log('fun1() module1')
}
 
function fun2() {
    console.log('fun2() module1')
}
// 统一暴露
export {foo,bar}
```

##### **(2)分别暴露**

**模块 module2**：`module2.js`

```js
//多行暴露
export function foo() {
    console,console.log('foo() module2');
}
 
export function bar() {
    console.log('bar() module2')
}
```

**以上两种向外暴露方式在主文件引入时必须使用对象的解构赋值引用（不能使用变量接收的方式来映入）**

**主模块**：`main.js`

```js
import {foo,bar} from '.js/src/module2.js'
import {fun1,fun2} from './js/src/module1.js'
```

##### **(3)默认暴露**

```js
export default {
    foo() {
        console.log('默认暴露方式')
    },
    bar() {
        console.log('默认暴露')
    }
}
```

**默认暴露的方式只允许有一个: `export default {}`且在主模块引入时可以使用定义变量来接收的方式！**

```js
// 引入模块3
import module3 from '.js/src/module3.js'
 
// 使用模块
module3.foo()
module3.bar()
```

#### 3-2、总结

- 对外暴露出的都是一个对象，但是不同的暴露方法实际暴露的对象有所不同
- 默认并暴露的实质就是使用 export ➕ 去除import关键字后的引入写法
- **默认暴露在进行引入并暴露时不能进行简写**
- import引入的文件会自动收集在文件的最上方，并按照引入的顺序执行

### 4、单文件组件

一个文件只包含有1个组件。

###### **School.vue组件**

```vue
<template>
	<!-- 组件的结构 -->
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="showName">点我提示学校名</button>	
	</div>
</template>

<script>
	// 组件交互相关的代码(数据、方法等等)
	// export school = Vue.extend({...})分别暴露
	 export default {
		name:'School',
		data(){
			return {
				name:'111',
				address:'001'
			}
		},
		methods: {
			showName(){
				alert(this.name)
			}
		},
	}
	// export {school} 统一暴露
</script>

<style>
	/* 组件的样式 */
	.demo{
		background-color: orange;
	}
</style>
```

###### **Student.vue组件**

```vue
<template>
	<div>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生年龄：{{age}}</h2>
	</div>
</template>

<script>
	 export default {
		name:'Student',
		data(){
			return {
				name:'张三',
				age:18
			}
		}
	}
</script>
```

###### **App.vue组件**

```vue
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>

```

###### index.js (这个是引入vm，)

```js
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})
```

index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>练习一下单文件组件的语法</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="root"></div>
		<!-- <script type="text/javascript" src="../js/vue.js"></script> -->
		<!-- <script type="text/javascript" src="./index.js"></script> -->
	</body>
</html>
```



# 二、Vue-CLI

分区作者：Cool小陈

## 1、Vue脚手架安装与部署

#### 1-1、依赖软件 nodejs 

1、下载nodejs  

​	http://nodejs.cn/download/

​	https://registry.npmmirror.com/binary.html?path=node/

​     X86  适用 32 windows

​     X64  适用 64 windows

2、下一步

​    安装目录: 不要中文不要有空格

​    c:/program files/nodejs

 1.3:  检测(windows->开始->运行->cmd)

node -v



#### 1-2、安装cnpm 工具(nodejs工具 npm 安装软件)

 npm install -g cnpm --registry=https://registry.npm.taobao.org
 \#npm 安装工具
 \#install 安装 uninstall 删除
 \#-g  全局
 \#https://registry.npm.taobao.org 淘宝镜像站点
 \#检测



#### 1-3、安装vue-cli脚手架（安装一个3.x版本的Vue脚手架）

```
npm install -g @vue/cli
//npm i -g @vue/cli
```

#### 1-4、安装创建项目

##### 1-4-1、vue create xxx安装

```
//protest是项目名，自定义的
vue create protest
```

这里会有选项出来，可以选第一项，但是建议选第三项，自定义（高手就选这个），选择特性以创建的项目为准

使用键盘上下键移动，回车选定，勾选特性用空格进行勾选

选了第三项之后，接下来出现的页面：





选择Router




接下来，选择2.x，回车：



接下来，是否选用历史模式的路由，输入n或者y，看个人情况即可，回车：



接下来，ESLint选择选择第三项，回车：



接下来，何时进行ESLint语法效验，选第一项，回车：




接下来，babel,protcss等配置文件如何放置，选默认的第一项：单独使用文件进行配置，回车：



最后，是否保存为模板，以后创建项目的模板。看个人n和y都可以：



整个模板：



加载完成后出现的页面：

输入cd 建的项目名称



执行npm run serve后出现的页面：



Local和Network的两个地址（服务器的地址）都可以直接点开页面

到这里，项目创建完成

##### 1-4-2、基于ui界面创建vue项目

执行一下命令，可以打开ui界面

```
vue ui
```

安装Element-UI
Element-UI:是一套2.0的桌面组件库

1.在终端输入：

```
npm install element-ui -S
```

2.在入口文件(src/main.js)导入添加：

```
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
```

额外的步骤：



## 2、分析脚手架

#### 2-1、脚手架文件结构

	├── node_modules 放置node模块
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面//网站访问入口
	├── src         项目源码
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件 
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件

**index.html**

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
		<!-- 针对IE浏览器的一个特殊配置，含义是让IE浏览器以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
		<!-- 配置页签图标 -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
		<!-- 引入第三方样式 -->
		<link rel="stylesheet" href="<%= BASE_URL %>css/bootstrap.css">
		<!-- 配置网页标题 -->
    <title>脚手架基础</title>
  </head>
  <body>
		<!-- 当浏览器不支持js时noscript中的元素就会被渲染 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
		<!-- 容器 -->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```



#### 2-2、关于不同版本的Vue

##### main.js中的render函数

esm代表es6中的muddle 使用vue.runtime.xxx.js可以节约空间

  关于不同版本的Vue：

​    1.vue.js与vue.runtime.xxx.js的区别：

​        		(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。

​        		(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

​    2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用

​     		 render函数接收到的createElement函数去指定具体内容。

**main.js**

```js
/* 
	该文件是整个项目的入口文件
*/
//引入Vue,这里的vue是指运行版的Vue，即vue.runtime.xxx.js
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'

new Vue({
	el:'#app',
	//render函数完成了这个功能：将App组件放入容器中
    render: h => h(App),
	// render:q=> q('h1','你好啊') //箭头函数

	// render(createElement) {
	// 	return createElement('h1','你好啊')
	// },

	// template:`<h1>你好啊</h1>`,  //精简版不解析template
	// components:{App},
})
```

#### 2-3、修改默认配置

##### vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

2-4、

## 3、ref属性

#### 3-1、ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
   2. 获取：```this.$refs.xxx```

#### 3-2、案例如下：

App.vue

```vue
<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch"/>
	</div>
</template>

<script>
	//引入School组件
	import School from './components/School'

	export default {
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
				console.log(this.$refs.title) //真实DOM元素
				console.log(this.$refs.btn) //真实DOM元素
				console.log(this.$refs.sch) //School组件的实例对象（vc）
			}
		},
	}
</script>
```

## VUE2    4、props配置

#### 4-1、props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

   1. 第一种方式（只接收）：```props:['name'] ```

   2. 第二种方式（限制类型）：```props:{name:String}```

   3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```js
      props:{
      	name:{
      	type:String, //类型
      	required:true, //必要性
      	default:'老王' //默认值
      	}
      }
      ```

   > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。



## VUE3   4、props配置

#### 4-2、案例如下

App.vue

```vue
<template>
	<div>
		<Student name="李四" sex="女" :age="18"/>
	</div>
</template>

<script>
	import Student from './components/Student'

	export default {
		name:'App',
		components:{Student}
	}
</script>

```

Student.vue

```vue
<template>
	<div>
		<h1>{{msg}}</h1>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<h2>学生年龄：{{myAge+1}}</h2>
		<button @click="updateAge">尝试修改收到的年龄</button>
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			console.log(this)
			return {
				msg:'我是一个学生',
				myAge:this.age
			}
		},
		methods: {
			updateAge(){
				this.myAge++
			}
		},
		//简单声明接收
		// props:['name','age','sex'] 

		//接收的同时对数据进行类型限制
		/* props:{
			name:String,
			age:Number,
			sex:String
		} */

		//接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
		props:{
			name:{
				type:String, //name的类型是字符串
				required:true, //name是必要的
			},
			age:{
				type:Number,
				default:99 //默认值
			},
			sex:{
				type:String,
				required:true
			}
		}
	}
</script>
```

## 5、mixin（混入）属性

#### 5-1、mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步定义混合：

   {
       data(){....},
       methods:{....}
       ....
   }

   第二步使用混入：

   全局混入：```Vue.mixin(xxx)```
   局部混入：```mixins:['xxx']	```

#### 5-2、案例如下：

**mix.js**（这里定义了两个混入方法）

```js
//定义了两个的方法
export const hunhe = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
	mounted() {
		console.log('你好啊！')
	},
}

export const hunhe2 = {
	data() {
		return {
			x:100,
			y:200
		}
	},
}
```

**main.js**（这里是用了全局混入1和2）

```js
//1、这里引入了两个混入属性在mixin.js中
import {hunhe,hunhe2} from './mixin'

//2、使用mixin.js中的两个混入效果
Vue.mixin(hunhe)
Vue.mixin(hunhe2)
```

**Student.vue**（1这里引入混入，2并使用了局部混入）

```vue
<template>
	<div>
		<h2 @click="showName">学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
	</div>
</template>

<script>
    //1、引入混入
	// import {hunhe,hunhe2} from '../mixin'

	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男'
			}
		},
		
		//2、使用局部混入
		// mixins:[hunhe,hunhe2]
	}
</script>
```

## 6、插件

#### 6-1、插件使用步骤

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
   
       // 2. 添加全局指令
       Vue.directive(....)
   
       // 3. 配置全局混入(合)
       Vue.mixin(....)
   
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```

4. 使用插件：```Vue.use()```

#### 6-2、案例如下：

 **plugins.js**（定义插件）

```js
export default {
	install(Vue,x,y,z){
		console.log(x,y,z)
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})

		//定义全局指令
		Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		})

		//定义混入
		Vue.mixin({
			data() {
				return {
					x:100,
					y:200
				}
			},
		})

		//给Vue原型上添加一个方法（vm和vc就都能用了）
		Vue.prototype.hello = ()=>{alert('你好啊')}
	}
}
```

**main.js**（引入并且使用插件的js）

```js
//引入插件
import plugins from './plugins.js'

//应用（使用）插件
Vue.use(plugins,1,2,3)
```

School.vue（使用mySlice全局过滤器、使用Vue原型上的hello方法）

```vue
<template>
	<div>
		<h2>学校名称：{{name | mySlice}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="test">点我测试一个hello方法</button>
	</div>
</template>

<script>
	export default {
		name:'School',
		data() {
			return {
				name:'abcdefghighlim',
				address:'北京',
			}
		},
		methods: {
			test(){
				this.hello()
			}
		},
	}
</script>
```

**Student.vue**（使用fbind全局指令）

```vue
<template>
	<div>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<input type="text" v-fbind:value="name">
	</div>
</template>

<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男'
			}
		},
	}
</script>
```

## 7、scoped样式

#### 7-1、scoped用法

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

#### 7-2、案例如下：

App.vue

```vue
<template>
	<div>
		<h1 class="title">你好啊</h1>
		<School/>
		<Student/>
	</div>
</template>

<script>
	import Student from './components/Student'
	import School from './components/School'

	export default {
		name:'App',
		components:{School,Student}
	}
</script>

<style scoped>
	.title{
		color: red;
	}
</style>
```

#### 7-3、Todo-list案例

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/202203062101731.png)

#### 7-4、总结TodoList案例

##### 1、组件化编码流程：

​			(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

​			(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

​				1).一个组件在用：放在组件自身即可。

​				2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

​			(3).实现交互：从绑定事件开始。

##### 2、props适用于：

```
(1).父组件 ==> 子组件 通信

(2).子组件 ==> 父组件 通信（要求父先给子一个函数）
```

##### 3、使用v-model时要切记：

​		v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

##### 4、修改props中的值的情况

​		props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

##### 5、数据在哪里，操作数据就在哪里



关于表格中的删除效果和移动高亮

```
li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}
```



reduce条件统计

```js
//原来
let i=0
this.todos.foreach((todo))=>{
    if(todo.done) i++
}

//用reduce后
/* const x = this.todos.reduce((pre,current)=>{
					console.log('@',pre,current)
					return pre + (current.done ? 1 : 0)
				},0) */
//简写
				return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
```

## 8、浏览器本地存储

#### 8-1、webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. ```xxxxxStorage.setItem('key', 'value');```
      	该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. ```xxxxxStorage.getItem('person');```

      	该方法接受一个键名作为参数，返回键名对应的值。

   3. ```xxxxxStorage.removeItem('key');```

      	该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ``` xxxxxStorage.clear()```

      	该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. ```JSON.parse(null)```的结果依然是null。



localStorage.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>localStorage</title>
	</head>
	<body>
		<h2>localStorage</h2>
		<button onclick="saveData()">点我保存一个数据</button>
		<button onclick="readData()">点我读取一个数据</button>
		<button onclick="deleteData()">点我删除一个数据</button>
		<button onclick="deleteAllData()">点我清空一个数据</button>

		<script type="text/javascript" >
			let p = {name:'张三',age:18}

			function saveData(){
				localStorage.setItem('msg','hello!!!')
				localStorage.setItem('msg2',666)
				localStorage.setItem('person',JSON.stringify(p))
			}
			function readData(){
				console.log(localStorage.getItem('msg'))
				console.log(localStorage.getItem('msg2'))

				const result = localStorage.getItem('person')
				console.log(JSON.parse(result))

				// console.log(localStorage.getItem('msg3'))
			}
			function deleteData(){
				localStorage.removeItem('msg2')
			}
			function deleteAllData(){
				localStorage.clear()
			}
		</script>
	</body>
</html>
```

sessionStorage.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>sessionStorage</title>
	</head>
	<body>
		<h2>sessionStorage</h2>
		<button onclick="saveData()">点我保存一个数据</button>
		<button onclick="readData()">点我读取一个数据</button>
		<button onclick="deleteData()">点我删除一个数据</button>
		<button onclick="deleteAllData()">点我清空一个数据</button>

		<script type="text/javascript" >
			let p = {name:'张三',age:18}

			function saveData(){
				sessionStorage.setItem('msg','hello!!!')
				sessionStorage.setItem('msg2',666)
				sessionStorage.setItem('person',JSON.stringify(p))
			}
			function readData(){
				console.log(sessionStorage.getItem('msg'))
				console.log(sessionStorage.getItem('msg2'))

				const result = sessionStorage.getItem('person')
				console.log(JSON.parse(result))

				// console.log(sessionStorage.getItem('msg3'))
			}
			function deleteData(){
				sessionStorage.removeItem('msg2')
			}
			function deleteAllData(){
				sessionStorage.clear()
			}
		</script>
	</body>
</html>
```

#### 8-2、TodoList案例添加本地存储

把App.vue加一个监视属性并且设置它里面todos的初始值

```vue
//1设置todos初始值，将todos:[]改成
todos:JSON.parse(localStorage.getItem('todos')) || []

//2添加一个监视属性，并且进行深度监视
watch: {
			todos:{
				deep:true,
				handler(value){
					localStorage.setItem('todos',JSON.stringify(value))
				}
			}
		},
```

## 9、组件自定义事件

#### 9-1、组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：```<Demo @at1="test"/>```  或 ```<Demo v-on:at1="test"/>```

   2. 第二种方式，在父组件中：

   ```js
   <Demo ref="demo"/>
       ......
       mounted(){
         this.$refs.xxx.$on('at1',this.test)
       }
   ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

      1. 触发自定义事件：```this.$emit('at1',数据)```   																																																																																																																																																																																																																																																																																																																																																																																																													

   4.1 需在beforedestroy 解绑事件

5. 解绑自定义事件```this.$off('at1')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('at1',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

#### 9-2、TodoList案例添加自定义事件

MyHeader中的:addTodo="addTodo"改成@addTodo="addTodo"

然后把props中的addTodo删掉，然后使用

事件名.$emit(addTodo,value)

```vue
//1将这里的<MyHeader :addTodo="addTodo"/>改成
<MyHeader @addTodo="addTodo"/>

//2找到props中可能存在的addTodo，然后删掉

//3在methods里面的add中添加this.$emit('at1',数据)
this.$emit('addTodo',todoObj)
```

## 10、全局事件总线

#### 10-1、可以实现任意组件间的通信（图解）

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/202203092012786.jpg)

**x组件需满足**

​		1、所有的组件都能看见x组件

​		2、x能被调用到（$on和$off以及$emit）

#### 10-2、全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 在main.js中安装全局事件总线：

   方法一、

   ```
   const Demo = vue.extend({})
   const d = new Demo()
   Vue.prototype.x = d
   ```

   方法二、（提倡这种方法）

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

#### 10-3、TodoList事件总线

全局事件总线的本质是给组件绑定自定义事件，只不过这里的组件是this.$bus也就是Vue实例对象



## 11、消息订阅与发布pubsub

#### 11-1、消息订阅与发布

![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/202203101346537.jpeg)

一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

#### 11-2、使用方法

1、调用pubsub.js库命令，安装pubsub：```npm i pubsub-js```

2、在所用的地方引入库: ```import pubsub from 'pubsub-js'```

1. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

   ```js
   methods(){
     demo(data){......}
   }
   ......
   mounted() {
     this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
   }
   ```

2. 提供数据：```pubsub.publish('xxx',数据)```

3. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(this.pid)```去<span style="color:red">取消订阅。</span>

#### 11-3、TodoList案例pubsub

## 12、$nextTick（视图渲染完，操作DOM）

#### 12-1、nextTick使用

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## 13、vue封装的过度和动画

#### 13-1、Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/20210810141423589.png)

3. 写法：

   3-1、准备好样式：

   ```
   - 元素进入的样式：
     1. v-enter：进入的起点
     2. v-enter-active：进入过程中
     3. v-enter-to：进入的终点
   - 元素离开的样式：
     1. v-leave：离开的起点
     2. v-leave-active：离开过程中
     3. v-leave-to：离开的终点
   ```

   ```css
   - 1、案例如下过度写
   /* 进入的起点、离开的终点 */
   .hello-enter,.hello-leave-to{
   	transform: translateX(-100%);
   }
   .hello-enter-active,.hello-leave-active{
   	transition: 0.5s linear;
   }
   /* 进入的终点、离开的起点 */
   .hello-enter-to,.hello-leave{
   	transform: translateX(0);
   }
   -/2、案例如下动画写
   /* .v-enter-active */
   .hello-enter-active{
       animation: at1 1s linear;
   }
   /* .v-leave-active */
   .hello-leave-active{
       animation: at1 1s linear reverse;
   }
   
   @keyframes at1 {
       from{transform: translateX(-100%);}
       to{transform: translateX(0px);}
   }
   ```

   3-2、使用```<transition>```包裹要过度元素，并配置name属性：

   ```vue
   <transition name="hello">
        <h1 v-show="isShow">你好啊！</h1>
   </transition>
   ```

   3-3、备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

   3-4、可以使用第三方动画库来实现动画效果

#### 13-2、animate.css(开箱即用的动画库)

官网：  https://animate.style/

图片： ![img](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/image-20220312142830357.png)

```vue
//安装animate.css库
npm install animate.css
//引入样式库
import 'animate.css'
//存放库里面的样式属性（animate__animated animate__bounce），
//然后放置属性（enter-active-class）
//和效果动画（animate__swing）
<transition-group 
	appear
	name="animate__animated animate__bounce" 
	enter-active-class="animate__swing"
	leave-active-class="animate__backOutUp"
>
	<h1 v-show="!isShow" key="1">你好啊！</h1>
	<h1 v-show="isShow" key="2">你好！</h1>
</transition-group>
```

## 14、配置代理

#### 14-1、用脚手架去解决Ajax跨域的问题



#### 14-2、常用的发送一个Ajax请求的方式有哪些：（4种）

- **xhr**(不常用)   new XMLHttpRequest() 

  ​				常用apixhr.open()   、 xhr.send()等

- **jQuery**(不常用，经常使用DOM操作) 

  ​			 常用api $get  、  $post

- **axios**(promise风格)

  

- vue-resource（不常用，在vue1.0流行）

  

- **fetch**(promise风格，但会包装两次promise)

  最致密的是他IE中的兼容性极差

#### 14-3、axios的使用与问题解决

安装axios

```
//axios的安装
npm i axios
```

引入axios

```
//引入axios
import axios from 'axios.js'
```

设置一个按钮

```
<button @click="getStudents">获取学生信息</button>
```

在methods中写请求

```js
methods: {
			getStudents(){
				axios.get('http://localhost:5000/students').then(
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			},
}
```

发生跨域问题

解决跨域问题的方式：

1、cors 

2、jsonp script src（只能解决get请求post无法解决）

3、使用代理服务器(类似于生活中的房屋中介)

开启代理服务器方式{    1、nginx    2、vue-cli }

#### 14-4、用脚手架的方式配置一个代理服务器

##### 14-4A、方式一

###### 14-4A-1、配置方法

①在vue的脚手架官网搜索devServer.proxy（英文意思为开发中如何配置代理），②在vue.config.js中输入（这里的5000是你获取axios服务器的端口），③把methods中的axios请求的地址改成8080端口的（因为数据要发送到8080端口实现跨域）

```
devServer: {
    proxy: 'http://localhost:5000'
  }
```

```
//修改端口号5000，改成8080端口
axios.get('http://localhost:8080/students').then(
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			},
```

###### 14-4A-2、工作方式：

若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

当你请求的内容代理服务器中原本就有则不会发送给5000的目标服务器public中有students，（即实现不了下面图片黄色箭头）

###### 14-4A-3、方式一配置代理缺点

这种情况下只能配置一个单独的代理，并且不能灵活的控制走不走代理服务器。

##### 14-4B、方式二

###### 14-4B-1、配置方法

下图两个颜色为配置的两套代理（分别为红色和绿色，且红色是精简版），并且这里'/api'的意思是当你发送请求到代理服务器时，它会判断代理是否是 /api 形式如果是走代理，否则不走。target 为请求跳转的目标地址，pathRewrite:{'^/api':''}这里是请求后发给目标地址是把/api  替换成空字符串



此时请求完还得改axios跳转代理服务器的路径为

```
//原本
axios.get('http://localhost:8080/students')
//修改后添加了个/api
axios.get('http://localhost:8080/api/students')
```

```
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

###### 14-4B-2、配置优缺点：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。

2. 缺点：配置略微繁琐，请求资源时必须加前缀。

#### 14-5、github案例

1、先在index.html中引入bootstrap样式

2、main.js代码

```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},
})
```

3、App.vue

```vue
<template>
	<div class="container">
		<Search/>
		<List/>
	</div>
</template>

<script>
	import Search from './components/Search'
	import List from './components/List'
	export default {
		name:'App',
		components:{Search,List}
	}
</script>

```

4、Search.vue

```vue
<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">Search Github Users</h3>
		<div>
			<input type="text" placeholder="enter the name you search" v-model="keyWord"/>&nbsp;
			<button @click="searchUsers">Search</button>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'Search',
		data() {
			return {
				keyWord:''
			}
		},
		methods: {
			searchUsers(){
				//请求前更新List的数据
				this.$bus.$emit('updateListData',{isLoading:true,errMsg:'',users:[],isFirst:false})
				axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
					response => {
						console.log('请求成功了')
						//请求成功后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:response.data.items})
					},
					error => {
						//请求后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[]})
					}
				)
			}
		},
	}
</script>

```

5、List.vue

```vue
<template>
	<div class="row">
		<!-- 展示用户列表 -->
		<div v-show="info.users.length" class="card" v-for="user in info.users" :key="user.login">
			<a :href="user.html_url" target="_blank">
				<img :src="user.avatar_url" style='width: 100px'/>
			</a>
			<p class="card-text">{{user.login}}</p>
		</div>
		<!-- 展示欢迎词 -->
		<h1 v-show="info.isFirst">欢迎使用！</h1>
		<!-- 展示加载中 -->
		<h1 v-show="info.isLoading">加载中....</h1>
		<!-- 展示错误信息 -->
		<h1 v-show="info.errMsg">{{info.errMsg}}</h1>
	</div>
</template>

<script>
	export default {
		name:'List',
		data() {
			return {
				info:{
					isFirst:true,
					isLoading:false,
					errMsg:'',
					users:[]
				}
			}
		},
		mounted() {
			this.$bus.$on('updateListData',(dataObj)=>{
				this.info = {...this.info,...dataObj}
			})
		},
	}
</script>

<style scoped>
	.album {
		min-height: 50rem; /* Can be removed; just added for demo purposes */
		padding-top: 3rem;
		padding-bottom: 3rem;
		background-color: #f7f7f7;
	}

	.card {
		float: left;
		width: 33.333%;
		padding: .75rem;
		margin-bottom: 2rem;
		border: 1px solid #efefef;
		text-align: center;
	}

	.card > img {
		margin-bottom: .75rem;
		border-radius: 100px;
	}

	.card-text {
		font-size: 85%;
	}
</style>
```



## 15、vue-resource（不常用）

#### 15-1、使用方法

安装vue-resource

```
npm i vue-resource
```

在main.js中引入vue-resource插件

```
import vueResource from 'vue-resource'
```

在main.js中使用插件

```
vue.use(vueResource)
```

在一个vue实例内使用**this.$http代替axios**

```vue
// 在一个Vue实例内使用$http
this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
	response => {
		console.log('请求成功了')
		//请求成功后更新List的数据
		this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:response.data.items})
	},
	error => {
		//请求失败后更新List的数据
		this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[]})
	}
)
```

## 16、插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```


## 17、动态组件

#### 17-1、动态组件的is

- 动态组件就是几个组件放在一个挂载点下，然后根据父组件的某个变量来决定显示哪个，或者都不显示。
- 在挂载点使用 component 标签，然后使用 is =“组件名”，它会自动去找匹配的组件名，如果有，则显示；

看例子：

```html
<!-- html部分 -->

<div id="app">
    <component is="one"></component>
</div>
```

```js
// js 部分

new Vue({
    el: '#app',
    components: {
        one: {template: '<div>我是线路一</div>'},
        two: {template: '<div>我是线路二</div>'},
        thr: {template: '<div>我是线路三</div>'}
    }
})
```

上面代码注册了三个组件，在 [component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020) 标签里有个属性 is，is=one，所以页面会渲染名字叫 one 的组件，显示结果如下：

> 我是线路一

如果给 is 属性绑定动态值，那么就可以实现组件的动态切换，例子如下：

```html
<!-- html 部分 -->

<div id="app">
    <button v-for="item in tabs" @click="change = item.id">
    	{{ item.text }}
    </button>
    <component :is="change"></component>
</div>

```

```js
// js 部分

new Vue({
  el: '#app',
  data: {
  	change: 'one' // 默认显示组件 one
    tabs: [
    	{id: 'one', text: '线路一'},
        {id: 'two', text: '线路二'},
        {id: 'thr', text: '线路三'}
    ]
  },
  components: {
  	one: {template: '<div>我是线路一</div>'},
    two: {template: '<div>我是线路二</div>'},
    thr: {template: '<div>我是线路三</div>'}
  }
})
```

#### 17-2、动态组件的keep-alive

在面试的时候，很多面试官再问vue的时候可能就会提一嘴，你知道keep-alive有什么作用吗？

keep-alive是vue内置的一个组件，而这个组件的作用就是能够缓存不活动的组件，我们能够知道，一般情况下，组件进行切换的时候，默认会进行销毁，如果有需求，某个组件切换后不进行销毁，而是保存之前的状态，那么就可以利用keep-alive来实现

我这里利用脚手架创建项目后会生成home和about两个组件，并且通过路由进行切换

**home组件**

```
<template>
  <div class="home">
    <input type="text">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
```

我在home组件中写了一个input输入框

**about组件**

```
<template>
  <div class="about">
    <input type="text">
  </div>
</template>
<script>
export default {
  name:"about"
}
</script>
```

同样的about组件也放了一个输入框

当我们在home组件的输入框输入一些内容的时候，然后切换到about组件，在切换回home组件，我们会发现之前输入的内容被清空了，其实也容易理解，就是当切换到about组建的时候，home组件就被销毁了，输入框的值自然被清空了

当切换到about组件的时候home组件的destroyed就触发了，所以home组件被销毁了

那么此时我们就可以利用keep-alive组件进行包裹router-view组件，将不活动的组件缓存起来

**App组件**

```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    
  </div>
</template>
```

写完之后会发现当切换到about组件时，home组件中的destroyed并没有触发,并且home组件的值也保存了下来



但是这样也肯定不好，我们会发现，about组件的值也被缓存了，就是所有的路由组件都被缓存了，严重浪费性能，而且也不符合需求，我们现在只想缓存home组件

在keep-alive上有两个属性

字符串或正则表达式。只有匹配的组件会被缓存。

- include 值为字符串或者正则表达式匹配的组件name会被缓存。
- exclude 值为字符串或正则表达式匹配的组件name不会被缓存。

首先利用include实现，匹配到组件中定义的name，将进行缓存

```
<keep-alive include="home">
   <router-view />
</keep-alive>
```



我们会发现home已经被缓存了，但是about没有被缓存

而exclude就是排除了，这个就不在演示了，很简单，除了这个我们还可以利用路由中的meta属性来控制

```
{
      path: '/',
      name: 'home',
      meta:{
        keepAlive:true
      },
      component: Home
    }
```

将home的路由规则钟的meta添加keepAlive属性为true，也就是当前路由组件要进行缓存

keep-alive代码可以结合v-if进行包裹，如果meta中的keepAlive为true进行缓存，否侧不进行缓存，这样可以更灵活一些

```
<keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />
```

这样组件的缓存是实现了，但是还是会有一些问题，就是因为组件被缓存，并没有被销毁，所以组件在切换的时候也就不会被重新创建，自然也就不会调用created等生命周期函数，所以此时要使用activated与deactivated来获取当前组件是否处于活动状态

我在home组件里面写入了activated与deactivated生命周期函数

```
activated(){
    console.log("哎呀看见我了")
    console.log("----------activated--------")
  },
  deactivated(){
    console.log("讨厌！！你又走了")
    console.log("----------deactivated--------")
  }
```



通过上面的gif图相信已经看得很清楚了，此时keep-Alive也就差不多了

# 三、VueX

分区作者：Cool小陈

## 1、理解vuex

#### 1-1 vuex 是什么

1. 概念：专门在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue 应用中多个组件的**共享**状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。 
2. Github 地址: https://github.com/vuejs/vuex 

#### 1-2、图解vuex与全局事件总线的相似性



#### 1-3、 什么时候使用 Vuex

**多个组件需要共享数据时**    {

1. 多个组件依赖于同一状态 

2. 来自不同组件的行为需要变更同一状态   }

#### 1-4、求和案例-纯vue版本



#### 1-5、vuex的工作原理



Actions、Mutations、State状态（这三个数据类型都是对象）

这三个东西都得经过store领导

dispatch('jia',2) 第一个jia是这个实现的动作，第二个是动作的值

## 2、vuex环境搭建

##### 2-1、在vue2中使用npm i vuex 失败原因

在2022年2月7日，vue3成为了默认版本，也就是说现在执行npm i vue，安装的直接就是vue3了，并且vue3成为默认版本的同时vuex也同时进行了更新升级到了最新的vuex4版本，npm i vuex安装的是vuex4，只能在vue3中去使用如果我们在vue2项目中使用vuex4就会出现如图所示报错，简单来说就是
**vue2要用vuex3的版本**
**vue3要用vuex4的版本**



##### 2-2、正确安装指令

```
npm i vuex@3
```

##### 2-3、后续创建命令

1、在src文件夹下面创建store文件夹，然后再在store文件夹下创建index.js

index.js内容如下：

```
//该文件用于创建Vuex中最为核心的store
//引入vue
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {}
//准备mutations——用于操作数据（state）
const mutations = {}
//准备state——用于存储数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
```

2、然后在main.js中引入store，并在创建vm实例的句子中添加store、

简约代码

```js
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```

完整代码

```js
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import vueResource from 'vue-resource'
//引入store
import store from './store'

//关闭Vue的生产提示
Vue.config.productionTip = false
//使用插件
Vue.use(vueResource)

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
})
```

#### 2-4、求和案例vuex版

context（ministore，上下文）

如果没有涉及到action（业务逻辑）可以直接调用commit并且调用的符号必须大写



## 3、VueX基本使用

#### 3-1、vuex开发工具



#### 3-2、vuex基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

## 4、getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

## 5、四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

## 6、模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```



## 7、耦合性

耦合性，指的是组件间依赖关系的强弱程度

这里两个组件组件直接耦合性从“内容耦合”(一个模块直接使用另一个模块数据)

"控制耦合"(一个模块调用另一模块时，传递的是控制信号，被调用的模块根据控制信号的值，有选择的执行功能)，所以，解耦成立

# 四、vue-router

## 1、路由

#### 1-1、路由的理解

##### 1-1.1、vue-router的理解

​		vue 的一个插件库，专门用来实现 SPA 应用

##### 1-1.2、生活中的路由器与编码中的路由

1. 生活中的路由器是为了实现多台设备同时上网

   

2. 编码里的路由器是为了实现SPA(single page web application)应用的切换

   ![image-20220330005113667](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/image-20220330005113667.png)

##### 1-1.3、对SPA应用的理解



1. 单页 Web 应用（single page web application，SPA）。 

2. 整个应用只有**一个完整的页面**。 

3. 点击页面中的导航链接**不会刷新**页面，只会做页面的**局部更新。** 

4. 数据需要通过 ajax 请求获取。

#### 1-2、路由的理解

##### 1-2.1、什么是路由?

1.  一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。

2.  key 为路径, value 可能是 function 或 component 

##### 1-2.2、路由分类

​		1、后端路由： 

​				1）理解：value 是 function, 用于处理客户端提交的请求。 

​				2）工作过程：服务器接收到一个请求时, 根据**请求路径**找到匹配的**函数** 来处理请求, 返回响应数据。 

​		2、前端路由： 

​				1）理解：value 是 component，用于展示页面内容。 

​				2）工作过程：当浏览器的路径改变时, 对应的组件就会显示。

#### 1-3、基本使用 

1. 安装vue-router，命令：```npm i vue-router``` 

   2022年2月7日以后，vue-router的默认版本为4版本，并且vue-router4只能在vue3中去使用

   vue-router3才能在vue2中，所有我们要指定版本去安装：```npm i vue-router@3```

2. 引入VueRouter：```import VueRouter from 'vue-router'```

3. 应用插件：```Vue.use(VueRouter)```

4. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

5. 实现切换（active-class可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

6. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

## 2.几个注意点

​		1、路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。

​		2、通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。

​		3、每个组件都有自己的```$route```属性，里面存储着自己的路由信息。

​		4、整个应用只有一个router，可以通过组件的```$router```属性获取到。

## 3.嵌套路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

## 4.路由的query参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

## 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

## 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

## 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
      	}
    //简单写法，结构赋值
    //props({query}){
	//	return {
	//		id:query.id,
	//		title:query.title
    //	}
    
    //简单写法，结构赋值的连续写法
    //props({query:{id,title}}){
	//	return {
	//		id,
	//		title
	//	}
	}
}
```

## 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

## 9.编程式路由导航

1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go(n) //可前进也可后退，里面要加参数正数前进，负数后退
   ```

## 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

## 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

## 12.路由守卫

#### 12-1、作用：对路由进行权限控制

#### 12-2、分类：全局守卫、独享守卫、组件内守卫

##### 12-2-1、全局守卫:

```js
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach，全局前置守卫',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'at1'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})

//全局后置守卫：初始化时执行、每次路由切换后执行
//*****全局后置守卫没有next
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

##### 12-2-2、独享守卫:

```js
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'at1'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```

##### 12-2-3、组件内守卫：

```js
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

## 13.路由器的两种工作模式

#### 13-1、hash值

对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。

1. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。

#### 13-2、服务器部署

生产模式

```
npm run build
```

部署服务器

node express步骤

```
npm init
```



```
//输入包名字
atguigu_test_server![image-20220412003712223](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/575/image-20220412003712223.png)
```

```
npm i express
```

新建server.js

在server.js中输入

```js
const express = require('express')

const app = express()
//后面创建了static后解开
//app.use(express.static(__dirname+'/static'))

app.get('/person',(req,res))=>{
	res.send{(
		name:'tom',
		age:18
	)}
}

app.listen(5005,(err)=>{
	if(!err) console.log('服务器启动成功了！')
})
```

编辑好代码后输入在终端中输入node server启动服务器

在node下创建静态页面





#### 13-3、解决在history模式中404的问题

```
npm i connect-history-api-fallback
```

引入



```
const history =require('npm i connect-history-api-fallback')
```

然后使用插件

```
app.use(history())
```



### 13-5、路由器工作的两种模式

1. hash模式：

   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
2. history模式：

   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。


# 五、Element UI 组件库

分区作者：Cool小陈

## 1、Vue UI组件库

### 1-1、移动端常用 UI 组件库 

1. Vant https://youzan.github.io/vant 

2. Cube UI https://didi.github.io/cube-ui 

3. Mint UI http://mint-ui.github.io 

### 1-2、PC 端常用 UI 组件库

1. Element UI https://element.eleme.cn 

2. IView UI https://www.iviewui.com

## 2、Element UI 安装

### 2-1、npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i element-ui -S
```

### 2-2、CDN

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

### 2-3、Element-UI引入方式

#### 2-3-1、完整引入

在 main.js 中写入以下内容：

```javascript
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'

//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
//应用ElementUI
Vue.use(ElementUI);

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
})
```

#### 2-3-2、按需引入

借助 [babel.config.js，我们可以只引入需要的组件，以达到减小项目体积的目的。

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
		["@babel/preset-env", { "modules": false }],
  ],
	plugins:[
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import App from './App.vue';
//按需引入
import { Button, Select } from 'element-ui';

//应用ElementUI
//格式：Vue.component(Button.name, Button);
Vue.component(el-button, Button);
//格式：Vue.component(Select.name, Select);
Vue.component(el-select, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
//创建vm
new Vue({
  el: '#app',
  render: h => h(App)
});
```

### 2-4、使用时，借助界面使用即可







# 六、附加知识

### 1、js事件冒泡与事件委派

#### 一、事件冒泡

- 指的是事件的向上传导,当后代元素上的事件被触发时,其**祖先元素的相同事件**也会被触发
- 如果不希望发生事件冒泡可以通过事件对象属性来取消冒泡

**举例：**
其中body是爷爷，绿色div(我是box1)是爸爸，黄色span(我是span)是儿子，给这三代都绑上单击响应函数
实现代码

body代码

```javascript
<body>
	<div id="box1">
		我是box1
		<span id="s1">我是span</span>
	</div>
</body>
```

CSS代码

```javascript
<style type="text/css">
	#box1{
		width: 200px;
		height: 200px;
		background-color: yellowgreen;
	}
	
	#s1{
		background-color: yellow;
	}
</style>
```

JS代码

```javascript
<script type="text/javascript">
	window.onload = function(){
		//为s1绑定一个单击响应函数
		var s1 = document.getElementById("s1");
		s1.onclick=function(){
			alert("我是span单击响应函数");
		}
		
		//为box1绑定一个单击响应函数
		var box1 = document.getElementById("box1");
		box1.onclick=function(){
			alert("我是box1单击响应函数");
		}
		
		//body绑定一个单击响应函数
		document.body.onclick = function(){
			alert("我是body单击响应函数")
		}
	}
</script>
```

触发效果如下：
当点击儿子(span)时，他，他爸爸(div)及他爷爷(body)都会触发各自的响应函数，它爸爸同理

实现终止冒泡

- 通过事件对象cancelBubble属性来取消冒泡
- event.cancelBubble = true;
- 如终止儿子(span)冒泡，即它爸爸及它爷爷都不触发单击事件

完整代码

```javascript
s1.onclick=function(event){
	//解决浏览器兼容问题
	event=event || window.event;
	alert("我是span单击响应函数");
	//取消冒泡
	event.cancelBubble = true;
}
```

#### 二、事件委派(委托)

**是什么**

- 指将事件统一绑定给元素的共同的祖先元素
- 当后代上的事件触发时,会一直冒泡到祖先元素
- 通过祖先元素的响应函数来处理事件

**下面举例子说明**
效果图：
实现动态添加超链接并绑定事件

实现代码
body代码

```javascript
	<body>
		<button id="btn01">添加超链接</button>
		
		<ul id="u1" style="background-color: yellow;">
			<li ><a href="javascript:;" class="link">超链接一</a></li>
			<li ><a href="javascript:;" class="link">超链接二</a></li>
			<li ><a href="javascript:;" class="link">超链接三</a></li>
		</ul>
	</body>
```

JS代码

```javascript
<script type="text/javascript">
	window.onload = function(){
	
		var u1= document.getElementById("u1");
		//点击按钮以后添加超链接
		var btn01 = document.getElementById("btn01");
		btn01.onclick=function(){
			
			//创建一个li
			var li = document.createElement("li");
			li.innerHTML="<a href='javascript:;' class='link'>新建超链接</a>";
			
			//将li添加到ul中
			u1.appendChild(li);
		}
		
		u1.onclick = function(event){
			//解决浏览器兼容问题
			event = event || window.event;
			
			/**
			 * target
			 *  -事件对象的target属性表示触发事件的对象
			 *  -ul中包括li、文本及超链接，只有点击超链接触发事件
			 */
			if(event.target.className == "link"){
				alert("我是ul单击响应函数");
			}
		}
	}
</script>
```

#### 三、总结

事件冒泡是事件委托及事件传播的基础，得好好理解

# 七、vue3

# Vue3快速上手





## 1.Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors) 
- github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## 2.Vue3带来了什么

### 1.性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

### 2.源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

### 3.拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 4.新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

# 一、创建Vue3.0工程

## 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

## 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图



```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

# 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 1.拉开序幕的setup

​			0.setup 一般只会调用一次

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
      - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

##  2.ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

## 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 4.Vue3.0中的响应式原理

### vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

- 实现原理: 

  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过Reflect（反射）:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
      	// 拦截读取属性值
          get (target, prop) {
          	return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
          	return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
          	return Reflect.deleteProperty(target, prop)
          }
      })
      
      proxy.name = 'tom'   
      ```

## 5.reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

## 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。

- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。


## 7.计算属性与监视

### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

## 8.生命周期

<div style="border:1px solid black;width:380px;float:left;margin-right:20px;"><strong>vue2.x的生命周期</strong><img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:1200px" /></div><div style="border:1px solid black;width:510px;height:985px;float:left"><strong>vue3.0的生命周期</strong><img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2" style="zoom:33%;width:2500px" /></div>





















































1

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。



## 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```


# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

## 5.provide 与 inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

# 四、Composition API 的优势

## 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>



















## 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>














# 五、新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

# 六、其他

## 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

## 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ​    ......z
