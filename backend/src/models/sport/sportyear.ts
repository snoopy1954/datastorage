/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import sportConnection from '../../connections/sport';
import sportyearSchema from '../../schemas/basic/year';

const sportyearModel: mongoose.Model<mongoose.Document, {}> = sportConnection.model('Sportyear', sportyearSchema);

export default sportyearModel;
