/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import bodyParser from 'body-parser';

import Binarydata from '../../models/binarydata';
import Jpg from '../../models/binarydata/jpg';
import Pdf from '../../models/binarydata/pdf';

import { toBinarydata } from '../../utils/binarydata';

const binarydataRouter = express.Router();
binarydataRouter.use(bodyParser.raw({type: 'application/octet-stream', limit : '10mb'}));


binarydataRouter.get('/', async (_request, response) => {
    const binarydata = await Binarydata.find({});
  
    response.send(binarydata);
});

binarydataRouter.get('/:id', async (request, response) => {
    const type = request.query.type&&request.query.type!=='' ? request.query.type : '';

    switch (type) {
        case 'jpg':
            try {
                const binarydata = await Jpg.findById(request.params.id);
                if (binarydata) response.send(binarydata);
                else response.status(404).end();
             } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        case 'pdf':
            try {
                const binarydata = await Pdf.findById(request.params.id);
                if (binarydata) response.send(binarydata);
                else response.status(404).end();
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        default:
            try {
                const binarydata = await Binarydata.findById(request.params.id);
                if (binarydata) response.send(binarydata);
                else response.status(404).end();
            } catch (e) {
                response.status(400).send(e.message);
            }
    }
});

binarydataRouter.post('/', async (request, response) => {
    const type = request.query.type&&request.query.type!=='' ? request.query.type : '';

    switch (type) {
        case 'jpg':
            try {
                const binarydata = new Jpg(toBinarydata(request.body)); 
                void await binarydata.save(); 
                response.send(binarydata);
            } catch (e) {
               response.status(400).send(e.message);
            }
            break;
        case 'pdf':
            try {
                const binarydata = new Pdf(toBinarydata(request.body)); 
                void await binarydata.save(); 
                response.send(binarydata);
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        default:
            try {
                const binarydata = new Binarydata(toBinarydata(request.body)); 
                void await binarydata.save(); 
                response.send(binarydata);
            } catch (e) {
               response.status(400).send(e.message);
            }
        }
});

binarydataRouter.delete('/:id', async (request, response) => {
    const type = request.query.type&&request.query.type!=='' ? request.query.type : '';

    switch (type) {
        case 'jpg':
            try {
                const binarydata = await Jpg.findByIdAndRemove(request.params.id);
                if (binarydata) response.json(binarydata.toJSON());
                else response.status(404).end();
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        case 'pdf':
            try {
                const binarydata = await Pdf.findByIdAndRemove(request.params.id);
                if (binarydata) response.json(binarydata.toJSON());
                else response.status(404).end();
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        default:
            try {
                const binarydata = await Pdf.findByIdAndRemove(request.params.id);
                if (binarydata) response.json(binarydata.toJSON());
                else response.status(404).end();
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
    }
});
  
binarydataRouter.put('/:id', async (request, response) => {
    const type = request.query.type&&request.query.type!=='' ? request.query.type : '';

    switch (type) {
        case 'jpg':
            try {
                const newImage = toBinarydata(request.body); 
                const binarydata = await Jpg.findByIdAndUpdate(request.params.id, newImage, { new: true });
                response.send(binarydata);
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        case 'pdf':
            try {
                const newImage = toBinarydata(request.body); 
                const binarydata = await Pdf.findByIdAndUpdate(request.params.id, newImage, { new: true });
                response.send(binarydata);
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
        default:
            try {
                const newImage = toBinarydata(request.body); 
                const binarydata = await Binarydata.findByIdAndUpdate(request.params.id, newImage, { new: true });
                response.send(binarydata);
            } catch (e) {
                response.status(400).send(e.message);
            }
            break;
    }

});

export default binarydataRouter;