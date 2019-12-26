import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import {fetchAdminProducts,getMpData} from '../../../store/market_place';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import ProductCard from '../../shared/ProductCard';


const MarketPlace = ({ products, loading, fetchProducts }) => {
    const [pending, setPending] = useState(true);
    const [_products, setProducts] = useState([]);
    useEffect(() => {
        const load_products = () => {
            fetchProducts();
            if (!loading) {
                setProducts(products);
                setPending(false);
            }
        };
        load_products();
    }, [products,loading,fetchProducts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_products.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>You have no stock yet.</p>
                <Link to={`/account/mp/product_form`} className="btn btn-outline-success">add product</Link>
            </div>
        </div>
    )

    return (
        <>
            {
                _products.length >= 4 && <Carousel title="Your Products" card="products" data={_products} />
            }
            {
                _products.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Your Products" data={_products} />
                        </div>
                        {
                            _products.map((product, index) => (
                                <div className="col-12 col-sm-3" key={index}>
                                    <ProductCard data={product} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className="row" style={{marginTop:'10px'}}>
                <div className="col-12 col-sm-12 col-md-12">
                    <Link to={`/account/mp/product_form`} className="btn btn-outline-success">add product</Link>
                </div>
            </div>
        </>
    )
};

const mapToProps = state => ({
    products: getMpData(state).products,
    loading: getMpData(state).loading
});
const dispatchToProps = {
    fetchProducts: fetchAdminProducts
}
export default connect(mapToProps, dispatchToProps)(MarketPlace);