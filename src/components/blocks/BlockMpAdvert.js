import React from 'react';
import {Link} from 'react-router-dom';

import mp_advert from '../images/mp_advert.jpg';

const MpAdvert = () => {
    return (
        <section className="mp_advert">
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                    <img src={mp_advert} alt="mpadvert" className="mp_advert--image" />
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="mp_advert--content">
                        <h4 className='mp_advert--heading'>Scale up your market today</h4>
                        <p className='mp_advert--subtitle'>
                            Post your products to reach out to all students in the platform at no cost.
                        </p>
                        <Link to={'/account/mp/product_form'} className="btn btn-outline-info">
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
};

export default MpAdvert;