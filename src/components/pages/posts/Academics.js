import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchArticles, getArticlesData } from '../../../store/articles';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import PostCard from '../../shared/PostCard';

const Academics = ({ loading, posts, fetchArticles }) => {
    const [pending, setPending] = useState(true);
    const [_academics, setAcademics] = useState([]);
    useEffect(() => {
        const load_academic_posts = () => {
            fetchArticles();
            if (!loading) {
                let _academics = posts.filter(post => post.fields.category === "academics");
                setAcademics(_academics);
                return setPending(false);
            }
        };
        load_academic_posts();
    }, [posts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_academics.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Academic Posts uploaded</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _academics.length >= 4 && <Carousel title="Academics" card="post" data={_academics} />
            }
            {
                _academics.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-md-12">
                        <BlockHeader title="Academics" data={_academics} />
                        </div>
                        {
                            _academics.map((post, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Academics);