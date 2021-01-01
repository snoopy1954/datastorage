/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const nameSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
});

const yearSchema = new mongoose.Schema({
  name: nameSchema,
  lastMonth: { type: Number, required: false },
  isLastYear: { type: Boolean, required: false }
});

yearSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default yearSchema;
