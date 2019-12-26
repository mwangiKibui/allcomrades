// react
import React from 'react';
import {connect} from 'react-redux';
// third-party
import { Helmet } from 'react-helmet';

// data stubs
import theme from '../../data/theme';
import {getUserData,update_user_details} from '../../store/user';

class AccountPageProfile extends React.Component {
    state = {
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        error:'',
        loading:false,
        action:'update'
    };

    componentDidMount(){
        const {firstname,lastname,email,phone} = this.props.user;
        return this.setState({
            firstname,lastname,email,phone
        });
    };

    

    // componentDidUpdate(prevProps){
    //     if(this.props.user !== prevProps.user){
    //         return this.setState({
    //             firstname:this.props.user.firstname,
    //             lastname:this.props.user.lastname,
    //             email:this.props.user.email,
    //             phone:this.props.user.phone
    //         })
    //     }
    // }

    onChange = e => {
        return this.setState({
            [e.target.name] : e.target.value
        })
    };

    onSubmit = async e => {
         e.preventDefault();
         this.setState({error:''});
         const {firstname,lastname,email,phone} = this.state;
         const {update_user_details,user} = this.props;
         if(!firstname || !lastname || !email || !phone) return this.setState({
             error:'Fill out all the fields'
         });
         //we send the data
         const data = {firstname,lastname,email,phone};
         this.setState({loading:true});
         await update_user_details(data,user['_id']).catch(console.log);
         this.setState({loading:false});                  
    };

    render(){
    return (
        <div className="card">
            <Helmet>
                <title>{`Profile — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>Edit Profile</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            {
                                this.state.error && <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-first-name">First Name</label>
                            <input
                                id="profile-first-name"
                                type="text"
                                className="form-control"
                                name="firstname"
                                onChange={this.onChange}
                                value={this.state.firstname}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-last-name">Last Name</label>
                            <input
                                id="profile-last-name"
                                type="text"
                                className="form-control"
                                name="lastname"
                                onChange={this.onChange}
                                value={this.state.lastname}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-email">Email Address</label>
                            <input
                                id="profile-email"
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-phone">Phone Number</label>
                            <input
                                id="profile-phone"
                                type="text"
                                className="form-control"
                                name="phone"
                                onChange={this.onChange}
                                value={this.state.phone}
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <input type="submit" className="btn btn-outline-info" value={
                                this.state.loading ? 'updating' : this.state.action
                            } />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}};
const mapToProps = state => ({
    user:getUserData(state).user
});
const dispatchToProps = {
    update_user_details
}
export default connect(mapToProps,dispatchToProps)(AccountPageProfile);