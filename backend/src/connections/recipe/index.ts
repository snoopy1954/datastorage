import mongoose from 'mongoose';

import { MONGODB_URI } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const database = 'recipe';
const url: string = MONGODB_URI ? MONGODB_URI.replace('DATABASE', database) : "";

const recipeConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
recipeConnection.on('error', function () { logError(`error connecting to MongoDB ${database}\n`); });
recipeConnection.once('open', function () { logInfo(`connected to MongoDB ${database}`); });

export default recipeConnection;
