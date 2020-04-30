import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import axios from 'axios'

class ProfileItem extends Component {
  constructor() {
    super()
    this.state = {
      Btnname:''
    }
    
    this.onClick = this.onClick.bind(this)
  }
componentDidMount(){
  this.props.intersection.forEach(element => {
    document.getElementById(element).innerHTML="Unfollow"
    this.setState({Btnname: "Unfollow"})
  
  })
    this.props.difference.forEach(element => {
      document.getElementById(element).innerHTML="Follow"
      this.setState({Btnname: "Follow"})
    })
}    
  onClick(e) {
    e.preventDefault();
    console.log(e.target.id)
    
    const data = {
      youFollowing: e.target.id, //This is to update owner's youfollowing array e.target.id contains the profile
      // ID of the profile you are following
      profileID: e.target.id //this is to retrieve the profileid to update the follower array of //that profileID
    
    }
    if(e.target.innerHTML === "Follow") {
      axios
      .post('/api/profile/follow', data)
      .then(res => console.log("you are now following"))
      .catch(err => console.log(err))
      e.target.innerHTML="Unfollow"
      e.target.name = "UnFollow"
      this.setState({Btnname:  e.target.name })
    }
    else if(e.target.innerHTML === "Unfollow") {
      axios
      .post('/api/profile/unfollow', data)
      .then(res => console.log("you are now unfollowing"))
      .catch(err => console.log(err))
      e.target.innerHTML="Follow"
      e.target.name = "Follow"
      this.setState({Btnname:  e.target.name })
    }
    
  }
  render(){
    const { profile, intersection, difference } = this.props;
    // console.log(intersection)
    // console.log(difference)
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.Avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>Name:{profile.Name}</h3>
            <p>
              User Name:{profile.Username}{' '}
              <div>
              {isEmpty(profile.Phoneno) ? null : (
                <span>Phone# {profile.Phoneno}</span>
              )}
              </div>
            </p>
              {isEmpty(profile.Gender) ? null : <p>Gender : {profile.Gender}</p>}
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
            &nbsp;
            <button className = "btn btn-info" 
                onClick = {this.onClick} 
                id={profile._id} 
                name={this.state.Btnname}
            >
            
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfileItem;

    