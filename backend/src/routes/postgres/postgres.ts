/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { parseString } from '../../utils/basicParser';
import { fetchPG } from '../../utils/postgres';

const postgresRouter = express.Router();

postgresRouter.get('/', async (request, response) => {
    const database = parseString(request.query.database);
    const table = parseString(request.query.table);
    const column = parseString(request.query.column);
    const id = parseString(request.query.id);
    const importData = await fetchPG(database, table, column, id);
    try {
        response.json(importData);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default postgresRouter;