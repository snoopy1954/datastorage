import mongoose from 'mongoose';

import { MONGODB_URI_BUCH } from '../utils/config';
// import { logInfo, logError } from '../utils/logger';

const url: string = MONGODB_URI_BUCH ? MONGODB_URI_BUCH : "";

const connBuch: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connBuch.on('error', console.error.bind(console, `error connecting to MongoDB buch\n`));
connBuch.once('open', function () { console.log('connected to MongoDB buch'); });

export default connBuch;
