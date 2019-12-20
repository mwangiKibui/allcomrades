// react
import React, { Component } from 'react';
import { connect } from 'react-redux';
// third-party
import PropTypes from 'prop-types';
// data stubs
import Carousel from '../shared/Carousel';
import { fetchEvents,getEventsData } from '../../store/events';
import BlockEventAdvert from './BlockEventAdvert';

class TabbedEvents extends Component {
    timeout;

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: false,
            groups:[ //the events shall also be dynamic
                { id: 1, name: 'All', current: true },
                { id: 2, name: 'CU', current: false },
                { id: 3, name: 'YCS', current: false },
                { id: 4, name: 'school', current: false },
                { id: 5, name: 'students', current: false }
            ],
        };
    };

    componentDidMount = () => {
        let { fetchEvents, loading, events } = this.props;
        fetchEvents();
        if (!loading) {
            return this.setState({
                events,
                loading: false
            });
        };
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleChangeGroup = (newCurrentGroup) => {
        clearTimeout(this.timeout);

        const { groups } = this.state;
        const currentGroup = groups.find((group) => group.current);

        if (currentGroup && currentGroup.id === newCurrentGroup.id) {
            return;
        }
        //else
        this.setState((state) => (
            {
                loading: true,
                groups: state.groups.map((group) => (
                    { ...group, current: group.id === newCurrentGroup.id }
                )),

            }
        ));

        // sending request to server, timeout is used as a stub
        this.timeout = setTimeout(() => {
            this.setState((state) => {
                const _events = state.events.filter(
                    event => event.category === newCurrentGroup.name
                );
                return {
                    events: _events,
                    loading: false,
                };
            });
        }, 2000);
    };

    render() {
        const {events} = this.state;
        if(events.length === 0) return <BlockEventAdvert />
        return (
            <Carousel
                {...this.props}
                loading={this.state.loading}
                data={this.state.data}
                onGroupClick={this.handleChangeGroup}
            />
        );
    }
};
TabbedEvents.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    withSidebar: PropTypes.bool,
};
TabbedEvents.defaultProps = {
    layout: 'grid-4',
    rows: 1,
    withSidebar: false,
};
const mapStateToProps = state => ({
    loading: getEventsData(state).loading,
    events: getEventsData(state).events
});
const dispatchStateToProps = {
    fetchEvents
};
export default connect(mapStateToProps, dispatchStateToProps)(TabbedEvents);