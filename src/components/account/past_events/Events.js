import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { AdminEvents, getEventsData } from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventCard from '../../shared/EventCard';


const Events = ({ events, loading, fetchEvents }) => {
    const [pending, setPending] = useState(true);
    const [_events, setEvents] = useState([]);
    useEffect(() => {
        const load_events = () => {
            fetchEvents();
            if (!loading) {
                let _events = events.filter(event => new Date().getDate() > new Date(event.date).getDate())
                setEvents(_events);
                setPending(false);
            }
        };
        load_events();
    }, [events]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_events.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>You have no Past event yet.</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _events.length >= 4 && <Carousel title="Past Events" card="events" data={_events} />
            }
            {
                _events.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Past Events" data={_events} />
                        </div>
                        {
                            _events.map((event, index) => (
                                <div className="col-12 col-sm-3" key={index}>
                                    <EventCard data={event} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
};

const mapToProps = state => ({
    events: getEventsData(state).events,
    loading: getEventsData(state).loading
});
const dispatchToProps = {
    fetchEvents: AdminEvents
}
export default connect(mapToProps, dispatchToProps)(Events);