import {EVENTS_FETCH} from './types';

const initialState = {
    loading:true,
    events:[]
};

export const reducer = (state=initialState,action) => {
    switch(action.type){
        case EVENTS_FETCH:
            return {
                ...state,
                loading:false,
                events:action.payload
            }
        default:
            return {
                ...state
            }
    }
};

export const getEventsData = state => state.events;