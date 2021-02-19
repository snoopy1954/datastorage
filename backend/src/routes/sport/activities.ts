/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from 'express';
import Activity from '../../models/sport/activity';
import { toActivity } from '../../utils/sport';

const activitiesRouter = express.Router();

activitiesRouter.get('/', async (_request, response) => {
    const activities = await Activity.find({});
  
    response.json(activities.map(activity => activity.toJSON()));
});

activitiesRouter.get('/:id', async (request, response) => {
    try {
        const activity = await Activity.findById(request.params.id);
        if (activity) response.json(activity.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

activitiesRouter.post('/', async (request, response) => {
    try {
        const newActivity = new Activity(toActivity(request.body));
        void await newActivity.save();
        response.json(newActivity);
    } catch (e) {
        response.status(400).send(e.message);
    }
});

activitiesRouter.delete('/:id', async (request, response) => {
    try {
        const activity = await Activity.findByIdAndRemove(request.params.id);
        if (activity) response.json(activity.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});
  
activitiesRouter.put('/:id', async (request, response) => {
    try {
        const newActivity = toActivity(request.body); 
        const activity = await Activity.findByIdAndUpdate(request.params.id, newActivity, { new: true });
        if (activity) response.json(activity.toJSON());
        else response.status(404).end();
    } catch (e) {
        response.status(400).send(e.message);
    }
});

export default activitiesRouter;