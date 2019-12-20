import {ADVERT_FETCH} from './types';

const initialState = {
    loading:true,
    adverts:[]
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case ADVERT_FETCH:
            return {
                ...state,
                loading:false,
                adverts:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getAdvertsData = state => state.adverts;