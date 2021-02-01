/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as mongoose from 'mongoose';

const accounttypeSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    iban: {type: String, required: false },
    bic: {type: String, required: false },
    number: {type: String, required: false },
    balance: {type: String, required: false },
    comment: {type: String, required: false }
});

accounttypeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default accounttypeSchema;
