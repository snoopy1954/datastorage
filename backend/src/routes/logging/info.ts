/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Info from '../../models/logging/info';
import { toNewInfo } from '../../utils/logging';

const infosRouter = express.Router();

infosRouter.get('/', async (_request, response) => {
    const infos = await Info.find({});
  
    response.json(infos.map(info => info.toJSON()));
});

infosRouter.post('/', async (request, response) => {
    try {
        const newInfo = new Info(toNewInfo(request.body));
        void await newInfo.save();
        response.json(newInfo);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

infosRouter.put('/:id', async (request, response) => {
    try {
        const newInfo = toNewInfo(request.body); 
        const info = await Info.findByIdAndUpdate(request.params.id, newInfo, { new: true });
        if (info) response.json(info.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default infosRouter;