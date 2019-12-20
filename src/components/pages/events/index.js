import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {Link} from 'react-router-dom';

import {fetchEvents,getEventsData} from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventsCard from '../../shared/EventCard';

const Events = ({loading,events,fetchEvents}) => {
    const [pending,setPending] = useState(true);
    const [_events,setEvents] = useState([]);
    useEffect(() => {
        const load_events = () => {
            fetchEvents();
            if(!loading){
                setEvents(events);
                return setPending(false);
            }
        };
        load_events();
    },[events]);
    
    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if(_events.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No event Uploaded</p>
                <Link className="btn btn-outline-info" to={`/dashboard`}>
                    upload own event
               </Link>
            </div>
        </div>
    )

    return (
        <>
        {
            _events.length >= 4 && <Carousel title="All Events" card="events" data={_events} />
        }
        {
            _events.length < 4 && (
                <div className="row">
                    <div className="col-12 col-md-12">
                    <BlockHeader title="All Events" data={_events} />
                    </div>
                    {
                        _events.map((event,index) => (
                            <div className="col-12 col-sm-3" key={index}>
                                <EventsCard data={event} />
                            </div>
                        ))
                    }
                </div>
            )
        }
        </>
    )
};

const mapStateToProps = state => ({
    loading:getEventsData(state).loading,
    events:getEventsData(state).events
});
const dispatchToProps = {
    fetchEvents
};

export default connect(mapStateToProps,dispatchToProps)(Events);