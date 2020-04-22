import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
  render(){
    const {profile} = this.props;
    const firstName = profile.user.Name.trim().split(' ')[0];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.Avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.Name}</h1>
              <p className="lead text-center">
                {profile.Username}{' '}
                {isEmpty(profile.Phoneno) ? null : (
                  <span>Phone# {profile.Phoneno}</span>
                )}
              </p>
              {isEmpty(profile.Gender) ? null : <p>{profile.Gender}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.Email) ? null : <p>{profile.Email}</p>}

                
              </p>
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
            </div>
          </div>
        </div>  
      </div>

    );
  }
  
}
ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileHeader;
 