import React from 'react';

import {Switch,Redirect,Route} from 'react-router-dom';

import Events from './Events';
import EventsPage from './EventPage';
import EventsForm from './EventsForm';

const IndexPage = ({match}) => {
    
    return (
        <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
                  <Switch>
                      <Redirect exact from={match.path} to={`${match.path}/events`} />
                      <Route exact path={`${match.path}/events`} component={Events} />
                      <Route exact path={`${match.path}/event/:eventId`} component={EventsPage} />
                      <Route exact path={`${match.path}/event_form`} component={EventsForm} />
                  </Switch>
            </div>
        </div>
    )
};


export default IndexPage;