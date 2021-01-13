import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllPosts, deletePost} from '../store/posts'
import {addPostToFaves, getFaves} from '../store/favorites'
import UpdatePost from './UpdatePost'
import {AiOutlineHeart, AiOutlineDelete, AiFillHeart} from 'react-icons/ai'
import {BsPencil} from 'react-icons/bs'
import { UserAttributes, PostAttributes } from "../../server/db/interfaces";

type AllPostProps = {
  getPosts: () => void,
  getFaves: (id: number) => void,
  addFave: (postId: number, userId: number) => void,
  removePost: (post: PostAttributes) => void,
  user: UserAttributes,
  favorites: PostAttributes[],
  posts: PostAttributes[],
}

type AllPostState = {
  favorites: number[],
}

class AllPosts extends React.Component<AllPostProps, AllPostState> {
  constructor(props) {
    super(props)
    this.state = {
      favorites: []
    }
  }

  async componentDidMount() {
    await this.props.getPosts()
    await this.props.getFaves(this.props.user.id)

    if (this.props.user) {
      this.props.favorites.forEach(fave => this.setState({favorites: [...this.state.favorites, fave.id]}))
    }
  }

  render() {
    const posts = this.props.posts

    return (
      <div className="all_post_container">
        {posts.map(post => (
          <div className="post" key={post.id}>
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

            {this.props.user.id &&
              (this.state.favorites.includes(post.id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  this.props.addFave(post.id, this.props.user.id)
                  this.setState({favorites: [...this.state.favorites, post.id]})
                }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    posts: state.posts,
    user: state.user,
    favorites: state.favorites
  }
}

const mapDispatch = dispatch => {
  return {
    getPosts: () => dispatch(fetchAllPosts()),
    removePost: post => dispatch(deletePost(post)),
    addFave: (postId, userId) => dispatch(addPostToFaves(postId, userId)),
    getFaves: id => dispatch(getFaves(id)),
  }
}

export default connect(mapState, mapDispatch)(AllPosts)
