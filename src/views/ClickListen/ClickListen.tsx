import React, { Component } from 'react'
import Click from './Click/Click'

 
export default class ClickListen extends Component {
    render() {
        console.log(this.props)
        return (
            <>
                <Click></Click>
            </>
        )
    }
}
