import { drizzle } from 'drizzle-orm/node-postgres';
import config from '../config';
import * as schema from './schema';

export const db = drizzle({
  connection: {
    host: config.database.HOST,
    port: config.database.PORT,
    database: config.database.NAME,
    user: config.database.USER,
    password: config.database.PASSWORD,
  },
  casing: 'snake_case',
  schema,
});
