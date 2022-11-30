const { authService } = require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const logIn = catchAsync(async (req, res) => {
    const { authorization_code: authorizationCode } = req.body;

    if (!authorizationCode) throw new CustomError('BAD_REQUEST', 400);

    const token = await authService.kakaoLogin(authorizationCode);
    return res.status(200).json({ token });
});

module.exports = { logIn };
