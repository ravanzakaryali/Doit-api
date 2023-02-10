const { randomNumberGenerator, setDateMinutes } = require('../../helpers');
const { user } = require('../../models');
const { sendMessage } = require('../../services/emailService');
const usernameGenerator = require('../../services/userService');

const userController = {
    getAll: async (req, res, next) => {
        try {
            const page = req.params?.page || 0
            const limit = req.params?.limit || 2
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
            const email = req.body.email;
            const fullName = req.body.fullName;
            const userDb = await user.findOne().where({
                email: email
            })
            if (userDb) {
                throw new Error("Email is already taken");
            }
            const confirmCode = randomNumberGenerator(100000, 999999);
            const response = await sendMessage(confirmCode, email);
            const username = await usernameGenerator(fullName);
            const expDate = setDateMinutes();
            const newUser = new user({
                email: email,
                username: username,
                fullName: fullName,
                confirmCode: confirmCode,
                confirmCodeExpDate: expDate,
            })
            newUser.save();
            res.json(newUser);
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