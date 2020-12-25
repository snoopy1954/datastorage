/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as mongoose from 'mongoose';

const nameSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
});

const billerSchema = new mongoose.Schema({
  name: nameSchema,
  person: { type: String, required: true }
});

billerSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default billerSchema;