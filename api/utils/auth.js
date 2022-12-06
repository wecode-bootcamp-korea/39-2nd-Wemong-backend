const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const { userService } = require('../services');
const { catchAsync, CustomError } = require('./error');

const loginRequired = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) throw new CustomError('NO_TOKEN', 401);

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    ).catch(() => {
        throw new CustomError('TOKEN_ERROR', 401);
    });

    const user = await userService.getUserByUserId(decoded.userId);

    if (!user) throw new CustomError('USER_DOES_NOT_EXISTS', 404);

    req.user = user.id;
    next();
});

module.exports = { loginRequired };
