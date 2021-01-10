'use strict'

const db = require('../server/db')
const {Post, User, Favorite} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const posts = await Promise.all([
    Post.create({
      title: 'Welcome to Bloggr.',
      content: `Feel free to have a look around. Here, you can read everyone's posts,
      make your own post, favorite the posts you love, and remove posts from favorites
      when you're done with 'em! Use the search bar on the left sidebar to get started.
      You can search by title or author.`
    })
  ])

  const users = await Promise.all([
    User.create({
      email: 'harry.potter@email.com',
      password: 'alohomora',
      username: 'seekr7'
    }),
    User.create({
      email: 'teddy@laurence.com',
      username: 'laurie',
      password: 'jo4ever'
    })
  ])

  const favorites = await Promise.all([
    Favorite.create({
      userId: 1,
      postId: 1
    })
  ])

  console.log(
    `seeded ${users.length} users, ${posts.length} posts, and ${
      favorites.length
    } favorites`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
