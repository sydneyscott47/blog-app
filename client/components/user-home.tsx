import * as React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'

export const UserHome = props => {
  const {username} = props

  return (
    <div className="main">
      <Sidebar />
      <div className="all_post_container">
        <div className="post">
          <h3 data-testid="header">Welcome, {username}.</h3>
            <p>Use the sidebar to get started. View all posts,
            click on the heart to favorite, or create a post of your
            own!</p>
            <br />
            <p>You can also use the search bar to look for posts.
            Searching by title searches all posts for if their title includes your
            search phrase. </p>
            <br />
            <p>Searching by author pulls up all posts written by the username you are
            searching by.
            </p>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
