/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { mp4Folder, importFolder } from '../../constants';
import { parseString } from '../../utils/basicParser';
import { fsDirWithChecksum, fsDirWithContent } from '../../utils/filesystem';


const filesRouter = express.Router();

filesRouter.get('/:folder', (request, response) => {
    let content;
    let directory = '';
    switch (request.query.type) {
        case 'mp4':
            directory = mp4Folder + '/' + parseString(request.params.folder).replace(/\|/g,'/');
            content = fsDirWithChecksum(directory, '.mp4');
            break;
        case 'csv':
            directory = importFolder;
            content = fsDirWithContent(directory, '.csv');
            break;
        default:
    }

    try {
        response.json(content);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default filesRouter;