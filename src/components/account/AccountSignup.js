// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet';

// application
import BlockHome from '../shared/BlockHome';
import MobileSignup from './mobiles/mobileSignup';
import DesktopSignup from './desktops/DesktopSignup';
// data stubs
import theme from '../../data/theme';


class AccountPageSignup  extends React.Component {
    state = {
          firstname:'',
          lastname:'',
          email:'',
          phone:'',
          password:'',
          action:'create account',
          error:''
    };
    onChange = e => {
        return this.setState({
            [e.target.name] : e.target.value
        })
    };
    onSubmit = e => {
        e.preventDefault();
    }
    render(){
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Login — ${theme.name}`}</title>
            </Helmet>
            <section className="account_login">
                <BlockHome link={'/account_login'} name="Signup" />
                <div className="block">
                    <div className="container">
                        <div className="row"> 
                        {/** for mobile */}
                        <MobileSignup state={this.state } onChange={this.onChange} onSubmit={this.onSubmit}/>                        
                        {/** for laptop */}
                        <DesktopSignup state={this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>
                </div>
            </div>
        </div>
    </section>
</React.Fragment>
);
}};
export default AccountPageSignup;