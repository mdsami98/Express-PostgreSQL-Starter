const express = require('express');
const xss = require('xss-clean');
const config = require('@config/config');
const cors = require('cors');
const createError = require('http-errors');
const compression = require('compression');
const helmet = require('helmet');
const createHttpError = require('http-errors');
const logger = require('@helper/logger');
// {
//     origin: '*',
//     optionsSuccessStatus: 200,
//     allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
//     exposedHeaders: [
//         'Content-Length',
//         'Content-Type',
//         'RefreshToken',
//         'Token'
//     ]
// }

const app = express();

app.use(cors());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());

// set security HTTP headers
app.use(helmet());

// gzip compression
app.use(compression());

const db = require('@src/database/models');

app.get('/', async (req, res) => {
    console.log('Congratulations! API is working!');
    logger.info('System launch');
    res.status(200).send('Congratulations! API is working!');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

const server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});
