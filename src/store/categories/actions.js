import axios from 'axios';
import {CATEGORIES_FETCH} from './types';
const URI = `https://karuapi.herokuapp.com/api/`;

const load_categories = (data) => {
    return {
        type:CATEGORIES_FETCH,
        payload:data
    }
};

export const fetchCategories = () => {
    return dispatch => {
         axios.get(`${URI}/prodCategories/fetchProdCategories`).then(result => {
             let data = result.data.message;
             return dispatch(load_categories(data));
         }).catch(console.log);
    }
}