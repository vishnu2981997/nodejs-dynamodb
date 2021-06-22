const express = require('express');
const {planController} = require('../../controllers')
const router = express.Router();

router
    .route('/create-plan')
    .post(planController.createPlan);

router
    .route('/get-plans')
    .get(planController.getPlans);

router
    .route('/get-plan/:planID')
    .get(planController.getPlan);

router
    .route('/update-plan/:planID')
    .put(planController.updatePlan);

module.exports = router;