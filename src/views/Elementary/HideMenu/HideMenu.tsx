import React, { Component } from 'react'


export interface HideMenuProps {

}
interface HideMenuState {
    list: { label: string, value: string }[],
    top: string,
    left: string,
    width: string 
}
export default class HideMenu extends Component<HideMenuProps, HideMenuState> {
    constructor(props: HideMenuProps) {
        super(props)
        this.state = {
            list: [{ label: "menu-item-0", value: "menu-item-0" },
            { label: "menu-item-1", value: "menu-item-1" },
            { label: "menu-item-2", value: "menu-item-2" },
            { label: "menu-item-3", value: "menu-item-3" },
            { label: "menu-item-4", value: "menu-item-4" },
            { label: "menu-item-5", value: "menu-item-5" }],
            top: '200px',
            left: '500px',
            width: '200px'
        }
    }
    handleClick(val: string, e: React.MouseEvent) {
        console.log(val)
        console.log(e)

    }
    componentDidMount() {
        //const instance = ReactDOM.findDOMNode(this.refs['menuHead'])
    }

    divHandleClick(e: React.MouseEvent) {
        //console.log(e.target)
        //const targetDom = ReactDOM.findDOMNode(this.refs['menuHead']) as Element

        //const position = targetDom.getBoundingClientRect()
 

    }
    render() {
        const { top, left, width } = this.state
        return (
            <>
                <div
                    ref="menuHead"
                    style={{
                        width,
                        height: '150px',
                        border: '1px solid red'
                    }}
                    onClick={(e) => this.divHandleClick(e)}>
                </div>

                <ul style={{
                    listStyleType: 'none',
                    position: "absolute",
                    top,
                    left
                }}>
                    {
                        this.state.list.map(item => {
                            return <li key={item.value}
                                onClick={(e) => this.handleClick(item.label, e)}>
                                {item.label}</li>
                        })
                    }
                </ul>

            </>
        )
    }
}
