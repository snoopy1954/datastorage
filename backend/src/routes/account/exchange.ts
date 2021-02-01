/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { importPG } from '../../utils/account/migrate';
import { importFolder } from '../../constants';

const kontoPGRouter = express.Router();

kontoPGRouter.get('/', (_request, response) => {
    const filename = importFolder + 'import.pg';
    const importData = importPG(filename);
    try {
        response.json(importData);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default kontoPGRouter;