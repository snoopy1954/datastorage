import mongoose from 'mongoose';

import { MONGODB_URI_BOOK } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_BOOK ? MONGODB_URI_BOOK : "";

const connBook: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connBook.on('error', function () { logError(`error connecting to MongoDB book\n`); });
connBook.once('open', function () { logInfo('connected to MongoDB book'); });

export default connBook;
