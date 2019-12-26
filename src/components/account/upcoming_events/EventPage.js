import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { getEventsData,fetchEvents } from '../../../store/events';
import Slick from '../../shared/SlickWithPreventSwipeClick';
import { carousel_settings as settings } from '../../../data';
import Tabs from './Tabs';

const EventPage = ({ match, loading, events, fetchEvents }) => {
    const { eventId } = match.params;
    const [pending, setPending] = useState(true);
    const [_event, setEvent] = useState({});

    useEffect(() => {
        const load_data = () => {
            fetchEvents();
            if (!loading) {
                let event = events.find(event => event._id === eventId);
                setEvent(event);
                return setPending(false);
            }
        };
        load_data();
    }, [eventId,loading,events,fetchEvents]);
    
    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    )

    let slideshow = (
        _event.profiles.map((profile, index) => (
            <div className="event_slideshow_container" key={index}>
                <img src={profile} className="event_image" alt={_event.name} />
            </div>
        ))
    )
    return (
        <section className="event_page">
                <div className="row">                    
                    <div className=" col-12 col-sm-6 col-md-6">
                        <Slick {...settings}>
                            {slideshow}
                        </Slick>
                    </div>
                    <div className=" col-12 col-sm-6 col-md-6">
                        <Tabs data={_event} />
                    </div>
                </div>
        </section>
    )
};
const mapStateToProps = state => ({
    loading:getEventsData(state).loading,
    events:getEventsData(state).events
});
const dispatchToProps = {
    fetchEvents
}
export default connect(mapStateToProps, dispatchToProps)(EventPage);