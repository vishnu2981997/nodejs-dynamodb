const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const {v4: uuidV4} = require('uuid');
const {IntegrationToken} = require('../models');


const generateAccessToken = async (serviceBody, secret) => {
    try {
        const payload = {
            sub: serviceBody.serviceName,
            iat: moment().unix(),
            type: 'ACCESS_TOKEN',
            isSuperAdmin: false,
        };
        return jwt.sign(payload, secret);
    } catch (error) {
        throw new Error(error.message);
    }
};

const createIntegrationToken = async (tokenBody, user) => {
    tokenBody.id = uuidV4();

    const accessToken = await generateAccessToken(tokenBody, config.jwt.secret);

    tokenBody.tokens = {};
    tokenBody.tokens.accessToken = accessToken;

    tokenBody.createdBy = user.username;
    tokenBody.updatedBy = user.username;

    tokenBody.createdFrom = user.serviceName;
    tokenBody.updatedFrom = user.serviceName;

    return IntegrationToken.create(tokenBody);
};

const queryIntegrationTokens = async () => {
    return IntegrationToken.scan().exec();
};

const getIntegrationTokenById = async (id) => {
    return IntegrationToken.query('id').eq(id).exec();
};

const getIntegrationTokenByServiceName = async (serviceName) => {
    return IntegrationToken.scan('serviceName').eq(serviceName).exec();
};

const updateIntegrationToken = async (updatedTokenBody, user) => {
    updatedTokenBody.updatedBy = user.username;
    updatedTokenBody.updatedFrom = user.serviceName;

    delete updatedTokenBody.createdAt;
    delete updatedTokenBody.updatedAt;

    return IntegrationToken.update(updatedTokenBody);
};


const verifyToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await IntegrationTokens.findOne({token, type, user: payload.sub, blacklisted: false});
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

module.exports = {
    createIntegrationToken,
    generateAccessToken,
    queryIntegrationTokens,
    getIntegrationTokenById,
    updateIntegrationToken,
    getIntegrationTokenByServiceName,
    verifyToken,
    generateAuthTokens,
};