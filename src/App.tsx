/** @format */

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { routerConfigMap } from "./router";
import Auth from "./router/AuthHOC";
import { Frame, Login, NotFounding } from "./components";
import "./App.css";
import { Router } from "../src/reducers/index";
import "./styles/main.scss";

const menus = routerConfigMap.filter(route => route.isNav === true);

export default class App extends Component {
  render() {
    return (
      //connected-react-router改写了Router 一边在redux中改写路由
      <Router>
        <Route
          render={({ location }) =>
            location.pathname === "/login" ? (
              <Route path="/login" component={Login}></Route>
            ) : location.pathname === "/404" ? (
              <Route path="/404" component={NotFounding}></Route>
            ) : (
              <Frame menus={menus}>
                <Switch>
                  <Auth routerConfigMap={routerConfigMap}></Auth>
                </Switch>
              </Frame>
            )
          }
        ></Route>
      </Router>
    );
  }
}
