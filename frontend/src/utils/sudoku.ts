import { FieldValue, Settype, Setcolor } from '../types/sudoku';

import { getMD5 } from '../utils/basic';

const deepCopyFieldValues = (fieldvalues: FieldValue[]) => {
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

export const setMatrix = (): number[][] => {
    const translation: number[][] = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    const a = j*3+l+1;
                    const b = i*3+k+1;
                    translation.push([a,b]);
                }
            }
        }
    }

    return translation;
};

export const setNumbermatrix = (): number[][] => {
    const translation: number[][] = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            const a = j+12;
            const b = i+1;
            translation.push([a,b]);
        }
    }
    
    return translation;
};

export const setCandidatematrix = (): number[][] => {
    const translation: number[][] = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    for (let m=0; m<3; m++) {
                        for (let n=0; n<3; n++) {
                            const a = j*3+l+1+n*0.3+0.2;
                            const b = i*3+k+1+m*0.3+0.3;
                            translation.push([a,b]);
                        }
                    }
                }
            }
        }
    }

    return translation;
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

const candidates2string = (candidates: boolean[]): string => {
    let candidatesAsString = '';
       
    candidates.forEach(candidate => {
        candidatesAsString += candidate ? 'T' : 'F';
    });

    return candidatesAsString;
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

export const checkComplete = (numbers: FieldValue[], solutionnumbers: FieldValue[]): boolean => {
    let complete = true;
    for (let index=0; index<81; index++) {
        if (numbers[index].number!==solutionnumbers[index].number) complete = false;
    }
    return complete;
};

const isSetBox = (numbers: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [i,j,,] = index2tupel(index);
             
    for (let k=0; k<3; k++) {
        for (let l=0; l<3; l++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = numbers[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

const isSetRow = (numbers: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [i,,k,] = index2tupel(index);
             
    for (let j=0; j<3; j++) {
        for (let l=0; l<3; l++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = numbers[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

const isSetCol = (numbers: FieldValue[], value: number, index: number): boolean => {
    let check = false;
    const [,j,,l] = index2tupel(index);
             
    for (let i=0; i<3; i++) {
        for (let k=0; k<3; k++) {
            const testindex = tupel2index(i, j, k, l);
            const fieldvalue = numbers[testindex];
            if (value===fieldvalue.number) {
                check = true;
            }
        }
    }
        
    return check;
};

export const isCandidate = (numbers: FieldValue[], value: number, index: number): boolean => {
    return (!isSetBox(numbers, value, index))&&(!isSetRow(numbers, value, index))&&(!isSetCol(numbers, value, index));
};

const getNumberOfCandidatesAt = (candidates: boolean[], position: number): number => {
    let numberOfCandidatesAt = 0;

    for (let index=0;index<9; index++) {
        if (candidates[position*9+index]) numberOfCandidatesAt = numberOfCandidatesAt+1;
    }

    return numberOfCandidatesAt;
};

const getCandidatesAt = (candidates: boolean[], position: number): number[] => {
    const candidatesAt: number[] = [];
    for (let index=0;index<9; index++) {
        if (candidates[position*9+index]) candidatesAt.push(index+1);
    }

    return candidatesAt;
};

const isCandidateAt = (candidates: boolean[], position: number, candidate: number): boolean => {
    return candidates[position*9+candidate-1];
};

export const solveBacktrack = (fieldvalues: FieldValue[], index: number): [boolean, FieldValue[]] => {	
    const solution: FieldValue[] = deepCopyFieldValues(fieldvalues);
      
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

export const initializeCandidates = (): boolean[] => {
    const candidates: boolean[] = [];

    for (let index=0; index<81*9; index++) {
        candidates.push(true);
    }
  
    return candidates;
};

const findGameCandidates = (numbers: FieldValue[], oldCandidates: boolean[]): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();

    for (let index=0; index<81; index++) {
        for (let value=1; value<10; value++) {
            const position: number = index*9+value-1;
            if ( numbers[index].number>0 || (!isCandidate(numbers, value, index))) {
                candidates[position] = false;
            }
        }
    }

    return candidates;
};

const filterSinglesInBox = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const j = Math.floor((index-(i*3)));

    const singlepositions: number[] = [];
    for (let k=0; k<3; k++) {
        for (let l=0; l<3; l++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===1) singlepositions.push(position);
        }
    }
    singlepositions.forEach(singleposition => {
        const testcandidates: number[] = getCandidatesAt(candidates, singleposition);
        if (testcandidates.length===1) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singleposition) candidates[position*9+testcandidates[0]-1] = false;
                }
            }                
        }
    })

    return candidates;
};

const filterSinglesInRow = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const k = Math.floor((index-(i*3)));

    const singlepositions: number[] = [];
    for (let j=0; j<3; j++) {
        for (let l=0; l<3; l++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===1) singlepositions.push(position);
        }
    }
    singlepositions.forEach(singleposition => {
        const testcandidates: number[] = getCandidatesAt(candidates, singleposition);
        if (testcandidates.length===1) {
            for (let j=0; j<3; j++) {
                for (let l=0; l<3; l++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singleposition) candidates[position*9+testcandidates[0]-1] = false;
                }
            }                
        }
    })

    return candidates;
};

