const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const {integrationTokenServices} = require('../services');

const verifyApiAccess = (route) => {

};

const verifyAccessToken = catchAsync(async (req, res, next) => {
        const {authorization} = req.headers;
        if (!authorization) {
            return next(new ApiError(httpStatus.BAD_REQUEST, 'Authorization required'));
        }
        const token = authorization.split(' ').length > 1 ? authorization.split(' ')[1] : undefined
        if (!token) {
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authorization Access'));
        }
        try {
            let unSignedToken = jwt.verify(token, config.jwt.secret);
            if (unSignedToken.isSuperAdmin) {
                req.user = unSignedToken;
                req.user.serviceName = unSignedToken.sub;
                req.service = unSignedToken.sub;
            } else {
                req.service = req.service = unSignedToken.sub;
                const integrationToken = await integrationTokenServices.getIntegrationTokenByServiceName(req.service);
                if (!integrationToken || !integrationToken.length) {
                    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authorization Access'));
                }
                req.user = integrationToken[0];
            }
            console.log(req.user);
        } catch (error) {
            console.log(error);
            return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authorization Access'));
        }
        next();
    }
);

module.exports = {
    verifyAccessToken,
    verifyApiAccess,
};