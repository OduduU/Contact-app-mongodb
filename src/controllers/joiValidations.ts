import joi from "@hapi/joi";

import { Contact, editContact } from "../model/contactType";

export type CreateContact = Omit<Contact, "id" | "createdAt" | "updatedAt">;

export const editValidation = (body: editContact) => {
  const schema = joi.object<editContact>({
    firstName: joi.string().trim(),
    lastName: joi.string().trim(),
    email: joi.string().trim(),
    phone: joi.string().trim(),
    website: joi.string().trim(),
    company: joi.string().trim()
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

export const createValidation = (body: CreateContact) => {
  const schema = joi.object<CreateContact>({
    firstName: joi
      .string()
      .trim()
      .required(),
    lastName: joi.string().trim(),
    email: joi.string().trim(),
    phone: joi
      .string()
      .trim()
      .required(),
    website: joi.string().trim(),
    company: joi.string().trim()
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

export const idValidate = (contactID: String) => {
  const { error, value } = joi
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
