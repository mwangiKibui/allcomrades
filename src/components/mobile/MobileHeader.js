// react
import React, { Component } from 'react';

// third-party
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import {
    Menu18x14Svg,
} from '../../svg';
import { mobileMenuOpen } from '../../store/mobile-menu';


class MobileHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    render() {
        const { openMobileMenu} = this.props;
        //some configurations here for scroll

        return (
            <div className="mobile-header">
                <div className="mobile-header__panel">
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button" className="mobile-header__menu-button" onClick={openMobileMenu}>
                                <Menu18x14Svg />
                            </button>
                            <Link to="/" className="mobile-header__logo">allcomrades</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    openMobileMenu: mobileMenuOpen,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MobileHeader);
