const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const {apiResponse} = require('../middlewares/response');

const createPlan = catchAsync(async (req, res) => {
    const plan = {
        message: 'plan created'
    };
    apiResponse(req, res, plan, httpStatus.CREATED);
});

const getPlans = catchAsync(async (req, res) => {
    const plan = {
        message: 'plans fetched'
    };
    apiResponse(req, res, plan);
});

const getPlan = catchAsync(async (req, res) => {
    const plan = {
        message: 'plan fetched'
    };
    apiResponse(req, res, plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const plan = {
        message: 'plan updated'
    };
    apiResponse(req, res, plan);
});

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
};