import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { getMpData, fetchProducts } from '../../../store/market_place';
import Slick from '../../shared/SlickWithPreventSwipeClick';
import { carousel_settings as settings } from '../../../data';
import Tabs from './Tabs';

const ProductPage = ({ match, loading, products, fetchProducts }) => {
    const { prodId } = match.params;
    const [pending, setPending] = useState(true);
    const [_product, setProduct] = useState({});

    useEffect(() => {
        const load_data = () => {
            fetchProducts();
            if (!loading) {
                let product = products.find(product => product._id === prodId);
                setProduct(product);
                return setPending(false);
            }
        };
        load_data();
    }, [prodId]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    )

    let slideshow = (
        _product.profiles.map((profile, index) => (
            <div className="mp_slideshow_container" key={index}>
                <img src={profile} className="event_image" alt={_product.name} />
            </div>
        ))
    )
    return (
        <section className="product_page">
            <div className="row">
                <div className=" col-12 col-sm-6 col-md-6">
                    <Slick {...settings}>
                        {slideshow}
                    </Slick>
                </div>
                <div className=" col-12 col-sm-6 col-md-6">
                    <Tabs data={_product} />
                </div>
            </div>
        </section>
    )
};
const mapStateToProps = state => ({
    loading: getMpData(state).loading,
    products: getMpData(state).products
});
const dispatchToProps = {
    fetchProducts
}
export default connect(mapStateToProps, dispatchToProps)(ProductPage);