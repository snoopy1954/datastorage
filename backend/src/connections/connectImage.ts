import mongoose from 'mongoose';

import { MONGODB_URI_IMAGE } from '../utils/config';
import { logInfo, logError } from '../utils/logger';

const url: string = MONGODB_URI_IMAGE ? MONGODB_URI_IMAGE : "";

const connImage: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connImage.on('error', function () { logError(`error connecting to MongoDB image\n`); });
connImage.once('open', function () { logInfo('connected to MongoDB image'); });

export default connImage;
