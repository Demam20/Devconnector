import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';


class ProfileHeader extends Component {
  render(){
    const {profile} = this.props;
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.Avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.Name}</h1>
              <p className="lead text-center">
                {profile.Username}{' '}
                {isEmpty(profile.Phoneno) ? null : (
                  <span>Phone# {profile.Phoneno}</span>
                )}
              </p>
              {isEmpty(profile.Gender) ? null : <p>{profile.Gender}</p>}
              <p>
                {isEmpty(profile.Website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.Website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.Email) ? null : <p>{profile.Email}</p>}

                
              </p>
              
              
          </div>
        </div>  
      </div>
   </div>
    );
  }
  
}
export default ProfileHeader;
 