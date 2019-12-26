// react
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// third-party
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

// application

import { fetchTrends,getTrendsData } from '../../store/trends';
import Carousel from '../shared/Carousel';

const BlockTrends = ({ loading,fetchTrends,trends }) => {

    const [pending, setPending] = useState(true);
    const [_trends, setTrends] = useState([]);
    useEffect(() => {
        const load_trends = () => {
            fetchTrends();
            if (!loading) {
                setTrends(trends);
                return setPending(false);
            }
        };
        load_trends();
    }, [trends,loading,fetchTrends])
    if (pending) return (
        <div className='text-center'>
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_trends.length === 0) return (
        <p>No Trends synced</p>
    );


    return (        
        <Carousel title="Latest Trends" data={_trends} card="trends" />
    );
};

BlockTrends.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['list-sm', 'grid-nl']),
    trends: PropTypes.array,
};

BlockTrends.defaultProps = {
    layout: 'list-sm',
    trends: [],
};
const mapStateToProps = state => ({
    loading: getTrendsData(state).loading,
    trends:getTrendsData(state).trends
});
const dispatchStateToProps = {
    fetchTrends
};
export default connect(mapStateToProps, dispatchStateToProps)(BlockTrends);