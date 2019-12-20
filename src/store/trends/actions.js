import {TRENDS_FETCH} from './types';
import axios from 'axios';
const URL = `https://karuapi.herokuapp.com/api/`;

const loadTrends = (data) => {
    return {
        type:TRENDS_FETCH,
        payload:data
    }
};

export const fetchTrends = () => {
    return dispatch => {
        axios.get(`${URL}/trends/fetchTrends`).then(result => {
            return dispatch(loadTrends(result.data.message))
        }).catch(console.log);
    }
};