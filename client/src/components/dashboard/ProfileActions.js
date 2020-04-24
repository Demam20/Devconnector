import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class ProfileActions extends Component {
  constructor() {
    super()
  }


  render() {
    const { user } = this.props.auth
    const { profile } = this.props.profile
    const { post } = this.props.post.posts
    var count = 0
    const getCount = () => {
      post.foreach(item => {
        if (item._id === user.id) {
          count++
        }
      })
      console.log("hello count" + count)
      return count
    }
    console.log("hello")
    return (
      <div>
        <div class="card card-body mb-3">
          <div class="row">
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
                Edit Profile <i class="fas fa-dharmachakra"></i>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-7">{getCount} Posts &emsp; 0 Followers &emsp; 0 Following</div>
          </div>
          </div>
          <div class="card card-body mb-3">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="posts" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                <i class="fas fa-border-all"></i> POSTS</a>
              </li>
              &emsp;&emsp;
              <li class="nav-item">
                <a class="nav-link" id="igtv" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                <i class="fas fa-photo-video"></i> IGTV</a>
              </li>
              &emsp;&emsp;
              <li class="nav-item">
                <a class="nav-link" id="saved" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
                <i class="far fa-bookmark"></i> SAVED</a>
              </li>
              &emsp;&emsp;
              <li class="nav-item">
                <a class="nav-link" id="tagged" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
                <i class="fas fa-user-tag"></i> TAGGED</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="home-tab"></div>
              <div class="tab-pane fade" id="igtv" role="tabpanel" aria-labelledby="profile-tab"></div>
              <div class="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="contact-tab">
                {profile.bookmarks}

              </div>
              <div class="tab-pane fade" id="tagged" role="tabpanel" aria-labelledby="contact-tab">...</div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}
ProfileActions.propTypes = {
  
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
})
export default connect(mapStateToProps, null)(ProfileActions)
