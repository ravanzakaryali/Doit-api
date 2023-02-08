const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    //image url, upload azure storage
    profileImage: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: Date,
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema);

