import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Hostels = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_hostels, setHostels] = useState([]);
    useEffect(() => {
        const load_hostels = () => {
            fetchHostels();
            if (!loading) {
                setHostels(hostels);
                return setPending(false);
            }
        };
        load_hostels();
    }, [hostels]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_hostels.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _hostels.length >= 4 && <Carousel title="All Hostels" card="hostels" data={_hostels} />
            }
            {
                _hostels.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="All Hostels" data={_hostels} />
                        </div>
                        {
                            _hostels.map((hostel, index) => (
                                <div className="col-12 col-sm-3" key={index}>
                                    <HostelCard data={hostel} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
};

const mapStateToProps = state => ({
    loading: getHostelsData(state).loading,
    hostels: getHostelsData(state).hostels
});
const dispatchToProps = {
    fetchHostels
};

export default connect(mapStateToProps, dispatchToProps)(Hostels);