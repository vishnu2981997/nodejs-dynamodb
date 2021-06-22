const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/v1');

const app = express();
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// enable cors
app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    limit: '1mb',
    extended: true
}));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '10mb'}));

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({message: 'Hello human. Request from IP address ' + ip + ' logged.'});
});

app.use('/v1', routes);

module.exports = app;