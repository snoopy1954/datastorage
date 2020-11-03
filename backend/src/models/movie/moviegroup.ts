/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import moviegroupSchema from "../../schemas/movie/moviegroup";

const moviegroupModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Moviegroup', moviegroupSchema);

export default moviegroupModel;
