const express = require('express');

const router = express.Router();

router
    .route('/create-plan')
    .post(async function (req, res, next) {
        res.status(201).json({
            message: 'plan created'
        });
    });

router
    .route('/get-plans')
    .get(async function (req, res, next) {
        res.status(201).json({
            message: 'plans fetched'
        });
    });

router
    .route('/:planId/get-plan')
    .get(async function (req, res, next) {
        res.status(201).json({
            message: 'plan fetched'
        });
    });

router
    .route('/:planId/update-plan')
    .put(async function (req, res, next) {
        res.status(201).json({
            message: 'plan updated'
        });
    });

module.exports = router;