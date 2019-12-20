import React from 'react';

import Blockbg from '../images/karu_2.jpg';
import PageHeader from './PageHeader';


const BlockHome = ({link,name}) => {
    const breadcrumbs = [
        {title:'Home',url:'/'},
        {title:name,url:link}
    ];

    return (
    <div className="block_home" style={{backgroundImage:`url(${Blockbg})`}}>

            <div className="block_home-overlay text-center">
            <div className="block_home-content ">
                <PageHeader breadcrumb={breadcrumbs} />
            </div>
        </div>

    </div>
    )
};


export default BlockHome;