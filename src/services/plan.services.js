const httpStatus = require('http-status');
const {Plan} = require('../models');
const ApiError = require('../utils/ApiError');
const {v4: uuidV4} = require('uuid');

const createPlan = async (planBody, user) => {
    planBody.id = uuidV4();

    planBody.createdBy = user.username;
    planBody.updatedBy = user.username;

    planBody.createdFrom = user.serviceName;
    planBody.updatedFrom = user.serviceName;

    return Plan.create(planBody);
};

const queryPlans = async () => {
    return Plan.scan().exec();
};

const getPlanById = async (id) => {
    return Plan.query('id').eq(id).exec();
};

const updatePlan = async (updatedPlan, user) => {
    updatedPlan.updatedBy = user.username;
    updatedPlan.updatedFrom = user.serviceName;

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