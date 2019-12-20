import  React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {user_login,getUserData} from '../../../store/user';

class DesktopLogin extends React.Component {
    state = {
        email:'',
        password:'',
        redirect:false,
        action:'login',
        error:''
    };
    onChange = e => {
        return this.setState({
            [e.target.name]:e.target.value
        })
    };
    onSubmit = e => {
        e.preventDefault();
        const {loading,error,user_login,message,success} = this.props;
        const {email,password} = this.state;
        if(!email || !password) return this.setState({
            success:false,
            message:'Fill out the fields'
        });
        //we send the data
        let data = {
            email,password
        }
        user_login(data);
        if(loading) this.setState({action:'loading'});
        if(error) return this.setState({error,action:'login'});
        if(success && message) {
            localStorage.removeItem('user');
            localStorage.setItem('user',message);
            return this.setState({
              email:'',password:'',redirect:true,error:''
            })
        }
    
    }
    render(){
    if(this.state.redirect) return <Redirect to={`/account/dashboard`} />
    return (
        <div className="d-none d-sm-block d-md-block d-lg-block col-md-12" >
            <div className="flex_container">
                <div className="flex_container_content">
                    <div className="card flex-grow-1 mb-md-0">
                        <div className="card-body">
                            <h3 className="card-title">Login</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login-email">Email address</label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="login-password">Password</label>
                                    <input
                                        id="login-password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                    />
                                    <small className="form-text text-muted">
                                        <Link to="/">Forgotten Password</Link>
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-sm btn-outline-info" value={this.state.action} />
                                </div>
                                </form>
                                <div className="text-center form_redirect_link">
                                     <p>Don't an account? <Link to={`/account/signup`}>create one</Link></p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
};
const mapStateToProps = state => ({
    loading:getUserData(state).loading,
    error:getUserData(state).loading
});
const dispatchToProps = {
     user_login
}
export default connect(mapStateToProps,dispatchToProps)(DesktopLogin);