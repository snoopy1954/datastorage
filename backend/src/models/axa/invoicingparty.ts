/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import mongoose from 'mongoose';

import connectAxa from "../../connections/axa";
import invoicinpartySchema from "../../schemas/axa/invoicingparty";

const invoicinpartySModel: mongoose.Model<mongoose.Document, {}> = connectAxa.model('Invoicingparty', invoicinpartySchema);

export default invoicinpartySModel;
