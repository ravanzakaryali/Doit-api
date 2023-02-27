const BaseError = require("../../common/BaseError");
const { user } = require("../../models");
const { tokenGenerate } = require("../../services/tokenService");
const { confirmCodeSendMail } = require("../../services/userService");

const authController = {
    confirmEmail: async (req, res, next) => {
        try {
            const confirmCode = req.body.confirmCode;
            const email = req.body.email;
            const userDb = await user.findOne().where({
                email: email
            });
            if (!userDb) {
                throw new Error("Email not found");
            }
            let userConfirm = await user.findOne().where({
                email: email,
                confirmCode: confirmCode,
            });
            if (!userConfirm) {
                throw new Error("Confirm code error");
            }
            const confirmDate = new Date(userConfirm.confirmCodeExpDate);
            const nowDate = new Date();
            if (confirmDate - nowDate < 0) {
                throw new Error("Confirm code expired");
            }
            userDb.isConfirm = true;

            const token = tokenGenerate({
                email: userDb.email,
                username: userDb.username
            })
            userDb.save();
            res.json({
                token: token,
                user: {
                    email: userDb.email,
                    username: userDb.username
                }
            });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const userDb = await user.findOne({
                email: email
            })
            if (!userDb) {
                throw new BaseError("User not found",404);
            }
            if (!userDb.isConfirm) {
                throw new BaseError("Email not confirm!!!",400);
            }
            const confirmObj = await confirmCodeSendMail(email);
            userDb.confirmCode = confirmObj.confirmCode;
            userDb.confirmCodeExpDate = confirmObj.expDate;
            userDb.save();
            res.json({
                ok: true,
                statusCode: 200,
                email: email
            });
        } catch (error) {
            next(error);
        }

    }
}

module.exports = authController;