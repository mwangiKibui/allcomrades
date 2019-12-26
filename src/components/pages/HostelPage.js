import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';

import BlockHome from '../shared/BlockHome';
import {getHostelsData,fetchHostels} from '../../store/hostels';
import Slick from '../shared/SlickWithPreventSwipeClick';
import {carousel_settings as settings} from '../../data';
import BlockHeader from '../shared/BlockHeader';
import Carousel from '../shared/Carousel';
import Tabs from './hostels/Tabs';
import HostelCard from '../shared/HostelCard';

const HostelPage = ({match,loading,hostels,fetchHostels}) => {
    const {hostelId} = match.params;
    const [pending,setPending] = useState(true);
    const [_hostel,setHostel] = useState({});
    const [_related,setRelated] = useState([]);

    useEffect(() => {
        const load_data = () => {  
           fetchHostels();
           if(!loading){
               let hostel = hostels.find(hostel => hostel._id === hostelId);
               let loc_related = hostels.filter(hos => hos.location === hostel.location && hos._id !== hostelId);
               let others_related = hostels.filter(hos => hos.location !== hostel.location)

               let related = [...loc_related,...others_related];
               setHostel(hostel);
               setRelated(related);
               return setPending(false);
           }
        };
        load_data();
    },[hostelId]);
    let slideshow = pending ? null : (
        _hostel.profiles.map((profile,index) => (
            <div className="hostel_slideshow_container" key={index}>
                <img src={profile} className="hostel_image" alt={_hostel.name} />
            </div>
        ))
    )
    return (
        <section className="hostel_page">
            {
                pending ? <BlockHome link={`/hostels/${hostelId}`} /> : 
                <BlockHome name={`${_hostel.name} hostels`} link={`/hostels/${hostelId}`} />
            }
            
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        {
                            pending ? (
                                <div className="text-center">
                                    <ClipLoader size="25" color="#009933" />
                                </div>
                            ) : (
                                <div className="hostel_page_content">
                                <div className="row">
                                    <div className=" col-12 col-sm-6 col-md-6">
                                        <Slick {...settings}>
                                            {slideshow}
                                        </Slick>
                                    </div>
                                    <div className=" col-12 col-sm-6 col-md-6">
                                        <Tabs data={_hostel}/>
                                    </div>
                                </div>
                                </div>
                            )
                        }

                    </div>
                    <div className="col-12 col-sm-12 col-md-12">

                        {
                            pending ? (
                                <div className="text-center">
                                    <ClipLoader size="25" color="#009933" />
                                </div>
                            ) : (
                                <>
                                {
                                    _related.length >= 4 && <Carousel title="Related hostels" data={_related} card="hostels" />
                                }
                                {
                                    _related.length > 0 && _related.length < 4 && (
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <BlockHeader title={'Related hostels'} data={_related} />
                                            </div>
                                            {
                                                _related.map((hostel, index) => (
                                                    <div className="col-12 col-sm-3 col-md-3" key={index}>
                                                        <HostelCard data={hostel} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                </>
                            )
                        }                        
                    </div>
                </div>
            </div>
        </section>
    )
};
const mapStateToProps = state => ({
    loading:getHostelsData(state).loading,
    hostels:getHostelsData(state).hostels
});
const dispatchToProps = {
    fetchHostels
}
export default connect(mapStateToProps,dispatchToProps)(HostelPage);