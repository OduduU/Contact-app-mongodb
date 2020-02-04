"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncMiddleware = require('../../middleware/async');
const contacts_1 = require("../controllers/contacts");
const joiValidations_1 = require("../controllers/joiValidations");
const router = express_1.Router();
router.get("/", asyncMiddleware(async (_req, res) => {
    const data = await contacts_1.getContacts();
    if (data.length === 0) {
        res.status(204).json({ data });
        return;
    }
    res.status(200).json({ data });
}));
router.get("/:contactID", asyncMiddleware(async (req, res) => {
    const { error, value: contactID } = joiValidations_1.idValidate(req.params.contactID);
    if (error) {
        res.status(400).json({ error });
        return;
    }
    const data = await contacts_1.getContactByID(contactID);
    if (!data) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    res.status(200).json({ data });
}));
router.post("/", asyncMiddleware(async (req, res) => {
    const contact = req.body;
    const data = await contacts_1.createContact(contact);
    res.status(201).json({ data });
    return;
}));
router.put("/:contactID", async (req, res) => {
    const { error, value: contactID } = joiValidations_1.idValidate(req.params.contactID);
    if (error) {
        res.status(400).json({ error });
        // throw Error('Invalid contactID')
        return;
    }
    const data = await contacts_1.getContactByID(contactID);
    if (!data) {
        res.status(404).json({ error: "Contact not found" });
        // throw Error('Contact not found');
        return;
    }
    const contact = req.body;
    const { error: newError, value: updated } = joiValidations_1.editValidation(contact);
    if (newError) {
        res.status(400).json({ error });
        // throw Error('Invalid details');
        return;
    }
    data.set({
        firstName: updated.firstName,
        lastName: updated.lastName,
        phone: updated.phone,
        updatedAt: new Date().toISOString()
    });
    const updatedContact = await contacts_1.editContactByID(data);
    res.status(200).json({ updatedContact });
    return;
});
router.delete("/:contactID", async (req, res) => {
    try {
        const data = await contacts_1.deleteContact(req.params.contactID);
        return res.status(200).json({ message: "successfully deleted..", data });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.default = router;
//# sourceMappingURL=contact.js.map