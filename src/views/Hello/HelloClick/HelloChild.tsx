import React, { Component } from 'react'
import { Button } from 'antd'

/**
 * 这里有导出interface的动作是由于 props是父组件给予的参数，
 * 而state是子组件(类)内部的数据，
 */
export interface childProps {
    click: Function,
    number: number
}

export class ButtonCounter extends Component<childProps, object>{
    click = () => {
        this.props.click()
    }
    render() {
        console.log(this.props)
        return (
            <>
                <Button onClick={this.click}>Increment</Button>
                {this.props.number}
            </>
        )
    }

}

