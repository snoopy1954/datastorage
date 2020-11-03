/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import movieformatSchema from "../../schemas/movie/movieformat";

const movieformatModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Movieformat', movieformatSchema);

export default movieformatModel;
