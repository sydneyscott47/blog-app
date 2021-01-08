import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="main black">
    <h1>BLOGGR</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="nav_button">
            Home
          </Link>
          <Link to="/account" className="nav_button">
            My Account
          </Link>
          <Link to="/cart" className="nav_button">
            Favorites
          </Link>
          <a href="#" onClick={handleClick} className="nav_button">
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/" className="nav_button">
            Home
          </Link>
          <Link to="/login" className="nav_button">
            Login
          </Link>
          <Link to="/signup" className="nav_button">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
