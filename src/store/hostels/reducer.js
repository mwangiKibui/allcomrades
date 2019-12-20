import {HOSTELS_FETCH,HOSTEL_FETCH} from './types';

const initialState = {
    loading:true,
    hostels:[],
    hostel:{}
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case HOSTELS_FETCH:
            return {
                ...state,
                loading:false,
                hostels:action.payload
            }
        case HOSTEL_FETCH:
            return {
                ...state,
                loading:false,
                hostel:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getHostelsData = state => state.hostels;