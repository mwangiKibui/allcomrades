import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { IoIosPhonePortrait,IoIosMailUnread } from 'react-icons/io';

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
                        Product Info
                   </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '2'
                        })}
                        onClick={() => toggle('2')}
                    >
                        Seller Info
                   </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <div className="col-12 col-md-12">
                        <p className="tab_features">Name: {data.name} hostels</p>
                        <p className="tab_features">Price: Kshs:{parseInt(data.price)}</p>
                        <p className="tab_features">Measure of quantity: Per {data.measure}</p>
                        <p className="tab_features">Description</p>
                        <p>{data.description}</p>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="col-12 col-md-12">
                        <div className="media">
                            <img className="mr-3 seller_image" src={data.organizer.profile ? data.organizer.profile : default_img} alt="" />
                            <div className="media-body">
                                <h4>Name: {data.organizer.firstname + ' ' + data.organizer.lastname}</h4>
                                <p> <IoIosMailUnread /> : {data.organizer.email}</p>
                                <p> <IoIosPhonePortrait />: {data.organizer.phone}</p>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    )
};


export default Tabs;