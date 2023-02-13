const { randomNumberGenerator, setDateMinutes } = require("../helpers");
const userModel = require("../models/user.model");
const { sendMessage } = require("./emailService");

const usernameGenerator = async (fullName, number = 1) => {
    const username = fullName.toLowerCase().replace(' ', '_').replace('ə', 'e');
    const userDb = await userModel.findOne().where({
        username: username
    });
    const newNumber = number + 1;
    if (userDb) {
        console.log(number);
        return usernameGenerator(fullName + newNumber, newNumber);
    }
    return username;
}

const confirmCodeSendMail = async (email) => {
    const confirmCode = randomNumberGenerator(100000, 999999);
    const response = await sendMessage(confirmCode, email);
    const expDate = setDateMinutes();
    return {
        confirmCode: confirmCode,
        expDate: expDate
    }
} 

module.exports = {
    usernameGenerator: usernameGenerator,
    confirmCodeSendMail: confirmCodeSendMail
};