// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const EventCard = (props) => {
    const {
        data: event, layout
    } = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm'
    });

    let image;

    let type = <div key="sale" className="product-card__badge product-card__badge--sale">
        {event.type}
    </div>

    if (event.profiles && event.profiles.length > 0) {
        image = (
            <div className="product-card__image">
                <Link to={`/event/${event._id}`}>
                    <img src={event.profiles[0]} alt={event.name} />
                </Link>
            </div>
        );
    }

    return (
        <div className={containerClasses}>            
            {type}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <Link to={`/events/${event._id}`}>{event.name}</Link>
                </div>
            </div>
            <div className="product-card__actions">
                <div className="product-card__availability">
                    Date:
                    <span className="text-success">{new Date(event.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    data: PropTypes.object.isRequired,
    layout: PropTypes.oneOf(['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']),
};

EventCard.defaultProps = {
    layout: 'grid-sm'
};
export default EventCard;