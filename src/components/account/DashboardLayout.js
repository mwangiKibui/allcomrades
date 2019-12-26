// react
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
// third-party
import classNames from 'classnames';
import {
    Link,
    matchPath,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom';
import {fetchUser,getUserData} from '../../store/user';


// pages
import BlockHome from '../shared/BlockHome';
import AccountPageDashboard from './AccountDashboard';
import AccountPagePassword from './AccountPassword';
import AccountPageProfile from './AccountProfile';
import UpcomingEvents from './upcoming_events';
import PastEvents from './past_events';
import MarketPlace from './market_place';

const AccountLayout = ({match,location,loading,user,fetchUser}) => {
    const [pending,setPending] = useState(true);
    const [setUser] = useState({});
    const [redirect,setRedirect] = useState(false);
    useEffect(() => {
       const load_user = () => {
             fetchUser();
             if(!loading){
                 if(!user) {
                   setPending(false);
                   return setRedirect(true);
                 }
                 setUser(user);
                 return setPending(false);
             }
       };
       load_user();
    },[user,loading,fetchUser,setUser]);
    const links = [
        { title: 'Dashboard', url: 'dashboard' },
        { title: 'Edit Profile', url: 'profile' },
        { title: 'Upcoming events', url: 'upcoming' },
        { title: 'Past events', url: 'past' },
        { title: 'MarketPlace', url: 'mp' },
        { title: 'Logout', url: 'login' },
    ].map((link) => {
        const url = `${match.url}/${link.url}`;
        const isActive = matchPath(location.pathname, { path: url });
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });

        return (
            <li key={link.url} className={classes}>
                <Link to={url}>{link.title}</Link>
            </li>
        );
    });
    if(redirect) return <Redirect to={`/account/login`} />
    return (
        <React.Fragment>
            <section className="account">
            <BlockHome name="Account" link={'/account'} />
            {
                pending ? (
                    <div className="text-center">
                        <ClipLoader size="25" color="#009933" />
                    </div>
                ) : (
            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">User Dashboard</h4>
                                <ul>{links}</ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                            <Switch>
                                <Redirect exact from={match.path} to={`${match.path}/dashboard`} />
                                <Route exact path={`${match.path}/dashboard`} component={AccountPageDashboard} />
                                <Route exact path={`${match.path}/profile`} component={AccountPageProfile} />
                                <Route exact path={`${match.path}/forgot_password`} component={AccountPagePassword} />
                                <Route path={`${match.path}/upcoming`} component={UpcomingEvents} />
                                <Route path={`${match.path}/past`} component={PastEvents} />
                                <Route path={`${match.path}/mp`} component={MarketPlace} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
            )}
            </section>
        </React.Fragment>
    );
}
const mapStateToProps = state => ({
    loading:getUserData(state).loading,
    user:getUserData(state).user
});
const dispatchToProps = {
    fetchUser
};
export default connect(mapStateToProps,dispatchToProps)(AccountLayout);