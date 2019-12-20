import React from 'react';
import {matchPath,Link,Switch,Redirect,Route} from 'react-router-dom';
import classNames from 'classnames';


import BlockHome from '../shared/BlockHome';
import All from './events';
import Cu from './events/Cu';
import School from './events/School';
import Students from './events/Students';
import Ycs from './events/Ycs';

const Events = ({match,location}) => {
    const links = [
        {title:'All',url:'all'},
        {title:'Cu',url:'cu'},
        {title:'Ycs',url:'ycs'},
        {title:'School',url:'school'},
        {title:'Students',url:'students'}
    ].map((link) => {
        const url = `${match.url}/${link.url}`;
        //match the location.pathname and the url,, i love this
        const isActive = matchPath(location.pathname,{path:url});
        const classes = classNames('account-nav__item',{
            'account-nav__item--active':isActive
        });
        return (
            <li key={link.url} className={classes}>
                <Link to={link.url}>{link.title}</Link>
            </li>
        )
    });

    return (
        <section className="events">
          <BlockHome link={`/events`} name="Events"/>
          <div className="container">
              <div className="row">
                    <div className="col-12 col-lg-3 d-flex">
                        <div className="account-nav flex-grow-1">
                            <h4 className="account-nav__title">Event types</h4>
                            <ul>{links}</ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-9 col-lg-9">
                         <Switch>
                             <Redirect exact from={match.path} to={`${match.path}/all`} />
                             <Route exact path={`${match.path}/all`} component={All} />
                             <Route exact path={`${match.path}/cu`} component={Cu} />
                             <Route exact path={`${match.path}/ycs`} component={Ycs} />
                             <Route exact path={`${match.path}/school`} component={School} />
                             <Route exact path={`${match.path}/students`} component={Students} />
                         </Switch>
                    </div>
              </div>
          </div>
        </section>
    )
};

export default Events;