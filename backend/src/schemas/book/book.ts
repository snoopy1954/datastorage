/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const nameSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
});

const personSchema = new mongoose.Schema({
    givenname: { type: String, required: false },
    familyname: { type: String, required: false }
});

const contentSchema = new mongoose.Schema({
    filename: { type: String, required: false },
    filetype: { type: String, required: false },
    filesize: { type: String, required: false },
    dataId: { type: String, required: false },
    date: { type: String, required: false },
    description: { type: String, required: false },
    seqnr: { type: Number, required: false }   
});

const bookSchema = new mongoose.Schema({
    title: nameSchema,
    author: personSchema,
    comment: { type: String, required: false },
    link: { type: String, required: false },
    format: { type: String, required: false },
    bookgroup: { type: String, required: false },
    subgroup: { type: String, required: false },
    ownership: { type: String, required: false },
    tongue: { type: String, required: false },
    launched: { type: String, required: false },
    read: { type: String, required: false },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
    content: contentSchema
});

bookSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default bookSchema;