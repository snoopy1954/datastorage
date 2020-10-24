/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as mongoose from 'mongoose';

const nameSchema = new mongoose.Schema({
  seqnr: { type: Number, required: true },
  name: { type: String, required: true }
});

const completeaddressSchema = new mongoose.Schema({
  zipcode: { type: String, required: false },
  city: { type: String, required: false },
  street: { type: String, required: false },
  number: { type: String, required: false }
});

const communicationSchema = new mongoose.Schema({
  phone: { type: String, required: false },
  mobile: { type: String, required: false },
  email: { type: String, required: false },
});

const personSchema = new mongoose.Schema({
  nickname: { type: String, required: false },
  givenname: { type: String, required: false },
  familyname: { type: String, required: true },
  birthday: { type: String, required: false },
  communication: communicationSchema,
  comment: { type: String, required: false },

});

const addressSchema = new mongoose.Schema({
  name: nameSchema,
  group: { type: String, required: true },
  completeAddress: completeaddressSchema,
  persons: [personSchema]
});

addressSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default addressSchema;