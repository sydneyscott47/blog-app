const router = require('express').Router()
const {Post, User} = require('../db/models')

//GET /api/posts/
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({include: User})
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

//GET /api/items/category/:category
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

//GET /api/posts/:postId
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

//POST /api/posts/
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

//PUT /api/posts/:postId
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

//DELETE /api/posss/:postId
router.delete('/:postId', async (req, res, next) => {
  try {
    await Post.destroy({where: {id: req.params.postId}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
