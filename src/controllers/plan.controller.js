const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {apiResponse} = require('../middlewares/response');
const {Plan} = require('../models');
const {v4: uuidV4} = require('uuid');

const createPlan = catchAsync(async (req, res) => {
    const {name} = req.body;

    const plan = await Plan.create({
        id: uuidV4(),
        name,
    });

    apiResponse(req, res, plan, httpStatus.CREATED);
});

const getPlans = catchAsync(async (req, res) => {
    const plans = await Plan.scan().exec();
    apiResponse(req, res, plans);
});

const getPlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    const plan = await Plan.query('id').eq(planID).exec();
    apiResponse(req, res, plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const {planID} = req.params;
    const {body: data} = req;
    let plan = await Plan.query('id').eq(planID).exec();
    if (!plan || !plan.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    plan = plan[0];
    plan.name = data.name ? data.name : plan.name;
    delete plan.createdAt;
    delete plan.updatedAt;
    plan = await Plan.update(plan);
    apiResponse(req, res, plan);
});

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
};