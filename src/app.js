const express = require('express');
const routes = require('./routes/v1');
const app = express();

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({message: 'Hello human. Request from IP address ' + ip + ' logged.'});
});

app.use('/v1', routes);

module.exports = app;