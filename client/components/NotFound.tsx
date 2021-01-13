import React from 'react'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'

export const NotFound = props => {

  return (
    <div className="main">
      <Sidebar />
      <div className="all_product_container">
        <div className="product">
          <h3>Not Found</h3>
            <p>Perhaps you need to make an account? :)</p>
        </div>
      </div>
    </div>
  )
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(NotFound)
