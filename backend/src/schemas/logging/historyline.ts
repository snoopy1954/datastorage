/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const historylineSchema = new mongoose.Schema({ 
  date: {
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
  },
  version: { type: String, required: true },
  text: { type: String, required: true }
});

historylineSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default historylineSchema;