import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchEvents, getEventsData } from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventsCard from '../../shared/EventCard';

const Ycs = ({ loading, events, fetchEvents }) => {
    const [pending, setPending] = useState(true);
    const [_ycs, setYcs] = useState([]);
    useEffect(() => {
        const load_ycs_events = () => {
            fetchEvents();
            if (!loading) {
                let _ycs = events.filter(type => type === "YCS");
                setYcs(_ycs);
                return setPending(false);
            }
        };
        load_ycs_events();
    }, [events]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_ycs.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Ycs event Uploaded</p>
                {/** the upload button shall be shown on condition you are the sec */}
            </div>
        </div>
    )

    return (
        <>
            {
                _ycs.length >= 4 && <Carousel title="Ycs Events" card="events" data={_ycs} />
            }
            {
                _ycs.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Ycs Events" data={_ycs} />
                        </div>
                        {
                            _ycs.map((event, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Ycs);