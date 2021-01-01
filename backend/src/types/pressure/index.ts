import { Name } from '../basic';

export interface Year {
    id: string;
    name: Name;
    lastMonth: number;
    isLastYear: boolean;
}

export type YearNoID = Omit<Year, 'id'>;

export interface Measure {
    time: string;
    systolic: string;
    diastolic: string;
    pulse: string;
}

export interface Day {
    date: string;
    weight: string;
	early: Measure;
	late: Measure;
}

export interface Weight {
    total: string;
    start: string;
    end: string;
}

export interface Average {
    total: string;
    early: string;
    late: string;
}

export interface Month {
    id: string;
    key: string;
    year: string;
    month: string;
    monthname: string;
    weight: Weight; 
	diastolic: Average;   
    systolic: Average; 
    pulse: Average;      
    days: Day[];
}

export type MonthNoID = Omit<Month, 'id'>;
