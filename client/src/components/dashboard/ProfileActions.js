import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {getPosts} from '../../actions/postAction'
import PostForm from '../posts/PostForm';
import PostFeed from '../posts/PostFeed';


class ProfileActions extends Component {
  tabs = [
    {
      anchorClassName: 'nav-link active',
      anchorId: 'posts-tab',
      anchorHref: '#posts',
      anchorAriaControl: 'home',
      anchorAriaSelected: true,
      iconClassName: 'fas fa-border-all',
      anchorInnerText: ' POSTS'
    },
    {
      anchorClassName: 'nav-link',
      anchorId: 'igtv-tab',
      anchorHref: '#igtv',
      anchorAriaControl: 'profile',
      anchorAriaSelected: false,
      iconClassName: 'fas fa-photo-video',
      anchorInnerText: ' IGTV'
    },
    {
      anchorClassName: 'nav-link',
      anchorId: 'saved-tab',
      anchorHref: '#saved',
      anchorAriaControl: 'contact',
      anchorAriaSelected: false,
      iconClassName: 'fas fa-bookmark',
      anchorInnerText: ' SAVED'
    },
    {
      anchorClassName: 'nav-link',
      anchorId: 'tagged-tab',
      anchorHref: '#tagged',
      anchorAriaControl: 'contact',
      anchorAriaSelected: false,
      iconClassName: 'fas fa-user-tag',
      anchorInnerText: ' TAGGED'
    }
  ];

  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getPosts()
  }


  render() {
    const { user } = this.props.auth
    const { profile } = this.props.profile
    const post = this.props.post.posts
    
    //console.log("user ID:" + user.id)
    var postsCount = post.filter(item => item.user === user.id).length

     const bookmarkpostid = profile.bookmarks.map(item => item.POSTID);
     console.log("bookmarks " +JSON.stringify(bookmarkpostid));

    var displaypost =[];
    for(let temp of post) {
      for(let tempb of bookmarkpostid){
        if(temp._id === tempb){
          displaypost.push(temp);
        }
      }  
    }

    var myposts=[];
    for(let temp of post){
      if(temp.user === user.id){
        myposts.push(temp);
      }
    }
    console.log("mypost" + JSON.stringify(myposts.length));
    console.log("display post" + JSON.stringify(displaypost.length));
    
    let postContent = <PostFeed posts={displaypost} />;

    let mypostcontent = <PostFeed posts={myposts} />;
    
    return (
      <div>
        {this.renderProfileOverview(user, postsCount)}
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {this.getTabs()}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="home-tab">
                <div className="col-md-12">
              {mypostcontent}
            </div> 
            </div>    
                <div className="tab-pane fade" id="igtv" role="tabpanel" aria-labelledby="profile-tab"></div>
                <div className="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="contact-tab">
                   <div className="col-md-12">
              {postContent}
            </div>    
                </div>
                <div className="tab-pane fade" id="tagged" role="tabpanel" aria-labelledby="contact-tab">...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getTabs() {
    return (this.tabs.map(tab => {
      return (
        <li className="nav-item">
          <a className={tab.anchorClassName} id={tab.anchorId} data-toggle="tab" href={tab.anchorHref} role="tab" aria-controls={tab.anchorAriaControl} aria-selected={tab.anchorAriaSelected}>
            <i className={tab.iconClassName}></i>{tab.anchorInnerText}</a>
        </li>
      );
    }))
  }

  renderProfileOverview(user, postsCount) {
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-end">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '100px', marginRight: '5px' }}
              title="You must have a gravatar connected to your email to display an image"
            />
          </div>
          <div className="col-md-3 d-flex justify-content-center">{user.name}</div>
          <div className="col-md-5 d-flex justify-content-left">
            <Link to="/edit-profile">
              Edit Profile <i className="fas fa-dharmachakra"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-7">{postsCount} Posts &emsp; 0 Followers &emsp; 0 Following</div>
        </div>
      </div>
    );
  }

}
ProfileActions.propTypes = {

  post: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
})
export default connect(mapStateToProps, {getPosts})(ProfileActions)
