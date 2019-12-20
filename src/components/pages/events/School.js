import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchEvents, getEventsData } from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventsCard from '../../shared/EventCard';

const Schools = ({ loading, events, fetchEvents }) => {
    const [pending, setPending] = useState(true);
    const [_schools, setSchools] = useState([]);
    useEffect(() => {
        const load_school_events = () => {
            fetchEvents();
            if (!loading) {
                let _schools = events.filter(type => type === "School");
                setSchools(_schools);
                return setPending(false);
            }
        };
        load_school_events();
    }, [events]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_schools.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No School events Uploaded</p>
               {/** event shall only be uploaded by our own sec */}
            </div>
        </div>
    )

    return (
        <>
            {
                _schools.length >= 4 && <Carousel title="School Events" card="events" data={_schools} />
            }
            {
                _schools.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="School Events" data={_schools} />
                        </div>
                        {
                            _schools.map((event, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Schools);