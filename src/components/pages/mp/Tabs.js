import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

//before the default
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
                        Product features and Description
                   </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '2'
                        })}
                        onClick={() => toggle('2')}
                    >
                        Seller info
                   </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <div className="col-12 col-md-12">
                        <p className="tab_features"><span className="badge badge-danger">{data.type}</span></p>
                        <p className="tab_features">Name: {data.name}</p>
                        <p className="tab_features">price: Kshs {parseInt(data.price).toLocaleString()}</p>
                        <p className="tab_features">Measure of quantity: {data.measure_of_quantity}</p>
                        
                        <p className="tab_features">Date Uploaded: {new Date(data.uploadedAt).toLocaleDateString()}</p>
                        <p className="tab_title">Product Description</p>
                        <p className="tab_text">{data.description}</p>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="col-12 col-md-12">
                        {/** for events and products where we are using tabs we shall show the seller or organizer as tab */}
                        <div className="media">
                            <img src={
                                data.seller.profile ? data.seller.profile : default_img
                            } className="mr-3 tabs_seller_img" alt={data.seller.firstname} />
                            <div className="media-body tabs_seller_info">
                                <h4 className="media-heading">{data.seller.firstname + ' ' + data.seller.lastname }</h4>
                                <p className="media-text">{data.seller.email}</p>
                                <p className="media-text">+{data.seller.phone}</p>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    )
};


export default Tabs;