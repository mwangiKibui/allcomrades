// react
import React from 'react';

// third-party
import classNames from 'classnames';
import {connect} from 'react-redux';

// application
import MobileLinks from './MobileLinks';
import { Cross20Svg } from '../../svg';
import { currencyChange } from '../../store/currency';

import { mobileMenuClose } from '../../store/mobile-menu';

// data stubs
import mobileMenuLinks from '../../data/mobileMenu';


function MobileMenu(props) {
    const {
        mobileMenuState,
        closeMobileMenu,
    } = props;

    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenuState.open,
    });

    

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">Menu</div>
                    <button type="button" className="mobilemenu__close" onClick={closeMobileMenu}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={mobileMenuLinks}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    mobileMenuState: state.mobileMenu,
});

const mapDispatchToProps = {
    closeMobileMenu: mobileMenuClose,
   
    changeCurrency: currencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
