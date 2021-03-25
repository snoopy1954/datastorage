/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { importPG, exportMG, pdfMG } from '../../utils/pressure/migrate';
import { exchangeFolder, pressureFolder, dumpPGFilename, dumpMGBasename } from '../../constants';
import { Month } from '../../types/pressure';

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
    const type = request.query.type&&request.query.type!=='' ? request.query.type : '';
    let filename = '';
    switch (type) {
        case 'xml':
            filename = exchangeFolder + dumpMGBasename + String(request.body.key) + '.' + String(type);
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
            break;
        case 'pdf':
            filename = pressureFolder + '/' + String(request.body.year) + '/' + dumpMGBasename + String(request.body.key) + '.' + String(type);
            pdfMG(filename, request.body);
            response.json(filename);
            break;
        default:
    }
});

export default exchangeRouter;