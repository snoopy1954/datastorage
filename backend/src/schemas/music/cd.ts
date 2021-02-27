/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const cdSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true },
  pgid: { type: String, required: false },
  artistident: { type: String, required: true },
  coverident: { type: String, required: false },
  backident: { type: String, required: false },
  time: { type: String, required: true },
  size: { type: String, required: true },
  bitrate: { type: String, required: true },
  group: { type: String, required: true },
  year: { type: String, required: false },
  source: { type: String, required: true },
  folder: { type: String, required: true },
  tracknumber: { type: Number, required: true },
  trackidents: { type: [String], required: true },
  comment: { type: String, required: false },
});

cdSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default cdSchema;
