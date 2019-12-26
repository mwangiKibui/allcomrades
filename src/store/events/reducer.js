import {EVENTS_FETCH,EVENT_FETCH} from './types';

const initialState = {
    loading:true,
    success:null,
    events:[],
    event:{}
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case EVENTS_FETCH:
            return {
                ...state,
                loading:false,
                success:true,
                events:action.payload
            }
        case EVENT_FETCH:
            return {
                ...state,
                success:true,
                loading:false,
                event:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getEventsData = state => state.events;