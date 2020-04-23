import React, { Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      oldpwd: '',
      newpwd: '',
      newpwd2: '',
      Name:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const passwordData = {

      
    };
    axios
      .post('/api/profile/changepassword', passwordData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
    
    
  }
  render() {
    const { errors } = this.state
    return (
      <div>
        
            

              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
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
                        className={classnames("form-control", { 'is-invalid': errors.Name })} placeholder="Name" name="Name"
                        value={this.state.Name}
                        onChange={this.onChange}
                      />
                      {errors.Name && (<div className="invalid-feedback">{errors.Name}</div>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Website</label>
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
                  <div class="form-group row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-4">
                      <button type="submit" class="btn btn-primary btn btn-info btn-block mt-4">Update</button>
                    </div>
                    <div class="col-sm-3"></div>
                  </div>
                </form>
              </div>
           
          
      </div>

    )
  }
}
