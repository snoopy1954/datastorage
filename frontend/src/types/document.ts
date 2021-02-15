import { DocumentNoID } from '../../../backend/src/types/document';
import { ContentWithFile } from '../types/basic';

export interface Filter {
    group: string;
    subgroup: string;
    year: string;
    person: string;
}

export interface DocumentWithContentsNoID extends DocumentNoID {
    contentswithfile: ContentWithFile[];
}


