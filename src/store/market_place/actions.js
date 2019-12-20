
import { PRODUCT_FETCH } from './types';

import axios from 'axios';
const URL = 'https://karuapi.herokuapp.com/api/';

const loadProducts = (data) => {
    return {
        type: PRODUCT_FETCH,
        payload: data
    };
};

export const fetchProducts = () => {
    return dispatch => {
        axios.get(`${URL}/marketPlace/products/fetchProducts`).then(result => {
            return dispatch(loadProducts(result.data.message))
        }).catch(console.log);
    }
}

