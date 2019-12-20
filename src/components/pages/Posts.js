import React from 'react';
import { matchPath, Link, Switch, Redirect, Route } from 'react-router-dom';
import classNames from 'classnames';


import BlockHome from '../shared/BlockHome';
import All from './posts';
import Academics from './posts/Academics';
import Entertainment from './posts/Entertainment';
import Sports from './posts/Sports';
import Technology from './posts/Technology';

const Posts = ({ match, location }) => {
    const links = [
        { title: 'All', url: 'all' },
        { title: 'Academics', url: 'academics' },
        { title: 'Entertainment', url: 'entertainment' },
        { title: 'Sports', url: 'sports' },
        { title: 'Technology', url: 'technology' }
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
            <BlockHome link={`/posts`} name="Posts" />
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3 d-flex">
                        <div className="account-nav flex-grow-1">
                            <h4 className="account-nav__title">Posts</h4>
                            <ul>{links}</ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 col-lg-9">
                        <Switch>
                            <Redirect exact from={match.path} to={`${match.path}/all`} />
                            <Route exact path={`${match.path}/all`} component={All} />
                            <Route exact path={`${match.path}/academics`} component={Academics} />
                            <Route exact path={`${match.path}/entertainment`} component={Entertainment} />
                            <Route exact path={`${match.path}/sports`} component={Sports} />
                            <Route exact path={`${match.path}/technology`} component={Technology} />
                        </Switch>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Posts;