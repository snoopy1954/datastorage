/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import recipeConnection from '../../connections/recipe';
import recipeSchema from '../../schemas/recipe/recipe';

const recipeModel: mongoose.Model<mongoose.Document, {}> = recipeConnection.model('Recipe', recipeSchema);

export default recipeModel;
