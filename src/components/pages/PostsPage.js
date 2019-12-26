import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import BlockHome from '../shared/BlockHome';
import {fetchArticles,getArticlesData} from '../../store/articles';
import Carousel from '../shared/Carousel';
import BlockHeader from '../shared/BlockHeader';
import PostCard from '../shared/PostCard';

const PostsPage = ({match,loading,posts,fetchPosts}) => {

    const {postId} = match.params;
    const [pending,setPending] = useState(true);
    const [_post,setPost] = useState({});
    const [related,setRelated] = useState([]);
    const options = {
        renderNode: {
            "embedded-asset-block": (node) => { //surely we have embedded it
                const alt = node.data.target.fields.title;
                const src = node.data.target.fields.file.url;
                return (
                    <>
                        <img src={src} alt={alt} className="d-block d-sm-none d-lg-none d-md-none mobile_post_body__image" />
                        <img src={src} alt={alt} className="d-none d-sm-block d-lg-block d-md-block desktop_post_body__image" />
                    </>
                )
            }
        }
    };
    useEffect(() => {
          const load_data = () => {
              fetchPosts();
              if(!loading){
                  /** get the needed data */
                  let _post = posts.find(post => post.sys.id === postId);
                  let _related = posts.filter(post => post.sys.id !== postId);
                  setPost(_post);
                  setRelated(_related);
                  return setPending(false);
              }
          };
          load_data();
    },[postId,loading,posts,fetchPosts]);

    return (
        <section className="posts">
            {
                pending ? <BlockHome name={'Posts'} link={`/posts/${postId}`} />
                    : <BlockHome name={`${_post.fields.title}`} link={`/posts/${postId}`} />
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
                                  <div className="post_content">
                                      <h4 className="post_content_heading">
                                          {_post.fields.title}
                                      </h4>
                                      <div className="post_content_body">
                                      {
                                          documentToReactComponents(_post.fields.body,options)
                                      }
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
                              ):(
                                  <>
                                  {
                                      related.length >=4 && <Carousel title="Related Posts" card="post" data={related} />
                                  }
                                  {
                                    related.length > 0 && related.length < 4 && (
                                        <div className="row">
                                            <div className="col-12 col-sm-12">
                                                <BlockHeader title="Related Posts" data={related} />
                                            </div>
                                            {
                                                related.map((post,index) => (
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
                          }
                      </div>
                  </div>
              </div>
        </section>
    )
};
const mapStateToProps = state => ({
    loading:getArticlesData(state).loading,
    posts:getArticlesData(state).articles
});
const dispatchToProps = {
    fetchPosts:fetchArticles
}

export default connect(mapStateToProps,dispatchToProps)(PostsPage);