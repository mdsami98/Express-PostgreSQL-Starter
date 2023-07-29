const httpStatus = require('http-status');
const catchAsync = require('@utils/catchAsync');

const register = catchAsync(async (req, res) => {
    // const user = await userService.createUser(req.body);
    // const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send('szdas');
});

module.exports = {
    register
};
