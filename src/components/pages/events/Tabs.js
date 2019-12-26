import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import default_img from '../../images/logo.png';

const Tabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '1'
                        })}
                        onClick={() => toggle('1')}
                    >
                        Description
                   </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '2'
                        })}
                        onClick={() => toggle('2')}
                    >
                        Organizer info
                   </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <div className="col-12 col-md-12">
                        <p className="tab_features">Name: {data.name}</p>
                        <p className="tab_features">Venue: {data.venue}</p>
                        <p className="tab_features">Time of event: {data.time}</p>
                        <p className="tab_features">Date: {new Date(data.date).toLocaleDateString()}</p>
                        <p className="tab_title">Event description</p>
                        <p className="tab_text">{data.description}</p>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="media">
                        <img src={
                            data.organizer.profile ? data.organizer.profile : default_img
                        } className="mr-3 tabs_organizer_img" alt={data.organizer.firstname} />
                        <div className="media-body tabs_organizer_info">
                            <h4 className="media-heading">{data.organizer.firstname + ' ' + data.organizer.lastname}</h4>
                            <p className="media-text">{data.organizer.email}</p>
                            <p className="media-text">{data.organizer.phone}</p>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    )
};


export default Tabs;