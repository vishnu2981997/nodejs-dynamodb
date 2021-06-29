const httpStatus = require('http-status');
const {Plan} = require('../models');
const ApiError = require('../utils/ApiError');
const {v4: uuidV4} = require('uuid');

const createPlan = async (planBody) => {
    planBody.id = uuidV4();
    return Plan.create(planBody);
};

const queryPlans = async () => {
    return Plan.scan().exec();
};

const getPlanById = async (id) => {
    return Plan.query('id').eq(id).exec();
};

const updatePlan = async (updatedPlan) => {
    delete updatedPlan.createdAt;
    delete updatedPlan.updatedAt;
    return Plan.update(updatedPlan);
};

module.exports = {
    createPlan,
    queryPlans,
    getPlanById,
    updatePlan,
};