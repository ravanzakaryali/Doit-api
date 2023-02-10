const { user } = require("../../models");

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
            const confirmDate = new Date(new Date(userConfirm.confirmCodeExpDate));
            const nowDate = new Date();
            console.log(confirmDate - nowDate);
            res.json({
                ok: "Ok"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;