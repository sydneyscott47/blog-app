import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../store/posts'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: ''
    }
  }

  render() {
    return (
      <aside>
        <Link
          to="/"
          className={this.props.filter === '' ? 'filter' : 'filter_on'}
          //onClick={() => props.getItems()}
        >
          <h2>All Posts</h2>
        </Link>
        <Link
          to="/createPost"
          className={this.props.filter === '' ? 'filter_on' : 'filter'}
          //onClick={() => props.getItems()}
        >
          <h2>Create Post</h2>
        </Link>
        {/* Allows users to filter posts by searching by title and/or author */}
        <h2>Search:</h2>
        <input
          type="text"
          placeholder="Search by title"
          value={this.state.title}
          onChange={event => this.setState({title: event.target.value})}
        />
        <br />
        <input
          type="text"
          placeholder="Search by author"
          value={this.state.author}
          onChange={event => this.setState({author: event.target.value})}
        />
        <button type="submit" onClick={() => this.props.getPosts(this.state)}>
          Enter
        </button>
      </aside>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getPosts: filters => dispatch(fetchAllPosts(filters))
  }
}

export default connect(null, mapDispatch)(Sidebar)
