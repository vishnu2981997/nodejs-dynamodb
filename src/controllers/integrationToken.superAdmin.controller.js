const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {apiResponse} = require('../middlewares/response');
const {IntegrationToken} = require('../models');
const {integrationTokenServices} = require('../services');

const createIntegrationToken = catchAsync(async (req, res) => {
    const user = req.user;
    const body = req.body;

    const integration = await integrationTokenServices.createIntegrationToken(body, user);

    apiResponse(req, res, integration, httpStatus.CREATED);
});

const getIntegrationTokens = catchAsync(async (req, res) => {

    const integrationTokens = await integrationTokenServices.queryIntegrationTokens();

    apiResponse(req, res, integrationTokens);
});

const getIntegrationToken = catchAsync(async (req, res) => {
    const {tokenID} = req.params;

    let integrationToken = await integrationTokenServices.getIntegrationTokenById(tokenID);

    if (!integrationToken || !integrationToken.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Integration Token not found');
    }

    integrationToken = integrationToken[0];

    apiResponse(req, res, integrationToken);
});

const updateIntegrationToken = catchAsync(async (req, res) => {
    const {tokenID} = req.params;
    const user = req.user;
    const body = req.body;

    let integrationToken = await integrationTokenServices.getIntegrationTokenById(tokenID);
    if (!integrationToken || !integrationToken.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Integration Token not found');
    }

    integrationToken = integrationToken[0];
    const updatedBody = {};

    updatedBody.serviceName = integrationToken.serviceName;
    updatedBody.username = body.username ? body.username : integrationToken.username;
    updatedBody.email = body.email ? body.email : integrationToken.email;
    updatedBody.tokens = integrationToken.tokens;

    const updatedIntegrationToken = await integrationTokenServices.updateIntegrationToken(updatedBody, user);

    apiResponse(req, res, updatedIntegrationToken);
});

module.exports = {
    createIntegrationToken,
    getIntegrationTokens,
    getIntegrationToken,
    updateIntegrationToken,
};