import { SHOW_MODAL_CLEAN_STATE, SHOW_MODAL_FAILED, SHOW_MODAL_SUCCESS } from "./types";

const initState = {
    data:null
}

const ModalRequestLoadReducer = (state = initState, action) => {
    switch(action.type){
        case SHOW_MODAL_SUCCESS:
            return {
                ...state,
                data:action.response
            }
        case SHOW_MODAL_FAILED:
            return {
                ...state,
                data:null
            }
        case SHOW_MODAL_CLEAN_STATE:
            return {
                ...state,
                data:null
            }
        default:
            return state;
    }
}

export default ModalRequestLoadReducer;