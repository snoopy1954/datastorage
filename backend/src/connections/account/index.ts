import mongoose from 'mongoose';

import { MONGODB_URI_ACCOUNT } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_ACCOUNT ? MONGODB_URI_ACCOUNT : "";

const connectAccount: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connectAccount.on('error', function () { logError(`error connecting to MongoDB account\n`); });
connectAccount.once('open', function () { logInfo('connected to MongoDB account'); });

export default connectAccount;
