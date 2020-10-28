/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as mongoose from 'mongoose';

const devicetypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false }
});

devicetypeSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default devicetypeSchema;