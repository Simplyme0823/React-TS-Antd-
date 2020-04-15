import { actionTypes } from './index'
import { Dispatch } from 'redux';

//import { login } from ''
const request = (userInfo: any) => {
    return new Promise(resolve => {
        resolve(userInfo)
    })
}

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (payload: any) => {
    sessionStorage.setItem('isLogin',"true")
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload
    }
}

const loginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

/**
 * dispatch会调用reducer函数
 * @param userInfo 
 */
/*const login = (payload: any) => (dispatch: Dispatch) => {
    dispatch(startLogin())
    request(payload).then(res => {
        console.log(res,'RES')
        dispatch(loginSuccess(
            res
        ))
    }).catch((err:any)=>{
        console.log(err)
        dispatch(loginFailed())
    })
}*/


export const mapDispatchToProps=(dispatch:Dispatch)=>({
    login(payload:any){
        dispatch(startLogin())
        request(payload).then(res=>{
            dispatch(loginSuccess(res))
        }).catch((err:any)=>{
            console.log(err)
            dispatch(loginFailed())
        })
    }
})