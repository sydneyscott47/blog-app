import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Sidebar from './Sidebar'

/**
 * COMPONENT
 */

type AuthFormTypes = {
   name: string,
   displayName: () => void,
   handleSubmit: () => void,
   error: any,
 }

export const AuthForm = (props: AuthFormTypes) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="main">
      <form onSubmit={handleSubmit}
            name={name}
            data-testid="auth-form">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" data-testid="email" />
        </div>
        {(name === "signup") && <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>}
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" data-testid="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let username;
      if (evt.target.username) {
        username = evt.target.username.value
      }
      dispatch(auth(email, password, username, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
