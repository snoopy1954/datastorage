/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import groupSchema from "../../schemas/basic/group";

const moviegroupModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Moviegroup', groupSchema);

export default moviegroupModel;
