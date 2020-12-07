/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

import { BillStatus, Insurancetype } from '../../types/axa';

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
  amount: { type: String, required: true },
  refund: { type: String, required: false },
  deny: { type: String, required: false },
  retension: { type: String, required: false },
});

const billSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: BillStatus, required: true },
  invoicingparty: { type: String, required: true },
  accountID: { type: String, required: true },
  details: { type: [detailsSchema], required: false },
  notes: { type: [noteSchema], required: false },
});

billSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default billSchema;