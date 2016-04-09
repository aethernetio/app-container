import express from 'express';

// Define a new api subroute for requests that
// start with /api/applications
const router = express.Router();

global.app.use('/api/container', router);

// Add REST API for app containers.

// Start an application
router.post('start/:app', (req, res) => {

});
