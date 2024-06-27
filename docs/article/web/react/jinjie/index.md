###  1 **React Hooks**

**使用**hooks**理由**

1. 高阶组件为了复用，导致代码层级复杂
2. 生命周期的复杂
3. 写成functional组件,无状态组件 ，因为需要状态，又改成了class,成本高

#### 1.1 **useState (**保存组件状态)

```js
const [state, setstate] = useState(initialState)
```

> 每次setstate 更新， 都会使函数调用一次

##### 根据先前的 state 更新 state

假设 `age` 为 `42`，这个处理函数三次调用 `setAge(age + 1)`：

```react
function handleClick() {

  setAge(age + 1); // setAge(42 + 1)

  setAge(age + 1); // setAge(42 + 1)

  setAge(age + 1); // setAge(42 + 1)

}
```

然而，点击一次后，`age` 将只会变为 `43` 而不是 `45`！这是因为调用 `set` 函数 [不会更新](https://zh-hans.react.dev/learn/state-as-a-snapshot) 已经运行代码中的 `age` 状态变量。因此，每个 `setAge(age + 1)` 调用变成了 `setAge(43)`。

为了解决这个问题，**你可以向 `setAge` 传递一个 \*更新函数\***，而不是下一个状态：

```react
function handleClick() {

  setAge(a => a + 1); // setAge(42 => 43)

  setAge(a => a + 1); // setAge(43 => 44)

  setAge(a => a + 1); // setAge(44 => 45)

}
```

#### 1.2 **useEffect(**处理副作用**)**和**useLayoutEffect (**同步执行副作用**)**

*Function Component* 不存在生命周期，所以不要把 *Class Component* 的生命周期概念搬过来试图对号入座。

```react
useEffect(() => {
    //effect
    return () => {
    //cleanup
    //可以做销毁工作
    };
}, [依赖的状态;空数组,表示不依赖])
```

**不要对** **Dependencies** **撒谎**, **如果你明明使用了某个变量，却没有申明在依赖中，你等于向** **React** **撒了谎，后果**

**就是，当依赖的变量改变时，**useEffect**也不会再次执行**, eslint**会报警告**

*Preview*页面改造成函数式组件，在路径上从*id=1*切换到*id=2*也会自动重新加载，比*class*组件方便

```react
let id = props.match.params.myid
        useEffect(()=>{
        axios.get(`/articles/${id}`).then(res => {
            settitle(res.data.title)
            setcontent(res.data.content)
            setcategory(res.data.category)
        })
},[id])
```

**useEffect**和**useLayoutEffect**有什么区别？

​	**简单来说就是调用时机不同，** useLayoutEffect **和原来** componentDidMount **&** componentDidUpdate **一致，在**

**react**完成**DOM**更新后马上**同步**调用的代码，会阻塞页面渲染。而useEffect **是会在整个页面渲染完才会调用的**

**代码。**

​	官方建议优先使用 useEffect

```
However, we recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.
```

​	在实际使用时如果想避免**页面抖动**（在 useEffect 里修改DOM很有可能出现）的话，可以把需要操作DOM的代码

放在 **useLayoutEffect** 里。在这里做点dom操作，这些dom修改会和 react 做出的更改一起被一次性渲染到屏幕

上，只有一次回流、重绘的代价。

#### 	1.3 **useCallback(**记忆函数)

防止因为组件重新渲染，导致方法被重新创建 ，起到缓存作用*;* 只有第二个参数 变化了，才重新声明一次

```react
var handleClick = useCallback(()=>{
	console.log(name)
},[name])
<button onClick={()=>handleClick()}>hello</button>
//只有name改变后， 这个函数才会重新声明一次，
//如果传入空数组， 那么就是第一次创建后就被缓存， 如果name后期改变了,拿到的还是老的name。
//如果不传第二个参数，每次都会重新声明一次，拿到的就是最新的name.
const setText = useCallback((e) =>{
    console.log(e.target.value)
    setNav(e.target.value)
}, []) // 空数组的含义 里面的代码还是以前的

  return (
    <div>
        <input onChange={setText} value={nav}></input>
        <button onClick={setList}>add</button>
        <div>
            <ul>
                {
                    ListData.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
            <span>
                总计：{ count }
            </span>
        </div>
    </div>
  )
}
```

#### 	1.4 **useMemo** **记忆组件**

​		useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以

的。

​		唯一的区别是：**useCallback** **不会执行第一个参数函数，而是将它返回给你，而** **useMemo** **会执行第一个函数并**

**且将函数执行结果返回给你。**所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

​		所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数

计算得到一个确定的值，比如记忆组件。

#### 	1.5 **useRef(**保存引用值**)**

​	   1. 组件对象

```
const inputRef = useRef(null) 
<input onChange={setText} value={nav} ref={inputRef}></input>
```

​		2.保存变量

```js
let changeCount = useRef(0)
changeCount.current++
{ changeCount.current }
```

​	参数 

- `initialValue`：ref 对象的 `current` 属性的初始值。可以是任意类型的值。这个参数在首次渲染后被忽略。

​	返回值 

​	`useRef` 返回一个只有一个属性的对象:

- `current`：初始值为传递的 `initialValue`。之后可以将其设置为其他值。如果将 ref 对象作为一个 JSX 节点的 `ref` 属性传递给 React，React 将为它设置 `current` 属性。

​	在后续的渲染中，`useRef` 将返回同一个对象。

#### 	1.6 **useReducer**和**useContext(**减少组件层级**)**

​	useContext 

​	const value = useContext(SomeContext)

​	可以让你读取和订阅组件中的 [context](https://react.docschina.org/learn/passing-data-deeply-with-context)。

```
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

- `SomeContext`：先前用 [`createContext`](https://react.docschina.org/reference/react/createContext) 创建的 context。context 本身不包含信息，它只代表你可以提供或从组件中读取的信息类型。

​			`useContext` 为调用组件返回 context 的值。它被确定为传递给树中调用组件上方最近的 `SomeContext.Provider` 			的 `value`。如果没有这样的 provider，那么返回值将会是为创建该 context 传递给 [`createContext`](https://react.docschina.org/reference/react/createContext) 的 `defaultValue`。返回的值始终是最新的。如果 context 发生变化，React 会自动重新渲染读取 context 的组件。

​		useReducer

​		在组件的顶层作用域调用 `useReducer` 以创建一个用于管理状态的 [reducer](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer)。

```react
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

​		`useReducer` 返回一个由两个值组成的数组：

1. 当前的 state，首次渲染时为你提供的 初始值。
2. `dispatch` 函数，让你可以根据交互修改 state。

### 2 router路由 --react-router-dom@5

#### 	**(1)** **路由方法导入**

```react
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
```

#### **(2)** **定义路由以及重定向**

```react
<HashRouter>
    <Switch>
        <Route path="/films" component={Films}/>
        <Route path="/cinemas" component={Cinemas}/>
        <Route path="/center" component={Center}/>
        {/* 重定向 */}
        <Redirect from="/" to="/films" />
        {/* <Redirect from="/" to="/films" exact/>
        {/* 页面不对处理 */}
        <Route path="*" component={NotFound}/> */}
    </Switch>
</HashRouter>
```

​		  b. exact 精确匹配 (Redirect 即使使用了exact, 外面还要嵌套Switch 来用)

 		c. Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history

​				stack,这个警告只有在hash 模式会出现。

#### 		**(3)** **嵌套路由**

​		在一级路由组件中书写

```react
<Switch>
    <Route path="/films/nowplaying" component={Nowplaying}/>
    <Route path="/films/comingsoon" component={Comingsoon}/>
    <Redirect from="/films" to="/films/nowplaying"/>
</Switch>
```

#### 		**(4)** 路由跳转方式

​		a. 声明式导航

```react
<NavLink to="/films" activeClassName="active">films</NavLink>
<NavLink to="/cinemas" activeClassName="active">cinemas</NavLink>
<NavLink to="/center" activeClassName="active">center</NavLink>
```

​		b. 编程式导航

```js
// 类组件
this.props.history.push(`/center`)
// 原生
window.location.href="#/detail/" + id
// 函数组件
prop.history.push('/detail/${id}')
```

​		 	1. 使用 `<Link>` 组件

​		`<Link>` 组件用于在渲染静态页面时创建导航链接。这种方式类似于 HTML 中的 `<a>` 标签，但不会触发页面刷新。

```react
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
  </nav>
);

export default Navigation;
```

			2. 使用 `useNavigate` 钩子

​		`useNavigate` 是 React Router v6 引入的一个钩子，用于编程式导航。它替代了 v5 的 `useHistory` 钩子。

```react
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return <button onClick={goToHome}>Go Home</button>;
};

export default MyComponent;
```

			3. 使用 `<Navigate>` 组件

​		`<Navigate>` 组件用于在渲染时重定向用户到另一个路径。它适用于需要在 JSX 中直接进行条件性导航的场景。

```react
import { Navigate } from 'react-router-dom';

const MyComponent = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>Welcome!</div>;
};

export default MyComponent;
```

  4. 使用 `navigate` 函数

     在一些特定的场景下，比如在非组件函数中，你可以使用 `useNavigate` 获取的 `navigate` 函数进行跳转。

```jsx
import { useNavigate } from 'react-router-dom';

const SomeFunction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/some-path');
  };

  return <button onClick={handleClick}>Go Somewhere</button>;
};
```

		5. 使用 `history` 对象 (React Router v5)

​			在 React Router v5 中，`history` 对象用来进行编程式导航。在 v6 中已经被 `useNavigate` 所取代。

```react
import { useHistory } from 'react-router-dom';

const MyComponent = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push('/home');
  };

  return <button onClick={goToHome}>Go Home</button>;
};

export default MyComponent;
```

​		总结

1. `<Link>` 组件 - 静态导航链接。
2. `useNavigate` 钩子 - 编程式导航（v6）。
3. `<Navigate>` 组件 - 条件性导航。
4. `navigate` 函数 - 编程式导航（v6 非组件函数中）。
5. `history` 对象 - 编程式导航（v5）。

#### **(5)** **路由传参**

```js
(1) query 传参
this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} })
this.props.location.query.day
(2) state 传参 有一种问题 得有缓存
this.props.history.push({ pathname:'/user',state:{day : 'Friday' } })
this.props.location.state.day
```

#### 	**(6)** **路由拦截**

```js
<Route path="/center" render={()=>isAuth()?<Center/>:<Login/>}/>
```

#### 	**(7)** **路由器分类**

​		`<BrowserRouter>`使用干净的 URL 将当前位置存储在浏览器的地址栏中，并使用浏览器的内置历史记录堆栈进行导航。

​		`<HashRouter>`用于 Web 浏览器，当 URL 由于某种原因不应（或无法）发送到服务器时。在某些共享主机情况下，您可能会发生这种情况，因为您无法完全控制服务器。在这些情况下，`<HashRouter>`可以将当前位置存储在`hash`当前 URL 的一部分中，因此永远不会将其发送到服务器。

#### 		**(8) withRouter**的应用与原理

```react
import { withRouter } from "react-router";
withRouter(MyComponent);
withRouter(connect(...)(MyComponent))
```

​		将该组件包裹进Route里面, 然后通过props就可以访问到history, location, match三个对象



### 3  反向代理

​	https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development

```js
npm install http-proxy-middleware --save
```

```js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
app.use(
    '/api',
    createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    })
    );
};
```

### 4 **css module** 类似于scoped

https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet

类似这样建立

![](.\assets\Snipaste_2024-06-20_14-08-01.png)

```js
import styles from './css/styles.module.less'
```

###  5 **Flux**与**Redux** 

​	Flux是Facebook提出的一种架构模式，主要用于解决React应用中组件之间状态管理的问题

​	Redux是受Flux启发的状态管理库，但它做了一些简化和改进，使得状态管理更加直观和可预测

​	Flux: 

​	![](.\assets\Snipaste_2024-06-06_17-14-08.png)



Redux最主要是用作应用状态的管理。简言之，Redux用一个单独的常量状态树（state对象）保存这一整个应用的

状态，这个对象不能直接被改变。当一些数据变化了，一个新的对象就会被创建（使用actions和reducers），这

样就可以进行数据追踪，实现时光旅行。

​	**redux** **介绍及设计和使用的三大原则**

![](.\assets\Snipaste_2024-06-04_15-57-39.png)

实例运用

![](.\assets\Snipaste_2024-06-06_23-25-53.png)

#### 5.1 Reducer[](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts#reducer)

**reducer** 是一个函数，接收当前的 `state` 和一个 `action` 对象，必要时决定如何更新状态，并返回新状态。函数签名是：`(state, action) => newState`。 **你可以将 reducer 视为一个事件监听器，它根据接收到的 action（事件）类型处理事件**

```react
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // 检查 reducer 是否关心这个 action
  if (action.type === 'counter/increment') {
    // 如果是，复制 `state`
    return {
      ...state,
      // 使用新值更新 state 副本
      value: state.value + 1
    }
  }
  // 返回原来的 state 不变
  return state
}
```

**4. redux ** **原理解析**

```js
store 是通过 createStore创建出来的，
所以他的结构
export const createStore = function(reducer, initialState) {
	...
    return {
            dispatch, 用于action的分发，
            改变store里面的state
            （currentState =	reducer(currentState,action)） ，并在内部遍历subcribe注册的监听器
            subscribe,注册listener，
            store里面state发生改变后，执行该
            listener
            getState, 取store里面的
            state
        ...
    }
}

function createStore(reducer){
    
    var list = [];
    var state =reducer();
    
    function subscribe(callback){
   	 list.push(callback);
    }
    
    function dispatch(data){
    	state = reducer(state,data);
        for(var i in list){
        list[i]();
        }
    }
    function getState(){
    	return state;
    }
    return {
        subscribe,
        dispatch,
        getState
    }
}
```

**5. reducer** **扩展**

​	如果如果不同的action所处理的属性之间没有联系，我们可以把 Reducer 函数拆分。不同的函数

​	负责处理不同属性，最终把它们合并成一个大的 Reducer 即可

```js
import {combineReducers} from "redux";
const reducer = combineReducers({
    a: functionA,
    b: functionB,
    c: functionC
    })
访问：
    (state)=>{
    return {
    kerwinstate:state.a (不同的命名空间)
    }
}
```

### 	6 实例![](.\assets\Snipaste_2024-06-07_11-10-24.png)

![](.\assets\Snipaste_2024-06-07_11-11-18.png)



**6. redux ** **中间件**

在redux里，action仅仅是携带了数据的普通js对象。action creator返回的值是这个action类型的

对象。然后通过store.dispatch()进行分发。同步的情况下一切都很完美，但是reducer无法处理异

步的情况。

那么我们就需要在action和reducer中间架起一座桥梁来处理异步。这就是middleware。

**i.** **中间件的由来与原理、机制**

```js
export default function thunkMiddleware({ dispatch, getState }) {
	return next => action =>
    typeof action === 'function' ?
    action(dispatch, getState) :
    next(action);
}
```

这段代码的意思是，中间件这个桥梁接受到的参数action，如果不是function则和过去一样直接执

行next方法(下一步处理)，相当于中间件没有做任何事。如果action是function，则先执行action，

action的处理结束之后，再在action的内部调用dispatch。

**ii.** **常用异步中间件：**

```js
import thunk from 'redux-thunk';
import {applyMiddleware} from "redux";
const store = createStore(fetchReducer, applyMiddleware(thunk));
const getComingSoon = ()=>{
    //进行异步请求
    return (dispatch,store)=>{
    }
}
```

b. redux-promise (store.dispatch参数可以是一个promise对象)

```js
import promiseMiddleware from 'redux-promise';
const store = createStore(fetchReducer, applyMiddleware(thunk,promiseMiddleware));
const getComingSoon = ()=>{
    //进行异步请求
    return axios.get(`****`).then(res=>{
    return {
        type:"cominglist",
        info:res.data.data
        }
        })
    }
```

**7. Redux DevTools Extension**

https://github.com/zalmoxisus/redux-devtools-extension

```js
import { createStore, compose} from 'redux'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers())
export default store
```

**十二 ** **. react-redux**

1 **容器组件与 ** **UI** **组件**

（1）UI组件

•只负责 UI 的呈现，不带有任何业务逻辑

•没有状态（即不使用this.state这个变量）

•所有数据都由参数（this.props）提供

•不使用任何 Redux 的 API

 (2) 容器组件

•负责管理数据和业务逻辑，不负责 UI 的呈现

•带有内部状态

•使用 Redux 的 API

 **Provider** **与** **connect**

（1）React-Redux 提供Provider组件，可以让容器组件拿到state。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
	rootElement
)
```

（2）React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这

 两种组件连起来

```js
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'
// const Counter = ...
const mapStateToProps = (state /*, ownProps*/) => {
    return {
    counter: state.counter
    }
}
const mapDispatchToProps = { increment, decrement, reset }
    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Counter)
