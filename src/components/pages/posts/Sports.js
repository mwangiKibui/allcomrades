import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchArticles, getArticlesData } from '../../../store/articles';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import PostCard from '../../shared/PostCard';

const Sports = ({ loading, posts, fetchArticles }) => {
    const [pending, setPending] = useState(true);
    const [_sports, setSports] = useState([]);
    useEffect(() => {
        const load_sports_posts = () => {
            fetchArticles();
            if (!loading) {
                let _sports = posts.filter(post => post.fields.category === "sports");
                setSports(_sports);
                return setPending(false);
            }
        };
        load_sports_posts();
    }, [posts,loading,fetchArticles]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_sports.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Sports Posts uploaded</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _sports.length >= 4 && <Carousel title="Sports" card="post" data={_sports} />
            }
            {
                _sports.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Sports" data={_sports} />
                        </div>
                        {
                            _sports.map((post, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Sports);