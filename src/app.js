const express = require('express');
const { CONNECTION_STRING } = require('./config');
const { mongoose } = require('mongoose');
const app = express();
const userRouter = require('./api/routes/user.router');
const authRouter = require('./api/routes/auth.router');
const taskRouter = require('./api/routes/task.router');

app.use(express.json());
app.use(express.urlencoded());
mongoose.connect(CONNECTION_STRING)
    .then(res => console.log("CONNECT"))
    .catch(err => console.log(err));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks',taskRouter);

app.use((err, req, res, next) => {
    res.json({
        message: err?.message || "Server error",
        statusCode: 500
    })
})
module.exports = app;