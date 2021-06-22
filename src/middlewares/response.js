const config = require('../config/config');
const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const apiResponse = (req, res, data, statusCode = 200) => {
    const response = data;

    if (config.env === 'development') {
        logger.info(JSON.stringify(data));
    }

    res.status(statusCode).send(response);
};

module.exports = {
    apiResponse,
};