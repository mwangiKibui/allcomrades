import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchArticles, getArticlesData } from '../../../store/articles';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import PostCard from '../../shared/PostCard';

const Technology = ({ loading, posts, fetchArticles }) => {
    const [pending, setPending] = useState(true);
    const [_tech, setTech] = useState([]);
    useEffect(() => {
        const load_tech_posts = () => {
            fetchArticles();
            if (!loading) {
                let _tech = posts.filter(post => post.fields.category === "technology");
                setTech(_tech);
                return setPending(false);
            }
        };
        load_tech_posts();
    }, [posts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_tech.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Tech Posts uploaded</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _tech.length >= 4 && <Carousel title="Technology" card="post" data={_tech} />
            }
            {
                _tech.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-sm-12">
                        <BlockHeader title="Technology" data={_tech} />
                        </div>
                        {
                            _tech.map((post, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Technology);