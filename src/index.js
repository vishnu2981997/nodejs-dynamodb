const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.status(200).json({message: 'Hello human. Request from IP address ' + ip + ' logged.'});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`env : ${process.env.NODE_ENV}`)
    console.log(`listening on port : ${port}`)
})