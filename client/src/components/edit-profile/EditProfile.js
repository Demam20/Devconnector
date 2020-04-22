import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import InputGroup from '../common/InputGroup';
// import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import Navbar from '../layout/Navbar';
import '../../App.css'

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
      oldpwd: '',
      newpwd: '',
      newpwd2: '',
      feedbackemails: true,
      reminderemails: true,
      productemails: true,
      newsemails: true,
      smsmessages: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
        Name: profile.Name,
        Username: user.name,
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
      Name: this.state.Name,
      Username: this.state.Username,
      Website: this.state.Website,
      Bio: this.state.Bio,
      Email: this.state.Email,
      Phoneno: this.state.Phoneno,
      Gender: this.state.Gender,
      SimilarAccountSuggestion: this.state.SimilarAccountSuggestion,
      feedbackemails: this.state.feedbackemails,
      reminderemails: this.state.reminderemails,
      productemails: this.state.productemails,
      newsemails: this.state.newsemails,
      smsmessages: this.state.smsmessages
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">

        <div className="container">
          <Navbar />
          <div className="row">

            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="text-center">Edit Profile</h1>
              <div className="create-profile">
                <div className="container">
                  <div className="row overflow-auto">
                    <div className="col-5 d-flex justify-content-end">
                      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Edit Profile</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Change Password</a>
                        <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Email and SMS</a>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                          <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <TextFieldGroup
                                placeholder="Website"
                                name="Website"
                                value={this.state.Website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own website or a company one"
                              />
                            </div>

                            <div className="form-group">
                              <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="Bio"
                                value={this.state.Bio}
                                onChange={this.onChange}
                                error={errors.Bio}
                                info="Tell us a little about yourself"
                              />
                            </div>
                            <div className="form-group">


                              <TextFieldGroup
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                              />
                            </div>

                          </form>

                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                          <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                              <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                              />
                            </div>
                            <div className="form-group">
                              <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                              />
                            </div>
                            <div className="form-group">
                              <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                              />
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile));