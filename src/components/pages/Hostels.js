import React from 'react';
import { matchPath, Link, Switch, Redirect, Route } from 'react-router-dom';
import classNames from 'classnames';


import BlockHome from '../shared/BlockHome';
import All from './hostels';
import Kagochi from './hostels/Kagochi';
import Km from './hostels/1km';
import Kawanjiru from './hostels/Kawanjiru';
import Sansiro from './hostels/Sansiro';
import Tonnes from './hostels/Tonnes';

const Hostels = ({ match, location }) => {
    const links = [
        { title: 'All', url: 'all' },
        { title: 'Kagochi', url: 'kagochi' },
        { title: '1Km', url:'km'},
        { title: 'Kawanjiru', url: 'kawanjiru' },
        { title: 'Sansiro', url: 'sansiro' },
        { title: 'Tonnes', url: 'tonnes' }
    ].map((link) => {
        const url = `${match.url}/${link.url}`;
        //match the location.pathname and the url,, i love this
        const isActive = matchPath(location.pathname, { path: url });
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive
        });
        return (
            <li key={link.url} className={classes}>
                <Link to={link.url}>{link.title}</Link>
            </li>
        )
    });

    return (
        <section className="posts">
            <BlockHome link={`/hostels`} name="Hostels" />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3 d-flex">
                        <div className="account-nav flex-grow-1">
                            <h4 className="account-nav__title">Hostels</h4>
                            <ul>{links}</ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 col-lg-9">
                        <Switch>
                            <Redirect exact from={match.path} to={`${match.path}/all`} />
                            <Route exact path={`${match.path}/all`} component={All} />
                            <Route exact path={`${match.path}/kagochi`} component={Kagochi} />
                            <Route exact path={`${match.path}/km`} component={Km} />
                            <Route exact path={`${match.path}/kawanjiru`} component={Kawanjiru} />
                            <Route exact path={`${match.path}/sansiro`} component={Sansiro} />
                            <Route exact path={`${match.path}/tonnes`} component={Tonnes} />
                        </Switch>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Hostels;