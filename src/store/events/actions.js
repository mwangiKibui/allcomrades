import {EVENTS_FETCH} from './types';
import axios from 'axios';

const URL = 'https://karuapi.herokuapp.com/api/';

const eventsLoad = (data) => {
    return {
        type:EVENTS_FETCH,
        payload:data
    }
};

export const fetchEvents = () => {
     return dispatch => {
         axios.get(`${URL}/events/fetchEvents`).then(result => {
             return dispatch(eventsLoad(result.data.message))
         })
     }
};