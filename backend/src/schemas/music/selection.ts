/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const selectionSchema = new mongoose.Schema({
  artistid: { type: String, required: false },
  cdid: { type: String, required: false },
  playlistid: { type: String, required: false },
});

selectionSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
  
export default selectionSchema;
