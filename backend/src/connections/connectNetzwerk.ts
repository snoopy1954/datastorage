import mongoose from 'mongoose';

import { MONGODB_URI_NETZWERK } from '../utils/config';
// import { logInfo, logError } from '../utils/logger';

const url: string = MONGODB_URI_NETZWERK ? MONGODB_URI_NETZWERK : "";

const connNetzwerk: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
connNetzwerk.on('error', console.error.bind(console, `error connecting to MongoDB netzwerk\n`));
connNetzwerk.once('open', function () { console.log('connected to MongoDB netzwerk'); });

export default connNetzwerk;
