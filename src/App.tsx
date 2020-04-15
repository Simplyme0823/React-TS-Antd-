import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { routerConfigMap } from './router'
import AuthHOC from './router/AuthHOC'
import { Frame, Login, NotFounding } from './components'
import './App.css'
import { Router } from '../src/reducers/index'
import { NOTFOUND } from 'dns'

const menus = routerConfigMap.filter(route => route.isNav === true)

export default class App extends Component {
    render() {
        return (
            //connected-react-router改写了Router 一边在redux中改写路由
            <Router>
                <Route render={({ location }) => (
                    location.pathname === '/login'
                        ?
                        <Route path='/login' component={Login}></Route>
                        :
                        location.pathname === '/404'
                            ?
                            <Route path='/404' component={NotFounding}></Route>
                            :
                            <Frame menus={menus}>
                                <Switch>
                                    <AuthHOC routerConfigMap={routerConfigMap}></AuthHOC>
                                </Switch>
                            </Frame>
                )}>
                </Route>
            </Router>
        )
    }
}