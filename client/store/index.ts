import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import postsReducer from './posts'
import singlePostReducer from './singlePost'
import faveReducer from './favorites'

const reducer = combineReducers({
  user,
  posts: postsReducer,
  singlePost: singlePostReducer,
  favorites: faveReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
