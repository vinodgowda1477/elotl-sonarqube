import { homeActionTypes } from "../constants/navigator-constants/homeConstants";

const initialState = {
    signIn: true,
}

const homeReducer = (state=initialState, action)=>{
    switch (action.type) {
        case homeActionTypes.SET_SIGNIN_FLAG:
            return {...state, signIn:action.flag}
        default:
            return state;
    }
 }

 export default homeReducer;