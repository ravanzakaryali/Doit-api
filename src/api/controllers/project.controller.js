const { project } = require("../../models");

const projectController = {
    getAll: async (req, res, next) => {
        const page = req.query?.page || 0
        const limit = req.query?.limit || 2
        const sort = req.query?.sort || 'DueDate';
        const skip = page * limit;
        let projectQuery =  project
            .find()
            .select('title description')
            .skip(skip)
            .limit(limit)
            .where({
                isDeleted: false,
            });
        switch (sort.toLowerCase()) {
            case 'duedate':
                projectQuery.sort({ dueDate: -1 })
                break;
            case 'createddate':
                projectQuery.sort({ createdDate: -1 })
                break;
            case 'updateddate':
                projectQuery.sort({ updatedDate: -1 })
            default:
                break;
        }
        const projects = await projectQuery;
        console.log(projects);

        // const dataQuery = get database dan title descp lazimdir. IsDeleted false. skip 10. limit 2
        // await dataQuery sort created 
        //await dataQuery

        res.json(projects)
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
    getLast: async (req, res, next) => {
        try {
            const projects = await project
                .findOne({})
                .where({
                    isDeleted: false
                }).sort({ dueDate: 'desc' });
            res.json(projects);
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