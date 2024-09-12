import { 
    GET_CSRF_TOKEN_ERROR,
    GET_CSRF_TOKEN_SUCCESS
} from "./types";

const initState = {
    loaded:false
}

const CSRFReducer = (state = initState, action) => {
    switch(action.type){
        case GET_CSRF_TOKEN_SUCCESS:
            return {
                ...state,
                loaded:true
            }
        case GET_CSRF_TOKEN_ERROR:
            return {
                ...state,
                loaded:true
            }
        default:
            return state;  
    }
}

export default CSRFReducer;