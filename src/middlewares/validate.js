const Ajv = require("ajv")
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    if (!validate(req.body)) {
        const errorMessage = validate.errors.map((details) => {
            if (details.instancePath !== "") {
                return `${details.instancePath} ${details.message}`;
            }
            return details.message
        }).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    next();
};

module.exports = validate;