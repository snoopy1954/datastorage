/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true },
  pgid: { type: String, required: true },
  group: { type: String, required: true },
  cdnumber: { type: Number, required: true },
  cdidents: { type: [String], required: false },
});

artistSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default artistSchema;