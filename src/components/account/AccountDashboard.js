// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// data stubs

import theme from '../../data/theme';


export default function AccountPageDashboard() {    

    return (
        <div className="dashboard">
            <Helmet>
                <title>{`My Account — ${theme.name}`}</title>
            </Helmet>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        <img src="images/avatars/avatar-3.jpg" alt="" />
                    </div>
                    <div className="profile-card__name">Kennedy mwangi</div>
                    <div className="profile-card__email">kenny@allcomrades.co.ke</div>
                    <div className="profile-card__edit">
                        <Link to="profile" className="btn btn-secondary btn-sm">Edit Profile</Link>
                    </div>
                </div>
            </div>
            <div className="dashboard__address card address-card address-card--featured">
                <div className="address-card__badge">Personal details</div>
                <div className="address-card__body">
                    <div className="address-card__row">
                        <div className="address-card__row-title">Name</div>
                        <div className="address-card__row-content">Kennedy mwangi</div>
                    </div>
                    
                    <div className="address-card__row">
                        <div className="address-card__row-title">Phone Number</div>
                        <div className="address-card__row-content">0791569999</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Email Address</div>
                        <div className="address-card__row-content">mwangikibui@zoho.com</div>
                    </div>
                    <div className="address-card__footer">
                        <Link to="/account/profile">Edit  Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
