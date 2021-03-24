const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const products = require('./api/products');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', products);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})


module.exports = app;
