const { userService } = require('../services');

const { catchAsync, CustomError } = require('../utils/error');

const getUserInformation = catchAsync(async (req, res) => {
    const userId = req.user;
    const userInfo = await userService.getUserInformation(userId);

    return res.status(200).json(userInfo);
});

module.exports = { getUserInformation };
