/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Document from '../../models/document/document';
import { toDocument } from '../../utils/document';

const documentsRouter = express.Router();

documentsRouter.get('/', async (_request, response) => {
    const documents = await Document.find({});
  
    response.json(documents.map(document => document.toJSON()));
});

documentsRouter.get('/:id', async (request, response) => {
    try {
        const document = await Document.findById(request.params.id);
        if (document) response.json(document.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentsRouter.post('/', async (request, response) => {
    try {
        const newDocument = new Document(toDocument(request.body));
        void await newDocument.save();
        response.json(newDocument);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

documentsRouter.delete('/:id', async (request, response) => {
    try {
        const document = await Document.findByIdAndRemove(request.params.id);
        if (document) response.json(document.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
documentsRouter.put('/:id', async (request, response) => {
    try {
        const newDocument = toDocument(request.body); 
        const document = await Document.findByIdAndUpdate(request.params.id, newDocument, { new: true });
        if (document) response.json(document.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default documentsRouter;