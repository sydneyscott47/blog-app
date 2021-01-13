import {User} from './user'
import {Post} from './post'
import db from '../db'

User.hasMany(Post)
Post.belongsTo(User)

const Favorite = db.define<any,any>('favorite', {})

User.belongsToMany(Post, {through: Favorite})
Post.belongsToMany(User, {through: Favorite})

export {
  User,
  Post,
  Favorite
}
