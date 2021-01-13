import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createOrUpdatePost} from '../store/posts'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import { PostAttributes } from "../../server/db/interfaces";

type UpdatePostProps = {
  location: any,
  addPost: (post: PostAttributes) => void,
};

type UpdatePostState = {
  title: string;
  content: string;
  postId: number
};

class UpdatePost extends Component<UpdatePostProps, UpdatePostState> {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      postId: 0
    }
  }

  componentDidMount() {
    const url = this.props.location.pathname.split("/")
    const id = url[2]
    this.setState({postId: id})
  }

  render() {
    return (
      <div className="main">
        <Sidebar />
        <form action="/">
          <div className="post">
            <h2>Edit post</h2>
            <hr />
            <div className="item">
              <h4>New post title</h4>
              <input
                type="text"
                name="name"
                value={this.state.title}
                onChange={evt =>
                  this.setState({
                    title: evt.target.value,
                  })
                }
              />
            </div>
            <h4>New post content</h4>
            <textarea
              rows={10}
              value={this.state.content}
              onChange={evt => this.setState({content: evt.target.value})}
            />
            <Link to="/">
              <div className="btn-block">
                <button
                  type="submit"
                  onClick={() => {
                    this.props.addPost({
                      id: this.state.postId,
                      title: this.state.title,
                      content: this.state.content
                    })
                  }}
                >
                  Update post
                </button>
              </div>
            </Link>
          </div>
        </form>
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
