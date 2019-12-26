import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

//assets
import { fetchProducts, getMpData } from '../../../store/market_place';
import Carousel from '../../shared/Carousel';
import ProductCard from '../../shared/ProductCard';
import BlockHeader from '../../shared/BlockHeader';

const Furniture = ({ loading, products, fetchProducts }) => {

    const [pending, setPending] = useState(true);
    const [_furniture, setFurniture] = useState([]);
    useEffect(() => {
        const load_furniture = () => {
            fetchProducts();
            if (!loading) {
                let _furniture = products.filter(product => product.category === "Furniture");
                setFurniture(_furniture);
                return setPending(false);
            }
        };
        load_furniture();
    }, [products,loading,fetchProducts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader color="#009933" size="25" />
        </div>
    );

    if (_furniture.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>Sorry no Furniture Products found</p>
                <Link className="btn btn-outline-info" to={`/dashboard`}>
                    upload own product
               </Link>
            </div>
        </div>
    )

    return (
        <>
            {
                _furniture.length >= 4 && <Carousel title="Furniture" data={_furniture} card="product" />
            }
            {
                _furniture.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Furniture" data={_furniture} />
                        </div>
                        {
                            _furniture.map((product, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Furniture);