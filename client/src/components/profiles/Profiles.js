import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import Navbar from '../layout/Navbar'

class Profiles extends Component {
  constructor(){
    super()
    
    
  }
  componentDidMount(){
    
    this.props.getProfiles();
  }
  render(){
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles ===null || loading ){
      profileItems =<Spinner/>;
    }else{
                      
      if (profiles.length >0){

        const profilesWithoutLoginProfile = profiles.filter(profile=> profile.UserID !== this.props.auth.user.id)
        const tempfollowingId =[] //to store the youfollowing profile IDs of the owner
        const tempProfileId = profilesWithoutLoginProfile.map(item => item._id) //contains profile IDs of all the profiles
        const tempId = profiles.filter(profile=> profile.UserID === this.props.auth.user.id).map(ele => ele.youFollowing)
        tempId.forEach(element => {
          for( var k=0; k<element.length; k++){
            tempfollowingId.push(element[k])
          }
        })
        //tempfollowingID will contain the following array IDs of the the loggedin user(owner)
        
        let intersection = tempProfileId.filter(x => tempfollowingId.includes(x));
        //console.log(intersection)
        //intersection means the user is already following these profiles so the button should say unfollow for these profiles
        let difference = tempProfileId.filter(x => !tempfollowingId.includes(x));
        //console.log(difference)
        //difference means the user is not following these profiles so the button should say follow for these profiles
        
        profileItems= 
        profilesWithoutLoginProfile 
        .map(profile =>
          
          (<ProfileItem key={profile._id} profile={profile} intersection={intersection} difference={difference} />) 
        );
      }else{
        profileItems = <h4>No profiles...</h4>;
      }
    }
    return(
      <div className="profiles">
      <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Members Profiles</h1>
              <p className="lead text-center">
                Browse and connect with others
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  profiles: state.profile.profiles
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
