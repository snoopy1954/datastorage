import { Content2 } from '../../../backend/src/types/basic';

export enum Edittype {
    EDIT = "edit",
    ADD = "add",
    SHOW = 'show',
    PRINT = 'print',
    EXPORT = 'export'
}

export enum Direction {
    UP = "up",
    DOWN = "down"
}

export enum Monthnames {
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
}

export enum Daynames {
    "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
}

export type Option = {
    value: string;
    label: string;
};
  
export interface FileDate {
    file: File;
    date: string;
};

export interface ContentWithFile extends Content2 {
    file: File;
};


