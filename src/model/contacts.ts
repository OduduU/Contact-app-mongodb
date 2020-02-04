import{ Contact} from './contactType'

import mongoose from "mongoose";

// export type Contact = {
//     id: string;
//     firstName: string;
//     lastName?: string;
//     phone: string;
//     email?: string;
//     company?: string;
//     createdAt: Date | string;
//     updatedAt: Date | string;
// };

type ContactType = Contact & mongoose.Document;

const contactsSchema = new mongoose.Schema({
    id: { type: mongoose.SchemaTypes.String, unique: true, required: true },
    firstName: String,
    lastName: String,
    phone: mongoose.SchemaTypes.String,
    email: String,
    company: String,
    createdAt: mongoose.SchemaTypes.Date,
    updatedAt: Date
});

export default mongoose.model<ContactType>("contacts", contactsSchema);
