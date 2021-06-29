const express = require('express');
const validate = require('../../middlewares/validate');
const {planValidations} = require('../../validations');
const planValidationSchemas = require('../../validations/schemas/plan.schemas');
const {planController} = require('../../controllers')
const router = express.Router();

router
    .route('/create-plan')
    .post(validate(planValidationSchemas.createPlan), planValidations.createPlan, planController.createPlan);

router
    .route('/get-plans')
    .get(planValidations.getPlans, planController.getPlans);

router
    .route('/get-plan/:planID')
    .get(planValidations.getPlan, planController.getPlan);

router
    .route('/update-plan/:planID')
    .put(validate(planValidationSchemas.updatePlan), planValidations.updatePlan, planController.updatePlan);

module.exports = router;