import { Name } from '../basic';

export interface Activity extends Name {
    id: string;
    group: string;
    distance: string;
    duration: string;
    steps: string;
    year: string;
    date: string;
    comment: string;
}

export type ActivityNoID = Omit<Activity, 'id'>;
