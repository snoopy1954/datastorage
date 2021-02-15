/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    dataId: { type: String, required: false },
    filename: { type: String, required: false },
    filetype: { type: String, required: false },
    filesize: { type: String, required: false },
    date: { type: String, required: false },
    description: { type: String, required: false },
    seqnr: { type: Number, required: false },    
});

const documentSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    group: { type: String, required: false },
    subgroup: { type: String, required: false },
    contents: [contentSchema],
    keywords: { type: [String], required: false },
    year: { type: String, required: false },
    date: { type: String, required: false },
    comment: { type: String, required: false },
    person: { type: String, required: false }
});

documentSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default documentSchema;