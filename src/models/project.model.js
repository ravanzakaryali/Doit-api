const { Schema, default: mongoose } = require("mongoose");

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
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
    dueDate: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Project", projectSchema);