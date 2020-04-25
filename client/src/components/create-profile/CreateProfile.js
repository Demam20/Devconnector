import React, { Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authActions'
import Navbar from '../layout/Navbar'
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      Username: '',
      Website: '',
      Bio: '',
      PhoneNo: '',
      Gender: '',

      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  onSubmit(e) {
    e.preventDefault()
    var genderValue;
    var ele = document.getElementsByName('Gender')
    for(var i = 0; i < ele.length; i++) { 
      if(ele[i].type="radio") { 
          if(ele[i].checked) {
            genderValue =  ele[i].value
          }
      } 
    }
    const profileData = {
      username: this.state.Username,
      website: this.state.Website,
      bio: this.state.Bio,
      phoneno: this.state.Phoneno,
      gender: genderValue,
      similaraccountsuggestion: this.state.SimilarAccountSuggestion,

    }
    
    this.props.createProfile(profileData, this.props.history);

  }
  render() {
    const { errors } = this.props
    return (
      <div>
      <Navbar></Navbar>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <p className="lead text-center">Create your Snapshare Profile</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Username</label>
                  <div className="col-md-7">
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
                    <fieldset className="form-group">
                      <div className="row">
                        <div className="col-sm-10">
                          <div className="form-check">
                            <input className="form-check-input" type="radio"
                              name="Gender" id="gridRadios1" value="Female"
                              onChange={this.onChange}
                            />
                            <label className="form-check-label">
                              Female
                                </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="Gender" id="gridRadios2" value="Male" onChange={this.onChange} />
                            <label className="form-check-label">
                              Male
                                </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="Gender" id="gridRadios3" value="Prefer Not to Say" onChange={this.onChange} />
                            <label className="form-check-label">
                              Prefer Not to Say
                                </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-4">
                    <button type="submit" className="btn btn-primary btn btn-info btn-block mt-4">Create your profile</button>
                  </div>
                  <div className="col-sm-3"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateProfile.propTypes = {

  createProfile: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired


}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { loginUser, createProfile })(CreateProfile)
