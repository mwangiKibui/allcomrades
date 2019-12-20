import {CATEGORIES_FETCH} from './types';

const initialState = {
    loading:true,
    categories:[]
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case CATEGORIES_FETCH:
            return {
                ...state,
                loading:false,
                categories:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getCategoryData = state => state.categories;