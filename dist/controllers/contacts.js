"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const contacts_1 = __importDefault(require("../model/contacts"));
const joiValidations_1 = require("../controllers/joiValidations");
async function getContacts() {
    return contacts_1.default.find();
}
exports.getContacts = getContacts;
async function getContactByID(contactID) {
    return contacts_1.default.findById(contactID);
}
exports.getContactByID = getContactByID;
async function createContact(contact) {
    const { error, value } = joiValidations_1.createValidation(contact);
    if (error) {
        throw Error('Invalid Contact Details');
    }
    const id = uuid_1.default.v4();
    const date = new Date().toISOString();
    const newContact = new contacts_1.default({
        ...value,
        id,
        createdAt: date,
        updatedAt: date
    });
    return newContact.save();
}
exports.createContact = createContact;
async function editContactByID(contact) {
    return contact.save();
}
exports.editContactByID = editContactByID;
function deleteContact(contactID) {
    return contacts_1.default.findByIdAndDelete(contactID);
}
exports.deleteContact = deleteContact;
//# sourceMappingURL=contacts.js.map