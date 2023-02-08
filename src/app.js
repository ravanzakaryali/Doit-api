const express = require('express');
const { CONNECTION_STRING } = require('./config');
const {  mongoose } = require('mongoose');
const app = express();

mongoose.connect(CONNECTION_STRING)
    .then(res => console.log("CONNECT"))
    .catch(err => console.log(err));


module.exports = app;