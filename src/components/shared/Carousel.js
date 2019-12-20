// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import BlockHeader from './BlockHeader';

//cards
import ProductCard from './ProductCard';
import HostelCard from './HostelCard';
import TrendCard from './TrendCard';
import EventCard from './EventCard';
import PostCard from './PostCard';

import SlickWithPreventSwipeClick from './SlickWithPreventSwipeClick';

import {slickSettings} from '../../data';

class Carousel extends Component {
    state={
        data:this.props.data
    }
    handleNextClick = () => {
        if (this.slickRef) {
            this.slickRef.slickNext();
        }
    };

    handlePrevClick = () => {
        if (this.slickRef) {
            this.slickRef.slickPrev();
        }
    };

    setSlickRef = (ref) => {
        this.slickRef = ref;
    };

    dataColumns() {
        const columns = [];
    
        const { rows } = this.props;
        let { data } = this.state;

        if (rows > 0) {
            data = data.slice();
            while (data.length > 0) {
                columns.push(data.splice(0, rows));
            }
        };
        return columns;
    }

    render() {
        const {
            layout,
            title,
            withSidebar,
            onGroupClick,
            groups,
            loading,
            card
        } = this.props;
 
        const blockClasses = classNames('block block-products-carousel', {
            'block-products-carousel--loading': loading,
        });
        const containerClasses = classNames({
            container: !withSidebar,
        });

        const columns = this.dataColumns().map((column, index) => {
            const data = column.map((data) => (
                <div key={data._id} className="block-products-carousel__cell">
                    {
                       card === "products" && <ProductCard data={data} />
                    }
                    {
                       card === "hostels"  && <HostelCard data={data} />
                    }
                    {
                       card === "trends" && <TrendCard data={data} />
                    }
                    {
                        card === "events" && <EventCard data={data} />
                    }
                    {
                        card === "post" && <PostCard data={data} />
                    }
                </div>
            ));

            return (
                <div key={index} className="block-products-carousel__column">
                    {data}
                </div>
            );
        });

        return (
            <div className={blockClasses} data-layout={layout}>
                <div className={containerClasses}>
                    <BlockHeader
                        title={title}
                        groups={groups}
                        data={this.state.data}
                        onNext={this.handleNextClick}
                        onPrev={this.handlePrevClick}
                        onGroupClick={onGroupClick}
                    />

                    <div className="block-products-carousel__slider">
                        <div className="block-products-carousel__preloader" />

                        <SlickWithPreventSwipeClick
                            ref={this.setSlickRef}
                            {...slickSettings[layout]}
                        >
                            {columns}
                        </SlickWithPreventSwipeClick>
                    </div>
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    data: PropTypes.array,
    groups: PropTypes.array,
    withSidebar: PropTypes.bool,
    loading: PropTypes.bool,
    onGroupClick: PropTypes.func,
};
Carousel.defaultProps = {
    layout: 'grid-4',
    rows: 1,
    data: [],
    groups: [],
    withSidebar: false,
    loading: false,
    onGroupClick: undefined,
};
export default Carousel;