import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {Link} from 'react-router-dom';

import { fetchEvents, getEventsData } from '../../../store/events';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import EventsCard from '../../shared/EventCard';

const Students = ({ loading, events, fetchEvents }) => {
    const [pending, setPending] = useState(true);
    const [_students, setStudents] = useState([]);
    useEffect(() => {
        const load_student_events = () => {
            fetchEvents();
            if (!loading) {
                let _students = events.filter(event => event.type === "student");
                setStudents(_students);
                return setPending(false);
            }
        };
        load_student_events();
    }, [events,loading,fetchEvents]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_students.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Students event Uploaded</p>
                <Link className="btn btn-outline-info" to={`/dashboard`}>
                    upload own event
               </Link>
            </div>
        </div>
    )

    return (
        <>
            {
                _students.length >= 4 && <Carousel title="Students Events" card="events" data={_students} />
            }
            {
                _students.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Students Events" data={_students} />
                        </div>
                        {
                            _students.map((event, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Students);