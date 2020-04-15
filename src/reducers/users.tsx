import { actionTypes } from '../actions'
import { actionType } from '../types/reduce'

export interface usersActionState{
    id?:string,
    displayName?:string,
    avatar?:string,
    role?:string,
    isLogin?:boolean,
    token?:string
}


const initState:usersActionState = {
    id: '',
    displayName: '',
    avatar: '',
    role: '',
    isLogin: false
}


export default (state = initState, action: actionType) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isLogin:true
            }
        case actionTypes.LOGIN_FAILED:
            return{
                ...state,
                isLogin:false
            }
        case actionTypes.START_LOGIN:
            return{
                ...state,
                isLogin:false
            }
        default:
            return state
    }
}