// react
import React, { useState,useEffect } from 'react';

// third-party
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';


// pages
import Layout from './Layout';
import HomePage from './home';
import { ScaleLoader } from 'react-spinners';


const  Root = () =>  {
    
    const [loading,setLoading] = useState(true);
    useEffect(() => {
       const set_loading = () => {
           return setLoading(false);
       };
       set_loading();
    },[]);
    
    if(loading) return (
        <div className="homepage_loader_container">
            <div className="homepage_loader">
            <ScaleLoader height="35" color="#009933" width="4px" radius="2px" margin="2px" />
            </div>
        </div>
    )

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        render={(props) => (
                            <Layout {...props} homeComponent={HomePage} />
                        )}
                    />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </>
    );
    
}

Root.propTypes = {
    /** current locale */
    locale: PropTypes.string,
};

const mapStateToProps = (state) => ({
    locale: state.locale,
});

export default connect(mapStateToProps)(Root);
