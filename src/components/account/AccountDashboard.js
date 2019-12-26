// react
import React, { useState,useEffect} from 'react';
import {connect} from 'react-redux';
// third-party
import { Helmet } from 'react-helmet';
import { Link,Redirect } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
// data stubs

import theme from '../../data/theme';
import {getUserData,update_profile} from '../../store/user';
import default_img from '../images/logo.png'

const AccountPageDashboard = ({user,update_profile}) => {    
    const [loading,setLoading] = useState(false);
    const [profile,setProfile] = useState(user.profile);

    useEffect(() => {
          const load_data = () => {
                if(user === null) return <Redirect to={`/account/login`} />
                else{
                    return;
                }
          };
          load_data();
    },[user])
    
    const onChange = async e => {
        const data = new FormData();
        data.append('profile',e.target.files[0]);
        setLoading(true);
        await update_profile(data,user['_id']).catch(console.log);
        setLoading(false);
        setProfile(user['profile'])
    }

    return (
        <div className="dashboard">
            <Helmet>
                <title>{`My Account — ${theme.name}`}</title>
            </Helmet>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        {
                            profile ? <img src={`${profile}`} alt="" /> : <img src={default_img} alt="" />
                        }                        
                    </div>
                    <div className="profile-card__name">{`${user.firstname} ${user.lastname}`}</div>
                    <div className="profile-card__email">{`${user.email}`}</div>
                    <div className="profile-card__edit">
                        <form>
                           <div className="form-group">
                               <label htmlFor="update_profile">
                                    <Link to="profile" className="btn btn-secondary btn-sm">Edit Profile</Link>
                               </label>
                               <input type="file"
                               style={{display:"none"}}
                               className="form-control"
                               name="profile"
                               onChange={onChange}
                               />
                           </div>
                           {
                               loading && (
                                   <div className="form-group text-center">
                                     <ClipLoader size="25" color="#009933" /> 
                                   </div>
                               )
                           }
                        </form>
                        
                    </div>
                </div>
            </div>
            <div className="dashboard__address card address-card address-card--featured">
                <div className="address-card__badge">Personal details</div>
                <div className="address-card__body">
                    <div className="address-card__row">
                        <div className="address-card__row-title">Name</div>
                        <div className="address-card__row-content">{`${user['firstname']} ${user['lastname']} `}</div>
                    </div>
                    
                    <div className="address-card__row">
                        <div className="address-card__row-title">Phone Number</div>
                        <div className="address-card__row-content">{user['phone']}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">Email Address</div>
                        <div className="address-card__row-content">{user['email']}</div>
                    </div>
                    <div className="address-card__footer">
                        <Link to="/account/profile">Edit  Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapToProps = (state) => ({
    user:getUserData(state).user
});
const dispatchToProps = {
    update_profile
}
export default connect(mapToProps,dispatchToProps)(AccountPageDashboard);