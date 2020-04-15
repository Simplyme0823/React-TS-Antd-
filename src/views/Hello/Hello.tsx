/* eslint no-restricted-globals:0 */

/**
 * 联系父子组件通信
 * 1.父传递子 在子组件标签上添加属性即可，添加的属性都被传入子组件的props中
 *   准确地说 其实是将自定义标签上添加属性 attributes
 *   state为组件内部的数据
 * 
 * 2.子传递父 通用调用父组件作用域的函数来传递值，但是由于this的原因会改变
 *   函数的运行环境，所以要绑定this
 * 
 * 
 * 这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，
 * 且多次调用下相同的入参始终返回相同的结果。
 * 
 * 
 * State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
 */

import React, { Component } from 'react'
import { ButtonCounter } from './HelloClick/HelloChild'

interface helloState {
    num: number
}


export default class Hello extends Component<object, helloState> {
    action: Function
    constructor(props: object) {
        super(props);//Component的构造函数中 有this.props = props 
        this.state = {
            num: 100
        }
        /**
         * class 的方法默认不会绑定 this
         * 
         * 而且es6中的class是默认使用严格模式 this会被认为是undefined
         * 非严格模式下为window(浏览器环境)
         */
        this.action = this.doAction.bind(this)
    }
    public doAction(n: number, type: string) {
        if (type === "add") {
            //绑定this 
            this.setState({
                num: this.state.num - 1
            })
        } else {
            /**
             * 为了提高性能react会把setState()调用合并成一个
             * 所以你不要依赖他们的值来更新下一个状态。
             * 
             * 当state内部有多个属性的时候，可以单独对某个属性setState 
             * 触发后会合并state对象 但是这样属于 浅合并
             */

            this.setState({
                num: this.state.num + 1
            })
        }
    }

    render() {
        return (
            /**
             * return null的时候 不渲染任何东西
             */
            <div className="hello">
                {/**
                 * react的时间采用小驼峰命名 不是纯小写
                 * 在jsx中传入是的一个函数 用{}包裹
                 * 而传统html是字符串
                 * 
                 * 同样 react中的event是改写过的 符合W3C标准
                 * 
                 * 在组织默认时间发生 传统html只需要 return false
                 * 而react中必须使用 e.preventDefault()
                 * 
                 */}
                <ButtonCounter click={this.doAction.bind(this)} number={this.state.num} />
                <ButtonCounter click={this.action} number={this.state.num} />
            </div>
        )
    }
}
