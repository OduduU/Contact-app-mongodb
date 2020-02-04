import uuid from "uuid";

import ContactMongo from "../model/contacts";
import { CreateContact, createValidation } from "../controllers/joiValidations";

export async function getContacts() {
  return ContactMongo.find();
}

export async function getContactByID(contactID: String) {
  return ContactMongo.findById(contactID);
}

export async function createContact(contact: CreateContact) {
  const { error, value } = createValidation(contact);

  if (error) {
    throw Error('Invalid Contact Details');
  }

  const id = uuid.v4();
  const date = new Date().toISOString();

  const newContact = new ContactMongo({
    ...value,
    id,
    createdAt: date,
    updatedAt: date
  });

  return newContact.save();
}

export async function editContactByID(contact: any) {
  return contact.save();
}

export function deleteContact(contactID: string) {
  return ContactMongo.findByIdAndDelete(contactID);
}
