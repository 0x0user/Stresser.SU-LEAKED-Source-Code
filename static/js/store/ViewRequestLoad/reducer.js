import { SHOW_VIEW_CLEAN_STATE, SHOW_VIEW_FAILED, SHOW_VIEW_SUCCESS } from "./types";

const initState = {
    data:null,
    loaded:false,
    error:false,
    name:null
}

const ViewRequestLoadReducer = (state = initState, action) => {
    switch(action.type){
        case SHOW_VIEW_SUCCESS:
            return {
                ...state,
                data:action.response,
                loaded:true,
                error:false,
                name:action.name ?? null
            }
        case SHOW_VIEW_FAILED:
            return {
                ...state,
                data:null,
                loaded:true,
                error:true,
                name:null
            }
        case SHOW_VIEW_CLEAN_STATE:
            return {
                ...state,
                data:null,
                loaded:false,
                error:false,
                name:null
            }
        default:
            return state;
    }
}

export default ViewRequestLoadReducer;