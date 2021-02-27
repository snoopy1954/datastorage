/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true },
  pgid: { type: String, required: true },
  artistident: { type: String, required: true },
  cdident: { type: String, required: true },
  time: { type: String, required: true },
  size: { type: String, required: true },
  bitrate: { type: String, required: true },
  songtitle: { type: String, required: false },
  songartist: { type: String, required: false },
});

trackSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default trackSchema;
