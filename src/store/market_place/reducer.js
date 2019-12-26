import { PRODUCT_FETCH,PRODUCTS_FETCH } from './types';

const initialState = {
    loading:true,
    products:[],
    success:null,
    product:{}
}

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case PRODUCTS_FETCH:
            return {
                ...state,
                success:true,
                loading:false,
                products:action.payload
            }
        case PRODUCT_FETCH:
            return {
                ...state,
                loading:false,
                success:true,
                product:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getMpData = state => state.mp;