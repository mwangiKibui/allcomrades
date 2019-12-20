import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import { fetchArticles, getArticlesData } from '../../../store/articles';
import Carousel from '../../shared/Carousel';
import BlockHeader from '../../shared/BlockHeader';
import PostCard from '../../shared/PostCard';

const Entertainment = ({ loading, posts, fetchArticles }) => {
    const [pending, setPending] = useState(true);
    const [_ent, setEnt] = useState([]);
    useEffect(() => {
        const load_ent_posts = () => {
            fetchArticles();
            if (!loading) {
                let _ent = posts.filter(post => post.fields.category === "entertainment");
                setEnt(_ent);
                return setPending(false);
            }
        };
        load_ent_posts();
    }, [posts]);

    if (pending) return (
        <div className="text-center">
            <ClipLoader size="25" color="#009933" />
        </div>
    );

    if (_ent.length === 0) return (
        <div className="col-12 col-md-12 text-center">
            <div className="page_message">
                <p>No Entertainment Posts uploaded</p>
            </div>
        </div>
    )

    return (
        <>
            {
                _ent.length >= 4 && <Carousel title="Entertainment" card="post" data={_ent} />
            }
            {
                _ent.length < 4 && (
                    <div className="row">
                        <div className="col-12 col-sm-12">
                        <BlockHeader title="Entertainment" data={_ent} />
                        </div>
                        {
                            _ent.map((post, index) => (
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

export default connect(mapStateToProps, dispatchToProps)(Entertainment);