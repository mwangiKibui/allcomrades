import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Sans = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_sans, setSans] = useState([]);
    useEffect(() => {
        const load_sans_hostels = () => {
            fetchHostels();
            if (!loading) {
                let _sans = hostels.filter(hostel => hostel.location === "Sansiro");
                setSans(_sans);
                return setPending(false);
            }
        };
        load_sans_hostels();
    }, [hostels]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_sans.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels from Sansiro Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _sans.length >= 4 && <Carousel title="Sansiro Hostels" card="hostels" data={_sans} />
            }
            {
                _sans.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Sansiro Hostels" data={_sans} />
                        </div>
                        {
                            _sans.map((hostel, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Sans);