"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.editValidation = (body) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().trim(),
        lastName: joi_1.default.string().trim(),
        email: joi_1.default.string().trim(),
        phone: joi_1.default.string().trim(),
        website: joi_1.default.string().trim(),
        company: joi_1.default.string().trim()
    });
    const { error, value } = schema.validate(body, {
        abortEarly: false,
        stripUnknown: true
    });
    return {
        error,
        value
    };
};
exports.createValidation = (body) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default
            .string()
            .trim()
            .required(),
        lastName: joi_1.default.string().trim(),
        email: joi_1.default.string().trim(),
        phone: joi_1.default
            .string()
            .trim()
            .required(),
        website: joi_1.default.string().trim(),
        company: joi_1.default.string().trim()
    });
    const { error, value } = schema.validate(body, {
        abortEarly: false,
        stripUnknown: true
    });
    return {
        error,
        value
    };
};
exports.idValidate = (contactID) => {
    const { error, value } = joi_1.default
        .string()
        .required()
        .validate(contactID, {
        abortEarly: false,
        stripUnknown: true,
        presence: "required"
    });
    return {
        error,
        value
    };
};
//# sourceMappingURL=joiValidations.js.map