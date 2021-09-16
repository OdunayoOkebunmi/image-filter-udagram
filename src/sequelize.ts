import { Sequelize } from 'sequelize-typescript';
import env from '../src/util/env'


// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": env.username,
  "password": env.password,
  "database": env.database,
  "host": env.host,

  dialect: 'postgres',
  storage: ':memory:',
});

