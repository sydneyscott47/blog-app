import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {filterPosts} from '../store/posts'

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
          className={this.props.filter === '' ? 'filter_on' : 'filter'}
        >
          <h2>All Posts</h2>
        </Link>
        <Link
          to="/createPost"
          className={this.props.filter === '' ? 'filter_on' : 'filter'}
        >
          <h2>Create Post</h2>
        </Link>
        <Link
          to="/favorites"
          className={this.props.filter === '' ? 'filter_on' : 'filter'}
        >
          <h2>Favorites</h2>
        </Link>

        {/* Allows users to filter posts by searching by title and/or author */}
        <h2>Search Posts:</h2>
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
        <button
          type="submit"
          onClick={() => {
            this.props.filterPosts(this.state)
            this.setState({title: '', author: ''})
          }}
        >
          Enter
        </button>
      </aside>
    )
  }
}

const mapState = state => {
  return {
    filter: state.filter
  }
}

const mapDispatch = dispatch => {
  return {
    filterPosts: state => dispatch(filterPosts(state))
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
