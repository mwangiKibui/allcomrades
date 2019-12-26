import {USER_FETCH,USER_LOGIN,USER_SIGNUP,USER_LOGIN_ERROR,USER_SIGNUP_ERROR,USER_LOADING} from './types';

const initialState = {
    loading:true,
    message:'',
    success:null,
    user:{},
    error:''
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                error:'',
                loading:true
            }
        case USER_FETCH:
            return {
                ...state,
                loading:false,
                error:'',
                user:action.payload
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loading:false,
                success:false,
                message:'',
                error:action.payload
            }
        case USER_LOGIN:
            return {
                ...state,

                loading:false,
                success:true,
                error:'',
                message:action.payload
            }
        case USER_SIGNUP_ERROR:
            return {
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        case USER_SIGNUP:
            return {
                ...state,
                loading:false,
                success:true,
                error:'',
                message:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getUserData = state => state.user;