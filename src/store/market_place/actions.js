
import { PRODUCT_FETCH,PRODUCTS_FETCH } from './types';

import axios from 'axios';
const URL = 'https://karuapi.herokuapp.com/api/';

const loadProducts = (data) => {
    return {
        type: PRODUCTS_FETCH,
        payload: data
    };
};

const loadProduct = data => {
    return {
        type:PRODUCT_FETCH,
        payload:data
    }
}

export const fetchProducts = () => {
    return async  dispatch => {
        await axios.get(`${URL}/marketPlace/products/fetchProducts`).then(result => {
            return dispatch(loadProducts(result.data.message))
        }).catch(console.log);
    }
};

//fetching a specific product
export const fetchProduct = (_id) => {
   return async dispatch => {
       await axios.get(`${URL}/products/fetchSpecProduct/${_id}`).then(result => {
         let product = result.data.message.filter(product => product._id === _id);
         return dispatch(loadProduct(product));
       }).catch(console.log);
   }
};

//fetching the admin products
export const fetchAdminProducts = () => {
    return async dispatch => {
        let token = localStorage.getItem('user');
        await axios.post(`${URL}/users/decodeToken`,null,{
            headers:{'Authorization':`Bearer ${token}`}
        }).then(async result => {
          let {_id} = result.data.message;
          await axios.get(`${URL}/marketPlace/products/fetchProducts`).then(result => {
              let products = result.data.message.filter(product => product.seller._id === _id);
              return dispatch(loadProducts(products))
          })
        }).catch(console.log);
    }
};

//updating a product details
export const updateProductDetails = (data,_id) => {
    return async dispatch => {
        await axios.put(`${URL}/products/updateDetails/${_id}`,data,{
            headers:{'Content-Type':'application/json'}
        }).then(result => {
          return dispatch(loadProduct(result.data.message))
        }).catch(console.log);
    }
}
//uploading a product --> whenever you add a product return it
export const uploadProduct = (data) => { 
    return async dispatch => {
        await axios.post(`${URL}/marketPlace/product/addProduct`,data,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then(result => {
            console.log('The result',result);
            return dispatch(loadProduct(result.data.message));
        }).catch(console.log);
    }
} 
