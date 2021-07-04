const express = require('express');
const validate = require('../../middlewares/validate');
const {integrationTokenSuperAdminValidations} = require('../../validations');
const integrationTokenSuperAdminValidationSchemas = require('../../validations/schemas/integrationToken.superAdmin.schemas');
const {integrationTokenSuperAdminController} = require('../../controllers')
const router = express.Router();

router
    .route('/create-token')
    .post(
        validate(integrationTokenSuperAdminValidationSchemas.createIntegrationToken),
        integrationTokenSuperAdminValidations.createIntegrationToken,
        integrationTokenSuperAdminController.createIntegrationToken
    );

router
    .route('/get-tokens')
    .get(
        integrationTokenSuperAdminValidations.getIntegrationTokens,
        integrationTokenSuperAdminController.getIntegrationTokens
    );

router
    .route('/get-token/:tokenID')
    .get(
        integrationTokenSuperAdminValidations.getIntegrationToken,
        integrationTokenSuperAdminController.getIntegrationToken
    );

router
    .route('/update-token/:tokenID')
    .patch(
        integrationTokenSuperAdminValidations.updateIntegrationToken,
        integrationTokenSuperAdminController.updateIntegrationToken
    );

module.exports = router;