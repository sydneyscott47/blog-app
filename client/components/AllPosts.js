import React from 'react'
import {fetchAllPosts, deletePost} from '../store/posts'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllPosts extends React.Component {
  // constructor() {
  //   super()
  //   this.handleAddToCart = this.handleAddToCart.bind(this)
  // }

  async componentDidMount() {
    await this.props.getPosts()
  }

  // async handleAddToCart(evt, item) {
  //   evt.preventDefault()
  //   await this.props.addToCart(item, this.props.user.id)
  // }

  render() {
    const posts = this.props.posts

    return (
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
            <button type="button" onClick={() => this.props.removePost(post)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    posts: state.posts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getPosts: () => dispatch(fetchAllPosts()),
    removePost: post => dispatch(deletePost(post))
  }
}

export default connect(mapState, mapDispatch)(AllPosts)
