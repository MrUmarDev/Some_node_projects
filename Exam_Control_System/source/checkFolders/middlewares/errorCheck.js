const CustomError = require("../../utils/errorCheck");

const errorCheck = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorCheck;
