import React from 'react'
import {Link} from 'react-router-dom'
import '../../App.css'

function Footer() {
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg fixed-bottom navbar-light">
        
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#">ABOUT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">HELP</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">PRESS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">API</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">JOBS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">PRIVACY</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">TERMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">LOCATIONS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">TOP ACCOUNTS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">HASHTAGS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">LANGUAGE</Link>
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
