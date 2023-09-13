const { Types } = require("mongoose");
const Admins = require("../../model/adminModel");
const Groups = require("../../model/groupModel");
const CustomError = require("../../utils/errorCheck");
const GroupValidate = require("../validation/groupsValid");
const ObjectId = require("mongoose").Types.ObjectId;


const create = async (req, res, next) => {
    try {
        const { name, adminId } = req.body;
        const error = await GroupValidate.create({ name: name })
        if (error) {
            throw new CustomError(400, error.message)
        };
        await Groups.create({ name: name, adminId: adminId });
        res.status(200).json({ message: "Group created" });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { name, adminId } = req.body;
        const groupId = req.params._id;
        const error = await GroupValidate.create({ name: name })
        if (error) {
            throw new CustomError(400, error.message)
        };
        await Groups.updateOne({ _id: groupId }, { name: name, adminId: adminId });
        res.status(200).json({ message: "Group updated" });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const groups = await Groups.aggregate([
            {
                $lookup: {
                    from: "admins",
                    foreignField: "_id",
                    localField: "adminId",
                    as: "admin"
                }
            },
            {
                $unwind: {
                    path: "$admin",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    admin: 1,
                    adminId: 1,
                }
            }
        ]);
        res.status(200).json({ groups });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const groupId = req.params._id;
        const group = await Groups.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(groupId)
                }
            },
            {
                $lookup: {
                    from: "admins",
                    foreignField: "_id",
                    localField: "adminId",
                    as: "admin"
                }
            },
            {
                $unwind: {
                    path: "$admin",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    admin: 1,
                    adminId: 1,
                }
            }
        ]);
        if (!group) {
            throw new CustomError(400, error.message);
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    update,
    getById,
    getAll,
};