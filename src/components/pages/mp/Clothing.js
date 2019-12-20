import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

//assets
import { fetchProducts, getMpData } from '../../../store/market_place';
import Carousel from '../../shared/Carousel';
import ProductCard from '../../shared/ProductCard';
import BlockHeader from '../../shared/BlockHeader';

const Clothing = ({ loading, products, fetchProducts }) => {

    const [pending, setPending] = useState(true);
    const [_clothing, setClothing] = useState([]);
    useEffect(() => {
        const load_clothing = () => {
            fetchProducts();
            if (!loading) {
                let _clothing = products.filter(product => product.category === "Clothing");
                setClothing(_clothing);
                return setPending(false);
            }
        };
        load_clothing();
    }, [products]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader color="#009933" size="25" />
        </div>
    );

    if (_clothing.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>Sorry no Clothing Products found</p>
                <Link className="btn btn-outline-info" to={`/dashboard`}>
                    upload own product
               </Link>
            </div>
        </div>
    )

    return (
        <>
            {
                _clothing.length >= 4 && <Carousel title="Clothing" data={_clothing} card="product" />
            }
            {
                _clothing.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Clothing" data={_clothing} />
                        </div>
                        {
                            _clothing.map((product, index) => (
                                <div className="col-sm-3" key={index}>
                                    <ProductCard data={product} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
};

const mapStateToProps = state => ({
    loading: getMpData(state).loading,
    products: getMpData(state).products
});

const dispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps, dispatchToProps)(Clothing);