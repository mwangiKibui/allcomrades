import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { user_login, getUserData } from '../../../store/user';

class DesktopLogin extends React.Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        action: 'login',
        loading: false,
        error: ''
    };
    //lifecycle method
    componentDidUpdate(prevProps){
       //always must compare the props
       if(this.props.error !== prevProps.error){
           this.setState({error:this.props.error})
       };
       
    }
    onChange = e => {
        return this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = async e => {
        e.preventDefault();
        const {user_login, message, success } = this.props;
        const { email, password } = this.state;
        this.setState({error:''});
        if (!email || !password) return this.setState({
            success: false,
            error: 'Fill out the fields'
        });
        //we send the data
        let data = {
            email, password
        };
        this.setState({ loading: true});
        await user_login(data).catch(console.log);
        this.setState({ loading: false });
        if (this.state.error) return this.setState({ action: 'login' });
        if (success && message) {
            localStorage.setItem('user', message);
            return this.setState({
                email: '', password: '', error: '', redirect:true
            });            
        }

    }
    render() {
        if(this.state.redirect) return <Redirect to={'/account/dashboard'} />
        return (
            <div className="d-none d-sm-block d-md-block d-lg-block col-md-12" >
                <div className="flex_container">
                    <div className="flex_container_content">
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
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
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
                </div>
            </div>
        )
    };
};
const mapStateToProps = state => ({
    loading: getUserData(state).loading,
    error: getUserData(state).error,
    success: getUserData(state).success,
    message: getUserData(state).message
});
const dispatchToProps = {
    user_login
}
export default connect(mapStateToProps, dispatchToProps)(DesktopLogin);