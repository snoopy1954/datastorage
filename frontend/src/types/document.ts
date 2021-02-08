import { DocumentNoID } from '../../../backend/src/types/document';

export interface Filter {
    group: string;
    subgroup: string;
    year: string;
    person: string;
}

export interface DocumentWithFileNoID extends DocumentNoID {
    file: File;
}


