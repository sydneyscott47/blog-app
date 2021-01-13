const User = require('./user')
const Post = require('./post')
const db = require('../db')

User.hasMany(Post)
Post.belongsTo(User)

const Favorite = db.define('favorite', {})

User.belongsToMany(Post, {through: Favorite})
Post.belongsToMany(User, {through: Favorite})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 */
module.exports = {
  User,
  Post,
  Favorite
}
