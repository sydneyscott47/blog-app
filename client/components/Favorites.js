import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getFaves, removePostFromFaves} from '../store/favorites.ts'
import Sidebar from './Sidebar'

class Favorites extends React.Component {
  async componentDidMount() {
    await this.props.getFaves(this.props.user.id)
  }

  render() {
    const posts = this.props.favorites

    return (
      <div className="main">
        <Sidebar />
        <div className="all_product_container">
          {posts.map(post => (
            <div className="product" key={post.id}>
              <div>
                <img src="" />
              </div>
              <div>
                <div className="main">
                  <h3>{post.title}</h3>
                </div>
                {post.user && <div>By: {post.user.username}</div>}
                <p>{post.content}</p>
              </div>
              <Link to={`/posts/${post.id}`}>
                <button type="button">Read More</button>
              </Link>
              <br />
              {this.props.user && (
                <button
                  type="button"
                  onClick={() =>
                    this.props.removeFromFaves(post.id, this.props.user.id)
                  }
                >
                  Remove from Favorites
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    favorites: state.favorites,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getFaves: id => dispatch(getFaves(id)),
    removeFromFaves: (postId, userId) =>
      dispatch(removePostFromFaves(postId, userId))
  }
}

export default connect(mapState, mapDispatch)(Favorites)
