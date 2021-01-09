import React from 'react'
import {connect} from 'react-redux'
import {fetchSinglePost} from '../store/singlePost'
import UpdatePost from './UpdatePost'

class SinglePost extends React.Component {
  constructor() {
    super()
    this.state = {
      qty: '1'
    }
    //this.changeQuantity = this.changeQuantity.bind(this)
    //this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const postId = this.props.match.params.postId
    this.props.getPost(postId)
  }

  // async handleAddToCart(evt, item) {
  //   evt.preventDefault()
  //   await this.props.addToCart(item, this.props.user.id, Number(this.state.qty))
  //   this.setState({qty: '1'})
  // }

  render() {
    const post = this.props.post
    console.log(post)
    return (
      <div>
        <div className="single_item">
          <div>
            <button
              type="button"
              //  onClick={event => this.handleAddToCart(event, item)}
            >
              Add to Favorites
            </button>
          </div>
          <div>
            <h2>{post.title}</h2>
            {post.user && <h3>By: {post.user.username}</h3>}
            <p>{post.content}</p>
          </div>
        </div>
        <UpdatePost id={post.id} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    post: state.singlePost,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getPost: postId => dispatch(fetchSinglePost(postId))
    //addToCart: (item, userId, num) => dispatch(itemToAdd(item, userId, num))
  }
}

export default connect(mapState, mapDispatch)(SinglePost)
