import React, { Component } from 'react'
import { Frame } from './components'
import { routerConfigMap} from './router'
import { RouteComponentProps, withRouter, } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {usersActionState} from './reducers/users'
import './App.css'

const menus = routerConfigMap.filter(route => route.isNav === true)


interface AppProps extends RouteComponentProps,usersActionState{
  
}

 class App extends Component<AppProps> {
  render() {
    console.log(this.props.isLogin)
    return (
      <Frame menus={menus}>
        <Switch>
          {
            routerConfigMap.map(route => {
              return <Route key={route.path} path={route.path} render={(routerProps) => {
                return <route.component {...routerProps}></route.component>
              }} exact></Route>
            })
          }
          <Redirect to={routerConfigMap[0].path} from='/admin' exact></Redirect>
          <Redirect to='/404' ></Redirect>
        </Switch>
      </Frame>
    )
  }
}


const mapState = (state:any) =>({
  isLogin:state.users.isLogin
})
export default connect(mapState)(App)