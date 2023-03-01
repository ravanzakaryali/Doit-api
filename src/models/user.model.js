const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    fullName: String,
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
    },
    confirmCode: {
        type: Number,
        required: true,
    },
    confirmCodeExpDate: {
        type: Date,
        required: true,
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        require: false
    }
})

module.exports = mongoose.model("User", userSchema);

