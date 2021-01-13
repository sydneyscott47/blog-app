# Bloggr

Welcome to Bloggr, a simple CRUD app for users to view and create blog posts.

Bloggr was built with TypeScript, React, and Redux on the front end, and TypeScript, Node, and Express on the back end. It uses a PostreSQL database implemented with Sequelize.

## Setup

To run Bloggr on your local machine, run the following commands. Note that you must have PostreSQL installed.

```
git clone https://github.com/sydneyscott47/blog-app.git
npm install
createdb blog-app
createdb blog-app-test
npm run seed
npm run start-dev
```

## Views

The Bloggr homepage is viewable to all, whether guests or users.

Guests have the ability to log in or create a new account.

Logging in gives access to a user homepage.

<img src="https://i.ibb.co/B4szG1D/user-home.png" alt="userHome" />

Only logged in users have the ability to favorite posts. (by clicking the heart icon).

Logged in users can also write new posts.

Users can delete or edit the posts (by clicking the trash or pencil icons) that they themselves have made.

From the favorites page, users can click on the heart icon again to unfavorite.

## Architecture

This app follows the \_\_ style.

## Testing

To test the app, run `npm test` in the command line.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

## Authors

* Sydney Scott
* Fullstack Academy for the boilerplate code
