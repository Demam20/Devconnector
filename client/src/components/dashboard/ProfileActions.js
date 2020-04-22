import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class ProfileActions extends Component {
  constructor() {
    super()
  }


  render() {
    const { user } = this.props.auth
    return (
          
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
            <div className="col-md-7">0 Posts &emsp; 0 Followers &emsp; 0 Following</div>
          </div>
          </div>

    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(ProfileActions)
