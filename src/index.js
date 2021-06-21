const express = require('express');
const config = require('./config/config');
const app = express();

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({message: 'Hello human. Request from IP address ' + ip + ' logged.'});
});

const port = config.port || 3000;

app.listen(port, () => {
    console.log(`env : ${config.env}`)
    console.log(`listening on port : ${port}`)
})