/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { importCSVDiba } from '../../utils/account/import';
import { exchangeFolder, dumpPGFilename } from '../../constants';

const importRouter = express.Router();

importRouter.get('/', (_request, response) => {
    try {
        const filename = exchangeFolder + dumpPGFilename;
        const importData = importCSVDiba(filename);
        response.json(importData);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default importRouter;