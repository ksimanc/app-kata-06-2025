import express from 'express';
import path from 'node:path';
import { responseHandler } from 'express-intercept';
import { deflateRawSync } from 'node:zlib';
import { UsersController } from './controllers/users.controller';
import { AppsController } from './controllers/apps.controller';

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../static')));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
  res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
  next(); // NOSONAR
});

app.use(
  responseHandler().getString((str, _req, res) => {
    res?.setHeader('x-auth-token', deflateRawSync(str).toString('base64'));
  }),
);

const API_PATH = '/kata-users-mngr/V1';

app.use(`${API_PATH}/users`, UsersController);
app.use(`${API_PATH}/apps`, AppsController);

export default app;
