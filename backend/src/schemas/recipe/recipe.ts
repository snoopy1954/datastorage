/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    filename: { type: String, required: false },
    filetype: { type: String, required: false },
    filesize: { type: String, required: false },
    dataId: { type: String, required: false }
});

const recipeSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    group: { type: String, required: false },
    subgroup: { type: String, required: false },
    content: contentSchema
});

recipeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default recipeSchema;