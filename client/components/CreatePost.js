import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createOrUpdatePost} from '../store/posts'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      userId: null
    }
  }

  render() {
    if (!this.props.user.id)
      return <div>Please make an account to create posts!</div>

    let user = this.props.user

    return (
      <div className="main">
        <Sidebar />
        <form action="/">
          <div className="product">
            <h2>Your thoughts go here.</h2>
            <hr />
            <div className="item">
              <h4>Post title</h4>
              <input
                type="text"
                name="name"
                value={this.state.title}
                onChange={evt =>
                  this.setState({
                    title: evt.target.value,
                    userId: user.id
                  })
                }
              />
            </div>
            <h4>Post content</h4>
            <textarea
              rows="10"
              value={this.state.content}
              onChange={evt => this.setState({content: evt.target.value})}
            />
            <Link to="/">
              <div className="btn-block">
                <button
                  type="submit"
                  onClick={() => {
                    this.props.addPost(this.state)
                  }}
                >
                  Create post
                </button>
              </div>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(createOrUpdatePost(post))
  }
}

export default connect(mapState, mapDispatchToProps)(NewPost)

// <div>
//   <input
//     type="text"
//     placeholder="Post title"
//     value={this.state.title}
// onChange={evt =>
//   this.setState({
//     title: evt.target.value,
//     userId: user.id
//   })
//     }
//   />
//   <br />
//   <textarea
//     type="text"
//     placeholder="Your blog post here!"
//     value={this.state.content}
//     onChange={evt => this.setState({content: evt.target.value})}
//   />
//   <br />
//   <Link to="/">
//     <button
//       type="submit"
// onClick={() => {
//   this.props.addPost(this.state)
// }}
//     >
//       Add Post
//     </button>
//   </Link>
// </div>
