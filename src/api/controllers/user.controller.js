const BaseError = require('../../common/BaseError');
const { randomNumberGenerator, setDateMinutes } = require('../../helpers');
const { user } = require('../../models');
const { sendMessage } = require('../../services/emailService');
const { usernameGenerator, confirmCodeSendMail } = require('../../services/userService');
const { validationResult } = require("express-validator");


const userController = {
    getAll: async (req, res, next) => {
        try {
            const page = req.query?.page || 0
            const limit = req.query?.limit || 2
            const skip = page * limit;
            const users = await user.find().sort({ createdDate: 1 }).skip(skip).limit(limit).where({ isDeleted: false });
            console.log(users);
            res.json(users);
        } catch (error) {
            next(error);
        }
        res.send("Ok");
    },
    getById: (req, res) => {

    },
    register: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json(errors);
            }
            const email = req.body.email;
            const fullName = req.body.fullName;

            const userDb = await user.findOne().where({
                email: email
            })
            if (userDb) {
                throw new BaseError("Email is already taken", 409);
            }
            const confirmObj = await confirmCodeSendMail(email);
            const username = await usernameGenerator(fullName);
            const newUser = new user({
                email: email,
                username: username,
                fullName: fullName,
                confirmCode: confirmObj.confirmCode,
                confirmCodeExpDate: confirmObj.expDate,
            })
            newUser.save();
            res.json({
                ok: true,
                statusCode: 200
            });
        } catch (error) {
            next(error);
        }
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}

module.exports = userController;