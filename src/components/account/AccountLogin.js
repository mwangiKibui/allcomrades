// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet';

// application
import BlockHome from '../shared/BlockHome';
import MobileLogin from './mobiles/mobileLogin';
import DesktopLogin from './desktops/DesktopLogin';
// data stubs
import theme from '../../data/theme';


class AccountPageLogin extends React.Component {   
        render(){
        return (
        <React.Fragment>
            <Helmet>
                <title>{`Login — ${theme.name}`}</title>
            </Helmet>
            <section className="account_login">
            <BlockHome link={'/account_login'} name="Login or Signup" />
            <div className="block">
                <div className="container">
                <div className="row">
                {/** for mobile devices */}
                <MobileLogin/>
                {/** for desktop devices */}
                <DesktopLogin/>                                                
                </div>
            </div>
        </div>
    </section>
</React.Fragment>
);
}};
export default AccountPageLogin;