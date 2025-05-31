#!/usr/bin/env node

/**
 * Module dependencies.
 */
import debugLib from 'debug';
import config from '../config';
import * as http from 'http';
import app from '../app';

const debug = debugLib('bdb:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const www = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

www.listen(port);
www.on('error', onError);
www.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
	const nPort = parseInt(val, 10);

	if (isNaN(nPort)) {
		return val;
	}

	if (nPort >= 0) {
		return nPort;
	}

	return false;
}

/**
 * Event listener for HTTP server 'errors' event.
 */

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			debug(`${bind}  requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			debug(`${bind}  is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
	const address = www.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port ${(address as any).port}`;
	debug(`Listening on ${bind}`);
}
