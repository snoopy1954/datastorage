import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const POSTGRES_URI = process.env.POSTGRES_URI;
export const MONGODB_URI = process.env.MONGODB_URI;
