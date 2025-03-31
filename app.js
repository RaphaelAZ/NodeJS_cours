const express = require('express');
const userRoutes = require('./route/main.route');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.use('/home', (req, res) => {
    res.status(200).json("success");
});

app.use('/user', userRoutes);

module.exports = app;