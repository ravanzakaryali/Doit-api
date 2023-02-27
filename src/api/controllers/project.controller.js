const { project } = require("../../models");

const projectController = {
    getAll: async (req, res, next) => {
        const page = req.query?.page || 0
        const limit = req.query?.limit || 2
        const skip = page * limit;
        // console.log(req.param);
        const projects = await project.find().select('title description').sort({ createdDate: 1 }).skip(skip).limit(limit).where({ isDeleted: false });
        res.json({
            data: projects,
            statusCode: 200
        })
    },
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const projectDb = await project.findById(id).where({
                isDeleted: false
            });
            if (!projectDb) throw new Error("Project not found");
            res.json({
                data: projectDb,
                statusCode: 200
            })
        } catch (error) {
            next(error);
        }
    },
    create: (req, res, next) => {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const dueDate = req.body.dueDate;
            console.log(new Date(dueDate));
            const newproject = new project({
                title: title,
                description: description,
                dueDate: dueDate
            })
            newproject.save();
            res.json({
                data: newproject,
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

module.exports = projectController;