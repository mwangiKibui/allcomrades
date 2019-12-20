// react
import React from 'react';

const  FooterSocial = ()  => {
    const socialLinks = [
        {
            key: 'facebook',
            url: 'www.facebook.com',
            iconClass: 'fab fa-facebook-f',
        },
        {
            key: 'twitter',
            url: 'www.twitter.com',
            iconClass: 'fab fa-twitter',
        },
        {
            key: 'youtube',
            url: 'www.youtube.com',
            iconClass: 'fab fa-youtube',
        },
        {
            key: 'instagram',
            url: 'www.instagram.com',
            iconClass: 'fab fa-instagram',
        }
    ];

    const socialLinksList = socialLinks.map((item) => (
        <li key={item.key} className={`footer-newsletter__social-link footer-newsletter__social-link--${item.key}`}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
                <i className={item.iconClass} />
            </a>
        </li>
    ));

    return (
        <div className="site-footer__widget footer-newsletter">
            <h5 className="footer-newsletter__title">Social Media</h5>
            <div className="footer-newsletter__text footer-newsletter__text--social">
                Follow us on social networks
            </div>
            <ul className="footer-newsletter__social-links">
                {socialLinksList}
            </ul>
        </div>
    );
}
export default FooterSocial;