import { Activity, ActivityNoID } from '../../../../backend/src/types/sport';
import { Filter } from '../../types/sport';

import { getCurrentDate, getCurrentYear } from '../basic/basic';


export const newActivity = (): ActivityNoID => {
    const activity: ActivityNoID = {
        name: "",
        seqnr: 0,
        group: '',
        distance: '',
        duration: '',
        steps: '',
        year: '',
        date: '',
        comment: '',
    };

    return activity;
};

export const emptyActivity = (): Activity => {
    const activity: Activity = {
        id: '',
        name: "",
        seqnr: 0,
        group: '',
        distance: '',
        duration: '',
        steps: '',
        year: '',
        date: '',
        comment: '',
    }
    return activity;
};

export const nextActivity = (activities: Activity[]): ActivityNoID => {
    const activity: ActivityNoID = {
        name: "",
        seqnr: nextSeqnr(activities),
        group: '',
        distance: '',
        duration: '',
        steps: '',
        year: getCurrentYear(),
        date: getCurrentDate(),
        comment: '',
    };

    return activity;
};

export const nextSeqnr = (activities: Activity[]): number => {
    let maxNumber = 0;

    Object.values(activities).forEach(activity => {
        if (activity.seqnr >maxNumber) maxNumber = activity.seqnr;
    });
    
    return maxNumber+1;
};

const sortElements = (a: Activity, b: Activity) => {
    const nameA = a.seqnr;
    const nameB = b.seqnr;
    if (nameA > nameB) {
        return -1;
    }
    if (nameA < nameB) {
        return 1;
    }
    return 0;
};

export const sortActivities = (activities: Activity[]): Activity[] => {
    return activities.sort(sortElements);
};

export const filterActivities = (activities: Activity[], filter: Filter): Activity[] => {
    let filteredActivities = (filter.group!=="") 
        ? Object.values(activities).filter(activity => activity.group===filter.group) 
        : activities;
    filteredActivities = (filter.year!=="") 
        ? Object.values(filteredActivities).filter(activity => activity.year===filter.year) 
        : filteredActivities;
    const sortedActivitys = sortActivities(Object.values(filteredActivities));

    return sortedActivitys;
};

export const newFilter = (): Filter => {
    const filter: Filter = {
        group: '',
        year: ''
    }

    return filter;
};
