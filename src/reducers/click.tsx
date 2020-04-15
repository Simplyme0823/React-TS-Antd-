import { actionTypes } from '../actions'

import {AnyAction} from 'redux'
/**
 * reducer是一个纯函数
 */
export interface init {
    id: number
}

const initState: init = {
    id: 10000
}


export default (state:init = initState, action:AnyAction) => {
    //这里是根据不同的action返回相应的state
    switch (action.type) {
        case actionTypes.DECREMENT:
            console.log(action)
            return {
                ...state,
                id:state.id - (action.payload || 1)
            }
        case actionTypes.INCREMENT:
            console.log(action)
            return {
                ...state,
                id:state.id + (action.payload || 1)
            }
        default:
            console.log(action)
            return state
    }
}