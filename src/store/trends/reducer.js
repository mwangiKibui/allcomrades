import {TRENDS_FETCH} from './types';

const initialState = {
    loading:true,
    trends:[]
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case TRENDS_FETCH:
            return {
                ...state,
                loading:false,
                trends:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getTrendsData = state => state.trends;