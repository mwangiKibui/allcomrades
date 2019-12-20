// react
import React,{useState,useEffect} from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';

// application
import BlockHeader from '../shared/BlockHeader';
import {fetchCategories,getCategoryData} from '../../store/categories';

const BlockCategories = ({categories,loading,fetchCategories,layout}) =>  {

    const [pending,setPending] = useState(true);
    const [_categories,setCategories] = useState([]);
    useEffect(() => {
           const load_categories = () => {
                 fetchCategories();
                 if(!loading) {
                     console.log(`categories fetched`);
                     setCategories(categories);
                     return setPending(false);
                 }
           };
           load_categories();
    },[categories]);

    if(pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    const categoriesList = _categories.map((category, index) => {
        const classes = `category-card col-12 col-sm-3 col-md-3`;  
        return (
            <div key={index} className={classes}>
                <div className="media">
                <Link to={`categories/${category.name}`}>
                    <img src={category.icon} alt={
                    category.name
                } className="mr-3 category-card--img" /></Link>
                <div className="media-body">
                    <div className="media-heading">
                        <Link to={category.url} className="category-card--link">{category.name}</Link>
                    </div>
                </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories`}>
            <div className="container">
                <BlockHeader title={'Product Categories'} />

                <div className="row">
                    {categoriesList}
                </div>
            </div>
        </div>
    );
}

BlockCategories.propTypes = {
    title: PropTypes.string.isRequired,
    categories: PropTypes.array,
    layout: PropTypes.oneOf(['classic', 'compact']),
};

BlockCategories.defaultProps = {
    categories: [],
    layout: 'classic',
};

const mapStateToProps = state => ({
    loading:getCategoryData(state).loading,
    categories:getCategoryData(state).categories
});
const dispatchStateToProps = {
    fetchCategories
};
export default connect(mapStateToProps,dispatchStateToProps)(BlockCategories);