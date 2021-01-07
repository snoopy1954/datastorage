/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';

import { mp4Folder } from '../../constants';
import { parseString } from '../../utils/basicParser';
import { fsDirWithChecksum } from '../../utils/filesystem/fsDir';

const mp4Router = express.Router();

mp4Router.get('/:folder', (request, response) => {
    const directory: string = mp4Folder + '/' + parseString(request.params.folder).replace(/\|/g,'/');
    const content: string[] = fsDirWithChecksum(directory, '.mp4');
    try {
        response.json(content);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default mp4Router;