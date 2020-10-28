import mongoose from 'mongoose';

import { MONGODB_URI_BLUTDRUCK } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_BLUTDRUCK ? MONGODB_URI_BLUTDRUCK : "";

const connBlutdruck: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connBlutdruck.on('error', function () { logError(`error connecting to MongoDB blutdruck\n`); });
connBlutdruck.once('open', function () { logInfo('connected to MongoDB blutdruck'); });

export default connBlutdruck;
