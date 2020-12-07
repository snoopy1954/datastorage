/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

import { AccountStatus } from '../../types/axa';

const noteSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filetype: { type: String, required: true },
  filesize: { type: String, required: true },
  dataId: { type: String, required: true },
  received: { type: String, required: true },
});

const detailsSchema = new mongoose.Schema({
  insurancetype: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  refund: { type: Number, required: true },
  deny: { type: Number, required: true },
  retension: { type: Number, required: true },
});

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
