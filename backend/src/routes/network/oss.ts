/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Os from '../../models/netzwerk/osModel';
import { toNewOs } from '../../utils/netzwerkParameter';

const ossRouter = express.Router();

ossRouter.get('/', async (_request, response) => {
    const oss = await Os
      .find({});
  
    response.json(oss.map(os => os.toJSON()));
});

ossRouter.get('/:id', async (request, response) => {
    try {
        const os = await Os.findById(request.params.id);
        if (os) response.json(os.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

ossRouter.post('/', async (request, response) => {
    try {
        const newOs = new Os(toNewOs(request.body));
        void await newOs.save();
        response.json(newOs);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

ossRouter.delete('/:id', async (request, response) => {
    try {
        const os = await Os.findByIdAndRemove(request.params.id);
        if (os) response.json(os.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

ossRouter.put('/:id', async (request, response) => {
    try {
        const newOs = toNewOs(request.body);
        const updatedOs = await Os.findByIdAndUpdate(request.params.id, newOs);
        if (updatedOs) {
            response.json(updatedOs.toJSON());
        }
        else {
            response.status(400).send('update failed');
        }
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
export default ossRouter;