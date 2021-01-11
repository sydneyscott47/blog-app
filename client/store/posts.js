import axios from 'axios'
import {updatePostInfo} from './singlePost'

const GET_ALL_POSTS = 'GET_ALL_POSTS'
const DELETE_POST = 'DELETE_POST'
const ADD_POST = 'ADD_POST'

const getAllPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

const removePost = post => {
  return {
    type: DELETE_POST,
    post
  }
}

const addPost = post => {
  return {
    type: ADD_POST,
    post
  }
}

// Getting all posts
export const fetchAllPosts = () => {
  return async dispatch => {
    try {
      let response = await axios.get('/api/posts')
      const posts = response.data
      dispatch(getAllPosts(posts))
    } catch (error) {
      console.error(error.message)
    }
  }
}

// Deleting a post
export const deletePost = post => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${post.id}`)
      dispatch(removePost(post))
    } catch (error) {
      console.error(error.message)
    }
  }
}

// Creating a new post or updating an existing post
export const createOrUpdatePost = post => {
  return async dispatch => {
    try {
      let newPost
      if (post.id) {
        const {data} = await axios.put(`/api/posts/${post.id}`, post)
        dispatch(updatePostInfo(data))
      } else {
        const response = await axios.post('/api/posts', post)
        newPost = response.data
        dispatch(addPost(newPost))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const filterPosts = filter => {
  return async dispatch => {
    try {
      let response
      if (filter.title) {
        response = await axios.get(`/api/posts/filter/title/${filter.title}`)
      } else if (filter.author) {
        response = await axios.get(`/api/posts/filter/author/${filter.author}`)
      } else {
        response = await axios.get('/api/posts')
      }
      let posts = response.data
      dispatch(getAllPosts(posts))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const initialPosts = []

const postsReducer = (posts = initialPosts, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts
    case DELETE_POST:
      return posts.filter(post => post.id !== action.post.id)
    case ADD_POST:
      return [...posts, action.post]
    default:
      return posts
  }
}

export default postsReducer
