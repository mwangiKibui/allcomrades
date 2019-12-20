import { PRODUCT_FETCH } from './types';

const initialState = {
    loading:true,
    products:[]
}

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case PRODUCT_FETCH:
            return {
                ...state,
                loading:false,
                products:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getMpData = state => state.mp;