import React, { Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'

class CreateProfile extends Component {
  constructor(){
    super()
    this.state = {
      Name: '',
      Username: '',
      Website: '',
      Bio: '',
      Email: '',
      PhoneNo: '',
      Gender: '',
      SimilarAccountSuggestion: true,
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
  onSubmit(e){
    e.preventDefault()
    const profileData = {
      name: this.state.Name,
      Username: this.state.Username,
      website: this.state.Website,
      bio: this.state.Bio,
      email: this.state.Email,
      phoneno: this.state.Phoneno,
      gender: this.state.Gender,
      similaraccountsuggestion: this.state.SimilarAccountSuggestion,
      
    }
    axios
        .post('/api/profile', profileData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
  }
  render() {
    const {errors} = this.state
    return (
      <div>
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
                          className={classnames("form-control", { 'is-invalid': errors.Name })} placeholder="Username" name="Username"
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
    )
  }
}

export default CreateProfile
