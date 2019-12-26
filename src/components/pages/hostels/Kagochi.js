import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchHostels, getHostelsData } from '../../../store/hostels';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import HostelCard from '../../shared/HostelCard';

const Kagochi = ({ loading, hostels, fetchHostels }) => {
    const [pending, setPending] = useState(true);
    const [_kagochi, setKagochi] = useState([]);
    useEffect(() => {
        const load_kagochi_hostels = () => {
            fetchHostels();
            if (!loading) {
                let _kagochi = hostels.filter(hostel => hostel.location === "Kagochi");
                setKagochi(_kagochi);
                return setPending(false);
            }
        };
        load_kagochi_hostels();
    }, [hostels,loading,fetchHostels]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_kagochi.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Hostels from Kagochi Uploaded yet</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _kagochi.length >= 4 && <Carousel title="Kagochi Hostels" card="hostels" data={_kagochi} />
            }
            {
                _kagochi.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <BlockHeader title="Kagochi Hostels" data={_kagochi} />
                        </div>
                        {
                            _kagochi.map((hostel, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Kagochi);