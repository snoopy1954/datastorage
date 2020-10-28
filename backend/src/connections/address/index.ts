import mongoose from 'mongoose';

import { MONGODB_URI_ADRESSE } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_ADRESSE ? MONGODB_URI_ADRESSE : "";

const connectAdresse: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connectAdresse.on('error', function () { logError(`error connecting to MongoDB adresse\n`); });
connectAdresse.once('open', function () { logInfo('connected to MongoDB adresse'); });

export default connectAdresse;
