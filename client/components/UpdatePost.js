import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createOrUpdatePost} from '../store/posts'

class UpdatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: ''
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={evt => this.setState({title: evt.target.value})}
        />
        <input
          type="text"
          value={this.state.content}
          onChange={evt => this.setState({content: evt.target.value})}
        />
        <button
          type="submit"
          onClick={() => {
            this.props.addPost({
              id: this.props.id,
              title: this.state.title,
              content: this.state.content
            })
            this.setState({title: '', content: ''})
          }}
        >
          Update Post
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(createOrUpdatePost(post))
  }
}

export default connect(null, mapDispatchToProps)(UpdatePost)
