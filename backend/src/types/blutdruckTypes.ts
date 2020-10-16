// export interface Measure {
//     time: number;
//     systolic: number;
//     diastolic: number;
//     pulse: number;
// }

// export interface Day {
// 	weight: number;
// 	early: Measure;
// 	late: Measure;
// }

// export interface Month {
//     id: string;
//     date: string;
//     weight_av: number;
//     weight_in: number;           
//     weight_out: number;	   
//     diastolic_av_total: number;  
//     diastolic_av_early: number;  
//     diastolic_av_late: number; 	   
//     systolic_av_total: number; 
//     systolic_av_early: number; 
//     systolic_av_late: number; 	   
//     pulse_av_total: number;      
//     pulse_av_early: number;      
//     pulse_av_late: number; 
//     days: Day[];
// }

// export type MonthNoID = Omit<Month, 'id'>;

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

export enum Daynames {
    "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
}

export enum Monthnames {
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
}
