import mongoose from 'mongoose';

import { MONGODB_URI_RECIPE } from '../../utils/config';
import { logInfo, logError } from '../../utils/logger';

const url: string = MONGODB_URI_RECIPE ? MONGODB_URI_RECIPE : "";

const recipeConnection: mongoose.Connection = mongoose.createConnection(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
});
recipeConnection.on('error', function () { logError(`error connecting to MongoDB recipe\n`); });
recipeConnection.once('open', function () { logInfo('connected to MongoDB recipe'); });

export default recipeConnection;
