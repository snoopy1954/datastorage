/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: false },
  filetype: { type: String, required: false },
  filesize: { type: String, required: false },
  image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  }
});

imageSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default imageSchema;