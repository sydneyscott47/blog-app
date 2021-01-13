# Bloggr

Welcome to Bloggr, a simple CRUD app for users to view and create blog posts.

Bloggr was built with TypeScript, React, and Redux on the front end, and TypeScript, Node, and Express on the back end. It uses a PostreSQL database implemented with Sequelize.

## Setup

To run Bloggr on your local machine, run the following commands. Note that you must have Postres installed.

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

<img src="https://i.ibb.co/5hY4HJm/Screen-Shot-2021-01-12-at-11-43-51-PM.png" alt="homePage" />

Guests have the ability to log in or create a new account.

<img src="https://i.ibb.co/Pw0WPsy/Screen-Shot-2021-01-13-at-1-26-50-AM.png" alt="signup" />

Logging in gives access to a user homepage.

<img src="https://i.ibb.co/B4szG1D/user-home.png" alt="userHome" />

Only logged-in users have the ability to favorite posts (by clicking the heart icon). From the favorites page, users can click on the heart icon again to unfavorite.

<img src="https://s2.gifyu.com/images/Favoriting-1.gif" alt="favoriting" />

Logged-in users can also write new posts.

<img src="https://i.ibb.co/gW5DBvq/Screen-Shot-2021-01-13-at-9-28-38-AM.png" alt="createpost" />

Users can delete or edit the posts (by clicking the trash or pencil icons) that they themselves have made.

<img src="https://i.ibb.co/9sw25fd/Screen-Shot-2021-01-13-at-9-30-09-AM.png" alt="edit" />

Using the search function in the sidebar, users can filter posts by either title or author.

<img src="https://i.ibb.co/znLvTsG/Screen-Shot-2021-01-13-at-9-32-05-AM.png" alt="search" />

## Architecture

This app follows the [Flux](https://facebook.github.io/flux/docs/in-depth-overview/#:~:text=Flux%20is%20the%20application%20architecture,a%20lot%20of%20new%20code.) architecture style, as popularized by Facebook.

Data flow in Flux is unidirectional. Using React-Redux, the Bloggr app features the three main parts of Flux: the dispatcher, the stores, and the views. Users cannot impact the data in the Redux store directly; any actions users take gets sent to the store via a dispatcher. These actions are provided to the dispatcher with action creators. Once the store has been updated, it emits change events that rerender the view.

There are [slight differences](https://www.educba.com/redux-vs-flux/) between Redux and Flux, but they follow the same logic and pattern in establishing data flow.

### User Interface

The UI features the following React components, written in TypeScript:

* HomePage
* Navbar
* AllPosts
* CreatePost
* UpdatePost
* Favorites
* Sidebar
* NotFound
* UserHome
* Auth-form

### Code Design

_Relationships_: State is managed by the Redux store and holds all of the posts to display, the logged-in user, and the logged-in user's favorite posts.

_Best practices_: Front-end components are DRY and reusable. For instance, the auth-form component is leveraged for both logging in and signing up purposes. Using Redux allows for a single source of truth in the app, meaning that users cannot access or modify the store directly.

_Backend architecture_: The database schema involves a User table and a Posts table with a one-to-many relationship, with users as the post author.
There is also a many-to-many relationship between Users and Posts with the through table, Favorites. This is to ensure that multiple users can like multiple posts.

## Testing

To run the suite of tests, run `npm test` in the command line.

## Future Directions

This project was completed on a 7-day deadline. Given more time, these are the features I would build out next:

* _Protecting API routes_: Restricting user access to admins and restricting access to update/delete routes to only the users who authored those posts
* _Testing_: Writing more unit tests and ensuring that all unit tests run correctly
* _Leveraging TypeScript_: Adding further typing to the front and back end
* _Deploying_: Deploying the code to a live site using a platform such as Heroku

## Authors

* Sydney Scott
* Bootstrapped with boilerplate code from Fullstack Academy
