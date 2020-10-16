/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import bodyParser from 'body-parser';

import Image from '../../models/image/imageModel';

const imagesRouter = express.Router();
imagesRouter.use(bodyParser.raw({type: 'application/octet-stream', limit : '2mb'}));


imagesRouter.get('/', async (_request, response) => {
    const images = await Image.find({});
  
    response.send(images);
});

imagesRouter.get('/:id', async (request, response) => {
    try {
        const image = await Image.findById(request.params.id);
        if (image) response.send(image);
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

imagesRouter.post('/', async (request, response) => {
    try {
        const newImage = new Image( { image: { 'data': request.body, 'contentType': "application/octet-stream" }});
        void await newImage.save(); 
        response.send(newImage);
    } catch (e) {
       response.status(400).send(e.message);
    }
});

imagesRouter.delete('/:id', async (request, response) => {
    try {
        const image = await Image.findByIdAndRemove(request.params.id);
        if (image) response.json(image.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
imagesRouter.put('/:id', async (request, response) => {
    try {
        const newImage = new Image( { image: { 'data': request.body, 'contentType': "application/octet-stream" }});
        void await Image.findByIdAndUpdate(request.params.id, newImage, { new: true });
        response.send(newImage);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default imagesRouter;