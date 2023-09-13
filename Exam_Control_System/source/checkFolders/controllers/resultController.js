const { Types } = require("mongoose");
const CustomError = require("../../utils/errorCheck");
const Students = require("../../model/studentModel");
const Exams = require("../../model/examModel");
const Results = require("../../model/resultModel");
const ResultValidate = require("../validation/resultValid");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

const create = async (req, res, next) => {
    try {
        const { studentId, examId } = req.body;
        const fileUrl = req.file;
        const error = await ResultValidate.create({ fileUrl: fileUrl })
        if (error) {
            throw new CustomError(400, error.message)
        };
        await Results.create({ finishDate: moment(new Date()).unix(), studentId: studentId, examId: examId, fileUrl: fileUrl });
        res.status(200).json({ message: "Result created" });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {

        const { ball } = req.body;
        const resultId = req.params._id;
        const error = await ResultValidate.update({ score: score })
        if (error) {
            throw new CustomError(400, error.message)
        };
        const exam = await Exams.findById({ _id: result.examId });
        if (((result.finishDate > exam.finishDate) && (ball - Math.floor((result.finishDate - exam.finishDate) / 60 / 5)) < 1) || (ball - Math.floor((result.finishDate - exam.finishDate)/60 / 5)) < exam.score) {
            return res.status(201).json({ message: "Success" });
        };

        await Results.updateOne({ _id: resultId }, { ball: (ball - Math.floor((result.finishDate - exam.finishDate)/60 / 5)), status: "success" });
        res.status(200).json({ message: "Success" });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const examId = req.params._id;
        if (!ObjectId.isValid(examId)) {
            throw new CustomError(400, "Invalid id");
        }
        const results = await Results.aggregate([
            {
                $match: {
                    examId: new Types.ObjectId(examId)
                }
            },
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
                    finishDate: 1,
                    fileUrl: 1,
                    ball: 1,
                    status: 1,
                    examId: 1,
                    student: 1,
                }
            }
        ]);
        res.status(200).json({ results });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const resultId = req.params._id;
        if (!ObjectId.isValid(resultId)) {
            throw new CustomError(400, "Invalid id");
        }
        const result = await Results.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(resultId)
                }
            },
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
                    finishDate: 1,
                    fileUrl: 1,
                    ball: 1,
                    status: 1,
                    examId: 1,
                    student: 1,
                }
            }
        ]);
        if (!result) {
            throw new CustomError(400, error.message);
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}



const getIds = async (req, res, next) => {
    try {
        const { examId, studentId } = req.query;
        const result = await Results.aggregate([
            {
                $match: {
                    examId: new Types.ObjectId(examId),
                    studentId: new Types.ObjectId(studentId)
                }
            },
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
                    finishDate: 1,
                    fileUrl: 1,
                    ball: 1,
                    status: 1,
                    examId: 1,
                    student: 1,
                }
            }
        ]);
        if (!result) {
            throw new CustomError(400, error.message);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    update,
    getById,
    getAll,
    getIds
};