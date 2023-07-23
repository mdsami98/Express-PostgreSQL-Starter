const express = require('express');
const xss = require('xss-clean');
const config = require('./config/config');
const cors = require('cors');
// const corsConfig = require('@/config/cors');
// import db from '@/database/models';

const app = express();

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
        allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
        exposedHeaders: [
            'Content-Length',
            'Content-Type',
            'RefreshToken',
            'Token'
        ]
    })
);
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
const db = require('./database/models');
app.get('/', async (req, res) => {
    console.log('Congratulations! API is working!');
    res.status(200).send('Congratulations! API is working!');
});
const server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});
