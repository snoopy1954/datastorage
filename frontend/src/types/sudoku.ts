export enum Settype {
    NONE,
    SET,
    GAME,
    TRY,
    SOLVED,
}

export enum Setcolor {
    NONE = 'white',
    SET =  'black',
    GAME = 'blue',
    TRY = 'red',
    SOLVED = 'green'
}

export interface Field {
    number: number;
    fieldnr: number;
    seqnr: number;
    settype: Settype;
}

export enum Flagtype {
    SET, 
    CHECK, 
    CANDIDATES, 
    SINGLES, 
    HIDDENSINGLES, 
    NAKEDPAIRS
}
