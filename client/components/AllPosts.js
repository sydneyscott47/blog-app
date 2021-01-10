import React from 'react'
import {fetchAllPosts, deletePost} from '../store/posts'
import {addPostToFaves} from '../store/favorites.ts'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiOutlineDelete} from 'react-icons/ai'

class AllPosts extends React.Component {
  async componentDidMount() {
    await this.props.getPosts()
  }

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
            <br />
            {post.user &&
              post.user.id === this.props.user.id && (
                <AiOutlineDelete onClick={() => this.props.removePost(post)} />
              )}
            <AiOutlineHeart
              onClick={() => this.props.addFave(post.id, this.props.user.id)}
            />
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
    removePost: post => dispatch(deletePost(post)),
    addFave: (postId, userId) => dispatch(addPostToFaves(postId, userId))
  }
}

export default connect(mapState, mapDispatch)(AllPosts)
