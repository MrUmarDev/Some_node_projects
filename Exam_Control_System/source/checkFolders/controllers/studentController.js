const { Types } = require("mongoose");
const Students = require("../../model/studentModel");
const CustomError = require("../../utils/errorCheck");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const StudentValidate = require("../validation/studentValid");
const AdminValidate = require("../validation/adminValid");
const { signToken } = require("../../utils/jwt");

const create = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, password } = req.body;
        const photoUrl = req.file;
        const error = await StudentValidate.create({ fullName, phoneNumber, password });
        if (error) {
            throw new CustomError(400, error.message);
        };
        const findStudent = await Students.findOne({ phoneNumber: phoneNumber });
        if (findStudent) {
            throw new CustomError(400, "Phone number already exists");
        };
        const newPassword = await bcrypt.hash(password, 12)
        const student = await Students.create({ fullName: fullName, phoneNumber: phoneNumber, password: newPassword});
        res.status(201).json({ student });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const students = await Students.aggregate([
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    photoUrl: 1,
                    superStudent: 1
                }
            }
        ])
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
}
const getById = async (req, res, next) => {
    try {
        const id = req.params._id;
        if (!ObjectId.isValid(id)) {
            throw new CustomError(400, "Invalid id");
        }
        const findStudent = await Students.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    photoUrl: 1,
                    superStudent: 1
                }
            }
        ]);
        if (!findStudent) {
            throw new CustomError(400, "Student not found");
        };
        res.status(200).json(findStudent[0]);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { password, phoneNumber } = req.body;
        const error = await AdminValidate.login({ password, phoneNumber });
        if (error) {
            throw new CustomError(400, error.message);
        }
        const findStudent = await Students.findOne({ phoneNumber: phoneNumber });
        if (!findStudent) {
            throw new CustomError(404, "Invalid phone number");
        }
        const compare = await bcrypt.compare(password, findStudent.password);
        if (!compare) {
            throw new CustomError(400, "Invalid password");
        }

        const token = signToken({ phoneNumber });
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    create,
    getById,
    getAll,
    login
};