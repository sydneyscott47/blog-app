import React from 'react'
//import {fetchAllPosts} from '../store/posts'
import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'

class AllPosts extends React.Component {
  // constructor() {
  //   super()
  //   this.handleAddToCart = this.handleAddToCart.bind(this)
  // }

  // async componentDidMount() {
  //   await this.props.getPosts()
  //
  // }
  //
  // async handleAddToCart(evt, item) {
  //   evt.preventDefault()
  //   await this.props.addToCart(item, this.props.user.id)
  // }

  render() {
    return <div>hello world</div>
  }
}

//   render() {
//     return (
//       <div className="all_product_container">
//         {items.map(item => (
//           <Link className="product" to={`/item/${item.id}`} key={item.id}>
//             <div>
//               <img src={item.image} />
//             </div>
//             <div>
//               <div className="main">
//                 <h3>{item.name}</h3>
//                 <h3>${item.price / 100}</h3>
//               </div>
//               <p>{item.description}</p>
//             </div>
//             <button
//               type="button"
//               onClick={event => this.handleAddToCart(event, item)}
//             >
//               Add to Cart
//             </button>
//           </Link>
//         ))}
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     posts: state.posts,
//     user: state.user
//   }
// }
//
// const mapDispatch = dispatch => {
//   return {
//     getPosts: () => dispatch(fetchAllPosts()),
//   }
// }

export default AllPosts

//export default connect(mapState, mapDispatch)(AllPosts)
