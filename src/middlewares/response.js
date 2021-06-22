const config = require('../config/config');
const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const apiResponse = (req, res, response, statusCode = 200) => {

    if (config.env === 'development') {
        logger.info(JSON.parse(JSON.stringify(response)));
    }

    res.status(statusCode).send(response);
};

module.exports = {
    apiResponse,
};