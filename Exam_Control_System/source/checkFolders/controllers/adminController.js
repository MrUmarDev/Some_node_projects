const { Types } = require("mongoose");
const Admins = require("../../model/adminModel");
const CustomError = require("../../utils/errorCheck");
const { signToken } = require("../../utils/jwt");
const AdminValidate = require("../validation/adminValid");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt")


const login = async (req, res, next) => {
    try {
        const { password, phoneNumber } = req.body;
        const error = await AdminValidate.login({ password, phoneNumber });
        if (error) {
            throw new CustomError(400, error.message);
        }
        const findAdmin = await Admins.findOne({ phoneNumber: phoneNumber });
        const compare = await bcrypt.compare(password, findAdmin.password);
        if (!compare) {
            throw new CustomError(400, "Invalid Password");
        }
        const token = signToken({ phoneNumber });
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};