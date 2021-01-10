const router = require('express').Router()
const {Post, User, Favorite} = require('../db/models')

// GETs all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({include: User})
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

// GETs the favorites of that user
router.get('/favorites/:userId', async (req, res, next) => {
  try {
    const posts = await Favorite.findAll({where: {userId: req.params.userId}})

    let faves = []

    for (let i = 0; i < posts.length; i++) {
      let id = posts[i].postId
      let fave = await Post.findByPk(id, {include: User})
      faves.push(fave)
    }

    res.send(faves)
  } catch (error) {
    next(error)
  }
})

// GET /api/items/category/:category
// router.get('/category/:category', async (req, res, next) => {
//   try {
//     const items = await Item.findAll({where: {category: req.params.category}})
//     if (!items.length) {
//       const err = new Error('No items were found')
//       err.status = 404
//       next(err)
//     }
//     res.send(items)
//   } catch (error) {
//     next(error)
//   }
// })

// GETs single post
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId, {
      include: [User]
    })
    if (post) {
      res.send(post)
    } else {
      const err = new Error('Post not found')
      err.status = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

// POSTs a new post
router.post('/', async (req, res, next) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId
    })
    res.send(newPost)
  } catch (error) {
    next(error)
  }
})

// POSTs a favorite post
router.post('/favorites/:postId&:userId', async (req, res, next) => {
  try {
    const newFavorite = await Favorite.create({
      postId: req.params.postId,
      userId: req.params.userId
    })
    res.send(newFavorite)
  } catch (error) {
    next(error)
  }
})

// PUTs a single post
router.put('/:postId', async (req, res, next) => {
  try {
    const updated = await Post.update(req.body, {
      where: {id: req.params.postId},
      returning: true,
      plain: true
    })
    res.send(updated[1])
  } catch (err) {
    next(err)
  }
})

// DELETEs a single post
router.delete('/:postId', async (req, res, next) => {
  try {
    await Post.destroy({where: {id: req.params.postId}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// DELETEs a favorite post
router.delete('/favorites/:postId&:userId', async (req, res, next) => {
  try {
    const rows = await Favorite.destroy({
      where: {
        postId: req.params.postId,
        userId: req.params.userId
      }
    })
    res.sendStatus(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
