import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Navbar from '../layout/Navbar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted d-flex justify-content-center">
              Welcome &nbsp; <Link to={`/profile/${user.id}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div className="d-flex justify-content-center" style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted d-flex justify-content-center">Welcome &nbsp;
            <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a gravatar connected to your email to display an image"
          />{user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      
      <div className="dashboard">
      <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-5">Dashboard</h1>
              
              {dashboardContent}
              
            </div>
          </div>
        </div>
       
      </div>
      
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth:state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);