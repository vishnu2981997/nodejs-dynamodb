const express = require('express');
const planRoute = require('./plan.routes');
const integrationTokenSuperAdminRoute = require('./integrationToken.superAdmin.routes');

const router = express.Router();

const routes = [
    {
        path: '/plans',
        route: planRoute,
    },
    {
        path: '/super-admin/integration-tokens',
        route: integrationTokenSuperAdminRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;