import React from 'react'
import {fetchAllPosts, deletePost} from '../store/posts'
import {
  addPostToFaves,
  getFaves,
  removePostFromFaves
} from '../store/favorites.ts'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiOutlineDelete, AiFillHeart} from 'react-icons/ai'
import {BsPencil} from 'react-icons/bs'
import UpdatePost from './UpdatePost'

class AllPosts extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  async componentDidMount() {
    await this.props.getPosts()
    await this.props.getFaves(this.props.user.id)
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
              <p>{post.content}</p>
              <hr />
              {post.user && <div>By: {post.user.username}</div>}
            </div>

            <br />

            {post.user &&
              post.user.id === this.props.user.id && (
                <AiOutlineDelete onClick={() => this.props.removePost(post)} />
              )}

              {post.user &&
                post.user.id === this.props.user.id && (
                <Link to={`/update/${post.id}`}>
                  <BsPencil />
                </Link>
                )}

            {this.state.favorites.includes(post.id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  this.props.addFave(post.id, this.props.user.id)
                  this.setState({favorites: [...this.state.favorites, post.id]})
                }}
              />
            )}
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
    addFave: (postId, userId) => dispatch(addPostToFaves(postId, userId)),
    getFaves: id => dispatch(getFaves(id)),
    removeFromFaves: (postId, userId) =>
      dispatch(removePostFromFaves(postId, userId))
  }
}

export default connect(mapState, mapDispatch)(AllPosts)
