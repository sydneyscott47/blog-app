import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db'
import {PostAttributes} from '../interfaces';
import {UserInstance} from './user';

export interface PostInstance extends Sequelize.Model<PostAttributes>, PostAttributes {
  getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>
  setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>
  createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserInstance>
}

export const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: Sequelize.TEXT
})
