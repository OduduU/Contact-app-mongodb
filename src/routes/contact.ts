import { Router } from "express";
const asyncMiddleware = require('../../middleware/async')

import {
  getContacts,
  getContactByID,
  createContact,
  editContactByID,
  deleteContact
} from "../controllers/contacts";
  
import { idValidate, editValidation } from "../controllers/joiValidations";

const router = Router();

router.get("/", asyncMiddleware(async (_req: any, res: any) => {
    const data = await getContacts();
  
    if (data.length === 0) {
      res.status(204).json({ data });
  
      return;
    }
  
    res.status(200).json({ data });
}));

router.get("/:contactID", asyncMiddleware(async (req: any, res: any) => {
  const { error, value: contactID } = idValidate(req.params.contactID);

  if (error) {
    res.status(400).json({ error });

    return;
  }

  const data = await getContactByID(contactID);

  if (!data) {
    res.status(404).json({ error: "Contact not found" });

    return;
  }

  res.status(200).json({ data });
}));

router.post("/", asyncMiddleware (async (req: any, res: any) => {
  const contact = req.body;

  const data = await createContact(contact);

  res.status(201).json({ data });

  return;
}));

router.put("/:contactID", async (req, res) => {
  const { error, value: contactID } = idValidate(req.params.contactID);

  if (error) {
    res.status(400).json({ error });
    // throw Error('Invalid contactID')

    return;
  }

  const data = await getContactByID(contactID);

  if (!data) {
    res.status(404).json({ error: "Contact not found" });
    // throw Error('Contact not found');

    return;
  }

  const contact = req.body;

  const { error: newError, value: updated } = editValidation(contact);

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

  const updatedContact = await editContactByID(data);
  res.status(200).json({ updatedContact });
  return;
});

router.delete("/:contactID", async (req, res) => {
  try {
    const data = await deleteContact(req.params.contactID);
    return res.status(200).json({ message: "successfully deleted..", data });
  } catch (error) {
    return res.json({ error });
  }
});

export default router;
