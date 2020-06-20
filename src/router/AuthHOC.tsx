import React, { Component } from 'react'
import { RouteComponentProps, Route, Redirect, withRouter } from 'react-router-dom';
import { RouterConfigModel } from './index'
import {getToken} from "../utils/session"
//高阶组件，外部会传入配置好的路由信息 每次跳转都会进行权限判断
interface AuthHocProps extends RouteComponentProps {
    routerConfigMap: RouterConfigModel[]
}


const getRoute = (route: RouterConfigModel[], val: string) => {
    let queue: RouterConfigModel[] = []
    route.forEach(item => {
        queue.push(item)
    })
    let ele: RouterConfigModel
    while (queue.length) {
        ele = queue.shift() as RouterConfigModel
        if (ele.children) {
            queue = queue.concat(ele.children)
        }
        if (ele.path === val) return ele
    }
}

class Auth extends Component<AuthHocProps> {
    render() {
        const { location, routerConfigMap } = this.props

        //解构出跳转的路径名
        const { pathname } = location

        //从sessionStorage中读取登录信息
        const isLogin = !!getToken()

        let routePath = pathname

        //根据路由地址返回匹配的路由单元(含组件)
        /*const targetRouterConfig = routerConfigMap.find((v: RouterConfigModel) => {
            //优先匹配正则 比如利用路由传参的路径
            if (v.regexp && pathname.match(v.regexp) != null) {
                routePath = v.path
                return true
            }
            return v.path === pathname
        })*/

        const targetRouterConfig = getRoute(routerConfigMap, routePath)

        //console.log(targetRouterConfig?.component)

        if (routePath === "" || routePath === "/") {

            return <Redirect to='/login'></Redirect>
        }

        //路由合法且不需要权限且没有登录 可以直接跳转至改页面
        if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            const { component } = targetRouterConfig
            return <Route path={routePath} component={component} />
        }

        //已登录状态
        if (isLogin) {
            //路由合法就返回路由
            if (targetRouterConfig) {
                return <Route path={routePath} component={targetRouterConfig.component} ></Route>
            } else {
                /**
                 * 设置状态 全局404
                 */
                return <Redirect to='/404'></Redirect>
            }
        } else {
            //非登录状态
            if (targetRouterConfig && !targetRouterConfig.auth) {
                return <Route path={routePath} component={targetRouterConfig.component} />
            } else {
                return <Redirect to='/login'></Redirect>
            }
        }
    }
}
export default withRouter(Auth)