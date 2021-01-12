import axios from 'axios'

const inititalPost = {
  id: 0,
  title: '',
  content: ''
}

const SET_POST = 'SET_POST'
const UPDATE_POST_INFO = 'UPDATE_POST_INFO'

// create post
export const setPost = post => {
  return {
    type: SET_POST,
    post
  }
}

// update post
export const updatePostInfo = post => {
  return {
    type: UPDATE_POST_INFO,
    post
  }
}

// get (read) post
export const fetchSinglePost = postId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/posts/${postId}`)
      const post = response.data
      dispatch(setPost(post))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const singlePostReducer = (post = inititalPost, action) => {
  switch (action.type) {
    case SET_POST:
      return action.post
    case UPDATE_POST_INFO:
      return action.post
    default:
      return post
  }
}

export default singlePostReducer
