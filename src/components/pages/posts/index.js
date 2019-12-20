import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchArticles, getArticlesData } from '../../../store/articles';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import PostCard from '../../shared/PostCard';

const Posts = ({ loading, posts,fetchArticles }) => {
    const [pending, setPending] = useState(true);
    const [_posts, setPosts] = useState([]);
    useEffect(() => {
        const load_posts = () => {
            fetchArticles();
            if (!loading) {
                setPosts(posts);
                return setPending(false);
            }
        };
        load_posts();
    }, [posts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_posts.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Post uploaded</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _posts.length >= 4 && <Carousel title="All Blogs" card="post" data={_posts} />
            }
            {
                _posts.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-sm-12">
                        <BlockHeader title="All Blogs" data={_posts} />
                        </div>
                        {
                            _posts.map((post, index) => (
                                <div className="col-12 col-sm-3" key={index}>
                                    <PostCard data={post} />
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
    loading: getArticlesData(state).loading,
    posts: getArticlesData(state).articles
});
const dispatchToProps = {
    fetchArticles
};

export default connect(mapStateToProps, dispatchToProps)(Posts);