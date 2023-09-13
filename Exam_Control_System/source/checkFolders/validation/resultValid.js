const Joi = require("joi");

class ResultValidate {
    static create({ fileUrl }) {
        const { error } = Joi.object({
            fileUrl: Joi.string().trim().required(),
        }).validate({ fileUrl });
        if (error) {
            return error;
        } else {
            return false;
        }
    }
    static update({ ball }) {
        const { error } = Joi.object({
            score: Joi.number().min(0).max(100).required(),
        }).validate({ score });
        if (error) {
            return error;
        } else {
            return false;
        }
    }
}

module.exports = ResultValidate;
