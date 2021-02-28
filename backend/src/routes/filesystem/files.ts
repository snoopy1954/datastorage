/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { mp4Folder, importFolder } from '../../constants';
import { parseString } from '../../utils/basicParser';
import { fsDirWithChecksum, fsDirWithContent, fsFile, fsExistsFile } from '../../utils/filesystem';


const filesRouter = express.Router();

filesRouter.get('/:folder', (request, response) => {
    let content;
    let name = '';
    switch (request.query.type) {
        case 'mp4':
            name = mp4Folder + '/' + parseString(request.params.folder).replace(/\|/g,'/');
            content = fsDirWithChecksum(name, '.mp4');
            break;
        case 'csv':
            name = importFolder;
            content = fsDirWithContent(name, '.csv');
            break;
        case 'file':
            name = parseString(request.params.folder).replace(/\|/g,'/');
//            console.log(name);
            content = fsFile(name);
            break;
        case 'exists':
            name = parseString(request.params.folder).replace(/\|/g,'/');
//            console.log(name);
            content = fsExistsFile(name);
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