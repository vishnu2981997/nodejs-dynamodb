const catchAsync = require('../utils/catchAsync');

const createPlan = catchAsync(async (req, res) => {
    res.status(201).json({
        message: 'plan created'
    });
});

const getPlans = catchAsync(async (req, res) => {
    res.status(200).json({
        message: 'plans fetched'
    });
});

const getPlan = catchAsync(async (req, res) => {
    res.status(200).json({
        message: 'plan fetched'
    });
});

const updatePlan = catchAsync(async (req, res) => {
    res.status(200).json({
        message: 'plan updated'
    });
});

module.exports = {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
};