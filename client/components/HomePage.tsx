import React from 'react'
import AllPosts from './AllPosts'
import Sidebar from './Sidebar'

export default class HomePage extends React.Component<any,any> {
  render() {
    return (
      <div className="main">
        <Sidebar />
        <AllPosts />
      </div>
    )
  }
}
