// react
import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';

// third-party
import PropTypes from 'prop-types';
import {ClipLoader} from 'react-spinners';

// application
import BlockHeader from '../shared/BlockHeader';
import PostCard from '../shared/PostCard';
import SlickWithPreventSwipeClick from '../shared/SlickWithPreventSwipeClick';
import {fetchArticles,getArticlesData} from '../../store/articles';
import {slickSettings} from '../../data';
import Carousel from '../shared/Carousel';

const BlockPosts = ({loading,fetchArticles,posts,layout}) => {

        const [pending,setPending] = useState(true);
        const [_posts,setPosts] = useState([]);
        useEffect(() => {
             const load_posts = () => {
                 fetchArticles();
                 if(!loading){
                     setPosts(posts);
                     return setPending(false);
                 }
             };
             load_posts();
        },[loading]);

        if(pending) return (
            <div className='text-center'>
                <ClipLoader size="25" color="#009933" />
            </div>
        );
        
        if(_posts.length === 0) return (
            <p>No posts have been found.</p>
        );
        return (
            
            <Carousel card="post" title="Latest Blogs" data={_posts} />
        );
    };

BlockPosts.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['list-sm', 'grid-nl']),
    posts: PropTypes.array,
};

BlockPosts.defaultProps = {
    layout: 'list-sm',
    posts: [],
};
const mapStateToProps = state => ({
    loading:getArticlesData(state).loading,
    posts:getArticlesData(state).articles
});
const dispatchStateToProps = {
    fetchArticles
};
export default connect(mapStateToProps,dispatchStateToProps)(BlockPosts);