import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render(){
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.Avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.Name}</h3>
            <p>
              {profile.Username}{' '}
              {isEmpty(profile.Phoneno) ? null : (
                <span>Phone# {profile.Phoneno}</span>
              )}
            </p>
              {isEmpty(profile.Gender) ? null : <p>{profile.Gender}</p>}
            <p>
            {isEmpty(profile.Website) ? null : (
                  <a
                    className="text-black p-2"
                    href={profile.Website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.Email) ? null : <p>{profile.Email}</p>}
            </p>
            <Link to={`/profile/${profile.UserID}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfileItem;

    