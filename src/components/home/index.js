// react
import React from 'react';
// third-party
import { Helmet } from 'react-helmet';
// blocks
import BlockTrends from '../blocks/BlockTrends';
import BlockHostels from '../blocks/BlockHostels';
import BlockPosts from '../blocks/BlockPosts';
import TabbedEvents from '../blocks/TabbedEvents';
import TabbedProducts from '../blocks/TabbedProducts';
import BlockSlideShow from '../blocks/BlockSlideShow';
// data stubs

import theme from '../../data/theme';

function Home() {

    return (
        <React.Fragment>
            <Helmet>
                <title>{`allcomrades — ${theme.name}`}</title>
            </Helmet>
            <BlockSlideShow />
            <TabbedProducts />
            <TabbedEvents />
            <BlockHostels />
            <BlockPosts />
            <BlockTrends />
        </React.Fragment>
    );
}

export default Home;
