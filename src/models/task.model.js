const { Schema, default: mongoose } = require("mongoose");


const taskSchema = new Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
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
    content: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

module.exports = mongoose.model("Task", taskSchema);
