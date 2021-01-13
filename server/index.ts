import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as io from 'socket.io';
import * as passport from 'passport';
import * as compression from 'compression';
import auth from './auth'
import api from './api'

import socket from './socket'
import db from './db';

import * as session from 'express-session'
// import SequelizeStore from 'connect-session-sequelize'
// const SqlStore = SequelizeStore(session.Store)
// const sessionStore = new SqlStore({db})

const PORT = process.env.PORT || 8000
const app = express()

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

class ErrorHandler extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super();
  }
}

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', auth)
  app.use('/api', api)

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new ErrorHandler(404, 'Not found')
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err: ErrorHandler, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
  //  db.sync().then(() => console.log('Database is synced'));
  }
  )
  const socketIo = io(server);
  socket(socketIo);
}

async function bootApp() {
//  await sessionStore.sync()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}

export default app;
