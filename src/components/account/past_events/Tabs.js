import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { IoIosPhonePortrait } from 'react-icons/io';

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
                        <p className="tab_features">Name: {data.name} hostels</p>
                        <p className="tab_features">Venue: {data.venue}</p>
                        <p className="tab_features">Time: {data.time}</p>
                        <p className="tab_features">Date {new Date(data.date).getDate()}</p>
                        <p>{data.description}</p>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="col-12 col-md-12">
                        <p className="tab_description">
                            Organized by {data.organizer.firstname + ' ' + data.organizer.lastname}
                        </p>
                        <p className="tab_icon">
                            <span><IoIosPhonePortrait className="tab_icon--icon" /> {data.organizer.phone}</span>
                        </p>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    )
};


export default Tabs;