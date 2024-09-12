import { JWT_REFRESH_SUCCESS, JWT_REFRESH_ERROR, JWT_CLEAN_STATE, JWT_LOGOUT } from "../../store/JWT/types";

const initState = {
    expired:null
}

const RefreshJWTReducer = (state = initState, action) => {
    switch(action.type){
        case JWT_REFRESH_ERROR:
        case JWT_LOGOUT:
            return {
                ...state,
                expired:true
            }
        case JWT_REFRESH_SUCCESS:
            return {
                ...state,
                expired:false
            }
        case JWT_CLEAN_STATE:
            return {
                ...state,
                expired:null
            }
        default:
            return state;
    }
}

export default RefreshJWTReducer;