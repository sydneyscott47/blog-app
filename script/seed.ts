import { PostAttributes, UserAttributes, FavoriteAttributes } from '../server/db/interfaces';
import db from '../server/db';
import { Post, User, Favorite } from '../server/db/models';

const posts: PostAttributes[] = [
  { title: 'Welcome to Bloggr.',
  content: `Let's take a look around.`
 },
 {
   title: `Here's how this works.`,
   content: `Feel free to have a look around. Here, you can read everyone's posts,
   make your own post, favorite the posts you love, and remove posts from favorites
   when you're done with 'em! Use the search bar on the left sidebar to get started.
   You can search by title or author.`
 }
];

const users: UserAttributes[] = [{
    email: 'harry.potter@email.com',
    password: 'alohomora',
    username: 'seekr7'
  },
  {
    email: 'teddy@laurence.com',
    username: 'laurie',
    password: 'jo4ever'
  }
];

const favorites: FavoriteAttributes[] = [
  {
    userId: 1,
    postId: 1
  }
];

const seed = () =>
  Promise.all(users.map((user: UserAttributes) =>
    User.create(user))
  )
  .then(() =>
  Promise.all(posts.map((post: PostAttributes) =>
    Post.create(post))
  ))
  .then(() =>
  Promise.all(favorites.map((favorite: FavoriteAttributes) =>
    Favorite.create(favorite))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then((): Promise<any> => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch((err: any) => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then((): void => {
      db.close();
      return null;
    });
};

main();
