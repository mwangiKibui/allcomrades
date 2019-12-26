import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Tonnes = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_tonnes, setTonnes] = useState([]);
    useEffect(() => {
        const load_tonnes_hostels = () => {
            fetchHostels();
            if (!loading) {
                let _tonnes = hostels.filter(hostel => hostel.location === "Tonnes");
                setTonnes(_tonnes);
                return setPending(false);
            }
        };
        load_tonnes_hostels();
    }, [hostels,fetchHostels,loading]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_tonnes.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels from Tonnes Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _tonnes.length >= 4 && <Carousel title="Tonnes Hostels" card="hostels" data={_tonnes} />
            }
            {
                _tonnes.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Tonnes Hostels" data={_tonnes} />
                        </div>
                        {
                            _tonnes.map((hostel, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Tonnes);