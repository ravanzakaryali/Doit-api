const { task } = require('../../models/index');

const taskController = {
    getAll: async (req, res, next) => {
        const page = req.query?.page || 0
        const limit = req.query?.limit || 2
        const skip = page * limit;
        const tasks = await task.find().sort({ createdDate: 1 }).skip(skip).limit(limit).where({ isDeleted: false });
        res.json({
            data: tasks,
            statusCode: 200
        })
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const taskDb = await task.findById(id).where({
                isDeleted: false
            }).populate("project");
            if (!taskDb) throw new Error("task not found");
            res.json({
                data: taskDb,
                statusCode: 200
            })
        } catch (error) {
            next(error);
        }
    },
    create: (req, res, next) => {
        try {
            const projectId = req.body.projectId;
            const dueDate = req.body.dueDate;
            const topic = req.body.topic;
            const assignedTo = req.body.assignedTo;
            
            const newtask = new task({
                assignedTo: assignedTo,
                topic: topic,
                dueDate: dueDate,
                project: projectId
            })
            newtask.save();
            res.json({
                data: newtask,
                statusCode: 201
            })
        } catch (error) {
            next(error);
        }
    },
    delete: () => {

    },
    update: () => {

    }
}

module.exports = taskController;
