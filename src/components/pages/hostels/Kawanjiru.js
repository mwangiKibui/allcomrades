import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Kawanjiru = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_kawanjiru, setKawanjiru] = useState([]);
    useEffect(() => {
        const load_kawanjiru_hostels = () => {
            fetchHostels();
            if (!loading) {
                let _kawanjiru = hostels.filter(hostel => hostel.location === "Kawanjiru");
                setKawanjiru(_kawanjiru);
                return setPending(false);
            }
        };
        load_kawanjiru_hostels();
    }, [hostels]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_kawanjiru.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels from Kawanjiru Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _kawanjiru.length >= 4 && <Carousel title="Kawanjiru Hostels" card="hostels" data={_kawanjiru} />
            }
            {
                _kawanjiru.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Kawanjiru Hostels" data={_kawanjiru} />
                        </div>
                        {
                            _kawanjiru.map((hostel, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Kawanjiru);