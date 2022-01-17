import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


function Navigation({ auth, logout }) {

  return (
    <nav className="navbar navbar-expand-lg menu_one navbar_fixed fadeInDown">
      <div className="container">
        <NavLink to="/" className="nav-logo">Forum</NavLink>
        <ul className="navbar-nav ml-auto">
          {!auth ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Log in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign Up
              </NavLink>
            </li>
          </>
          ) : (
            <li className="nav-item">
              <span onClick={logout} className="nav-link nav-link--logout">
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}


const mapStateToProps = function ({ user }) {
    return {
      auth: user.auth,
    }
}

export default connect(mapStateToProps)(Navigation)