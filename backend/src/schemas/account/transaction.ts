/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    checksum: {type: String, required: false },
    accounttype: {type: String, required: true },
    date: {type: String, required: false },
    year: {type: String, required: false },
    month: {type: String, required: false },
    text: {type: String, required: false },
    purpose: {type: String, required: false },
    person: {type: String, required: false },
    iban: {type: String, required: false },
    bic: {type: String, required: false },
    value: {type: String, required: false },
    currency: {type: String, required: false },
    info: {type: String, required: false },
    balance: {type: String, required: false }
});

transactionSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default transactionSchema;
