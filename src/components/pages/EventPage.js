import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { getEventsData, fetchEvents } from '../../store/events';
import Slick from '../shared/SlickWithPreventSwipeClick';
import BlockHome from '../shared/BlockHome';
import { carousel_settings as settings } from '../../data';
import Tabs from './events/Tabs';
import EventCard from '../shared/EventCard';
import Carousel from '../shared/Carousel';
import BlockHeader from '../shared/BlockHeader';

const EventPage = ({ match, loading, events, fetchEvents }) => {
    const { eventId } = match.params;
    const [pending, setPending] = useState(true);
    const [_event, setEvent] = useState({});
    const [related,setRelated] = useState([]);

    useEffect(() => {
        const load_data = () => {
            fetchEvents();
            if (!loading) {
                let event = events.find(event => event._id === eventId);
                let type_related = events.filter (evnt => evnt.type === event.type && evnt._id !== eventId);
                let others_related = events.filter (evnt => evnt.type !== event.type);


                setEvent(event);
                setRelated([...type_related,...others_related]);
                return setPending(false);
            }
        };
        load_data();
    }, [eventId]);

    if (pending) return (
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
            <BlockHome link={'/events'} name={_event.name} />
            <div className="container">
            <div className="row">
                <div className=" col-12 col-sm-6 col-md-6">
                    <Slick {...settings}>
                        {slideshow}
                    </Slick>
                </div>
                <div className=" col-12 col-sm-6 col-md-6">
                    <Tabs data={_event} />
                </div>
                <div className="col-12 col-sm-12 col-md-12">

                    {
                        pending ? (
                            <div className="text-center">
                                <ClipLoader size="25" color="#009933" />
                            </div>
                        ) : (
                                <>
                                    {
                                        related.length >= 4 && <Carousel title="Related Events" data={related} card="events" />
                                    }
                                    {
                                        related.length > 0 && related.length < 4 && (
                                            <div className="row">
                                                <div className="col-12 col-md-12">
                                                    <BlockHeader title={'Related Events'} data={related} />
                                                </div>
                                                {
                                                    related.map((event, index) => (
                                                        <div className="col-12 col-sm-3 col-md-3" key={index}>
                                                            <EventCard data={event} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </>
                            )
                    }
                </div>
            </div>
            </div>
        </section>
    )
};
const mapStateToProps = state => ({
    loading: getEventsData(state).loading,
    events: getEventsData(state).events
});
const dispatchToProps = {
    fetchEvents
}
export default connect(mapStateToProps, dispatchToProps)(EventPage);