import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile, changePassword} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import Navbar from '../layout/Navbar';
import '../../App.css'
import classnames from 'classnames'
import axios from 'axios'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Username: '',
      Website: '',
      Bio: '',
      Email: '',
      PhoneNo: '',
      Gender: '',
      SimilarAccountSuggestion: true,
      errors: {},
      currentPwd:'',
      newpwd:'',
      newpwd2:'',
      feedbackemails: true,
      reminderemails: true,
      productemails: true,
      newsemails: true,
      smsmessages: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const { user } = nextProps.auth

      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      // Set component fields state
      this.setState({
        Name: user.name,
        Username: profile.Username,
        Website: profile.Website,
        Bio: profile.Bio,
        Email: profile.Email,
        Phoneno: profile.Phoneno,
        Gender: profile.Gender,
        SimilarAccountSuggestion: profile.SimilarAccountSuggestion,
        feedbackemails: profile.Subscription.feedbackemails,
        reminderemails: profile.Subscription.reminderemails,
        productemails: profile.Subscription.productemails,
        newsemails: profile.Subscription.productemails,
        smsmessages: profile.Subscription.smsmessages
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {

      username: this.state.Username,
      website: this.state.Website,
      bio: this.state.Bio,
      phoneno: this.state.Phoneno,
      gender: this.state.Gender,
      similaraccountsuggestion: this.state.SimilarAccountSuggestion,
      
      
    };
    // axios
    //   .post('/api/profile', profileData)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err.response.data))
    this.props.createProfile(profileData, this.props.history);
  }
  onClick(e) {
    e.preventDefault();
    console.log("u clicked on change password")
    const passwordData = {
      currentPwd: this.state.currentPwd,
      newpwd: this.state.newpwd,
      newpwd2: this.state.newpwd2
    };
    //console.log(passwordData)
    this.props.changePassword(passwordData)
    
    
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <Navbar></Navbar>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
            </div>
          </div>
          <h1 className="text-center">Edit Profile</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Edit Profile</a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Change Password</a>
                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Email and SMS</a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Name })} placeholder="Name" name="Name"
                          value={this.state.Name}
                          onChange={this.onChange}
                        />
                        {errors.Name && (<div className="invalid-feedback">{errors.Name}</div>)}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Username</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Username })} placeholder="Username" name="Username"
                          value={this.state.Username}
                          onChange={this.onChange}
                        />
                        {errors.Username && (<div className="invalid-feedback">{errors.Username}</div>)}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Website</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Website })} placeholder="Website" name="Website"
                          value={this.state.Website}
                          onChange={this.onChange}
                        />
                        {errors.Website && (<div className="invalid-feedback">{errors.Website}</div>)}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Bio</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Bio })} placeholder="Bio" name="Bio"
                          value={this.state.Bio}
                          onChange={this.onChange}
                        />
                        {errors.Bio && (<div className="invalid-feedback">{errors.Bio}</div>)}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Email })} placeholder="Email" name="Email"
                          value={this.state.Email}
                          onChange={this.onChange}
                        />
                        {errors.Email && (<div className="invalid-feedback">{errors.Email}</div>)}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Phoneno</label>
                      <div className="col-sm-7">
                        <input
                          type="text"
                          className={classnames("form-control", { 'is-invalid': errors.Phoneno })} placeholder="Phoneno" name="Phoneno"
                          value={this.state.Phoneno}
                          onChange={this.onChange}
                        />
                        {errors.Phoneno && (<div className="invalid-feedback">{errors.Phoneno}</div>)}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Gender</label>
                      <div className="col-sm-7">
                        <fieldset class="form-group">
                          <div class="row">
                            <div class="col-sm-10">
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"  />
                                <label class="form-check-label" for="gridRadios1">
                                  Female
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                <label class="form-check-label" for="gridRadios2">
                                  Male
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" checked />
                                <label class="form-check-label" for="gridRadios3">
                                  Prefer Not to Say
                                </label>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3">Similar Account Suggestion</div>
                      <div class="col-sm-7">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="gridCheck1"
                          onchange={this.onChange} 
                          checked={this.state.SimilarAccountSuggestion}
                          />
                          <label class="form-check-label" for="gridCheck1">
                            Include your account when recommending similar accounts people might want to follow.[?]
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-3"></div>
                      <div class="col-sm-4">
                        <button type="submit" class="btn btn-primary btn btn-info btn-block mt-4">Update</button>
                      </div>
                      <div class="col-sm-3"></div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Current Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className={classnames("form-control", { 'is-invalid': errors.currentPwd })} placeholder="Current Password" name="currentPwd"
                        value={this.state.currentPwd}
                        onChange={this.onChange}
                      />
                      {errors.currentPwd && (<div className="invalid-feedback">{errors.currentPwd}</div>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">New Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className={classnames("form-control", { 'is-invalid': errors.newpwd })} placeholder="New Password" name="newpwd"
                        value={this.state.newpwd}
                        onChange={this.onChange}
                      />
                      {errors.newpwd && (<div className="invalid-feedback">{errors.newpwd}</div>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Confirm Password</label>
                    <div className="col-sm-7">
                      <input
                        type="password"
                        className={classnames("form-control", { 'is-invalid': errors.newpwd2 })} placeholder="Confirm New Password" name="newpwd2"
                        value={this.state.newpwd2}
                        onChange={this.onChange}
                      />
                      {errors.newpwd2 && (<div className="invalid-feedback">{errors.newpwd2}</div>)}
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-4">
                      <button type="button" class="btn btn-primary btn btn-info btn-block mt-4" onClick={this.onClick}>Update</button>
                    </div>
                    <div class="col-sm-3"></div>
                  </div>
                </form>
              </div>

                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <p>Subscribe To:</p>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label">
                      Feedback Emails
                            </label>
                    <small className="form-text text-muted">Give feedback on Instagram.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      Reminder Emails
                            </label>
                    <small className="form-text text-muted">Get notifications you may have missed.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label">
                      Product Emails
                            </label>
                    <small className="form-text text-muted">Get tips about Instagram's tools.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      News Emails
                            </label>
                    <small className="form-text text-muted">Learn about new Instagram features.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      Text (SMS) Messages
                            </label>
                    <small className="form-text text-muted">Get notifications by text message.</small>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, changePassword })(
  withRouter(CreateProfile));