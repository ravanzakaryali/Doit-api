const { project, user, task } = require("../../models");

const projectController = {
    getAll: async (req, res, next) => {
        const page = req.query?.page || 0
        const limit = req.query?.limit || 2
        const sort = req.query?.sort || 'DueDate';
        const skip = page * limit;
        let projectQuery = project
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
            }).populate("owner").populate("teamMembers").populate("tasks");
            if (!projectDb) throw new Error("Project not found");
            res.json(projectDb);
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
    create: async (req, res, next) => {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const dueDate = req.body.dueDate;
            const ownerId = req.body.ownerId;
            const teamMembers = req.body.members;
            // memebers = [{id: "njsbdjsn"},{id: "dhushjd"}]
            let teamMembersDb = [];

            for (const element of teamMembers) {
                const team = await user.findById(element.id);
                if (team == null) throw new Error("Member not found");
                console.log(team);
                teamMembersDb.push(team);
            }
            const owner = await user.findById(ownerId);
            if (owner == null) throw new Error("Owner not found");
            const newproject = new project({
                title: title,
                description: description,
                dueDate: dueDate,
                owner: owner,
                teamMembers: teamMembersDb
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
    createTask: async(req, res,next)=>{
        try {
            const projectId = req.params.id;
            const content = req.body.content;

            const projectDb = await project.findById(projectId);
            if(projectId == null) throw new Error("Project not found");
            const taskDb = new task({
                project: projectDb,
                content: content
            });
            taskDb.save();
            res.json(taskDb);
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