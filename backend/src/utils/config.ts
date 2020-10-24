import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI_NETZWERK = process.env.MONGODB_URI_NETZWERK;
export const MONGODB_URI_BLUTDRUCK = process.env.MONGODB_URI_BLUTDRUCK;
export const MONGODB_URI_BUCH = process.env.MONGODB_URI_BUCH;
export const MONGODB_URI_IMAGE = process.env.MONGODB_URI_IMAGE;
export const MONGODB_URI_ADRESSE = process.env.MONGODB_URI_ADRESSE;