```

**4. HOC** **与** **context** **通信在** **react-redux** **底层中的应用**

(1) connect 是HOC， 高阶组件

(2) Provider组件，可以让容器组件拿到state ， 使用了context

**5.** **高阶组件构建与应用**

HOC不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。

(1)代码复用，代码模块化

(2)增删改props

(3) 渲染劫持

```
// Child.js
//高阶函数
function Control(wrappedComponent) {
	return class MyControl extends React.Component {
    render(){
    if(!this.props.data) {
        return <div>loading...</div>
        }
        return <wrappedComponent {...props} />
        }
        }
    }
    class MyComponent extends React.Component {
        render(){
        return <div>{this.props.data}</div>
        }
    }
export default Control(MyComponent); //高阶组件
//Parent.js
import MyControlComponent from "./Child"
<MyControlComponent data={this.state.value}/>
//在父级传入data是null的时候，这一块儿就只会显示loading...,
//不会显示组件的具体内容，如果data不为null, 就显示真实组件信息。
```

**6. Redux** **持久化**

```js
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
    key: 'kerwin',
    storage: storage,
    //localStorage: import storage from 'redux-persist/lib/storage'
    //sessionStorage: import storageSession from 'redux-persist/lib/storage/session'
    stateReconciler: autoMergeLevel2
    //控制在本地存储中，新老状态怎么合并，覆盖？或者合并？
    };
    //改造reducer
    const myPersistReducer = persistReducer(persistConfig, reducer)
    //改造store
    export const persistor = persistStore(store)
    //改造根组件
    import {persistor} from './Store'
    import {PersistGate} from 'redux-persist/lib/integration/react';
    <PersistGate loading={null} persistor={persistor}>
    	...
	</PersistGate>
