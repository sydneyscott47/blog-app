import * as express from 'express'
import Users from './users'
import Posts from './posts'

let router = express.Router()

router.use('/users', Users)
router.use('/posts', Posts)

class ErrorHandler extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super();
  }
}

router.use((req, res, next) => {
  const error = new ErrorHandler(404, 'Not Found')
  error.status = 404
  next(error)
})

export default router
