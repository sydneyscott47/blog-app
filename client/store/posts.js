import axios from 'axios'
import {setItem} from './singleItem'
import {setFilter} from './filterType'

const initialItems = []

const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'

const getAllItems = items => {
  return {
    type: GET_ALL_ITEMS,
    items: items
  }
}

const removeItem = item => {
  return {
    type: DELETE_ITEM,
    item
  }
}

const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}
//Getting all items in the data base or getting just the ones in a specific category
//setting the filter for styling
export const fetchAllItems = type => {
  return async dispatch => {
    try {
      let response
      if (type) {
        response = await axios.get(`/api/items/category/${type}`)
        dispatch(setFilter(type))
      } else {
        response = await axios.get('/api/items')
        dispatch(setFilter(''))
      }
      const items = response.data
      dispatch(getAllItems(items))
    } catch (error) {
      console.error(error.message)
    }
  }
}
//Allowing an admin to delete an item
export const deleteItem = item => {
  return async dispatch => {
    try {
      if (item.inventory) {
        throw new Error('Item still has inventory to sell')
      } else {
        await axios.delete(`/api/items/${item.id}`)
        dispatch(removeItem(item))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}
//creating or updating items in the inventory
export const createOrUpdateItem = (item, history) => {
  return async dispatch => {
    try {
      let newItem
      if (item.id) {
        newItem = await axios.put(`/api/items/${item.id}`, item)
      } else {
        const response = await axios.post('/api/items', item)
        newItem = response.data
        dispatch(addItem(newItem))
      }
      dispatch(setItem(newItem))
      history.push('/admin/items')
    } catch (error) {
      console.error(error.message)
    }
  }
}

const itemsReducer = (items = initialItems, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.items
    case DELETE_ITEM:
      return items.filter(item => item.id !== action.item.id)
    case ADD_ITEM:
      return [...items, action.item]
    default:
      return items
  }
}

export default itemsReducer
