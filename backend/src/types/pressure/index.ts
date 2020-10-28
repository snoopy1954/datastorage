export interface Year {
    name: string;
    lastMonth: number;
    isLastYear: boolean;
}

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
