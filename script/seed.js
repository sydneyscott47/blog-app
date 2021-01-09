'use strict'

const db = require('../server/db')
const {Post, User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const posts = await Promise.all([
    Post.create({
      title: 'First Post',
      content: 'Here we go!'
    })
  ])

  const users = await Promise.all([
    User.create({
      // name: 'Harry Potter',
      email: 'harry.potter@email.com',
      password: 'alohomora',
      username: 'seekr7',
      address: '4 Privet Drive',
      city: 'Surrey',
      state: 'NY',
      zip: 13456,
      card: 474747474747,
      isAdmin: true
    }),
    User.create({
      // name: 'Theodore Laurence',
      email: 'teddy@laurence.com',
      username: 'laurie',
      password: 'jo4ever',
      address: '123 Little Drive',
      city: 'Concord',
      state: 'MA',
      zip: 43522,
      card: 121212121212
    })
  ])

  console.log(`seeded ${users.length} users & ${posts.length} items`)
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
