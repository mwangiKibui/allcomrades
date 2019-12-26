// react
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
// third-party
import {ClipLoader} from 'react-spinners';
import { Link } from 'react-router-dom';

// application
import SlickWithPreventSwipeClick from '../shared/SlickWithPreventSwipeClick';
import {carousel_settings as slickSettings} from '../../data';
import {fetchAdverts,getAdvertsData} from '../../store/adverts';
import bg from '../images/karu_1.jpg';

const  BlockSlideShow = ({loading,adverts,fetchAdverts}) => {
   
        const [pending,setPending] = useState(true);
        const [_adverts,setAdverts] = useState([]);
        useEffect(() => {
            const load_adverts = () => {
                   fetchAdverts();
                   if(!loading){
                       setAdverts(adverts);
                       return setPending(false);
                   }
            };
            load_adverts();
        },[loading,adverts,fetchAdverts]);

        if(pending) return (
            <div className="text-center">
               <ClipLoader size="25" color="#009933" />
            </div>
        );

        const slides = _adverts.map((advert,index) => (
            <div className="row" key={index}>
                <div className="col-12 col-sm-12 col-md-12 text-center">
                    <h4 className="advert_heading">{advert.heading}</h4>
                    <p className="advert_subtitle">{advert.subtitle}</p>
                    <Link className="advert_btn btn btn-lg btn-success" to={advert.link}>Get started</Link>
                </div>
            </div>
        ))
        

        return (
        <section className="home" style={{backgroundImage:`url(${bg})`}}>
            <div className="home_overlay">
                <div className="container">
                    <div className="row">  
                        <div className="home_content">
                            <SlickWithPreventSwipeClick {...slickSettings}>
                                {slides}
                            </SlickWithPreventSwipeClick>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    
};
const mapStateToProps = state => ({
    loading:getAdvertsData(state).loading,
    adverts:getAdvertsData(state).adverts
});
const dispatchStateToProps = {
    fetchAdverts
};
export default connect(mapStateToProps,dispatchStateToProps)(BlockSlideShow);