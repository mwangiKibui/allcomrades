import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchEvents, getEventsData } from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventsCard from '../../shared/EventCard';

const Cu = ({ loading, events, fetchEvents }) => {
    const [pending, setPending] = useState(true);
    const [_cu, setCu] = useState([]);
    useEffect(() => {
        const load_cu_events = () => {
            fetchEvents();
            if (!loading) {
                let _cu = events.filter(type => type === "Cu");
                setCu(_cu);
                return setPending(false);
            }
        };
        load_cu_events();
    }, [events,loading,fetchEvents]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_cu.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Cu events Uploaded</p>
                {/** event shall only be uploaded by the registered cu sec */}
            </div>
        </div>
    );

    return (
        <>
            {
                _cu.length >= 4 && <Carousel title="Cu Events" card="events" data={_cu} />
            }
            {
                _cu.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Cu Events" data={_cu} />
                        </div>
                        {
                            _cu.map((event, index) => (
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
    loading: getEventsData(state).loading,
    events: getEventsData(state).events
});
const dispatchToProps = {
    fetchEvents
};

export default connect(mapStateToProps, dispatchToProps)(Cu);