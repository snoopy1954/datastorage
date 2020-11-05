import { FieldValue, Settype, Setcolor } from '../types/sudoku';

const deepCopy = (fieldvalues: FieldValue[]) => {
    const copiedfieldvalues: FieldValue[] = [];

    Object.values(fieldvalues).forEach(element => {
        const copiedfieldvalue: FieldValue = {
            number: element.number,
            fieldnr: element.fieldnr,
            settype: element.settype,
            seqnr: element.settype
        }
        copiedfieldvalues.push(copiedfieldvalue);
    });
    
    return copiedfieldvalues;
  };

  export const initializeValues = (): FieldValue[] => {
    const fieldvalues: FieldValue[] = [];

    for (let index=0; index<81; index++) {
        const fieldvalue: FieldValue = {
            number: 0,
            fieldnr: index,
            seqnr: 0,
            settype: Settype.NONE
        }
        fieldvalues.push(fieldvalue);
    }
  
    return fieldvalues;
};

export const fieldvalues2string = (fieldvalues: FieldValue[]): string => {
    let fieldvaluesAsString = '';
       
    Object.values(fieldvalues).forEach(fieldvalue => {
        if (fieldvalue.settype===Settype.SET) {
            fieldvaluesAsString += String(fieldvalue.number);
            fieldvaluesAsString += String(fieldvalue.settype);
            if (fieldvalue.seqnr < 10) fieldvaluesAsString += '0';
            fieldvaluesAsString += String(fieldvalue.seqnr);
        } else {
            fieldvaluesAsString += '0000';
        }
    })

    return fieldvaluesAsString;
};

export const solution2string = (fieldvalues: FieldValue[]): string => {
    let fieldvaluesAsString = '';
       
    Object.values(fieldvalues).forEach(fieldvalue => {
        fieldvaluesAsString += String(fieldvalue.number);
    })

    return fieldvaluesAsString;
};

export const string2solution = (fieldvaluesAsString: string): FieldValue[] => {
    const fieldvalues: FieldValue[] = [];

    for (let index=0; index< 81; index++) {
        const fieldvalue: FieldValue = {
            number: +fieldvaluesAsString.substring(index, index+1),
            fieldnr: index,
            settype: Settype.SOLVED,
            seqnr: index
        }
        fieldvalues.push(fieldvalue)
    }

    return fieldvalues;
};

export const string2fieldvalues = (fieldvaluesAsString: string): FieldValue[] => {
    const fieldvalues: FieldValue[] = [];

    for (let index=0; index< 81; index++) {
        const fieldvalue: FieldValue = {
            number: +fieldvaluesAsString.substring(index*4, index*4+1),
            fieldnr: index,
            settype: +fieldvaluesAsString.substring(index*4+1, index*4+2),
            seqnr: +fieldvaluesAsString.substring(index*4+2, index*4+4)
        }
        fieldvalues.push(fieldvalue)
    }

    return fieldvalues;
};

const index2tupel = (index: number): number[] => {
    const i = Math.floor((index/27));
    const j = Math.floor((index-(i*27))/9);
    const k = Math.floor((index-(i*27)-(j*9))/3);
    const l = (index-(i*27)-(j*9)-(k*3));

    return [i,j,k,l]
};

const tupel2index = (i: number, j: number, k: number, l: number) => {
    return i*27+j*9+k*3+l;
};

const isSetBox = (solution: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [i,j,,] = index2tupel(index);
             
    for (let k=0; k<3; k++) {
        for (let l=0; l<3; l++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = solution[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

const isSetRow = (solution: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [i,,k,] = index2tupel(index);
             
    for (let j=0; j<3; j++) {
        for (let l=0; l<3; l++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = solution[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

const isSetCol = (solution: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [,j,,l] = index2tupel(index);
             
    for (let i=0; i<3; i++) {
        for (let k=0; k<3; k++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = solution[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

const isCandidate = (solution: FieldValue[], value: number, index: number): boolean => {
    return (!isSetBox(solution, value, index))&&(!isSetRow(solution, value, index))&&(!isSetCol(solution, value, index));
};

export const solveBacktrack2 = (fieldvalues: FieldValue[], index: number): [boolean, number[]] => {	
    const solution: FieldValue[] = fieldvalues;
      
    if (index===81) {
        const gamevalues: number[] = [];
        for (let index=0; index<81; index++) {
            gamevalues.push(solution[index].number);
        }
        return [true, gamevalues];
    }

    const fieldvalue: FieldValue = solution[index];
    if (fieldvalue.number>0) return solveBacktrack2(solution, index+1);   			
 
    for (let testnumber=1; testnumber<10; testnumber++) {     
        if (isCandidate(solution, testnumber, index)) {
            solution[index] = {
                number: testnumber,
                fieldnr: index,
                seqnr: 0,
                settype: Settype.TRY   
            };
            let result = false;
            let values = [];
            [result, values] = solveBacktrack2(solution, index+1);    
            if (result) return [true, values];
            solution[index] = {
                number: 0,
                fieldnr: index,
                seqnr: 0,
                settype: Settype.NONE   
            }
        }
    }
         
    return [false, []];
};

export const solveBacktrack = (fieldvalues: FieldValue[], index: number): [boolean, FieldValue[]] => {	
    const solution: FieldValue[] = deepCopy(fieldvalues);
      
    if (index===81) {
        return [true, solution];
    }

    const fieldvalue: FieldValue = solution[index];
    if (fieldvalue.number>0) return solveBacktrack(solution, index+1);   			
 
    for (let testnumber=1; testnumber<10; testnumber++) {     
        if (isCandidate(solution, testnumber, index)) {
            solution[index] = {
                number: testnumber,
                fieldnr: index,
                seqnr: 0,
                settype: Settype.SOLVED   
            };
            let result = false;
            let values = [];
            [result, values] = solveBacktrack(solution, index+1);    
            if (result) return [true, values];
            solution[index] = {
                number: 0,
                fieldnr: index,
                seqnr: 0,
                settype: Settype.NONE   
            }
        }
    }
         
    return [false, []];
};

export const getColors = (fieldvalues: FieldValue[]): Setcolor[] => {
    const colors: Setcolor[] = [];
    Object.values(fieldvalues).forEach(value => {
        switch (value.settype) {
            case Settype.SET: 
                colors.push(Setcolor.SET);
                break;
            case Settype.GAME: 
                colors.push(Setcolor.GAME);
                break;
            case Settype.SOLVED: 
                colors.push(Setcolor.SOLVED);
                break;
            default:
                colors.push(Setcolor.SET);
        }
    })
    return colors;
};

export const checkFieldvalue = (solutionnumbers: FieldValue[], field: number, value: number): boolean => {
    return solutionnumbers[field].number===value ? true : false;
};

