const userModel = require("../models/user.model");

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

module.exports = usernameGenerator;