import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { RouterConfigModel } from '../../router/index'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'

import './Frame.css'

import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export interface Props {
    from?: string;
    menus: Array<RouterConfigModel>
}

export interface States {
    collapsed: boolean
}

type thisProps = Props & RouteComponentProps;



class Frame extends Component<thisProps, States> {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    /**解构写法，参数是无序的 */
    onMenuClick = ({ key }: { key: string }) => {
        this.props.history.push(key)
    }

    render() {
        console.log(this.props)
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.onMenuClick}
                        selectedKeys={[this.props.location.pathname]}>
                        {
                            this.props.menus.map(item => {
                                return <Menu.Item key={item.path}> {this.state.collapsed ? 'icon' : item.title}</Menu.Item>
                            })
                        }
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ paddingLeft: 10,height:50 }} >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '5px 5px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Frame);