const filterSinglesInCol = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const j = Math.floor((index/3));
    const l = Math.floor((index-(j*3)));
    const singlepositions: number[] = [];
    
    for (let i=0; i<3; i++) {
        for (let k=0; k<3; k++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===1) singlepositions.push(position);
        }
    }
    singlepositions.forEach(singleposition => {
        const testcandidates: number[] = getCandidatesAt(candidates, singleposition);
        if (testcandidates.length===1) {
            for (let i=0; i<3; i++) {
                for (let k=0; k<3; k++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singleposition) candidates[position*9+testcandidates[0]-1] = false;
                }
            }                
        }
    })

    return candidates;
};

const filterHiddensinglesInBox = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const j = Math.floor((index-(i*3)));

    for (let value=1; value<10; value++) {

        const singlepositions: number[] = [];
        for (let k=0; k<3; k++) {
            for (let l=0; l<3; l++) {
                const position = tupel2index(i, j, k, l);
                if (isCandidateAt(candidates, position, value)) singlepositions.push(position);
            }
        }
        if (singlepositions.length===1) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singlepositions[0]) candidates[position*9+value-1] = false;
                }
            }                
        }
    }

    return candidates;
};

const filterHiddensinglesInRow = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const k = Math.floor((index-(i*3)));

    for (let value=1; value<10; value++) {

        const singlepositions: number[] = [];
        for (let j=0; j<3; j++) {
            for (let l=0; l<3; l++) {
                const position = tupel2index(i, j, k, l);
                if (isCandidateAt(candidates, position, value)) singlepositions.push(position);
            }
        }
        if (singlepositions.length===1) {
            for (let j=0; j<3; j++) {
                for (let l=0; l<3; l++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singlepositions[0]) candidates[position*9+value-1] = false;
                }
            }                
        }
    }

    return candidates;
};

const filterHiddensinglesInCol = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const j = Math.floor((index/3));
    const l = Math.floor((index-(j*3)));

    for (let value=1; value<10; value++) {

        const singlepositions: number[] = [];
        for (let i=0; i<3; i++) {
            for (let k=0; k<3; k++) {
                const position = tupel2index(i, j, k, l);
                if (isCandidateAt(candidates, position, value)) singlepositions.push(position);
            }
        }
        if (singlepositions.length===1) {
            for (let i=0; i<3; i++) {
                for (let k=0; k<3; k++) {
                    const position = tupel2index(i, j, k, l);
                    if (position!==singlepositions[0]) candidates[position*9+value-1] = false;
                }
            }                
        }
    }

    return candidates;
};

const filterNakedpairsInBox = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const j = Math.floor((index-(i*3)));

    const doublepositions: number[] = [];
    for (let k=0; k<3; k++) {
        for (let l=0; l<3; l++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===2) doublepositions.push(position);
        }
    }
    if (doublepositions.length>1) {
        for (let m=1; m<doublepositions.length; m++) {
            for (let n=0; n<doublepositions.length-1; n++) {
                if (n!==m) {
                    const pair1 = getCandidatesAt(candidates, doublepositions[m]);
                    const pair2 = getCandidatesAt(candidates, doublepositions[n]);
                    if (pair1.length===2&&pair2.length===2&&pair1[0]===pair2[0]&&pair1[1]===pair2[1]) {
                        for (let k=0; k<3; k++) {
                            for (let l=0; l<3; l++) {
                                const position = tupel2index(i, j, k, l);
                                if (position!==doublepositions[m]&&position!==doublepositions[n]) {
                                    candidates[position*9+pair1[0]-1] = false;
                                    candidates[position*9+pair1[1]-1] = false;
                                }
                            }
                        }                    
                    }
                }
            }
        }    
    }

    return candidates;
};

