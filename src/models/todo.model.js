const { Schema, default: mongoose } = require("mongoose");


const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: String,
    isCompleted: {
        type: Boolean,
        default: false
    },
    isDeletd: {
        type: Boolean,
        default: false
    },
    deadLine: Date,
    user: {
        ref: "User"
    }
})

module.exports = mongoose.model("Todo",todoSchema);