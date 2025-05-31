import { defineConfig } from 'drizzle-kit';
import config from './src/config';

export default defineConfig({
  out: './.drizzle',
  schema: './src/db/schema.ts',
  casing: 'snake_case',
  dialect: 'postgresql',
  dbCredentials: {
    host: config.database.HOST,
    port: config.database.PORT,
    database: config.database.NAME,
    user: config.database.USER,
    password: config.database.PASSWORD,
    ssl: false,
  },
});
