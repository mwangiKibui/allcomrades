// react
import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {Card} from 'semantic-ui-react';

import {getUserData} from '../../store/user';

const EventCard = ({data,user}) => {
       
    return (
        <div className="event-card">
        <Card style={{width:'100%'}}>
            <img src={data.profiles[0]} alt={data.name} className="event_card--img" />
            <Card.Content>
                <span className="badge badge-danger">{data.type} event</span>
                <Card.Header>
                    <Link to={`/platform/events/${data._id}`} className="event_card--link">{data.name}</Link>
                </Card.Header>
                <Card.Meta>
                    <p className="event_card--desc">{
                        new Date().getDate() <= new Date(data.date).getDate() ? 'Happening' : 'Happened'
                    } {
                        new Date().getDate() === new Date(data.date).getDate() ? 'today' : new Date(data.date).toLocaleDateString()}</p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <p className="event_card--desc">By {
                    user['_id'] === data.organizer._id ? 'You' : data.organizer.firstname
                }</p>
            </Card.Content>
        </Card>
        </div>
    );
};
const mapToProps = state => ({
    user:getUserData(state).user
})
export default connect(mapToProps,null)(EventCard);