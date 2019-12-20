import React from 'react';
import {Link} from 'react-router-dom';

import event_advert from '../images/event_advert.jpg';

const EventAdvert = () => {
    return (        
            <div className="container">
            <div className="event_advert" style={{ backgroundImage: `url(${event_advert})` }}>
                <div className="event_advert_overlay">
                <div className="event_advert_content">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">                        
                        <h4 className="event_advert_content_heading">
                            Let everyone know about your event,Its simple and quick</h4>
                        <Link to={
                            `/account/upcoming/event_form`
                        } className="btn btn-outline-info">Upload an event</Link>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
    )
};
export default EventAdvert;