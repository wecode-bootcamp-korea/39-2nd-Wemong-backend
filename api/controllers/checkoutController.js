const { checkoutService } = require('../services');
const { catchAsync, CustomError } = require('../utils/error');

const checkOut = catchAsync(async (req, res) => {
    const { paymentKey } = req.body;

    console.log(req.user);
    //요거
    const userId = req.user;
    //요거
    console.log(userId);

    const paymentData = await checkoutService.getTossPaymentData(paymentKey);

    await checkoutService.checkOut(paymentData, userId);

    return res.status(200).json('yaho');
});
module.exports = { checkOut };
