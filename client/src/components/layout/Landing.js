import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import classnames from 'classnames';
import {loginUser} from '../../actions/authAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class Landing extends Component {
  constructor() {
    
    super()
    this.state = {
      email:'',
      password:'',
      errors:{}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
      this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);

  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }
  render() {
    const {errors} = this.state;
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <br /><br />
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6 d-flex justify-content-center">
                  <h1>Snapshare</h1>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input type="email" className={classnames("form-control",{'is-invalid': errors.email})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone no, username or email" name="email"
                  value={this.state.email}
                  onChange={this.onChange} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input type="password" className={classnames("form-control", {'is-invalid': errors.password})} id="exampleInputPassword1" placeholder="Password" name="password"
                  value={this.state.password}
                  onChange={this.onChange} />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-info btn-block mt-4">Login</button>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-2"></div>
                <label className="form-group col-md-2 d-flex justify-content-center">(or)</label>
                <div className="form-group col-md-2"></div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 d-flex justify-content-center">
                  <i className="fab fa-facebook-square fa-2x"></i>
                  <button type="button" className="btn btn-link">
                    Login with Facebook
                  </button>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 d-flex justify-content-center">
                  <a href="#">Forgot Password</a>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 d-flex justify-content-center">
                  <span>Don't have an account? </span>&nbsp;<Link to="/register"> Sign Up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
Landing.propTypes= {
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth:state.auth,
  errors:state.errors

});
export default connect(mapStateToProps,{loginUser}) (Landing);