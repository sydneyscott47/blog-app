import React from 'react'
import AllPosts from './AllPosts'
import Sidebar from './Sidebar'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <AllPosts />
      </div>
    )
  }
}
