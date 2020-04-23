import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  render(){
    const {profile} = this.props;
    const firstName = profile.Name.trim().split(' ')[0];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.Bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.Bio}</span>
              )}
            </p>
            <hr />
            </div>
        </div>
      </div>
    );
  }
} 
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout; 