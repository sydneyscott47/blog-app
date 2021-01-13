import { Sequelize, Model, DataTypes } from 'sequelize';

let databaseName;

if (process.env.NODE_ENV === 'test') {
  databaseName = 'blog-app-test'
}

else {
  databaseName = 'blog-app'
}

const db = new Sequelize(
  process.env.DATABASE_URL ||
  `postgres://localhost:5432/${databaseName}`, {
    logging: false
  }
);

export default db;
