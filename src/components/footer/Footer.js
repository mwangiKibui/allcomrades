// react
import React from 'react';

// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';


export default function Footer() {
    const informationLinks = [
        { title: 'About Us', url: '/about_us' },
    ];

    const quick_links = [
        { title: 'Market Place', url: '/market_place' },
        { title: 'Events', url: '/events' },
        { title: 'Hostels', url: '/hostels' },
        { title: 'Blog', url: '/posts' }
    ];

    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Information" items={informationLinks} />
                        </div>
                        <div className="col-6 col-md-3 col-lg-2">
                            <FooterLinks title="Quick links" items={quick_links} />
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterSocial />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        <span>@{new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
