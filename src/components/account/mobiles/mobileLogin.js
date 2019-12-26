import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { user_login, getUserData } from '../../../store/user';

class MobileLogin extends React.Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        loading:false,
        action: 'login',
        error: ''
    };
    componentDidUpdate(prevProps){
        if(this.props.error !== prevProps.error){
            return this.setState({
                error:this.props.error
            })
        }
    }
    onChange = e => {
        return this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit = async e => {
        e.preventDefault();
        const { user_login, message, success } = this.props;
        const { email, password } = this.state;
        this.setState({error:''});
        if (!email || !password) return this.setState({
            success: false,
            message: 'Fill out the fields'
        });
        //we send the data
        let data = {
            email, password
        }
        this.setState({loading:true});
        await user_login(data).catch(console.log);
        this.setState({loading:false});
        if (this.state.error) return this.setState({ action: 'login' });
        if (success && message) {
            localStorage.setItem('user', message);
            return this.setState({
                email: '', password: '', redirect: true, error: ''
            })
        }

    }
    render(){
    if (this.state.redirect) return <Redirect to={`/account/dashboard`} />
     return (
         <div className="d-block d-sm-none d-md-none d-lg-none col-12 d-flex" >
             <div className="card flex-grow-1 mb-md-0">
                 <div className="card-body">
                     <h3 className="card-title">Login</h3>
                     <form onSubmit={this.onSubmit}>
                         <div className="form-group">
                             {
                                 this.state.error && <p className="text-danger">
                                     {this.state.error}
                                 </p>
                             }
                         </div>
                         <div className="form-group">
                             <label htmlFor="login-email">Email address</label>
                             <input
                                 id="login-email"
                                 type="email"
                                 className="form-control"
                                 name="email"
                                 placeholder="Enter email address"
                                 value={this.state.email}
                                 onChange={this.onChange}                                 
                             />
                         </div>
                         <div className="form-group">
                             <label htmlFor="login-password">Password</label>
                             <input
                                 id="login-password"
                                 type="password"
                                 className="form-control"
                                 placeholder="Enter your Password"
                                 value={this.state.password}
                                 name="password"
                                 onChange={this.onChange}                                 
                             />
                             <small className="form-text text-muted">
                                 <Link to="/">Forgotten Password</Link>
                             </small>
                         </div>
                         <div className="form-group">
                             <input type="submit" className="btn btn-sm btn-outline-info" value={
                                 this.state.loading ? 'loading' : this.state.action
                             } />
                         </div>
                     </form>
                     <div className="text-center form_redirect_link">
                         <p>Don't an account? <Link to={`/account/signup`}>create one</Link></p>
                     </div>
                 </div>
             </div>
         </div>
     )
};
};
const mapStateToProps = state => ({
    loading: getUserData(state).loading,
    error: getUserData(state).loading
});
const dispatchToProps = {
    user_login
}
export default connect(mapStateToProps, dispatchToProps)(MobileLogin);