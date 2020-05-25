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


//{ login(payload:any)...略 } 属性会被传递到login组件的props属性中
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