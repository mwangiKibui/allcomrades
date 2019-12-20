import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Km = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_km, setKm] = useState([]);
    useEffect(() => {
        const load_km_hostels = () => {
            fetchHostels();
            if (!loading) {
                let _km = hostels.filter(hostel => hostel.location === "1Km");
                setKm(_km);
                return setPending(false);
            }
        };
        load_km_hostels();
    }, [hostels]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_km.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels from 1Km Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _km.length >= 4 && <Carousel title="1Km Hostels" card="hostels" data={_km} />
            }
            {
                _km.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="1Km Hostels" data={_km} />
                        </div>
                        {
                            _km.map((hostel, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Km);