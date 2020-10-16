/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const bookgroupSchema = new mongoose.Schema({
  groupname: {
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
  },
  subgroups: {type: [String], required: true }
});

bookgroupSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default bookgroupSchema;