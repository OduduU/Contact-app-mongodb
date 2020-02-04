"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../../middleware/async");
const express_1 = require("express");
const contacts_1 = require("../controllers/contacts");
const joiValidations_1 = require("../controllers/joiValidations");
const router = express_1.Router();
router.get("/", async_1.asyncMiddleware(async (_req, res) => {
    const data = await contacts_1.getContacts();
    if (data.length === 0) {
        res.status(204).json({ data });
        return;
    }
    res.status(200).json({ data });
}));
router.get("/:contactID", async (req, res) => {
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
});
router.post("/", async (req, res) => {
    const contact = req.body;
    try {
        const data = await contacts_1.createContact(contact);
        res.status(201).json({ data });
        return;
    }
    catch (error) {
        res.status(400).json({ err: error });
    }
});
router.put("/:contactID", async (req, res) => {
    const { error, value: contactID } = joiValidations_1.idValidate(req.params.contactID);
    if (error) {
        res.status(400).json({ error });
        return;
    }
    try {
        const data = await contacts_1.getContactByID(contactID);
        if (!data) {
            res.status(404).json({ error: "Contact not found" });
            return;
        }
        const contact = req.body;
        const { error, value: updated } = joiValidations_1.editValidation(contact);
        if (error) {
            res.status(400).json({ error });
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
    }
    catch (error) {
        res.json({ error });
    }
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