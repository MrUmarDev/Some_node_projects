const Joi = require("joi");

class AdminValid {
    static login({ phoneNumber, password }) {
        const phoneNumberRegex = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
        const { error } = Joi.object({
            phoneNumber: Joi.string().regex(phoneNumberRegex).required(),
            password: Joi.string().trim().min(6).max(10).required(),
        }).validate({ phoneNumber, password });

        if (error) {
            return error;
        } else {
            return false;
        }
    }
}

module.exports = AdminValid;
