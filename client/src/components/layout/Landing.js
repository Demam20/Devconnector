import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/authactions'
import '../../App.css';
import TextFieldGroup from '../../components/common/TextFieldGroup'

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
    })
  }
  onSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)

  }
  componentDidMount(){
    
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  componentWillReceiveProps(newProps) {
    if(newProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
    if(newProps.errors) {
      this.setState({errors: newProps.errors})
    }
  }
  render() {
    const {errors} = this.state
    return (
      
      <div className="container">
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="col-md-7 m-auto">
                <br/>
                <h1 className="display-6 text-center">Snapshare</h1>
                <br />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <TextFieldGroup
                    placeholder="Phone no, username or email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  </div>
                  <div className="form-group">
                  <TextFieldGroup 
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  </div>
                  <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-info btn-block mt-4">Login</button>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    (or)
                  </div>
                  <div className="form-group d-flex justify-content-center">
                  <i className="fab fa-facebook-square fa-2x"></i>
                  <button type="button" className="btn btn-link">
                    Login with Facebook
                  </button>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                  <a href="#">Forgot Password?</a>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                  <span>Don't have an account? </span>&nbsp;<Link to="/register"> Sign Up</Link>
                  </div>
                  
                
                  
                </form>
              </div>
              </div>
            </div>
          </div>
      
      
      
    )
  }
}
Landing.propTypes = {

  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, {loginUser})(Landing)
