import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {Link} from 'react-router-dom';

//assets
import {fetchProducts,getMpData} from '../../../store/market_place';
import Carousel from '../../shared/Carousel';
import ProductCard from '../../shared/ProductCard';
import BlockHeader from '../../shared/BlockHeader';

const IndexPage = ({loading,products,fetchProducts}) => {
    const [pending,setPending] = useState(true);
    const [_products,setProducts] = useState([]);
    useEffect(() => {
          const load_products = () => {
               fetchProducts();
               if(!loading) {
                   setProducts(products);
                   return setPending(false);
               }
          };
          load_products();
    },[products,loading,fetchProducts]);
    
    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if(_products.length === 0) return (
       <div className="col-12 col-md-12 text-center">
           <div className="page_message">
               <p>Sorry no Products found</p>
               <Link className="btn btn-outline-info" to={`/dashboard`}>
                   upload own product
               </Link>
           </div>
       </div>
    );

    return (
        <>
        {
            _products.length >= 4  && <Carousel title="All Products" data={_products} card="product" />
        }
        {
            _products.length < 4 && (
                <div className="row">
                    <div className="col-12 col-md-12">
                    <BlockHeader title="All Products" data={_products} />
                    </div>
                    {
                       _products.map((product,index) => (
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
    loading:getMpData(state).loading,
    products:getMpData(state).products
});

const dispatchToProps = {
    fetchProducts
}

export default connect(mapStateToProps,dispatchToProps)(IndexPage);