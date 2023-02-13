const { Schema, default: mongoose } = require("mongoose");

const taskSchema = new Schema({
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    deadLine: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Task", taskSchema);