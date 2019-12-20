import React,{useState,useEffect} from 'react';
// third-party
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {Link} from 'react-router-dom';
// application
import BlockHeader from '../shared/BlockHeader';
import HostelCard from '../shared/HostelCard';
import {fetchHostels,getHostelsData} from '../../store/hostels'
//this shall be the layout of hostels

const BlockHostels = ({loading,hostels,fetchHostels,layout}) => {
    const [pending,setPending] = useState(true);
    const [_hostels,setHostels] = useState([]);
    let display_hostels;

    useEffect(() => {
       const load_hostels = () => {
           fetchHostels();
           if(!loading) {
               setHostels(hostels.slice(0,4));
               return setPending(false);
           }
       };
       load_hostels();
    },[loading]);

    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );
    if(_hostels.length === 0) return (
        <p>No hostels uploaded yet</p>
    );    
    if (_hostels.length > 0) {
        const hostelList = _hostels.map((hostel, index) => (
            <div key={index} className="col-12 col-sm-3 col-md-3">
                <HostelCard data={hostel} />
            </div>
        ));

        display_hostels = (
            <div className="row">
                {hostelList}
                <div className="col-12 col-sm-12 col-md-12 text-center">
                    <Link className="btn btn-outline-success" to={`/hostels`}>
                        explore {hostels.length} hostels
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`block block-products block-products--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={'Sorrounding Hostels'} />

                <div className="block-products__body">
                    {
                        display_hostels
                    }
                </div>
            </div>
        </div>
    );
}

BlockHostels.propTypes = {
    hostels: PropTypes.array,
    loading:PropTypes.bool,
    layout: PropTypes.oneOf(['large-first', 'large-last']),
};

BlockHostels.defaultProps = {
    hostels: [],
    layout: 'large-first',
};
const mapStateToProps = state => ({
    loading:getHostelsData(state).loading,
    hostels:getHostelsData(state).hostels
});
const dispatchStateToProps = {
    fetchHostels
};
export default connect(mapStateToProps,dispatchStateToProps)(BlockHostels);