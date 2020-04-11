import React from 'react'

function Footer() {
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg fixed-bottom navbar-light">
        <a className="navbar-brand" href="#"></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">ABOUT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">HELP</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">PRESS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">API</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">JOBS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">PRIVACY</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">TERMS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">LOCATIONS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">TOP ACCOUNTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">HASHTAGS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">LANGUAGE</a>
            </li>
          </ul>
          <span className="navbar-text">
          Copyright &copy; {new Date().getFullYear()} Snapshare
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Footer
