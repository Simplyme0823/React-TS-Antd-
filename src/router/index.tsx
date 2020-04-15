import { ClickListen, Hello, Elementary, Practice, Form } from '../views'
import { Login, NotFounding } from '../components'
//路由都经过懒加载处理

//https://www.maomao.ink/index.php/web/773.html

export interface RouterConfigModel {
    path: string,
    component: any,
    auth: boolean,
    regexp?: RegExp
    isNav?: boolean,
    title?: string,
    children?: RouterConfigModel[]
}

export const whiteRoutes: RouterConfigModel[] = [
    {
        path: '/login',
        component: Login,
        auth: false,
    }, {
        path: '/404',
        component: NotFounding,
        auth: false

    },]

export const routerConfigMap: RouterConfigModel[] = [
    {
        path: '/login',
        component: Login,
        auth: false,
    }, {
        path: '/404',
        component: NotFounding,
        auth: false

    }, {
        path: '/admin/clicklisten',
        component: ClickListen,
        title: 'react-redux',
        auth: true,
        isNav: true
    }, {
        path: '/admin/hello',
        component: Hello,
        title: 'paren-child-props',
        auth: true,
        isNav: true
    }, {
        path: '/admin/elementary',
        component: Elementary,
        title: 'JS基础',
        auth: true,
        isNav: true
    }, {
        path: '/practice',
        component: Practice,
        title: '练习',
        auth: true,
        isNav: true,
        children: [{
            path: '/practice/form',
            component: Form,
            title: '表单练习',
            auth: true,
            isNav: true
        }]
    }
]