```

### 7 react + ts

####   7.1 class

​		state 

```tsx
import { Component } from "react";

interface IState {
    name: string
}
// <属性,状态>
export default class App extends Component<any, IState> {
    state = {
        name: '100'
    }
    render() {
        return (
            <div>
                APP: {this.state.name}
                <button onClick={()=>{
                    this.setState({
                        name: '200'
                    })
                }}>edit</button>
            </div>
        )
    }
}
```

​		props

```tsx
import React, { Children, Component } from 'react'
interface Iprops {
    show: boolean
}
export default class App extends Component<any, Iprops> {
    state = {
        show: false
    }
  render() {
    return (
      <div>
        <div>
            <button onClick={()=>{
                this.setState({
                    show: true
                })
            }}>change text</button>
        </div>
        <div>
            <ChildComponet show={this.state.show}></ChildComponet>
        </div>
      </div>
    )
  }
}
class ChildComponet extends Component<Iprops, any>{
  render() {
    return (
        <div>
            {this.props.show ? '01-抽屉' : '02-桌子'}
        </div>
    )
  }
}
```

#### 		7.2 hooks （react@16.8 新增）

​		state

```tsx
import React, { useState } from 'react'
//rfc
export default function Comstate() {
  const [name, setName] = useState<string>('chuck')
  return (
    <div>
      <div>name: {name}</div>
      <button onClick={()=>{
        setName('123')
      }}>edit Name</button>
    </div>
  )
}
```

#### 7.3 父子间通信

```tsx
//父组件调用
<Child key={index} item={item} index={index} cb={(index)=>{
    var newlist= [...list]
        newlist.splice(index,1)
        setList(newlist)
 }}/>
