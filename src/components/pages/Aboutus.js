import React from 'react';

import BlockHome from '../shared/BlockHome';

const Aboutus = () => {
    return (
        <section className="about_us">
          <BlockHome name={'about us'} link={'/about_us'} />
          <div className="container">
              <div className="row">
                  <p>we shall make up for this</p>
              </div>
          </div>
        </section>
    )
};

export default Aboutus;