import {HOSTELS_FETCH,HOSTEL_FETCH} from './types';

import axios from 'axios';
const URL = `https://karuapi.herokuapp.com/api/`;

const load_hostels = (data) => {
    return {
        type:HOSTELS_FETCH,
        payload:data
    }
};

const load_hostel = (data) => {
    return {
        type:HOSTEL_FETCH,
        payload:data
    }
}

export const fetchHostels = () => {
     return dispatch => {
         axios.get(`${URL}/hostels/fetchHostels`).then(result => {
             return dispatch(load_hostels(result.data.message))
         }).catch(console.log);
     }
};

export const fetchSpecificHostel = (_id) => {
    return dispatch => {
          axios.get(`${URL}/hostels/${_id}`).then(result => {
              return dispatch(load_hostel(result.data.message))
          }).catch(console.log);
    }
}