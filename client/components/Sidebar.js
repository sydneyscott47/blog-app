import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//import {fetchAllPosts} from '../store/posts'

const Sidebar = props => {
  return (
    <aside>
      <Link
        to="/"
        className={props.filter === '' ? 'filter_on' : 'filter'}
        //onClick={() => props.getItems()}
      >
        <h2>All Posts</h2>
      </Link>
      <Link
        to="/createPost"
        className={props.filter === '' ? 'filter_on' : 'filter'}
        //onClick={() => props.getItems()}
      >
        <h2>Create Post</h2>
      </Link>
      {/* Allows users to filter posts by searching */}
      <h2>Search:</h2>
      <Link
        to="/"
        className={props.filter === 'skin' ? 'filter_on' : 'filter'}
        //onClick={() => props.getItems('skin')}
      >
        <h2>Skin Care</h2>
      </Link>
    </aside>
  )
}
// const mapState = state => {
//   return {
//     filter: state.filter
//   }
// }
//
// const mapDispatch = dispatch => {
//   return {
//     getPosts: type => dispatch(fetchAllPosts(type))
//   }
// }

export default Sidebar

//export default connect(mapState, mapDispatch)(Sidebar)
