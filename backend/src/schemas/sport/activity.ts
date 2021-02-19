/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true },
    group: { type: String, required: false },
    distance:  { type: String, required: false },
    duration:  { type: String, required: false },
    steps:  { type: String, required: false },
    year: { type: String, required: false },
    date: { type: String, required: false },
    comment: { type: String, required: false },
});

activitySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default activitySchema;
