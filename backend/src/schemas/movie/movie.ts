/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const nameSchema = new mongoose.Schema({
    seqnr: { type: Number, required: true },
    name: { type: String, required: true }
});

const movieSchema = new mongoose.Schema({
    title: nameSchema,
    comment: { type: String, required: false },
    format: { type: String, required: false },
    moviegroup: { type: String, required: false },
    subgroup: { type: String, required: false },
    season: { type: String, required: false },
    serial: { type: String, required: false },
    maximal: { type: String, required: false },
    launched: { type: String, required: false },
    filename: { type: String, required: true },
    checksum: { type: String, required: true },
    createdAt: { type: Date, required: false },
    modifiedAt: { type: Date, required: false },
});

movieSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default movieSchema;