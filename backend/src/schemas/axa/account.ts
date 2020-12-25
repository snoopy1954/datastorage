/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

import { AccountStatus, Insurancetype } from '../../types/axa';

const nameSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true }
});

const noteSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filetype: { type: String, required: true },
  filesize: { type: String, required: true },
  dataId: { type: String, required: true },
  received: { type: String, required: true },
});

const detailsSchema = new mongoose.Schema({
  insurancetype: { type: Insurancetype, required: true },
  year: { type: String, required: true },
  amount: { type: String, required: false },
  refund: { type: String, required: false },
  deny: { type: String, required: false },
  retension: { type: String, required: false },
  dent20: { type: String, required: false },
});

const accountSchema = new mongoose.Schema({
  name: nameSchema,
  status: { type: AccountStatus, required: true },
  passed: { type: String, required: false },
  billIDs: { type: [String], required: false },
  details: { type: [detailsSchema], required: false },
  notes: { type: [noteSchema], required: false },
});

accountSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default accountSchema;
