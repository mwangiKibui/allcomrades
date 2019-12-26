import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import BlockHome from '../shared/BlockHome';
import { getMpData, fetchProducts } from '../../store/market_place';
import Slick from '../shared/SlickWithPreventSwipeClick';
import { carousel_settings as settings } from '../../data';
import BlockHeader from '../shared/BlockHeader';
import Carousel from '../shared/Carousel';
import Tabs from './mp/Tabs';
import ProductCard from '../shared/ProductCard';

const ProductPage = ({ match, loading, products, fetchProducts }) => {
    const { prodId } = match.params;
    const [pending, setPending] = useState(true);
    const [_product, setProduct] = useState({});
    const [_related, setRelated] = useState([]);

    useEffect(() => {
        const load_data = () => {
            fetchProducts();
            if (!loading) {
                let product = products.find(product => product._id === prodId);
                let _cat_related = products.filter(prod => prod.category === product.category && prod._id !== prodId);
                let others_related = products.filter(prod => prod.category !== product.category );

                let related = [..._cat_related,...others_related];
                setProduct(product);
                setRelated(related);
                return setPending(false);
            }
        };
        load_data();
    }, [prodId,loading,products,fetchProducts]);
    
    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
         </div>
    );

    let slideshow = 
        _product.profiles.map((profile, index) => (
            <div className="product_slideshow_container" key={index}>
                <img src={profile} className="product_image" alt={_product.name} />
            </div>
        ))
    
    return (
        <section className="product_page">
            {
                pending ? <BlockHome link={`/platform/products/${prodId}`} /> :
                    <BlockHome name={`${_product.name}`} link={`/platform/products/${prodId}`} />
            }

            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        {
                            pending ? (
                                <div className="text-center">
                                    <ClipLoader size="25" color="#009933" />
                                </div>
                            ) : (
                                    <div className="product_page_content">
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
                                    </div>
                                )
                        }

                    </div>
                    <div className="col-12 col-sm-12 col-md-12">

                        {
                            pending ? (
                                <div className="text-center">
                                    <ClipLoader size="25" color="#009933" />
                                </div>
                            ) : (
                                    <>
                                        {
                                            _related.length >= 4 && <Carousel title="Related Products" data={_related} card="products" />
                                        }
                                        {
                                            _related.length > 0 && _related.length < 4 && (
                                                <div className="row">
                                                    <div className="col-12 col-md-12">
                                                        <BlockHeader title={'Related Products'} data={_related} />
                                                    </div>
                                                    {
                                                        _related.map((product, index) => (
                                                            <div className="col-12 col-sm-3 col-md-3" key={index}>
                                                                <ProductCard data={product} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </>
                                )
                        }
                    </div>
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