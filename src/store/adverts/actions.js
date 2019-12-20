import {ADVERT_FETCH} from './types';
import axios from 'axios';
const URI = 'https://karuapi.herokuapp.com/api/';

const load_adverts = data => {
    return {
        type:ADVERT_FETCH,
        payload:data
    }
};

export const fetchAdverts = () => {
    return dispatch => {
        axios.get(`${URI}/adverts/fetchAdverts`).then(result => {
            return dispatch(load_adverts(result.data.message))
        }).catch(console.log);
    }
}