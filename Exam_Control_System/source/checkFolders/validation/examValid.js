const Joi = require("joi");

class ExamValidate {
    static createAndUpdate({ name, finishDate, score, fileUrl }) {
        const { error } = Joi.object({
            score: Joi.number().min(0).max(100).required(),
            name: Joi.string().trim().required(),
            fileUrl: Joi.string().trim().required(),
            finishDate: Joi.string().isoDate().trim().required()
        }).validate({ name, finishDate, score, fileUrl });
        if (error) {
            return error;
        } else {
            return false;
        }
    }
}

module.exports = ExamValidate;
