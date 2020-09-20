/** @format */

import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { RouterConfigModel } from "../../router/index";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import "./Frame.css";

import { withRouter, RouteComponentProps } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
export interface Props {
  from?: string;
  menus: Array<RouterConfigModel>;
}

export interface States {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
}

type thisProps = Props & RouteComponentProps;

class Frame extends Component<thisProps, States> {
  state = {
    collapsed: false,
    openKeys: [],
    selectedKeys: [],
  };

  toggle = () => {
    const collapsed = this.state.collapsed;
    this.setState({
      collapsed: !collapsed,
    });
    sessionStorage.setItem("collapsed", String(collapsed));
  };

  /**解构写法，参数是无序的 */
  onMenuClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    this.props.history.push(key);
    const openKeys = keyPath[keyPath.length - 1];
    this.selectMenuHightLight(key, openKeys);
  };

  componentDidMount() {
    const collapsed =
      sessionStorage.getItem("collapsed") === "true" ? true : false;
    this.setState({
      collapsed: !collapsed,
    });

    const pathName = this.props.location.pathname;
    const split = pathName.split("/");
    const openKeys = split.slice(0, split.length - 1).join("/");
    this.selectMenuHightLight(pathName, openKeys);
  }

  // 菜单高光
  selectMenuHightLight = (pathName: string, openKeys: string) => {
    this.setState({
      selectedKeys: [pathName],
      openKeys: [openKeys],
    });
  };

  // 父级菜单
  openChange = (openKeys: string[]) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    });
  };

  render() {
    return (
      <Layout>
        <Sider collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onOpenChange={this.openChange}
            onClick={this.onMenuClick}
            openKeys={this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
          >
            {this.props.menus.map(item => {
              if (!item.children) {
                return <Menu.Item key={item.path}>{item.title}</Menu.Item>;
              } else {
                return (
                  <SubMenu key={item.path} title={item.title}>
                    {item.children.map(li => {
                      return <Menu.Item key={li.path}>{li.title}</Menu.Item>;
                    })}
                  </SubMenu>
                );
              }
            })}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ paddingLeft: 10, height: 50 }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              },
            )}
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: "5px 5px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// withRouter 传入history location match三个对象传入Frame组件
export default withRouter(Frame);
