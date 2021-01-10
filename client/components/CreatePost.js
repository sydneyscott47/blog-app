import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createOrUpdatePost} from '../store/posts'
import {Link} from 'react-router-dom'

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
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={evt =>
            this.setState({
              title: evt.target.value,
              userId: user.id
            })
          }
        />
        <input
          type="text"
          value={this.state.content}
          onChange={evt => this.setState({content: evt.target.value})}
        />
        <Link to="/">
          <button
            type="submit"
            onClick={() => {
              this.props.addPost(this.state)
            }}
          >
            Add Post
          </button>
        </Link>
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