//子组件
interface ItemType{
    item:string,
    index:number, //定义接口
    cb:(param:number)=>void //定义接口
}
const Child = (props:ItemType)=>{
    
    let {index,item,cb} = props
    
    return 	<div >{item}
   		 <button onClick={()=>cb(index)}>del-{index}</button>
    </div>
}
```

#### 7.4 路由

**编程式导航**

```TSX
// 使用编程式导航，需要引入接口配置
import { RouteComponentProps } from "react-router-dom";
interface IProps {自己定义的接口}
type HomeProps = IProps & RouteComponentProps; //两个接口属性都支持
interface IState {}
class Home extends React.Component<HomeProps, IState> {
    private handleSubmit = async () => {
        //code for API calls
        this.props.history.push("/home");
    };
    public render(): any {
   		 return <div>Hello</div>;
    }
 }
```

**动态路由**

```TSX
interface IParams{
id:string
}
// RouteComponentProps是一个泛型接口
class Detail extends Component< RouteComponentProps<IParams> >{
    componentDidMount() {
    	console.log(this.props.match.params.id)
	}
    render(){
        return <div>
        detail
        </div>
    }
}
```

### 8 单元测试

使用 React Testing Library 官网推荐

文档地址 https://testing-library.com/docs/react-testing-library/intro

好处：

**提高代码质量**：测试库能够帮助开发人员编写和运行自动化测试，从而尽早发现和修复潜在的代码问题。这样可以提高代码质量，减少 bug 数量，并降低维护成本

**加速反馈循环**：在快节奏的开发中，快速获得反馈非常重要。自动化测试可以帮助开发人员快速验证他们的更改是否带来了意外的影响，从而加速开发和部署流程

**减少回归测试**

安装

```js
npm install --save-dev @testing-library/react @testing-library/dom
```

#### 8.1 介绍

React 初学者经常会混淆 React 中的测试工具。React Testing Library 不是 Jest 的替代品，因为它们互相需要，而且每个工具都有明确的任务。

#### 8.2 常用API介绍

1. **Render 方法**：用于将 React 组件渲染到虚拟 DOM 中，并返回一个包含渲染结果的对象，你可以对这个对象进行断言和查询。
2. **Queries**：一组用于查询和断言组件行为的方法，比如 getByLabelText、getByText、queryByTestId 等。通过这些方法，你可以在渲染结果中查找特定的元素，并断言它们的存在或内容。

​				`screen.getAllByRole` 方法接受一个角色字符串作为参数，并返回一个包含所有符合条件的元素数组

​				Role 

> ```js
> 在网页中，HTML元素的角色（role）是基于ARIA规范（Accessible Rich Internet Applications）定义的。ARIA角色用于增强网页的可访问性，使得屏幕阅读器和其他辅助技术能够更好地理解和与网页元素进行交互。
> ```
>
> 在ARIA规范中，每个HTML元素都有一个默认的角色。例如：
>
> ```js
> <button> 元素的默认角色是 button。
> <a> 元素（当有 href 属性时）的默认角色是 link。
> <input> 元素（当 type 为 text 时）的默认角色是 textbox。
> ------------------------------
> 对于 <li> 元素，其默认角色是 listitem。这是因为 <li> 元素通常用于定义列表项，而 listitem 角色正是用来表示这一点的。
> 以下是一些常见HTML元素及其默认角色：
> ```
> ```js
> <ul> 和 <ol>：默认角色是 list
> <li>：默认角色是 listitem
> <nav>：默认角色是 navigation
> <header>：默认角色是 banner
> <footer>：默认角色是 contentinfo
> <main>：默认角色是 main
> <section>：默认角色是 region（如果有 aria-labelledby 或 aria-label 属性）
> React Testing Library 的 getAllByRole 方法利用这些默认角色来查找元素。这有助于确保测试代码关注的是用户界面中实际存在的、对用户可见且可访问的部分，而不是依赖具体的实现细节。
> ```

1. **User Events**：提供了模拟用户操作的方法，比如用户点击、输入等操作，以便测试组件在交互过程中的行为。
2. **FireEvent**：用于触发各种事件，比如点击事件、输入事件等，以模拟用户与组件的交互。
3. **Act**：用于包裹对组件的操作，确保其在测试过程中表现得像在真实环境中一样。
4. **WaitFor**：提供了等待特定条件满足的方法，用于处理异步操作或动画效果。

#### 8.3 简单使用

```js
function sum(x, y) {
  return x + y;
}

