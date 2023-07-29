const express = require('express');
const authRoute = require('./auth.route');

const router = express.Router();

const v1Routers = [
    {
        path: '/auth',
        route: authRoute
    }
];

v1Routers.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
