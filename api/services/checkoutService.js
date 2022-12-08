const { orderDao } = require('../models');
const axios = require('axios');

const getTossPaymentData = async (paymentKey) => {
    return (
        await axios({
            method: 'GET',
            url: `https://api.tosspayments.com/v1/payments/${paymentKey}`,
            headers: {
                Authorization: process.env.TOSS_TOKEN,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        })
    ).data;
};

const checkOut = async (paymentData, userId) => {
    const ltoId = getltoId(paymentData);
    console.log(ltoId);
    return await orderDao.orderItemsTransaction(userId, ltoId);
};

const getltoId = (paymentData) => {
    const orderName = paymentData.orderName;
    const ltoId = parseInt(
        orderName.slice(orderName.indexOf('lectureTimeOptionId:') + 'lectureTimeOptionId:'.length, -1)
    );
    return ltoId;
};
module.exports = { getTossPaymentData, checkOut };
