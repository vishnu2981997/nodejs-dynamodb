const express = require('express');
const planRoute = require('./plan.routes');

const router = express.Router();

const routes = [
    {
        path: '/plans',
        route: planRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;