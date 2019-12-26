import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {Link} from 'react-router-dom';

//assets
import {fetchProducts,getMpData} from '../../../store/market_place';
import Carousel from '../../shared/Carousel';
import ProductCard from '../../shared/ProductCard';
import BlockHeader from '../../shared/BlockHeader';

const FoodVegs = ({loading,products,fetchProducts}) => {

    const [pending,setPending] = useState(true);
    const [_food_vegs,setFoodVegs] = useState([]);
    useEffect(() => {
        const load_food_vegs = () => {
               fetchProducts();
               if(!loading){
                   let _fvgs = products.filter(product => product.category === "Food and Vegatables");
                   setFoodVegs(_fvgs);
                   return setPending(false);
               }
        };
        load_food_vegs();
    },[products,loading,fetchProducts]);

    if(pending) return (
        <div className="text-center">
            <ClipLoader color="#009933" size="25" />
        </div>
    );

    if(_food_vegs.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>Sorry no Food and Vegetables Products found</p>
                <Link className="btn btn-outline-info" to={`/dashboard`}>
                    upload own product
               </Link>
            </div>
        </div>
    )

    return (
        <>
            {
                _food_vegs.length >= 4 && <Carousel title="Food and Vegetables" data={_food_vegs} card="product" />
            }
            {
                _food_vegs.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Food and Vegetables" data={_food_vegs} />
                        </div>
                        {
                            _food_vegs.map((product, index) => (
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

export default connect(mapStateToProps,dispatchToProps)(FoodVegs);