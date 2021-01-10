import axios from 'axios'
import store from './index'

const ADD_TO_FAVES = 'ADD_TO_FAVES'
const REMOVE_FROM_FAVES = 'REMOVE_FROM_FAVES'
const GOT_FAVES = 'GOT_FAVES'

export const addToFaves = post => {
  return {type: ADD_TO_FAVES, post}
}

export const gotFaves = faves => ({
  type: GOT_FAVES,
  faves
})

export const removeFromFaves = postId => ({
  type: REMOVE_FROM_FAVES,
  postId
})

export const getFaves = userId => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        console.error('Guests cannot favorite posts')
      } else {
        const {data} = await axios.get(`/api/posts/favorites/${userId}`)
        if (data) {
          dispatch(gotFaves(data))
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const addPostToFaves = (postId, userId) => {
  return async dispatch => {
    try {
        await axios.post(`/api/posts/favorites/${postId}&${userId}`)
        dispatch(addToFaves(postId))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const removePostFromFaves = (postId, userId) => {
  return async dispatch => {
    try {
        await axios.delete(`/api/posts/favorites/${postId}&${userId}`)
        dispatch(removeFromFaves(postId))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const initialState = []

const faveReducer = (faves = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVES:
      return [...faves, action.post]
    case GOT_FAVES:
      return action.faves
    case REMOVE_FROM_FAVES:
      return faves.filter(fave => {
        if (fave.id !== action.postId) return fave
      })
    default:
      return faves
  }
}

export default faveReducer
