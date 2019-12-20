// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from './AsyncAction';
import Currency from './Currency';
import {Quickview16Svg} from '../../svg';
import { quickviewOpen } from '../../store/quickview';


const ProductCard = (props) => {
    const {
        data:product,layout
    } = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm'
    });

    let badges = [];
    let image;
    let price;
    let features;

    if (product.badges.includes('sale')) {
        badges.push(<div key="sale" className="product-card__badge product-card__badge--sale">Sale</div>);
    }
    if (product.badges.includes('hot')) {
        badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">Hot</div>);
    }
    if (product.badges.includes('new')) {
        badges.push(<div key="new" className="product-card__badge product-card__badge--new">New</div>);
    }

    badges = badges.length ? <div className="product-card__badges-list">{badges}</div> : null;

    if (product.images && product.images.length > 0) {
        image = (
            <div className="product-card__image">
                <Link to={`/shop/product/${product._id}`}><img src={product.images[0]} alt={product.name} /></Link>
            </div>
        );
    }

    if (product.compareAtPrice) {
        price = (
            <div className="product-card__prices">
                <span className="product-card__new-price"><Currency value={product.price} /></span>
                {' '}
                <span className="product-card__old-price"><Currency value={product.compareAtPrice} /></span>
            </div>
        );
    } else {
        price = (
            <div className="product-card__prices">
                <Currency value={product.price} />
            </div>
        );
    }

    if (product.features && product.features.length) {
        features = (
            <ul className="product-card__features-list">
                {product.features.map((feature, index) => (
                    <li key={index}>{`${feature.name}: ${feature.value}`}</li>
                ))}
            </ul>
        );
    }

    return (
        <div className={containerClasses}>
            <AsyncAction
                action={() => quickviewOpen(product.id)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        onClick={run}
                        className={classNames('product-card__quickview', {
                            'product-card__quickview--preload': loading,
                        })}
                    >
                        <Quickview16Svg />
                    </button>
                )}
            />
            {badges}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <Link to={`/shop/product/${product._id}`}>{product.name}</Link>
                </div>
                {/* <div className="product-card__rating">
                    <Rating value={product.rating} />
                    <div className=" product-card__rating-legend">{`${product.reviews} Reviews`}</div>
                </div> */}
                {features}
            </div>
            <div className="product-card__actions">
                <div className="product-card__availability">
                    Availability:
                    <span className="text-success">{product.availability}</span>
                </div>
               {price}
                
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    layout: PropTypes.oneOf(['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']),
};

ProductCard.defaultProps = {
    layout:'grid-sm'
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    quickviewOpen,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductCard);
