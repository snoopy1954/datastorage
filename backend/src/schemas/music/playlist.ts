/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true },
  pgid: { type: String, required: true },
  time: { type: String, required: true },
  size: { type: String, required: true },
  bitrate: { type: String, required: true },
  tracknumber: { type: Number, required: true },
  trackidents: { type: [String], required: true },
});

playlistSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default playlistSchema;
