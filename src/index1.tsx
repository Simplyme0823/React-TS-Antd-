import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App1';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { routerConfigMap,RouterConfigModel } from './router'

/**
 * Jsx的本质
 * 最终会转化为React.createElement 来生成虚拟dom
 * 
 * React DOM 会负责更新 DOM 来与 React 元素保持一致。
 */


/*
const li = React.createElement(
    'li',
    null,
    'li1'
)

const ul = React.createElement(
    'ul',//html标签
    {className:'test'},//标签上的各种属性
    [li,li,li,li]//子标签 字符串/数组
)
*/



//渲染根节点
//React元素是不可变的，一旦创建，就无法更改它的子元素或者属性，
//一个元素就像电影的一帧，代表某个特定【时刻】的UI

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>    
                {/**需要权限 */
                    /*
                        render={(routerProps: RouteComponentProps) => {
                        return store.getState().users.isLogin ? <App {...routerProps} ></App> : <Redirect to='/login'></Redirect>
                    }} 
                    */

                }
                <Route path='/admin' component={App}></Route>
                
                {
                    /**无需权限 */
                    routerConfigMap.map((route: RouterConfigModel) => {
                        return <Route key={route.path} path={route.path} component={route.component} exact></Route>
                    })
                }
                <Redirect to='/login' from='/' exact></Redirect>
                <Redirect to='404'></Redirect>
            </Switch>
        </Router>
    </Provider>, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
