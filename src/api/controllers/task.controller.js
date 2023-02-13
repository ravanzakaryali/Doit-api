const { task } = require("../../models");

const taskController = {
    getAll: async (req, res, next) => {
        const page = req.query?.page || 0
        const limit = req.query?.limit || 2
        const skip = page * limit;
        // console.log(req.param);
        const tasks = await task.find().select('title content').sort({ createdDate: 1 }).skip(skip).limit(limit).where({ isDeleted: false });
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
            });
            if (!taskDb) throw new Error("Task not found");
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
            const title = req.body.title;
            const content = req.body.content;
            const deadLine = req.body.deadLine
            console.log(new Date(deadLine));
            const newTask = new task({
                title: title,
                content: content,
                deadLine: deadLine
            })
            newTask.save();
            res.json({
                data: newTask,
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