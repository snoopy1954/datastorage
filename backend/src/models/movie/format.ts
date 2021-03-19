/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import movieConnection from "../../connections/movie";
import formatSchema from "../../schemas/basic/format";

const formatModel: mongoose.Model<mongoose.Document, {}> = movieConnection.model('Format', formatSchema);

export default formatModel;
