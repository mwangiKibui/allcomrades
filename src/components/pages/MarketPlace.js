import React from 'react';
import {matchPath,Link,Route,Switch,Redirect} from 'react-router-dom';
import classNames from 'classnames';

import BlockHome from '../shared/BlockHome';
import Clothing from './mp/Clothing';
import Electronics from './mp/Electronics';
import FoodVegs from './mp/Food_Vegs';
import Furniture from './mp/Furniture';
import All from './mp';

const MarketPlace = ({match,location}) => {
    
    const links = [
        {title:'All',url:'all'},
        {title:'Food and Vegetables',url:'food_vegs'},
        {title:'Electronics',url:'electronics'},
        {title:'Furniture',url:'furniture'},
        {title:'Clothing',url:'clothing'}
    ].map((link) => {
        //define some vars
        const url = `${match.url}/${link.url}`;
        const isActive = matchPath(location.pathname,{path:url});
        const classes = classNames('account-nav__item',{
            'account-nav__item--active':isActive
        });
        return(
        <li key={link.url} className={classes}>
                <Link to={url}>{link.title}</Link>
        </li>
        )
    });
    return (
        <section className="market_place">  
            <BlockHome link={'/market_place'} name="Market Place" />         
            <div className="container">
                <div className="row">                    
                    <div className="col-12 col-lg-3 d-flex">
                        <div className="account-nav flex-grow-1">
                            <h4 className="account-nav__title">Categories</h4>
                            <ul>{links}</ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-9 col-md-9">
                         <Switch>
                             <Redirect exact from={match.path} to={`${match.path}/all`} />
                             <Route exact path={`${match.path}/all`} component={All} />
                             <Route exact path={`${match.path}/food_vegs`} component={FoodVegs} />
                             <Route exact path={`${match.path}/electronics`} component={Electronics} />
                             <Route exact path={`${match.path}/clothing`} component={Clothing} />
                             <Route exact path={`${match.path}/furniture`} component={Furniture} />
                         </Switch>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default MarketPlace;