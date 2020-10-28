/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as mongoose from 'mongoose';

const networkSchema = new mongoose.Schema({
  mac: { type: String, required: true },
  ip: { type: String, required: true },
  hostname: { type: String, required: true }
});

const osversionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplement: { type: String, required: false },
  version: { type: String, required: true }
});

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  devicetype: { type: String, required: true },
  networks: [networkSchema],
  osversions: [osversionSchema],
  comment: { type: String, required: false },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
});

deviceSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default deviceSchema;