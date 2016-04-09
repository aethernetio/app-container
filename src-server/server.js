import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import requireDir from 'require-dir';

import ServiceRegistry from 'aethernet-service-registry-client';
import AppContainers from 'aethernet-app-container-client';

var debug = require('debug')('server');

const app = express();

// Set express up to automatically parse incoming JSON requests
// into the request object
app.use(bodyParser.json());

// Store the app globally for convenience
global.app = app;

// Include and run all files in the ./services folder
requireDir('services');

global.aether = { config: require('../aetherconfig.json') };

var registry = new ServiceRegistry(global.aether.config);

// Start the web server
var server = app.listen(0, () => {
  const host = server.address().address;
  const port = server.address().port;

  registry.register('container', `http://localhost:${port}`);

  debug(`Server listening at http://${host}:${port}`);
});
