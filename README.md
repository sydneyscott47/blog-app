# Bloggr

## Setup

To run Bloggr on your local machine, run the following commands:

```
git clone https://github.com/FullstackAcademy/boilermaker.git
npm install
npm run seed
npm run start-dev
```

## Views

The Bloggr homepage is viewable to all, whether guests or users.

Logging in gives access to a user homepage.

<img src="https://i.ibb.co/B4szG1D/user-home.png" alt="userHome" />

Only logged in users have the ability to favorite (by clicking the heart icon).

Logged in users can also write new posts.

Users can delete or edit the posts (by clicking the trash or pencil icons) that they themselves have made.

From the favorites page, users can click on the heart icon again to unfavorite.

Guests have the ability to log in or create a new account.

## Architecture

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Testing

Ready to go world wide? Here's a guide to deployment! There are two
supported ways to deploy in Boilermaker:

* automatically, via continuous deployment with Travis.
* "manually", from your local machine via the `deploy` script.

Either way, you'll need to set up your deployment server to start.
The steps below are also covered in the CI/CD workshop.

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

### Authors

* Sydney Scott
* Fullstack Academy for the boilerplate code
