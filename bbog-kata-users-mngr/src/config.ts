import process from 'process';

export default {
  PORT: process.env.APPLICATION_PORT ?? '3000',
  database: {
    HOST: process.env.DB_HOST ?? 'localhost',
    PORT: parseInt(process.env.DB_PORT ?? '5432', 10),
    NAME: process.env.DB_NAME ?? 'usersdb',
    USER: process.env.DB_USER ?? 'admin',
    PASSWORD: process.env.DB_PASSWORD ?? 'admin123',
  },
};
