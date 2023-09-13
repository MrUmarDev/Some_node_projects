const { Types } = require("mongoose");
const Groups = require("../../model/groupModel");
const Exams = require("../../model/examModel");
const CustomError = require("../../utils/errorCheck");
const ExamValidate = require("../validation/examValid");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;


const create = async (req, res, next) => {
    try {
        const { name, finishDate, score, groupId } = req.body;
        const fileUrl = req.file;
        const error = await ExamValidate.createAndUpdate({ name: name, finishDate: finishDate, score: score, fileUrl: fileUrl });
        if (error) {
            throw new CustomError(400, error.message);
        };
        await Exams.create({ name: name, finishDate: moment(finishDate).unix(), score: score, fileUrl: fileUrl, groupId: groupId });
        res.status(200).json({ message: "Exam created" });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const examId = req.params._id;
        if (!ObjectId.isValid(examId)) {
            throw new CustomError(400, "Invalid id");
        }
        const exam = await Exams.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(examId)
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
                    name: 1,
                    fileUrl: 1,
                    finishDate: 1,
                    score: 1,
                    group: {
                        _id: 1,
                        name: 1
                    }
                }
            }
        ]);
        if (!exam) {
            throw new CustomError(400, "Exam not found");
        }
        res.status(200).json(exam);
    } catch (error) {
        next(error);
    }
}
const getAll = async (req, res, next) => {
    try {
        const groupId = req.params._id;
        if (!ObjectId.isValid(groupId)) {
            throw new CustomError(400, "Invalid id");
        }
        const exams = await Exams.aggregate([
            {
                $match: {
                    groupId: new Types.ObjectId(groupId)
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    fileUrl: 1,
                    finishDate: 1,
                    score: 1,
                    groupId: 1
                }
            }
        ]);
        res.status(200).json(exams);
    } catch (error) {
        next(error);
    };
};

module.exports = {
    create,
    getById,
    getAll
};
