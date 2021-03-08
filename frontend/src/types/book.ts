import { BookNoID } from '../../../backend/src/types/book';
import { ContentWithFile } from '../types/basic';

export interface Filter {
    group: string;
    subgroup: string;
    tongue: string;
    author: string;
}

export interface BookWithContentNoID extends BookNoID {
    contentwithfile: ContentWithFile;
}


