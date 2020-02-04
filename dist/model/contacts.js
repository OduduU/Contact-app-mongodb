"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactsSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.SchemaTypes.String, unique: true, required: true },
    firstName: String,
    lastName: String,
    phone: mongoose_1.default.SchemaTypes.String,
    email: String,
    company: String,
    createdAt: mongoose_1.default.SchemaTypes.Date,
    updatedAt: Date
});
exports.default = mongoose_1.default.model("contacts", contactsSchema);
//# sourceMappingURL=contacts.js.map