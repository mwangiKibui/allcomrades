// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import AppLink from '../shared/AppLink';
import Collapse from '../shared/Collapse';


function MobileLinks(props) {
    const { links, level } = props;

    const linksList = links.map((link, index) => {
        let item;

        if (link.type === 'link' || link.type === 'button') {
            item = (
                <Collapse
                    toggleClass="mobile-links__item--open"
                    render={({ toggle, setItemRef, setContentRef }) => {
                        
                        let linkOrButton;                  

                        if (link.type === 'link') {
                            linkOrButton = (
                                <AppLink
                                    to={link.url}
                                    className="mobile-links__item-link"
                                >
                                    {link.label}
                                </AppLink>
                            );
                        } else {
                            linkOrButton = (
                                <button
                                    type="button"
                                    className="mobile-links__item-link"
                                >
                                    {link.label}
                                </button>
                            );
                        }

                        return (
                            <div className="mobile-links__item" ref={setItemRef}>
                                <div className="mobile-links__item-title">
                                    {linkOrButton}
                                </div>
                            </div>
                        );
                    }}
                />
            );
        } else if (link.type === 'divider') {
            item = <div className="mobile-links__divider" />;
        }

        return <li key={index}>{item}</li>;
    });

    return (
        <ul className={`mobile-links mobile-links--level--${level}`}>
            {linksList}
        </ul>
    );
}

MobileLinks.propTypes = {
    links: PropTypes.array,
    level: PropTypes.number,
    onItemClick: PropTypes.func,
};

MobileLinks.defaultProps = {
    links: [],
    level: 0,
};

export default MobileLinks;
