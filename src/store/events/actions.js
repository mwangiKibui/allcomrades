import {EVENTS_FETCH,EVENT_FETCH} from './types';
import axios from 'axios';

const URL = 'https://karuapi.herokuapp.com/api/';

const eventsLoad = (data) => {
    return {
        type:EVENTS_FETCH,
        payload:data
    }
};

const eventLoad = data => {
    return {
        type:EVENT_FETCH,
        payload:data
    }
}

export const fetchEvents = () => {
     return async dispatch => {
         await axios.get(`${URL}/events/fetchEvents`).then(result => {             
             return dispatch(eventsLoad(result.data.message));
         })
     }
};

export const fetchEvent = (_id) => {
    //should be filtered to the upcoming events only
    return async dispatch => {
        await axios.get(`${URL}/events/fetchSpecEvent/${_id}`).then(result => {            
            return dispatch(eventLoad(result.data.message))
        }).catch(console.log);
    }
};

//updating an event shall return an updated event

export const updateEventDetails = (data,_id) => {
    return async dispatch => {
        await axios.put(`${URL}/events/updateDetails/${_id}`,data,{
            headers:{'Content-Type':'application/json'}
        }).then(result => {
            return dispatch(eventLoad(result.data.message))
        }).catch(console.log);
    }
};

//uploading an event, it should also return the uploaded event
export const uploadEvent = data => {
    return async dispatch => {
        await axios.post(`${URL}/events/addEvent`,data,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then(result => {
            console.log(`the result that we have `,result.data.message)
             return dispatch(eventLoad(result.data.message))
        }).catch(console.log);
    }
};

//fetch admin personal upcoming event
export const AdminEvents = () => {
    return async dispatch => {
        const token = localStorage.getItem('user');
        await axios.post(`${URL}/users/decodeToken`,null,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(async result => {
            let {_id} = result.data.message;
            await axios.get(`${URL}/events/fetchEvents`).then( result => {
                let events = result.data.message.filter(event => event.organizer._id === _id);
                return dispatch(eventsLoad(events));
            }).catch(console.log);
        }).catch(console.log);        
    }    
}

//fetch admin personal past event
export const AdminPastEvents = () => {
    return async dispatch => {
        const token = localStorage.getItem('user');
        await axios.post(`${URL}/users/decodeToken`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( async result => {
            let { _id } = result.data.message;
            await axios.get(`${URL}/events/fetchEvents`).then( result => {
                let events = result.data.message.filter(event => new Date().getDate() > new Date(event.date).getDate()
                    && event.organizer._id === _id);
                return dispatch(eventsLoad(events));
            }).catch(console.log);
        }).catch(console.log);
    } 
}