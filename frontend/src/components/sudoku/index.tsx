import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Sudoku, SudokuNoID } from '../../../../backend/src/types/sudoku';
import { FieldValue, Settype, Setcolor, Flagtype } from '../../types/sudoku';

import { RootState } from '../../state/store';
import { clearSelectedField, setSelectedField } from '../../state/sudoku/selectedfield/actions';
import { initializeNumbers, setNumber } from '../../state/sudoku/numbers/actions';
import { initializeSolutionnumbers, setSolutionnumber } from '../../state/sudoku/solutionnumbers/actions';
import { initializeSudokus, addSudoku } from '../../state/sudoku/sudokulist/actions';
import { initializeFlags, setFlag, clearFlag } from '../../state/sudoku/flags/actions';

import { AppHeaderH2 } from "../basic/header";
import { AppMenu, Item } from "../basic/menu";
import { backgroundColor, styleMainMenu } from "../../constants";

import { fieldvalues2string, string2fieldvalues, solveBacktrack, solution2string, string2solution, getColors, checkFieldvalue } from '../../utils/sudoku';


const SudokuResolver: React.FC = () => {
    const dispatch = useDispatch();
  
    const field: number = useSelector((state: RootState) => state.selectedfield);
    const numbers: FieldValue[] = useSelector((state: RootState) => state.numbers);
    const solutionnumbers: FieldValue[] = useSelector((state: RootState) => state.solutionnumbers);
    const sudokus: Sudoku[] = useSelector((state: RootState) => state.sudokus);
    const flags: boolean[] = useSelector((state: RootState) => state.flags);

    React.useEffect(() => {
        dispatch(initializeSudokus());
    }, [dispatch]);
    
    React.useEffect(() => {
        dispatch(initializeNumbers());
        dispatch(initializeSolutionnumbers());
        dispatch(initializeFlags());
        dispatch(setFlag(Flagtype.SET));
        dispatch(clearSelectedField());
    }, [dispatch]);  
  
    const q = '#quadrat';

    const matrixfieldtranslation: number[][] = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            for (let k=0; k<3; k++) {
                for (let l=0; l<3; l++) {
                    const a = j*3+l+1;
                    const b = i*3+k+1;
                    matrixfieldtranslation.push([a,b]);
                }
            }
        }
    }

    const numberfieldtranslation: number[][] = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            const a = j+12;
            const b = i+1;
            numberfieldtranslation.push([a,b]);
        }
    }

    const handleClick = (type: number, index: number) => {
        switch (type) {
            case 0: {
                const isOK = flags[Flagtype.CHECK] ? checkFieldvalue(solutionnumbers, field, index) : true;
                if (isOK) {
                    const newNumber: FieldValue = {
                        number: index,
                        fieldnr: field,
                        seqnr: 1,
                        settype: flags[Flagtype.SET] ? Settype.SET : Settype.GAME
                    };
                    dispatch(setNumber(newNumber));
                }
                break;
            }
            case 1:
                dispatch(setSelectedField(index));
                break;
            default:
        }
    };

    const handleStart = () => {
        const [, solutionnumbers] = solveBacktrack(numbers, 0);
        for (let index=0; index<81; index++) {
            dispatch(setSolutionnumber(solutionnumbers[index]));
        }
        const fieldvaluesAsString: string = fieldvalues2string(numbers);
        const solutionAsString: string = solution2string(solutionnumbers);
        const newSudoku: SudokuNoID = {
            game: fieldvaluesAsString,
            solution: solutionAsString
        }
        dispatch(addSudoku(newSudoku));
        dispatch(clearFlag(Flagtype.SET));
    };

    const handleRead = () => {
        const gameAsString: string = Object.values(sudokus)[Object.values(sudokus).length-1].game;
        const gamefieldvalues = string2fieldvalues(gameAsString);
        for (let index=0; index<81; index++) {
            if (gamefieldvalues[index].settype===Settype.SET) {
                dispatch(setNumber(gamefieldvalues[index]));
            }
        }
        dispatch(clearFlag(Flagtype.SET));
        const solutionAsString: string = Object.values(sudokus)[Object.values(sudokus).length-1].solution;
        const solutionfieldvalues: FieldValue[] = string2solution(solutionAsString);
        for (let index=0; index<81; index++) {
            dispatch(setSolutionnumber(solutionfieldvalues[index]));
        }
    };

    const handleSolution = () => {
        for (let index=0; index<81; index++) {
            if (numbers[index].settype!==Settype.SET&&numbers[index].number!==solutionnumbers[index].number) {
                dispatch(setNumber(solutionnumbers[index]));
            }
        }
    };

    const handleNew = () => {
        dispatch(initializeNumbers());
        dispatch(initializeFlags());
        dispatch(setFlag(Flagtype.SET));
        dispatch(clearSelectedField());  
    };

    const handleCheck = () => {
        dispatch(setFlag(Flagtype.CHECK));
    };

    const buttons: Item[] = 
    [
      {
        name: 'Start',
        title: 'Start',
        color: 'blue',
        onClick: handleStart
      },
      {
        name: 'Lesen',
        title: 'Lesen',
        color: 'blue',
        onClick: handleRead
      },
      {
        name: 'Lösung',
        title: 'Lösung',
        color: 'blue',
        onClick: handleSolution
      },
      {
        name: 'Neu',
        title: 'Neu',
        color: 'blue',
        onClick: handleNew
      },
      {
        name: 'Prüfen',
        title: 'Prüfen',
        color: 'blue',
        onClick: handleCheck
      },
    ];  

    const markerposition: number[] = [matrixfieldtranslation[field][0], matrixfieldtranslation[field][1]];
    const numberfield = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const colors: Setcolor[] = getColors(numbers);

    return (
        <div className="App">
            <AppHeaderH2 text='Sudoku' icon='puzzle'/> 
            <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>   
            <svg viewBox="0 0 20 10.5">
                <defs>
                    <path id="quadrat" d="M0,0 h1 v1 h-1 z" stroke="black" strokeWidth="0.01"/>
                    <circle id="marker" r="0.5" strokeWidth="0.025" stroke="red" fill="none"/>
                </defs>

                <use href={q} transform={"translate("+numberfieldtranslation[0][0]+","+numberfieldtranslation[0][1]+")"} onClick={() => handleClick(0, 1)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[1][0]+","+numberfieldtranslation[1][1]+")"} onClick={() => handleClick(0, 2)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[2][0]+","+numberfieldtranslation[2][1]+")"} onClick={() => handleClick(0, 3)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[3][0]+","+numberfieldtranslation[3][1]+")"} onClick={() => handleClick(0, 4)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[4][0]+","+numberfieldtranslation[4][1]+")"} onClick={() => handleClick(0, 5)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[5][0]+","+numberfieldtranslation[5][1]+")"} onClick={() => handleClick(0, 6)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[6][0]+","+numberfieldtranslation[6][1]+")"} onClick={() => handleClick(0, 7)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[7][0]+","+numberfieldtranslation[7][1]+")"} onClick={() => handleClick(0, 8)} fill="lightblue"/>
                <use href={q} transform={"translate("+numberfieldtranslation[8][0]+","+numberfieldtranslation[8][1]+")"} onClick={() => handleClick(0, 9)} fill="lightblue"/> 
                <text x={numberfieldtranslation[0][0]+0.3} y={numberfieldtranslation[0][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 1)}>{numberfield[0]}</text>
                <text x={numberfieldtranslation[1][0]+0.3} y={numberfieldtranslation[1][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 2)}>{numberfield[1]}</text>
                <text x={numberfieldtranslation[2][0]+0.3} y={numberfieldtranslation[2][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 3)}>{numberfield[2]}</text>
                <text x={numberfieldtranslation[3][0]+0.3} y={numberfieldtranslation[3][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 4)}>{numberfield[3]}</text>
                <text x={numberfieldtranslation[4][0]+0.3} y={numberfieldtranslation[4][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 5)}>{numberfield[4]}</text>
                <text x={numberfieldtranslation[5][0]+0.3} y={numberfieldtranslation[5][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 6)}>{numberfield[5]}</text>
                <text x={numberfieldtranslation[6][0]+0.3} y={numberfieldtranslation[6][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 7)}>{numberfield[6]}</text>
                <text x={numberfieldtranslation[7][0]+0.3} y={numberfieldtranslation[7][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 8)}>{numberfield[7]}</text>
                <text x={numberfieldtranslation[8][0]+0.3} y={numberfieldtranslation[8][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 9)}>{numberfield[8]}</text>
 
                <rect x="1" y="1" width="9" height="9" fill="white" stroke="black" strokeWidth="0.035"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[0][0]+","+matrixfieldtranslation[0][1]+")"} onClick={() => handleClick(1, 0)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[1][0]+","+matrixfieldtranslation[1][1]+")"} onClick={() => handleClick(1, 1)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[2][0]+","+matrixfieldtranslation[2][1]+")"} onClick={() => handleClick(1, 2)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[3][0]+","+matrixfieldtranslation[3][1]+")"} onClick={() => handleClick(1, 3)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[4][0]+","+matrixfieldtranslation[4][1]+")"} onClick={() => handleClick(1, 4)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[5][0]+","+matrixfieldtranslation[5][1]+")"} onClick={() => handleClick(1, 5)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[6][0]+","+matrixfieldtranslation[6][1]+")"} onClick={() => handleClick(1, 6)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[7][0]+","+matrixfieldtranslation[7][1]+")"} onClick={() => handleClick(1, 7)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[8][0]+","+matrixfieldtranslation[8][1]+")"} onClick={() => handleClick(1, 8)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[9][0]+","+matrixfieldtranslation[9][1]+")"} onClick={() => handleClick(1, 9)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[10][0]+","+matrixfieldtranslation[10][1]+")"} onClick={() => handleClick(1, 10)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[11][0]+","+matrixfieldtranslation[11][1]+")"} onClick={() => handleClick(1, 11)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[12][0]+","+matrixfieldtranslation[12][1]+")"} onClick={() => handleClick(1, 12)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[13][0]+","+matrixfieldtranslation[13][1]+")"} onClick={() => handleClick(1, 13)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[14][0]+","+matrixfieldtranslation[14][1]+")"} onClick={() => handleClick(1, 14)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[15][0]+","+matrixfieldtranslation[15][1]+")"} onClick={() => handleClick(1, 15)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[16][0]+","+matrixfieldtranslation[16][1]+")"} onClick={() => handleClick(1, 16)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[17][0]+","+matrixfieldtranslation[17][1]+")"} onClick={() => handleClick(1, 17)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[18][0]+","+matrixfieldtranslation[18][1]+")"} onClick={() => handleClick(1, 18)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[19][0]+","+matrixfieldtranslation[19][1]+")"} onClick={() => handleClick(1, 19)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[20][0]+","+matrixfieldtranslation[20][1]+")"} onClick={() => handleClick(1, 20)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[21][0]+","+matrixfieldtranslation[21][1]+")"} onClick={() => handleClick(1, 21)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[22][0]+","+matrixfieldtranslation[22][1]+")"} onClick={() => handleClick(1, 22)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[23][0]+","+matrixfieldtranslation[23][1]+")"} onClick={() => handleClick(1, 23)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[24][0]+","+matrixfieldtranslation[24][1]+")"} onClick={() => handleClick(1, 24)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[25][0]+","+matrixfieldtranslation[25][1]+")"} onClick={() => handleClick(1, 25)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[26][0]+","+matrixfieldtranslation[26][1]+")"} onClick={() => handleClick(1, 26)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[27][0]+","+matrixfieldtranslation[27][1]+")"} onClick={() => handleClick(1, 27)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[28][0]+","+matrixfieldtranslation[28][1]+")"} onClick={() => handleClick(1, 28)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[29][0]+","+matrixfieldtranslation[29][1]+")"} onClick={() => handleClick(1, 29)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[30][0]+","+matrixfieldtranslation[30][1]+")"} onClick={() => handleClick(1, 30)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[31][0]+","+matrixfieldtranslation[31][1]+")"} onClick={() => handleClick(1, 31)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[32][0]+","+matrixfieldtranslation[32][1]+")"} onClick={() => handleClick(1, 32)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[33][0]+","+matrixfieldtranslation[33][1]+")"} onClick={() => handleClick(1, 33)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[34][0]+","+matrixfieldtranslation[34][1]+")"} onClick={() => handleClick(1, 34)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[35][0]+","+matrixfieldtranslation[35][1]+")"} onClick={() => handleClick(1, 35)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[36][0]+","+matrixfieldtranslation[36][1]+")"} onClick={() => handleClick(1, 36)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[37][0]+","+matrixfieldtranslation[37][1]+")"} onClick={() => handleClick(1, 37)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[38][0]+","+matrixfieldtranslation[38][1]+")"} onClick={() => handleClick(1, 38)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[39][0]+","+matrixfieldtranslation[39][1]+")"} onClick={() => handleClick(1, 39)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[40][0]+","+matrixfieldtranslation[40][1]+")"} onClick={() => handleClick(1, 40)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[41][0]+","+matrixfieldtranslation[41][1]+")"} onClick={() => handleClick(1, 41)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[42][0]+","+matrixfieldtranslation[42][1]+")"} onClick={() => handleClick(1, 42)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[43][0]+","+matrixfieldtranslation[43][1]+")"} onClick={() => handleClick(1, 43)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[44][0]+","+matrixfieldtranslation[44][1]+")"} onClick={() => handleClick(1, 44)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[45][0]+","+matrixfieldtranslation[45][1]+")"} onClick={() => handleClick(1, 45)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[46][0]+","+matrixfieldtranslation[46][1]+")"} onClick={() => handleClick(1, 46)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[47][0]+","+matrixfieldtranslation[47][1]+")"} onClick={() => handleClick(1, 47)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[48][0]+","+matrixfieldtranslation[48][1]+")"} onClick={() => handleClick(1, 48)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[49][0]+","+matrixfieldtranslation[49][1]+")"} onClick={() => handleClick(1, 49)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[50][0]+","+matrixfieldtranslation[50][1]+")"} onClick={() => handleClick(1, 50)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[51][0]+","+matrixfieldtranslation[51][1]+")"} onClick={() => handleClick(1, 51)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[52][0]+","+matrixfieldtranslation[52][1]+")"} onClick={() => handleClick(1, 52)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[53][0]+","+matrixfieldtranslation[53][1]+")"} onClick={() => handleClick(1, 53)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[54][0]+","+matrixfieldtranslation[54][1]+")"} onClick={() => handleClick(1, 54)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[55][0]+","+matrixfieldtranslation[55][1]+")"} onClick={() => handleClick(1, 55)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[56][0]+","+matrixfieldtranslation[56][1]+")"} onClick={() => handleClick(1, 56)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[57][0]+","+matrixfieldtranslation[57][1]+")"} onClick={() => handleClick(1, 57)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[58][0]+","+matrixfieldtranslation[58][1]+")"} onClick={() => handleClick(1, 58)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[59][0]+","+matrixfieldtranslation[59][1]+")"} onClick={() => handleClick(1, 59)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[60][0]+","+matrixfieldtranslation[60][1]+")"} onClick={() => handleClick(1, 60)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[61][0]+","+matrixfieldtranslation[61][1]+")"} onClick={() => handleClick(1, 61)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[62][0]+","+matrixfieldtranslation[62][1]+")"} onClick={() => handleClick(1, 62)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[63][0]+","+matrixfieldtranslation[63][1]+")"} onClick={() => handleClick(1, 63)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[64][0]+","+matrixfieldtranslation[64][1]+")"} onClick={() => handleClick(1, 64)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[65][0]+","+matrixfieldtranslation[65][1]+")"} onClick={() => handleClick(1, 65)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[66][0]+","+matrixfieldtranslation[66][1]+")"} onClick={() => handleClick(1, 66)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[67][0]+","+matrixfieldtranslation[67][1]+")"} onClick={() => handleClick(1, 67)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[68][0]+","+matrixfieldtranslation[68][1]+")"} onClick={() => handleClick(1, 68)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[69][0]+","+matrixfieldtranslation[69][1]+")"} onClick={() => handleClick(1, 69)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[70][0]+","+matrixfieldtranslation[70][1]+")"} onClick={() => handleClick(1, 70)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[71][0]+","+matrixfieldtranslation[71][1]+")"} onClick={() => handleClick(1, 71)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[72][0]+","+matrixfieldtranslation[72][1]+")"} onClick={() => handleClick(1, 72)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[73][0]+","+matrixfieldtranslation[73][1]+")"} onClick={() => handleClick(1, 73)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[74][0]+","+matrixfieldtranslation[74][1]+")"} onClick={() => handleClick(1, 74)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[75][0]+","+matrixfieldtranslation[75][1]+")"} onClick={() => handleClick(1, 75)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[76][0]+","+matrixfieldtranslation[76][1]+")"} onClick={() => handleClick(1, 76)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[77][0]+","+matrixfieldtranslation[77][1]+")"} onClick={() => handleClick(1, 77)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[78][0]+","+matrixfieldtranslation[78][1]+")"} onClick={() => handleClick(1, 78)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[79][0]+","+matrixfieldtranslation[79][1]+")"} onClick={() => handleClick(1, 79)} fill="white"/>
                <use href={q} transform={"translate("+matrixfieldtranslation[80][0]+","+matrixfieldtranslation[80][1]+")"} onClick={() => handleClick(1, 80)} fill="white"/>
                <line x1="1" y1="4" x2="10" y2="4" stroke="black" strokeWidth="0.025"/>
                <line x1="1" y1="7" x2="10" y2="7" stroke="black" strokeWidth="0.025"/>
                <line x1="4" y1="1" x2="4" y2="10" stroke="black" strokeWidth="0.025"/>
                <line x1="7" y1="1" x2="7" y2="10" stroke="black" strokeWidth="0.025"/>

                <use href="#marker" transform={"translate("+(markerposition[0]+0.5)+","+(markerposition[1]+0.5)+")"}/>
                
                {numbers[0]&&numbers[0].number>0&&<text fill={colors[0]} x={matrixfieldtranslation[0][0]+0.3} y={matrixfieldtranslation[0][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 0)}>{String(numbers[0].number)}</text>}
                {numbers[1]&&numbers[1].number>0&&<text fill={colors[1]} x={matrixfieldtranslation[1][0]+0.3} y={matrixfieldtranslation[1][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 1)}>{String(numbers[1].number)}</text>}
                {numbers[2]&&numbers[2].number>0&&<text fill={colors[2]} x={matrixfieldtranslation[2][0]+0.3} y={matrixfieldtranslation[2][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 2)}>{String(numbers[2].number)}</text>}
                {numbers[3]&&numbers[3].number>0&&<text fill={colors[3]} x={matrixfieldtranslation[3][0]+0.3} y={matrixfieldtranslation[3][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 3)}>{String(numbers[3].number)}</text>}
                {numbers[4]&&numbers[4].number>0&&<text fill={colors[4]} x={matrixfieldtranslation[4][0]+0.3} y={matrixfieldtranslation[4][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 4)}>{String(numbers[4].number)}</text>}
                {numbers[5]&&numbers[5].number>0&&<text fill={colors[5]} x={matrixfieldtranslation[5][0]+0.3} y={matrixfieldtranslation[5][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 5)}>{String(numbers[5].number)}</text>}
                {numbers[6]&&numbers[6].number>0&&<text fill={colors[6]} x={matrixfieldtranslation[6][0]+0.3} y={matrixfieldtranslation[6][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 6)}>{String(numbers[6].number)}</text>}
                {numbers[7]&&numbers[7].number>0&&<text fill={colors[7]} x={matrixfieldtranslation[7][0]+0.3} y={matrixfieldtranslation[7][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 7)}>{String(numbers[7].number)}</text>}
                {numbers[8]&&numbers[8].number>0&&<text fill={colors[8]} x={matrixfieldtranslation[8][0]+0.3} y={matrixfieldtranslation[8][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 8)}>{String(numbers[8].number)}</text>}
                {numbers[9]&&numbers[9].number>0&&<text fill={colors[9]} x={matrixfieldtranslation[9][0]+0.3} y={matrixfieldtranslation[9][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 9)}>{String(numbers[9].number)}</text>}
                {numbers[10]&&numbers[10].number>0&&<text fill={colors[10]} x={matrixfieldtranslation[10][0]+0.3} y={matrixfieldtranslation[10][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 10)}>{String(numbers[10].number)}</text>}
                {numbers[11]&&numbers[11].number>0&&<text fill={colors[11]} x={matrixfieldtranslation[11][0]+0.3} y={matrixfieldtranslation[11][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 11)}>{String(numbers[11].number)}</text>}
                {numbers[12]&&numbers[12].number>0&&<text fill={colors[12]} x={matrixfieldtranslation[12][0]+0.3} y={matrixfieldtranslation[12][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 12)}>{String(numbers[12].number)}</text>}
                {numbers[13]&&numbers[13].number>0&&<text fill={colors[13]} x={matrixfieldtranslation[13][0]+0.3} y={matrixfieldtranslation[13][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 13)}>{String(numbers[13].number)}</text>}
                {numbers[14]&&numbers[14].number>0&&<text fill={colors[14]} x={matrixfieldtranslation[14][0]+0.3} y={matrixfieldtranslation[14][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 14)}>{String(numbers[14].number)}</text>}
                {numbers[15]&&numbers[15].number>0&&<text fill={colors[15]} x={matrixfieldtranslation[15][0]+0.3} y={matrixfieldtranslation[15][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 15)}>{String(numbers[15].number)}</text>}
                {numbers[16]&&numbers[16].number>0&&<text fill={colors[16]} x={matrixfieldtranslation[16][0]+0.3} y={matrixfieldtranslation[16][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 16)}>{String(numbers[16].number)}</text>}
                {numbers[17]&&numbers[17].number>0&&<text fill={colors[17]} x={matrixfieldtranslation[17][0]+0.3} y={matrixfieldtranslation[17][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 17)}>{String(numbers[17].number)}</text>}
                {numbers[18]&&numbers[18].number>0&&<text fill={colors[18]} x={matrixfieldtranslation[18][0]+0.3} y={matrixfieldtranslation[18][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 18)}>{String(numbers[18].number)}</text>}
                {numbers[19]&&numbers[19].number>0&&<text fill={colors[19]} x={matrixfieldtranslation[19][0]+0.3} y={matrixfieldtranslation[19][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 19)}>{String(numbers[19].number)}</text>}
                {numbers[20]&&numbers[20].number>0&&<text fill={colors[20]} x={matrixfieldtranslation[20][0]+0.3} y={matrixfieldtranslation[20][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 20)}>{String(numbers[20].number)}</text>}
                {numbers[21]&&numbers[21].number>0&&<text fill={colors[21]} x={matrixfieldtranslation[21][0]+0.3} y={matrixfieldtranslation[21][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 21)}>{String(numbers[21].number)}</text>}
                {numbers[22]&&numbers[22].number>0&&<text fill={colors[22]} x={matrixfieldtranslation[22][0]+0.3} y={matrixfieldtranslation[22][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 22)}>{String(numbers[22].number)}</text>}
                {numbers[23]&&numbers[23].number>0&&<text fill={colors[23]} x={matrixfieldtranslation[23][0]+0.3} y={matrixfieldtranslation[23][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 23)}>{String(numbers[23].number)}</text>}
                {numbers[24]&&numbers[24].number>0&&<text fill={colors[24]} x={matrixfieldtranslation[24][0]+0.3} y={matrixfieldtranslation[24][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 24)}>{String(numbers[24].number)}</text>}
                {numbers[25]&&numbers[25].number>0&&<text fill={colors[25]} x={matrixfieldtranslation[25][0]+0.3} y={matrixfieldtranslation[25][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 25)}>{String(numbers[25].number)}</text>}
                {numbers[26]&&numbers[26].number>0&&<text fill={colors[26]} x={matrixfieldtranslation[26][0]+0.3} y={matrixfieldtranslation[26][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 26)}>{String(numbers[26].number)}</text>}
                {numbers[27]&&numbers[27].number>0&&<text fill={colors[27]} x={matrixfieldtranslation[27][0]+0.3} y={matrixfieldtranslation[27][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 27)}>{String(numbers[27].number)}</text>}
                {numbers[28]&&numbers[28].number>0&&<text fill={colors[28]} x={matrixfieldtranslation[28][0]+0.3} y={matrixfieldtranslation[28][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 28)}>{String(numbers[28].number)}</text>}
                {numbers[29]&&numbers[29].number>0&&<text fill={colors[29]} x={matrixfieldtranslation[29][0]+0.3} y={matrixfieldtranslation[29][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 29)}>{String(numbers[29].number)}</text>}
                {numbers[30]&&numbers[30].number>0&&<text fill={colors[30]} x={matrixfieldtranslation[30][0]+0.3} y={matrixfieldtranslation[30][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 30)}>{String(numbers[30].number)}</text>}
                {numbers[31]&&numbers[31].number>0&&<text fill={colors[31]} x={matrixfieldtranslation[31][0]+0.3} y={matrixfieldtranslation[31][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 31)}>{String(numbers[31].number)}</text>}
                {numbers[32]&&numbers[32].number>0&&<text fill={colors[32]} x={matrixfieldtranslation[32][0]+0.3} y={matrixfieldtranslation[32][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 32)}>{String(numbers[32].number)}</text>}
                {numbers[33]&&numbers[33].number>0&&<text fill={colors[33]} x={matrixfieldtranslation[33][0]+0.3} y={matrixfieldtranslation[33][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 33)}>{String(numbers[33].number)}</text>}
                {numbers[34]&&numbers[34].number>0&&<text fill={colors[34]} x={matrixfieldtranslation[34][0]+0.3} y={matrixfieldtranslation[34][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 34)}>{String(numbers[34].number)}</text>}
                {numbers[35]&&numbers[35].number>0&&<text fill={colors[35]} x={matrixfieldtranslation[35][0]+0.3} y={matrixfieldtranslation[35][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 35)}>{String(numbers[35].number)}</text>}
                {numbers[36]&&numbers[36].number>0&&<text fill={colors[36]} x={matrixfieldtranslation[36][0]+0.3} y={matrixfieldtranslation[36][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 36)}>{String(numbers[36].number)}</text>}
                {numbers[37]&&numbers[37].number>0&&<text fill={colors[37]} x={matrixfieldtranslation[37][0]+0.3} y={matrixfieldtranslation[37][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 37)}>{String(numbers[37].number)}</text>}
                {numbers[38]&&numbers[38].number>0&&<text fill={colors[38]} x={matrixfieldtranslation[38][0]+0.3} y={matrixfieldtranslation[38][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 38)}>{String(numbers[38].number)}</text>}
                {numbers[39]&&numbers[39].number>0&&<text fill={colors[39]} x={matrixfieldtranslation[39][0]+0.3} y={matrixfieldtranslation[39][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 39)}>{String(numbers[39].number)}</text>}
                {numbers[40]&&numbers[40].number>0&&<text fill={colors[40]} x={matrixfieldtranslation[40][0]+0.3} y={matrixfieldtranslation[40][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 40)}>{String(numbers[40].number)}</text>}
                {numbers[41]&&numbers[41].number>0&&<text fill={colors[41]} x={matrixfieldtranslation[41][0]+0.3} y={matrixfieldtranslation[41][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 41)}>{String(numbers[41].number)}</text>}
                {numbers[42]&&numbers[42].number>0&&<text fill={colors[42]} x={matrixfieldtranslation[42][0]+0.3} y={matrixfieldtranslation[42][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 42)}>{String(numbers[42].number)}</text>}
                {numbers[43]&&numbers[43].number>0&&<text fill={colors[43]} x={matrixfieldtranslation[43][0]+0.3} y={matrixfieldtranslation[43][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 43)}>{String(numbers[43].number)}</text>}
                {numbers[44]&&numbers[44].number>0&&<text fill={colors[44]} x={matrixfieldtranslation[44][0]+0.3} y={matrixfieldtranslation[44][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 44)}>{String(numbers[44].number)}</text>}
                {numbers[45]&&numbers[45].number>0&&<text fill={colors[45]} x={matrixfieldtranslation[45][0]+0.3} y={matrixfieldtranslation[45][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 45)}>{String(numbers[45].number)}</text>}
                {numbers[46]&&numbers[46].number>0&&<text fill={colors[46]} x={matrixfieldtranslation[46][0]+0.3} y={matrixfieldtranslation[46][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 46)}>{String(numbers[46].number)}</text>}
                {numbers[47]&&numbers[47].number>0&&<text fill={colors[47]} x={matrixfieldtranslation[47][0]+0.3} y={matrixfieldtranslation[47][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 47)}>{String(numbers[47].number)}</text>}
                {numbers[48]&&numbers[48].number>0&&<text fill={colors[48]} x={matrixfieldtranslation[48][0]+0.3} y={matrixfieldtranslation[48][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 48)}>{String(numbers[48].number)}</text>}
                {numbers[49]&&numbers[49].number>0&&<text fill={colors[49]} x={matrixfieldtranslation[49][0]+0.3} y={matrixfieldtranslation[49][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 49)}>{String(numbers[49].number)}</text>}
                {numbers[50]&&numbers[50].number>0&&<text fill={colors[50]} x={matrixfieldtranslation[50][0]+0.3} y={matrixfieldtranslation[50][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 50)}>{String(numbers[50].number)}</text>}
                {numbers[51]&&numbers[51].number>0&&<text fill={colors[51]} x={matrixfieldtranslation[51][0]+0.3} y={matrixfieldtranslation[51][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 51)}>{String(numbers[51].number)}</text>}
                {numbers[52]&&numbers[52].number>0&&<text fill={colors[52]} x={matrixfieldtranslation[52][0]+0.3} y={matrixfieldtranslation[52][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 52)}>{String(numbers[52].number)}</text>}
                {numbers[53]&&numbers[53].number>0&&<text fill={colors[53]} x={matrixfieldtranslation[53][0]+0.3} y={matrixfieldtranslation[53][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 53)}>{String(numbers[53].number)}</text>}
                {numbers[54]&&numbers[54].number>0&&<text fill={colors[54]} x={matrixfieldtranslation[54][0]+0.3} y={matrixfieldtranslation[54][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 54)}>{String(numbers[54].number)}</text>}
                {numbers[55]&&numbers[55].number>0&&<text fill={colors[55]} x={matrixfieldtranslation[55][0]+0.3} y={matrixfieldtranslation[55][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 55)}>{String(numbers[55].number)}</text>}
                {numbers[56]&&numbers[56].number>0&&<text fill={colors[56]} x={matrixfieldtranslation[56][0]+0.3} y={matrixfieldtranslation[56][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 56)}>{String(numbers[56].number)}</text>}
                {numbers[57]&&numbers[57].number>0&&<text fill={colors[57]} x={matrixfieldtranslation[57][0]+0.3} y={matrixfieldtranslation[57][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 57)}>{String(numbers[57].number)}</text>}
                {numbers[58]&&numbers[58].number>0&&<text fill={colors[58]} x={matrixfieldtranslation[58][0]+0.3} y={matrixfieldtranslation[58][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 58)}>{String(numbers[58].number)}</text>}
                {numbers[59]&&numbers[59].number>0&&<text fill={colors[59]} x={matrixfieldtranslation[59][0]+0.3} y={matrixfieldtranslation[59][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 59)}>{String(numbers[59].number)}</text>}
                {numbers[60]&&numbers[60].number>0&&<text fill={colors[60]} x={matrixfieldtranslation[60][0]+0.3} y={matrixfieldtranslation[60][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 60)}>{String(numbers[60].number)}</text>}
                {numbers[61]&&numbers[61].number>0&&<text fill={colors[61]} x={matrixfieldtranslation[61][0]+0.3} y={matrixfieldtranslation[61][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 61)}>{String(numbers[61].number)}</text>}
                {numbers[62]&&numbers[62].number>0&&<text fill={colors[62]} x={matrixfieldtranslation[62][0]+0.3} y={matrixfieldtranslation[62][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 62)}>{String(numbers[62].number)}</text>}
                {numbers[63]&&numbers[63].number>0&&<text fill={colors[63]} x={matrixfieldtranslation[63][0]+0.3} y={matrixfieldtranslation[63][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 63)}>{String(numbers[63].number)}</text>}
                {numbers[64]&&numbers[64].number>0&&<text fill={colors[64]} x={matrixfieldtranslation[64][0]+0.3} y={matrixfieldtranslation[64][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 64)}>{String(numbers[64].number)}</text>}
                {numbers[65]&&numbers[65].number>0&&<text fill={colors[65]} x={matrixfieldtranslation[65][0]+0.3} y={matrixfieldtranslation[65][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 65)}>{String(numbers[65].number)}</text>}
                {numbers[66]&&numbers[66].number>0&&<text fill={colors[66]} x={matrixfieldtranslation[66][0]+0.3} y={matrixfieldtranslation[66][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 66)}>{String(numbers[66].number)}</text>}
                {numbers[67]&&numbers[67].number>0&&<text fill={colors[67]} x={matrixfieldtranslation[67][0]+0.3} y={matrixfieldtranslation[67][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 67)}>{String(numbers[67].number)}</text>}
                {numbers[68]&&numbers[68].number>0&&<text fill={colors[68]} x={matrixfieldtranslation[68][0]+0.3} y={matrixfieldtranslation[68][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 68)}>{String(numbers[68].number)}</text>}
                {numbers[69]&&numbers[69].number>0&&<text fill={colors[69]} x={matrixfieldtranslation[69][0]+0.3} y={matrixfieldtranslation[69][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 69)}>{String(numbers[69].number)}</text>}
                {numbers[70]&&numbers[70].number>0&&<text fill={colors[70]} x={matrixfieldtranslation[70][0]+0.3} y={matrixfieldtranslation[70][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 70)}>{String(numbers[70].number)}</text>}
                {numbers[71]&&numbers[71].number>0&&<text fill={colors[71]} x={matrixfieldtranslation[71][0]+0.3} y={matrixfieldtranslation[71][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 71)}>{String(numbers[71].number)}</text>}
                {numbers[72]&&numbers[72].number>0&&<text fill={colors[72]} x={matrixfieldtranslation[72][0]+0.3} y={matrixfieldtranslation[72][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 72)}>{String(numbers[72].number)}</text>}
                {numbers[73]&&numbers[73].number>0&&<text fill={colors[73]} x={matrixfieldtranslation[73][0]+0.3} y={matrixfieldtranslation[73][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 73)}>{String(numbers[73].number)}</text>}
                {numbers[74]&&numbers[74].number>0&&<text fill={colors[74]} x={matrixfieldtranslation[74][0]+0.3} y={matrixfieldtranslation[74][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 74)}>{String(numbers[74].number)}</text>}
                {numbers[75]&&numbers[75].number>0&&<text fill={colors[75]} x={matrixfieldtranslation[75][0]+0.3} y={matrixfieldtranslation[75][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 75)}>{String(numbers[75].number)}</text>}
                {numbers[76]&&numbers[76].number>0&&<text fill={colors[76]} x={matrixfieldtranslation[76][0]+0.3} y={matrixfieldtranslation[76][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 76)}>{String(numbers[76].number)}</text>}
                {numbers[77]&&numbers[77].number>0&&<text fill={colors[77]} x={matrixfieldtranslation[77][0]+0.3} y={matrixfieldtranslation[77][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 77)}>{String(numbers[77].number)}</text>}
                {numbers[78]&&numbers[78].number>0&&<text fill={colors[78]} x={matrixfieldtranslation[78][0]+0.3} y={matrixfieldtranslation[78][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 78)}>{String(numbers[78].number)}</text>}
                {numbers[79]&&numbers[79].number>0&&<text fill={colors[79]} x={matrixfieldtranslation[79][0]+0.3} y={matrixfieldtranslation[79][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 79)}>{String(numbers[79].number)}</text>}
                {numbers[80]&&numbers[80].number>0&&<text fill={colors[80]} x={matrixfieldtranslation[80][0]+0.3} y={matrixfieldtranslation[80][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 80)}>{String(numbers[80].number)}</text>}
            </svg>
        </div>
    );
}

export default SudokuResolver