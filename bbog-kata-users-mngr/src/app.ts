import express from 'express';
import path from 'node:path';
import { responseHandler } from 'express-intercept';
import { deflateRawSync } from 'node:zlib';

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
  })
);

const API_PATH = '/kata-users-mngr/V1';

export default app;
