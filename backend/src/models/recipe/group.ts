/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import recipeConnection from '../../connections/recipe';
import recipegroupSchema from '../../schemas/recipe/group';

const recipegroupModel: mongoose.Model<mongoose.Document, {}> = recipeConnection.model('Recipegroup', recipegroupSchema);

export default recipegroupModel;
