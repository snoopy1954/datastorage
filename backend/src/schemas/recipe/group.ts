/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const recipegroupSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    subgroups: {type: [String], required: true }
});

recipegroupSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default recipegroupSchema;