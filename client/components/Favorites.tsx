import React from 'react'
import {connect} from 'react-redux'
import {getFaves, removePostFromFaves} from '../store/favorites.ts'
import Sidebar from './Sidebar'
import {AiFillHeart} from 'react-icons/ai'
import { UserAttributes, FavoriteAttributes, PostAttributes } from "../../server/db/interfaces";

type FavoritesProps = {
  getFaves: (id: number) => void,
  removeFromFaves: (postId: number, userId: number) => void,
  favorites: PostAttributes[],
  user: UserAttributes
}

class Favorites extends React.Component<FavoritesProps> {
  async componentDidMount() {
    await this.props.getFaves(this.props.user.id)
  }

  render() {
    console.log(this.props)
    const posts = this.props.favorites

    if (!posts.length) {
      return (
        <div className="main">
          <Sidebar />
          <div className="post">
            <p>No favorites yet!</p>
          </div>
        </div>
      )
    }

    return (
      <div className="main">
        <Sidebar />
        <div className="all_post_container">
          {posts.map(post => (
            <div className="post" key={post.id}>
              <div>
                <div className="main">
                  <h3>{post.title}</h3>
                </div>
                  <p>{post.content}</p>
                <hr />
                {post.user && <div>By: {post.user.username}</div>}
              </div>
              <br />
              {this.props.user && (
                <AiFillHeart
                  onClick={() =>
                    this.props.removeFromFaves(post.id, this.props.user.id)
                  }
                />
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
