import {ARTICLES_FETCH} from './types';

const initialState = {
    loading:true,
    articles:[]
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case ARTICLES_FETCH:
            return {
                ...state,
                loading:false,
                articles:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getArticlesData = state => state.articles;