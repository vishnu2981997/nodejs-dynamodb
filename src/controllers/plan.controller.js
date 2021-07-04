const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {apiResponse} = require('../middlewares/response');
const {Plan} = require('../models');
const {planServices} = require('../services');

const createPlan = catchAsync(async (req, res) => {
    const {user, body} = req;

    const plan = await planServices.createPlan(body, user);

    apiResponse(req, res, plan, httpStatus.CREATED);
});

const getPlans = catchAsync(async (req, res) => {
    const plans = await planServices.queryPlans();
    apiResponse(req, res, plans);
});

const getPlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    let plan = await planServices.getPlanById(planID);

    if (!plan || !plan.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }

    plan = plan[0];

    apiResponse(req, res, plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    const {user, body} = req;
    let plan = await planServices.getPlanById(planID);
    if (!plan || !plan.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }

    let updatedBody = plan[0];
    updatedBody.name = body.name ? body.name : updatedBody.name;
    updatedBody = await planServices.updatePlan(updatedBody, user);

    apiResponse(req, res, updatedBody);
});

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
};