describe('sum', () => {
  it('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});
```

​		App todo 案例

​		![](.\assets\Snipaste_2024-06-24_23-38-56.png)

```
import React, { Component } from 'react'

export class App extends Component {
    state = {
        list: ['111', '222', '333'],
        text: ''
    }
    render() {
        return (
            <div>
                <h2>单元测试案例 todo</h2>
                <div>
                    <div>
                        <input onChange={(val) => {
                            this.setState({
                                text: val.target.value
                            })
                        }} value={this.state.text}></input>
                        <button onClick={() => {
                            this.setState({
                                list: [...this.state.list,this.state.text],
                                text: ''
                            })
                        }}>add</button>
                    </div>
                    <div>
                        {/* 这里的 <> 和 </> 实际上是 <React.Fragment> 的简写形式。它们的作用是告诉 React，这些元素是作为一个组合单元返回的，但不需要额外的父节点包裹 */}
                        <ul>
                            {
                                this.state.list.map((item, index) => {
                                    return (
                                        <li key={item}>{item} <button onClick={() => {
                                            let newState = [ ...this.state.list ]
                                            newState.splice(index, 1)
                                            this.setState({
                                                list: newState
                                            })
                                        }}>del</button> </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
```

​		**单元测试代码**

​		test --> 01-react-test-render.test.js

```js
import ShallowRender from 'react-test-renderer/shallow'
import { App } from '../App'
import { act } from 'react-dom/test-utils';

import { render, screen, fireEvent, WaitFor } from '@testing-library/react';
describe("react-test-render", function () {

    // 测试节点
    it("todo", function () {
        // 虚拟DOM
        const render = new ShallowRender()
        render.render(<App />)
        console.log(render.getRenderOutput())
        console.log(render.getRenderOutput().props.children[0].type)
        // expect 期望 == h2
        expect(render.getRenderOutput().props.children[0].type).toBe("h2")
    })
    // 测试功能
    // it("删除功能", function(){
    //     // 获取APP-DOM
    //     // const app = act.renderIntoDocument(<App/>)
    //     // 得到li节点（标签）多个
    //     // ReactTestUtil.scryRendererDOMComponentsWithTag(app, 'li')
    //     // 得到删除按钮 标签
    //     // let deleButton = 
    //     // 模拟点击
    //     // ReactTestUtil.Simulate.click()
    //     // expect(todoitems.length - 1).toBe(todoitemsAfterClick.length)
    //     // 获取APP-DOM
    //     render(<App />);
    //     screen.debug()

    //     // 得到li节点（标签）多个
    //     const todoitems = screen.getAllByRole('listitem')
    //     // 得到删除按钮 标签
    //     let deleButtons =  screen.getAllByRole('button', { name: 'del'})
    //     if (deleButtons.length > 1) {
    //         // 模拟点击第一个删除按钮
    //         // deleButtons[0].click();
    //          // 使用 act 包裹点击事件
    //         act(() => {
    //             fireEvent.click(deleButtons[0]);
    //         });

    //         // 重新获取所有 li 元素
    //         const updatedTodoItems = screen.getAllByRole('listitem');
    //         console.log(deleButtons.length, updatedTodoItems.length )
    //         expect(updatedTodoItems.length).toBe(todoitems.length - 1);
    //     }

    //     console.log(todoitems.length)


    // })
    it("添加功能", function () {
        // 获取APP-DOM
        render(<App />);
        // screen.debug()

        // 得到li节点（标签）多个
        const todoitems = screen.getAllByRole('listitem')
        // 得到增加按钮 标签
        let AddButtons = screen.getByRole('button', { name: 'add' })
        console.log('2222222222222222222', AddButtons.length) 
        // if (AddButtons.length > 0) {
            // 使用 act 包裹点击事件
            // 得到input节点并且输入值
            const input = screen.getByRole('textbox')
            input.value = 'chuck1111111'
            console.log('222222222', input) 
            fireEvent.click(AddButtons);
            // act(() => {
                
            // });
            // 重新获取所有 li 元素
            const updatedTodoItems = screen.getAllByRole('listitem');
            console.log('11111111111', updatedTodoItems[3])
            expect(updatedTodoItems.length).toBe(todoitems.length + 1);
        // }
    })
})
// 普通测试
function sum(x, y) {
    return x + y;
}

describe('sum', () => {
    it('sums up two values', () => {
        expect(sum(2, 4)).toBe(6);
    });
});
```

### 9 redux-soga

