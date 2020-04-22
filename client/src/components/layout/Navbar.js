import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authactions'
import { Link } from 'react-router-dom';


class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    //when the user is logged in
    const authLinks = (<ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/feed"> Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard"> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a href="" onClick={this.onLogoutClick.bind(this)}
          className="nav-link">
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a gravatar connected to your email to display an image"
          />
          <Link to="/">Logout</Link>
        </a>
      </li>
    </ul>);
    const guestLinks = (<div></div>);
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark  mb-4">
        <div className="container">
          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }

}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
