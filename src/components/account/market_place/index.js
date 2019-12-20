import React from 'react';

import {Switch,Redirect,Route} from 'react-router-dom';

import MarketPlace from './MarketPlace';
import ProductPage from './Product';
import ProductForm from './ProductForm';

const IndexPage = ({match}) => {
    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
                <Switch>
                    <Redirect exact from={match.path} to={`${match.path}/products`} />
                    <Route exact path={`${match.path}/products`} component={MarketPlace} />
                    <Route exact path={`${match.path}/product/:prodId`} component={ProductPage} />
                    <Route exact path={`${match.path}/product_form`} component={ProductForm} />
                </Switch>
            </div>
        </div>
    )
};

export default IndexPage;