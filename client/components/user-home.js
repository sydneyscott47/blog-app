import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="main">
      <Sidebar />
      <div className="all_product_container">
        <h3>Welcome, {email}</h3>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
