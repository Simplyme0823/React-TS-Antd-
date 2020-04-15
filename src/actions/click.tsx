import { actionTypes } from './index'
import { Dispatch } from 'redux';
import { LocationDescriptorObject, LocationState } from 'history'
import { push } from 'connected-react-router'
const decrement = (amount: number) => {
    return {
        type: actionTypes.DECREMENT,
        payload: amount
    }
}

const increment = (amount: number) => {
    return {
        type: actionTypes.INCREMENT,
        payload: amount
    }
}


/*export const clickCreater = (amount: number) => (dispatch: Dispatch) => {
    dispatch(click(amount))
}*/


export const mapDispatchToProps = (dispatch: Dispatch) => ({
    //此对象会传递到组件的props上
    clickDecrement(amount: number) {
        setTimeout(() => {
            dispatch(decrement(amount))
        }, 1000);
    },
    clickIncrement(amount: number) {
        dispatch(increment(amount))
    },
    goto(location: LocationDescriptorObject<LocationState>) {
        dispatch(push(location))
    }
})
