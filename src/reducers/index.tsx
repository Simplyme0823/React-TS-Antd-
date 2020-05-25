import {combineReducers, ReducersMapObject, AnyAction,Reducer} from 'redux'
import {connectRouter, RouterState, ConnectedRouter} from 'connected-react-router'
import history from '../router/history'

import click, {init} from './click'
import users, {usersActionState} from './users'
import React from 'react'

//合并后的总reducers
export interface combinedState{
    click:init,
    users:usersActionState,
    router:RouterState
}

//AnyAction与router不兼容 报错 所以写any
let reducers :ReducersMapObject<combinedState,any>={
    click,
    users,
    router:connectRouter(history)
}

/*
export type CombinedState={
    [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>
}*/


//reducer本质上就是收state和action来改变state的 所以返回的也是state
let reducer :Reducer<combinedState, AnyAction> = combineReducers(reducers)

export default reducer


/**
 * reducers 为纯函数,接受 state和action两个参数 根据action返回新的state
 */

export const Router = (props:any) => <ConnectedRouter history={history} {...props} />;