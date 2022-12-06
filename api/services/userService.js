const { userDao } = require('../models');

const getUserInformation = async (userId) => {
    return await userDao.getUserInformation(userId);
};

const getUserByUserId = async (userId) => {
    return await userDao.getUserByUserId(userId);
};
module.exports = { getUserInformation, getUserByUserId };
