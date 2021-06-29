const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {apiResponse} = require('../middlewares/response');
const {Plan} = require('../models');
const {planServices} = require('../services');

const createPlan = catchAsync(async (req, res) => {
    const body = req.body;

    const plan = await planServices.createPlan(body);

    apiResponse(req, res, plan, httpStatus.CREATED);
});

const getPlans = catchAsync(async (req, res) => {
    const plans = await planServices.queryPlans();
    apiResponse(req, res, plans);
});

const getPlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    const plan = await planServices.getPlanById(planID);
    apiResponse(req, res, plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    const {body: data} = req;
    let plan = await planServices.getPlanById(planID);
    if (!plan || !plan.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }

    let updatedPlan = plan[0];
    updatedPlan.name = data.name ? data.name : updatedPlan.name;
    updatedPlan = await planServices.updatePlan(updatedPlan);
    apiResponse(req, res, updatedPlan);
});

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
};