import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUserData,user_signup} from '../../../store/user';

class DesktopSignup extends React.Component {
    state = {
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        password:'',
        message:'',
        error:'',
        action:'create account'
    };
    onChange = e => {
        return this.setState({
            [e.target.name] : e.target.value
        })
    };
    onSubmit = e => {
        e.preventDefault();
        const {firstname,lastname,email,phone,password} = this.state;
        const {loading,error,success,message,user_signup} = this.props;


        if(!firstname || !lastname || !email || !phone || !password) return this.setState({
            error:'Fill out all the fields'
        });
        //send the data
        const data = {firstname,lastname,email,phone,password};
        user_signup(data);
        if(loading) this.setState({action:'loading'});
        if(error) return this.setState({action:'create account',error});
        if(success && message) return this.setState({
           firstname:'',lastname:'',email:'',phone:'',password:'',message,error:''
        });
    }
    render(){
    return (
        <div className="d-none d-sm-block d-lg-block d-md-block col-sm-12 col-md-12 mt-4 mt-md-0">
            <div className="flex_container">
            <div className="flex_container_content">
            <div className="card flex-grow-1 mb-0">
                <div className="card-body">
                    <h3 className="card-title">Register</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">Firstname</label>
                            <input
                                id="firstname"
                                type="text"
                                className="form-control"
                                placeholder="Enter Firstname"
                                name="firstname"
                                onChange={this.onChange}
                                value={this.state.firstname}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Lastname</label>
                            <input
                                id="lastname"
                                type="text"
                                className="form-control"
                                placeholder="Enter Lastname"
                                name="lastname"
                                onChange={this.onChange}
                                value={this.state.lastname}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Email address</label>
                            <input
                                id="register-email"
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                type="text"
                                className="form-control"
                                placeholder="+254X XXX XXX"
                                name="phone"
                                onChange={this.onChange}
                                value={this.state.phone}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-confirm">Password</label>
                            <input
                                id="register-confirm"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-outline-success" value={this.state.action} />
                        </div>
                    </form>
                    <div className="text-center form_redirect_link">
                        <p>Already have an account? <Link to={`/account/login`}>login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>    
)};
};
const mapStateToProps = state => ({
    loading:getUserData(state).loading,
    error:getUserData(state).error,
    success:getUserData(state).success,
    message:getUserData(state).message
});
const dispatchToProps = {
    user_signup
}
export default connect(mapStateToProps,dispatchToProps)(DesktopSignup);