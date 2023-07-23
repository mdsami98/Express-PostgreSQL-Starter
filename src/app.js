const express = require('express');
const xss = require('xss-clean');
const config = require('./config/config');
const cors = require('cors');

const app = express();

app.use(cors());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
const db = require('./models');
app.get('/', async (req, res) => {
    console.log('Congratulations! API is working!');
    res.status(200).send('Congratulations! API is working!');
});
const server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});
