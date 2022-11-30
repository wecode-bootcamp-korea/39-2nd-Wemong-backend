const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { router } = require('./api/routes');
const { globalErrorHandler } = require('./api/utils/error');

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(router);

    app.get('/ping', (req, res) => {
        return res.status(200).json({ message: 'pong' });
    });

    app.use(globalErrorHandler);

    return app;
};

module.exports = { createApp };
