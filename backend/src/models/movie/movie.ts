/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import movieSchema from "../../schemas/movie/movie";

const movieModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Movie', movieSchema);

export default movieModel;
