export type Contact = {
    firstName: string;
    lastName: String;
    email?: String;
    phone: String;
    website?: String;
    company?: String;
    createdAt: Date | String;
    updatedAt: Date | String;
};

export type editContact = {
  firstName?: string;
  lastName?: String;
  email?: String;
  phone?: String;
  website?: String;
  company?: String;
  updatedAt?: Date | String;
};