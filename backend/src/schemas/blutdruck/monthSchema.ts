/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as mongoose from 'mongoose';

const measureSchema = new mongoose.Schema({
    time: { type: String, required: false },
    systolic: { type: String, required: false },
    diastolic: { type: String, required: false },
    pulse: { type: String, required: false }
});

const averageSchema = new mongoose.Schema({
    total: { type: String, required: false },
    early: { type: String, required: false },
    late: { type: String, required: false }
});

const weightSchema = new mongoose.Schema({
    total: { type: String, required: false },
    start: { type: String, required: false },
    end: { type: String, required: false }
});

const daySchema = new mongoose.Schema({
    date: { type: String, required: true },
	weight: { type: String, required: false },
	early: { type: measureSchema, required: true },
	late: { type: measureSchema, required: true }
});

const monthSchema = new mongoose.Schema({
    key: { type: String, required: true },
    year: { type: String, required: true },
    month: { type: String, required: true }, 
    monthname: { type: String, required: true },
    weight: { type: weightSchema, required: true },
    systolic: { type: averageSchema, required: true },
    diastolic: { type: averageSchema, required: true },
    pulse: { type: averageSchema, required: true },
    days: [daySchema]
});

monthSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});
  
export default monthSchema;