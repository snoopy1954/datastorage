import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../state/store';
import { clearSelectedField, setSelectedField } from '../../state/sudoku/selectedfield/actions';
import { initializeNumbers, setNumber } from '../../state/sudoku/numbers/actions';

import { AppHeaderH2 } from "../basic/header";


const Sudoku: React.FC = () => {
    const dispatch = useDispatch();
  
    const field = useSelector((state: RootState) => state.selectedfield);
    const numbers = useSelector((state: RootState) => state.numbers);

    React.useEffect(() => {
        dispatch(initializeNumbers());
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
        console.log(type, index);
        switch (type) {
            case 0:
                dispatch(setNumber(field, index));
                break;
            case 1:
                dispatch(setSelectedField(index));
                break;
            default:
        }
    }

    return (
        <div className="App">
            <AppHeaderH2 text='Sudoku' icon='puzzle'/>    
            <svg viewBox="0 0 20 20">
                <defs>
                    <path id="quadrat" d="M0,0 h1 v1 h-1 z" stroke="black" strokeWidth="0.01"/>
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
                <text x={numberfieldtranslation[0][0]+0.3} y={numberfieldtranslation[0][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 1)}>1</text>
                <text x={numberfieldtranslation[1][0]+0.3} y={numberfieldtranslation[1][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 2)}>2</text>
                <text x={numberfieldtranslation[2][0]+0.3} y={numberfieldtranslation[2][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 3)}>3</text>
                <text x={numberfieldtranslation[3][0]+0.3} y={numberfieldtranslation[3][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 4)}>4</text>
                <text x={numberfieldtranslation[4][0]+0.3} y={numberfieldtranslation[4][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 5)}>5</text>
                <text x={numberfieldtranslation[5][0]+0.3} y={numberfieldtranslation[5][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 6)}>6</text>
                <text x={numberfieldtranslation[6][0]+0.3} y={numberfieldtranslation[6][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 7)}>7</text>
                <text x={numberfieldtranslation[7][0]+0.3} y={numberfieldtranslation[7][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 8)}>8</text>
                <text x={numberfieldtranslation[8][0]+0.3} y={numberfieldtranslation[8][1]+0.8} fontSize="0.7" onClick={() => handleClick(0, 9)}>9</text>
 
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
                
                {numbers[0]>0&&<text x={matrixfieldtranslation[0][0]+0.3} y={matrixfieldtranslation[0][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 0)}>{String(numbers[0])}</text>}
                {numbers[1]>0&&<text x={matrixfieldtranslation[1][0]+0.3} y={matrixfieldtranslation[1][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 1)}>{String(numbers[1])}</text>}
                {numbers[2]>0&&<text x={matrixfieldtranslation[2][0]+0.3} y={matrixfieldtranslation[2][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 2)}>{String(numbers[2])}</text>}
                {numbers[3]>0&&<text x={matrixfieldtranslation[3][0]+0.3} y={matrixfieldtranslation[3][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 3)}>{String(numbers[3])}</text>}
                {numbers[4]>0&&<text x={matrixfieldtranslation[4][0]+0.3} y={matrixfieldtranslation[4][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 4)}>{String(numbers[4])}</text>}
                {numbers[5]>0&&<text x={matrixfieldtranslation[5][0]+0.3} y={matrixfieldtranslation[5][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 5)}>{String(numbers[5])}</text>}
                {numbers[6]>0&&<text x={matrixfieldtranslation[6][0]+0.3} y={matrixfieldtranslation[6][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 6)}>{String(numbers[6])}</text>}
                {numbers[7]>0&&<text x={matrixfieldtranslation[7][0]+0.3} y={matrixfieldtranslation[7][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 7)}>{String(numbers[7])}</text>}
                {numbers[8]>0&&<text x={matrixfieldtranslation[8][0]+0.3} y={matrixfieldtranslation[8][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 8)}>{String(numbers[8])}</text>}
                {numbers[9]>0&&<text x={matrixfieldtranslation[9][0]+0.3} y={matrixfieldtranslation[9][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 9)}>{String(numbers[9])}</text>}
                {numbers[10]>0&&<text x={matrixfieldtranslation[10][0]+0.3} y={matrixfieldtranslation[10][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 10)}>{String(numbers[10])}</text>}
                {numbers[11]>0&&<text x={matrixfieldtranslation[11][0]+0.3} y={matrixfieldtranslation[11][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 11)}>{String(numbers[11])}</text>}
                {numbers[12]>0&&<text x={matrixfieldtranslation[12][0]+0.3} y={matrixfieldtranslation[12][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 12)}>{String(numbers[12])}</text>}
                {numbers[13]>0&&<text x={matrixfieldtranslation[13][0]+0.3} y={matrixfieldtranslation[13][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 13)}>{String(numbers[13])}</text>}
                {numbers[14]>0&&<text x={matrixfieldtranslation[14][0]+0.3} y={matrixfieldtranslation[14][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 14)}>{String(numbers[14])}</text>}
                {numbers[15]>0&&<text x={matrixfieldtranslation[15][0]+0.3} y={matrixfieldtranslation[15][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 15)}>{String(numbers[15])}</text>}
                {numbers[16]>0&&<text x={matrixfieldtranslation[16][0]+0.3} y={matrixfieldtranslation[16][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 16)}>{String(numbers[16])}</text>}
                {numbers[17]>0&&<text x={matrixfieldtranslation[17][0]+0.3} y={matrixfieldtranslation[17][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 17)}>{String(numbers[17])}</text>}
                {numbers[18]>0&&<text x={matrixfieldtranslation[18][0]+0.3} y={matrixfieldtranslation[18][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 18)}>{String(numbers[18])}</text>}
                {numbers[19]>0&&<text x={matrixfieldtranslation[19][0]+0.3} y={matrixfieldtranslation[19][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 19)}>{String(numbers[19])}</text>}
                {numbers[20]>0&&<text x={matrixfieldtranslation[20][0]+0.3} y={matrixfieldtranslation[20][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 20)}>{String(numbers[20])}</text>}
                {numbers[21]>0&&<text x={matrixfieldtranslation[21][0]+0.3} y={matrixfieldtranslation[21][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 21)}>{String(numbers[21])}</text>}
                {numbers[22]>0&&<text x={matrixfieldtranslation[22][0]+0.3} y={matrixfieldtranslation[22][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 22)}>{String(numbers[22])}</text>}
                {numbers[23]>0&&<text x={matrixfieldtranslation[23][0]+0.3} y={matrixfieldtranslation[23][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 23)}>{String(numbers[23])}</text>}
                {numbers[24]>0&&<text x={matrixfieldtranslation[24][0]+0.3} y={matrixfieldtranslation[24][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 24)}>{String(numbers[24])}</text>}
                {numbers[25]>0&&<text x={matrixfieldtranslation[25][0]+0.3} y={matrixfieldtranslation[25][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 25)}>{String(numbers[25])}</text>}
                {numbers[26]>0&&<text x={matrixfieldtranslation[26][0]+0.3} y={matrixfieldtranslation[26][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 26)}>{String(numbers[26])}</text>}
                {numbers[27]>0&&<text x={matrixfieldtranslation[27][0]+0.3} y={matrixfieldtranslation[27][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 27)}>{String(numbers[27])}</text>}
                {numbers[28]>0&&<text x={matrixfieldtranslation[28][0]+0.3} y={matrixfieldtranslation[28][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 28)}>{String(numbers[28])}</text>}
                {numbers[29]>0&&<text x={matrixfieldtranslation[29][0]+0.3} y={matrixfieldtranslation[29][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 29)}>{String(numbers[29])}</text>}
                {numbers[30]>0&&<text x={matrixfieldtranslation[30][0]+0.3} y={matrixfieldtranslation[30][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 30)}>{String(numbers[30])}</text>}
                {numbers[31]>0&&<text x={matrixfieldtranslation[31][0]+0.3} y={matrixfieldtranslation[31][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 31)}>{String(numbers[31])}</text>}
                {numbers[32]>0&&<text x={matrixfieldtranslation[32][0]+0.3} y={matrixfieldtranslation[32][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 32)}>{String(numbers[32])}</text>}
                {numbers[33]>0&&<text x={matrixfieldtranslation[33][0]+0.3} y={matrixfieldtranslation[33][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 33)}>{String(numbers[33])}</text>}
                {numbers[34]>0&&<text x={matrixfieldtranslation[34][0]+0.3} y={matrixfieldtranslation[34][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 34)}>{String(numbers[34])}</text>}
                {numbers[35]>0&&<text x={matrixfieldtranslation[35][0]+0.3} y={matrixfieldtranslation[35][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 35)}>{String(numbers[35])}</text>}
                {numbers[36]>0&&<text x={matrixfieldtranslation[36][0]+0.3} y={matrixfieldtranslation[36][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 36)}>{String(numbers[36])}</text>}
                {numbers[37]>0&&<text x={matrixfieldtranslation[37][0]+0.3} y={matrixfieldtranslation[37][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 37)}>{String(numbers[37])}</text>}
                {numbers[38]>0&&<text x={matrixfieldtranslation[38][0]+0.3} y={matrixfieldtranslation[38][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 38)}>{String(numbers[38])}</text>}
                {numbers[39]>0&&<text x={matrixfieldtranslation[39][0]+0.3} y={matrixfieldtranslation[39][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 39)}>{String(numbers[39])}</text>}
                {numbers[40]>0&&<text x={matrixfieldtranslation[40][0]+0.3} y={matrixfieldtranslation[40][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 40)}>{String(numbers[40])}</text>}
                {numbers[41]>0&&<text x={matrixfieldtranslation[41][0]+0.3} y={matrixfieldtranslation[41][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 41)}>{String(numbers[41])}</text>}
                {numbers[42]>0&&<text x={matrixfieldtranslation[42][0]+0.3} y={matrixfieldtranslation[42][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 42)}>{String(numbers[42])}</text>}
                {numbers[43]>0&&<text x={matrixfieldtranslation[43][0]+0.3} y={matrixfieldtranslation[43][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 43)}>{String(numbers[43])}</text>}
                {numbers[44]>0&&<text x={matrixfieldtranslation[44][0]+0.3} y={matrixfieldtranslation[44][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 44)}>{String(numbers[44])}</text>}
                {numbers[45]>0&&<text x={matrixfieldtranslation[45][0]+0.3} y={matrixfieldtranslation[45][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 45)}>{String(numbers[45])}</text>}
                {numbers[46]>0&&<text x={matrixfieldtranslation[46][0]+0.3} y={matrixfieldtranslation[46][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 46)}>{String(numbers[46])}</text>}
                {numbers[47]>0&&<text x={matrixfieldtranslation[47][0]+0.3} y={matrixfieldtranslation[47][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 47)}>{String(numbers[47])}</text>}
                {numbers[48]>0&&<text x={matrixfieldtranslation[48][0]+0.3} y={matrixfieldtranslation[48][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 48)}>{String(numbers[48])}</text>}
                {numbers[49]>0&&<text x={matrixfieldtranslation[49][0]+0.3} y={matrixfieldtranslation[49][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 49)}>{String(numbers[49])}</text>}
                {numbers[50]>0&&<text x={matrixfieldtranslation[50][0]+0.3} y={matrixfieldtranslation[50][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 50)}>{String(numbers[50])}</text>}
                {numbers[51]>0&&<text x={matrixfieldtranslation[51][0]+0.3} y={matrixfieldtranslation[51][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 51)}>{String(numbers[51])}</text>}
                {numbers[52]>0&&<text x={matrixfieldtranslation[52][0]+0.3} y={matrixfieldtranslation[52][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 52)}>{String(numbers[52])}</text>}
                {numbers[53]>0&&<text x={matrixfieldtranslation[53][0]+0.3} y={matrixfieldtranslation[53][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 53)}>{String(numbers[53])}</text>}
                {numbers[54]>0&&<text x={matrixfieldtranslation[54][0]+0.3} y={matrixfieldtranslation[54][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 54)}>{String(numbers[54])}</text>}
                {numbers[55]>0&&<text x={matrixfieldtranslation[55][0]+0.3} y={matrixfieldtranslation[55][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 55)}>{String(numbers[55])}</text>}
                {numbers[56]>0&&<text x={matrixfieldtranslation[56][0]+0.3} y={matrixfieldtranslation[56][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 56)}>{String(numbers[56])}</text>}
                {numbers[57]>0&&<text x={matrixfieldtranslation[57][0]+0.3} y={matrixfieldtranslation[57][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 57)}>{String(numbers[57])}</text>}
                {numbers[58]>0&&<text x={matrixfieldtranslation[58][0]+0.3} y={matrixfieldtranslation[58][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 58)}>{String(numbers[58])}</text>}
                {numbers[59]>0&&<text x={matrixfieldtranslation[59][0]+0.3} y={matrixfieldtranslation[59][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 59)}>{String(numbers[59])}</text>}
                {numbers[60]>0&&<text x={matrixfieldtranslation[60][0]+0.3} y={matrixfieldtranslation[60][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 60)}>{String(numbers[60])}</text>}
                {numbers[61]>0&&<text x={matrixfieldtranslation[61][0]+0.3} y={matrixfieldtranslation[61][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 61)}>{String(numbers[61])}</text>}
                {numbers[62]>0&&<text x={matrixfieldtranslation[62][0]+0.3} y={matrixfieldtranslation[62][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 62)}>{String(numbers[62])}</text>}
                {numbers[63]>0&&<text x={matrixfieldtranslation[63][0]+0.3} y={matrixfieldtranslation[63][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 63)}>{String(numbers[63])}</text>}
                {numbers[64]>0&&<text x={matrixfieldtranslation[64][0]+0.3} y={matrixfieldtranslation[64][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 64)}>{String(numbers[64])}</text>}
                {numbers[65]>0&&<text x={matrixfieldtranslation[65][0]+0.3} y={matrixfieldtranslation[65][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 65)}>{String(numbers[65])}</text>}
                {numbers[66]>0&&<text x={matrixfieldtranslation[66][0]+0.3} y={matrixfieldtranslation[66][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 66)}>{String(numbers[66])}</text>}
                {numbers[67]>0&&<text x={matrixfieldtranslation[67][0]+0.3} y={matrixfieldtranslation[67][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 67)}>{String(numbers[67])}</text>}
                {numbers[68]>0&&<text x={matrixfieldtranslation[68][0]+0.3} y={matrixfieldtranslation[68][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 68)}>{String(numbers[68])}</text>}
                {numbers[69]>0&&<text x={matrixfieldtranslation[69][0]+0.3} y={matrixfieldtranslation[69][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 69)}>{String(numbers[69])}</text>}
                {numbers[70]>0&&<text x={matrixfieldtranslation[70][0]+0.3} y={matrixfieldtranslation[70][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 70)}>{String(numbers[70])}</text>}
                {numbers[71]>0&&<text x={matrixfieldtranslation[71][0]+0.3} y={matrixfieldtranslation[71][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 71)}>{String(numbers[71])}</text>}
                {numbers[72]>0&&<text x={matrixfieldtranslation[72][0]+0.3} y={matrixfieldtranslation[72][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 72)}>{String(numbers[72])}</text>}
                {numbers[73]>0&&<text x={matrixfieldtranslation[73][0]+0.3} y={matrixfieldtranslation[73][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 73)}>{String(numbers[73])}</text>}
                {numbers[74]>0&&<text x={matrixfieldtranslation[74][0]+0.3} y={matrixfieldtranslation[74][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 74)}>{String(numbers[74])}</text>}
                {numbers[75]>0&&<text x={matrixfieldtranslation[75][0]+0.3} y={matrixfieldtranslation[75][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 75)}>{String(numbers[75])}</text>}
                {numbers[76]>0&&<text x={matrixfieldtranslation[76][0]+0.3} y={matrixfieldtranslation[76][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 76)}>{String(numbers[76])}</text>}
                {numbers[77]>0&&<text x={matrixfieldtranslation[77][0]+0.3} y={matrixfieldtranslation[77][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 77)}>{String(numbers[77])}</text>}
                {numbers[78]>0&&<text x={matrixfieldtranslation[78][0]+0.3} y={matrixfieldtranslation[78][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 78)}>{String(numbers[78])}</text>}
                {numbers[79]>0&&<text x={matrixfieldtranslation[79][0]+0.3} y={matrixfieldtranslation[79][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 79)}>{String(numbers[79])}</text>}
                {numbers[80]>0&&<text x={matrixfieldtranslation[80][0]+0.3} y={matrixfieldtranslation[80][1]+0.8} fontSize="0.7" onClick={() => handleClick(1, 80)}>{String(numbers[80])}</text>}
            </svg>
        </div>
    );
}

export default Sudoku