const filterNakedpairsInRow = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const i = Math.floor((index/3));
    const k = Math.floor((index-(i*3)));

    const doublepositions: number[] = [];
    for (let j=0; j<3; j++) {
        for (let l=0; l<3; l++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===2) doublepositions.push(position);
        }
    }
    if (doublepositions.length>1) {
        for (let m=1; m<doublepositions.length; m++) {
            for (let n=0; n<doublepositions.length-1; n++) {
                if (n!==m) {
                    const pair1 = getCandidatesAt(candidates, doublepositions[m]);
                    const pair2 = getCandidatesAt(candidates, doublepositions[n]);
                    if (pair1.length===2&&pair2.length===2&&pair1[0]===pair2[0]&&pair1[1]===pair2[1]) {
                        for (let j=0; j<3; j++) {
                            for (let l=0; l<3; l++) {
                                const position = tupel2index(i, j, k, l);
                                if (position!==doublepositions[m]&&position!==doublepositions[n]) {
                                    candidates[position*9+pair1[0]-1] = false;
                                    candidates[position*9+pair1[1]-1] = false;
                                }
                            }
                        }                    
                    }
                }
            }
        }    
    }

    return candidates;
};

const filterNakedpairsInCol = (numbers: FieldValue[], oldCandidates: boolean[], index: number): boolean[] => {
    const candidates: boolean[] = oldCandidates.slice();
    const j = Math.floor((index/3));
    const l = Math.floor((index-(j*3)));

    const doublepositions: number[] = [];
    for (let i=0; i<3; i++) {
        for (let k=0; k<3; k++) {
            const position = tupel2index(i, j, k, l);
            if (getNumberOfCandidatesAt(candidates, position)===2) doublepositions.push(position);
        }
    }
    if (doublepositions.length>1) {
        for (let m=1; m<doublepositions.length; m++) {
            for (let n=0; n<doublepositions.length-1; n++) {
                if (n!==m) {
                    const pair1 = getCandidatesAt(candidates, doublepositions[m]);
                    const pair2 = getCandidatesAt(candidates, doublepositions[n]);
                    if (pair1.length===2&&pair2.length===2&&pair1[0]===pair2[0]&&pair1[1]===pair2[1]) {
                        for (let i=0; i<3; i++) {
                            for (let k=0; k<3; k++) {
                                const position = tupel2index(i, j, k, l);
                                if (position!==doublepositions[m]&&position!==doublepositions[n]) {
                                    candidates[position*9+pair1[0]-1] = false;
                                    candidates[position*9+pair1[1]-1] = false;
                                }
                            }
                        }                    
                    }
                }
            }
        }    
    }

    return candidates;
};

const filterSingles = (numbers: FieldValue[], oldCandidates: boolean[]): boolean[] => {
    let candidates: boolean[] = oldCandidates.slice();

    for (let index=0; index<9; index++) {
        candidates = filterSinglesInBox(numbers, candidates, index);
        candidates = filterSinglesInRow(numbers, candidates, index);
        candidates = filterSinglesInCol(numbers, candidates, index);
     }

    return candidates;
};

const filterHiddensingles = (numbers: FieldValue[], oldCandidates: boolean[]): boolean[] => {
    let candidates: boolean[] = oldCandidates.slice();

    for (let index=0; index<9; index++) {
        candidates = filterHiddensinglesInBox(numbers, candidates, index);
        candidates = filterHiddensinglesInRow(numbers, candidates, index);
        candidates = filterHiddensinglesInCol(numbers, candidates, index);
     }

    return candidates;
};

const filterNakedpairs = (numbers: FieldValue[], oldCandidates: boolean[]): boolean[] => {
    let candidates: boolean[] = oldCandidates.slice();

    for (let index=0; index<9; index++) {
        candidates = filterNakedpairsInBox(numbers, candidates, index);
        candidates = filterNakedpairsInRow(numbers, candidates, index);
        candidates = filterNakedpairsInCol(numbers, candidates, index);
     }

    return candidates;
};

export const findCandidates = (numbers: FieldValue[], flagSingles: boolean, flagHiddensingles: boolean, flagNakedpairs: boolean): boolean[] => {
    let candidates: boolean[] = initializeCandidates();

    candidates = findGameCandidates(numbers, candidates);

    let hash1 = '';
    let hash2: string = getMD5(candidates2string(candidates));

    do {
        if (flagSingles) candidates = filterSingles(numbers, candidates);
        if (flagHiddensingles) candidates = filterHiddensingles(numbers, candidates);
        if (flagNakedpairs) candidates = filterNakedpairs(numbers, candidates);
        hash1 = hash2;
        candidates = findGameCandidates(numbers, candidates);
        hash2 = getMD5(candidates2string(candidates));
    }
    while (hash1!== hash2);

    return candidates;
};

