/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import recipeConnection from '../../connections/recipe';
import groupSchema from '../../schemas/basic/group';

const recipegroupModel: mongoose.Model<mongoose.Document, {}> = recipeConnection.model('Recipegroup', groupSchema);

export default recipegroupModel;
