import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postAction';
import {getCurrentProfile} from '../../actions/profileActions';
import Navbar from '../layout/Navbar';

class Posts extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    console.log("proile loaded");
    this.props.getPosts();
    
  }
  

  render() {

    const { posts, loading } = this.props.post;
    const profleloading = this.props.profile.loading;
    let postContent;

    if ( loading || profleloading) {
      postContent = <Spinner />;
    } 
    else if(posts === null){
      postContent = "there is nothing here";
    }
    else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
  
};

const mapStateToProps = state => ({
  profile:state.profile,
  post: state.post
  
});

export default connect(mapStateToProps, { getCurrentProfile,getPosts })(Posts);
