const Admins = require("../../model/adminModel");
const CustomError = require("../../utils/errorCheck");


const isMainAdmin = async (req, res, next) => {
    try {
        const { admin } = req;
        if (!admin.MainAdmin) {
            throw new CustomError(403, "Permission denied")
        }
        next()
    } catch (err) {
        res.status(403).json({ message: err.message });
        next(err);
    }
}
module.exports = isMainAdmin;