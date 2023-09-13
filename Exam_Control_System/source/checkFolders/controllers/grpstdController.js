const { Types } = require("mongoose");
const Groups = require("../../model/groupModel");
const CustomError = require("../../utils/errorCheck");
const GroupValidate = require("../validation/groupsValid");
const Students = require("../../model/studentModel");
const GrpstdController = require("../../model/grpstdModel");
const ObjectId = require("mongoose").Types.ObjectId;


const create = async (req, res, next) => {
    try {
        console.log(new Date())
        const { studentId, groupId } = req.body;
        await GrpstdController.create({ groupId: groupId, studentId: studentId });
        res.status(200).json({ message: "Group created" });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const groups = await GrpstdController.aggregate([
            {
                $lookup: {
                    from: "students",
                    foreignField: "_id",
                    localField: "studentId",
                    as: "student"
                }
            },
            {
                $unwind: {
                    path: "$student",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    student: 1,
                }
            }
        ]);
        res.status(200).json(groups);
    } catch (error) {
        next(error);
    }
}


const getAlls = async (req, res, next) => {
    try {
        const id = req.params._id;
        const groups = await GrpstdController.aggregate([
            {
                $match: {
                    studentId: new Types.ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: "groups",
                    foreignField: "_id",
                    localField: "groupId",
                    as: "group"
                }
            },
            {
                $unwind: {
                    path: "$group",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    group: 1,
                }
            }
        ]);
        res.status(200).json(groups);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    create,
    getAll,
    getAlls
};