import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import  '../../App.css';
import { deletePost, addLike, removeLike,addbookmark} from '../../actions/postAction';


class PostItem extends Component {
  
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onBookmarkClick(id){
    this.props.addbookmark(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  
  alreadysavedposts(id){
    const { profile } = this.props;
    console.log("in alreadylikedposts profile "+JSON.stringify(Object.keys(profile)));
    console.log("in profile "+JSON.stringify(Object.keys(profile.profile)));

    const bookmarkpostids = profile.profile.bookmarks.map(item => item.POSTID);
    if(bookmarkpostids.filter(bookmarkpostid=> bookmarkpostid === id).length>0){
      return true;
    } else{
      return false;
    }
  }

  render() {
    
    const { post, auth, showActions,profile } = this.props;
    //const { profile } = this.props;
    //const { bookmarks } = this.props.profile;

    return (
     
        <div className=" card card-body mb-3 postcard ">
        <div className="row">
          <div className="col-sm-6">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                style={{width: '40px'}}
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-top">{post.name}</p>
          </div>
          <div className="col-md-10">
          <p ><img className="image" src={post.imagepost}    /></p>
          <br />
            {/* <p className="lead">{post.imagepost}</p> */}
            <p className='cardtext'>

            {showActions ? (
              
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                
                
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-outline-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                )
                 : null}
                 <button
              onClick={this.onBookmarkClick.bind(this, post._id)}
               type="button"
              className="btn btn-light mr-1 "
            >
              <i
                    className={classnames('fas fa-bookmark', {
                      'text-info': this.alreadysavedposts(post._id)
                    })}
                  />
              
              
                </button>
              </span>
            ) : null}
            
                
            </p>
          </div>
        </div>
        </div>
      
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addbookmark:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike,addbookmark}) (PostItem);
