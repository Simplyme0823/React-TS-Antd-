import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../../../actions/click'
import { combinedState } from '../../../reducers'
import { init } from '../../../reducers/click'

/*
export interface clickprops{
    clickCreater():void
}*/

//把state传入props中 props的属性都是只读的
//单纯地输送数据
const mapStateToProps = (state: combinedState): init => state.click

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Click extends Component<Props> {
    render() {
        //解构赋值
        const { clickDecrement, clickIncrement, id ,goto} = this.props
        return (
            <>
                <Button onClick={clickIncrement.bind(this, 5)}>
                    +
                </Button>
                {id}
                <Button onClick={clickDecrement.bind(this, 5)}>
                    -
                </Button>
                <Button onClick={goto.bind(this, {pathname:'/admin/hello'})}>
                    goto
                </Button>
            </>
        )
    }
}



/**
 *  mapDispatchToProps  这里是手动刷新 函数 传递到props上
 */
export default connect(mapStateToProps, mapDispatchToProps)(Click)
//

/**
 * connect() 接受两个参数，第一个就是mapStateToProps() 一个函数，输入的是外部的state到内部props的映射
 *
 * 第二个参数是 mapDispatchToProps() 可以是方法，也可以是对象，
 * 函数具有dispatch和ownProps两个参数
 */