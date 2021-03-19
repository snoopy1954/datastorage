/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import groupSchema from "../../schemas/basic/group";

const groupModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Group', groupSchema);

export default groupModel;
