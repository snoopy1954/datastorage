/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { importPG, exportMG } from '../../utils/migrate';
import { exchangeFolder, dumpPGFilename, dumpMGBasename, dumpMGExtension } from '../../constants';
import { Month } from '../../types/blutdruckTypes';

const exchangeRouter = express.Router();

exchangeRouter.get('/', (_request, response) => {
    const filename = exchangeFolder + dumpPGFilename;
    try {
        const importData = importPG(filename);
        response.json(importData);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

exchangeRouter.post('/', (request, response) => {
    const filename = exchangeFolder + dumpMGBasename + String(request.body.key) + dumpMGExtension;
    try {
        const exportMonth: Month = exportMG(filename, request.body);
        if (exportMonth) {
            response.json(exportMonth);
        }
        else {
            response.status(400).send('update failed');
        }
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default exchangeRouter;