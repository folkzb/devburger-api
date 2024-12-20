import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';

dotenv.config();

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL);
  }
}
export default new Database();
