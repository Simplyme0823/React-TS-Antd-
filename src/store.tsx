import { createStore, applyMiddleware, StoreEnhancer, StoreEnhancerStoreCreator, Store } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'connected-react-router'
import history from './router/history'

/**
 * 这里的rootReducer是合并后的总的reducers,因为createStore的第一个参数只能输入一个函数
 */

//export default createStore(rootReducer, applyMiddleware(thunk)) 



let storeEnhancer: StoreEnhancer = applyMiddleware(thunk, routerMiddleware(history))

let storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)

let store: Store = storeEnhancerStoreCreator(rootReducer)

export default store