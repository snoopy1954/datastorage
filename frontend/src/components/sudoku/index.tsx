import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { Sudoku, SudokuNoID } from '../../../../backend/src/types/sudoku';
import { Field, Settype, Setcolor, Flagtype } from '../../types/sudoku';

import { RootState } from '../../state/store';
import { setSelectedField } from '../../state/sudoku/selectedfield/actions';
import { initializeGamefields, setGamefield } from '../../state/sudoku/gamefields/actions';
import { initializeSolutionfields, setSolutionfield } from '../../state/sudoku/solutionfields/actions';
import { initializeSudokus, addSudoku } from '../../state/sudoku/sudokulist/actions';
import { initializeFlags, setFlag, toggleFlag, clearFlag } from '../../state/sudoku/flags/actions';
import { initializeCandidates, setCandidates } from '../../state/sudoku/candidates/actions';
import { initializeSequence, pushSequence, popSequence } from '../../state/sudoku/sequence/actions';
import { initializePositions } from '../../state/sudoku/positions/actions';
import { showNotification } from '../../state/sudoku/notification/actions';

import { AppHeaderH2 } from "../basic/header";

import { 
    game2string, 
    string2game, 
    solveBacktrack, 
    solution2string, 
    string2solution, 
    getColors, 
    checkField, 
    findCandidates,
    checkComplete,
    isCandidate 
} from '../../utils/sudoku';


const SudokuResolver: React.FC = () => {
    const dispatch = useDispatch();
  
    const selectedfield: number = useSelector((state: RootState) => state.selectedfield);
    const gamefields: Field[] = useSelector((state: RootState) => state.gamefields);
    const solutionfields: Field[] = useSelector((state: RootState) => state.solutionfields);
    const candidates: boolean[] = useSelector((state: RootState) => state.candidates);
    const sudokus: Sudoku[] = useSelector((state: RootState) => state.sudokus);
    const flags: boolean[] = useSelector((state: RootState) => state.flags);
    const sequence: number[] = useSelector((state: RootState) => state.sequence);
    const positions: number[][][] = useSelector((state: RootState) => state.positions);
    const matrix: number[][] = Object.values(positions)[0];
    const numbermatrix: number[][] = Object.values(positions)[1];
    const candidatematrix: number[][] = Object.values(positions)[2];
    const notification: string = useSelector((state: RootState) => state.notification);

    React.useEffect(() => {
        dispatch(initializeSudokus());
    }, [dispatch]);
    
    React.useEffect(() => {
        dispatch(initializePositions());
        dispatch(initializeSequence());
        dispatch(initializeGamefields());
        dispatch(initializeSolutionfields());
        dispatch(initializeCandidates());
        dispatch(initializeFlags());
        dispatch(setFlag(Flagtype.SET));
        dispatch(setSelectedField(0));
    }, [dispatch]);  
  
    const handleCandidates = () => {
        if (!flags[Flagtype.CANDIDATES]) {
            const newCandidates = findCandidates(gamefields, false, false, false);
            dispatch(setCandidates(newCandidates));
            dispatch(clearFlag(Flagtype.SINGLES));
            dispatch(clearFlag(Flagtype.HIDDENSINGLES));
            dispatch(clearFlag(Flagtype.NAKEDPAIRS));
            dispatch(showNotification('Kandidaten anzeigen', 5));
        }
        else {
            dispatch(showNotification('Kandidaten nicht anzeigen', 5));
            dispatch(clearFlag(Flagtype.SINGLES));
            dispatch(clearFlag(Flagtype.HIDDENSINGLES));
            dispatch(clearFlag(Flagtype.NAKEDPAIRS));
        }
        dispatch(toggleFlag(Flagtype.CANDIDATES));
    };

    const handleSingles = () => {
        if (!flags[Flagtype.SINGLES]) {
            const newCandidates = findCandidates(gamefields, true, flags[Flagtype.HIDDENSINGLES], flags[Flagtype.NAKEDPAIRS]); 
            dispatch(setCandidates(newCandidates));
            dispatch(showNotification('Singles filtern', 5));
        }
        else {
            dispatch(showNotification('Singles nicht filtern', 5));
        }
        dispatch(toggleFlag(Flagtype.SINGLES));
    };

    const handleHiddensingles = () => {
        if (!flags[Flagtype.HIDDENSINGLES]) {
           const newCandidates = findCandidates(gamefields, flags[Flagtype.SINGLES], true, flags[Flagtype.NAKEDPAIRS]); 
            dispatch(setCandidates(newCandidates));
            dispatch(showNotification('Hidden Singles filtern', 5));
        }
        else {
            dispatch(showNotification('Hidden Singles nicht filtern', 5));
        }
        dispatch(toggleFlag(Flagtype.HIDDENSINGLES));
    };

    const handleNakedpairs = () => {
        if (!flags[Flagtype.NAKEDPAIRS]) {
            const newCandidates = findCandidates(gamefields, flags[Flagtype.SINGLES], flags[Flagtype.HIDDENSINGLES], true); 
            dispatch(setCandidates(newCandidates));
            dispatch(showNotification('Naked Pairs filtern', 5));
        }
        else {
            dispatch(showNotification('Naked Pairs nicht filtern', 5));
        }
        dispatch(toggleFlag(Flagtype.NAKEDPAIRS));
    };

    const handleCheck = () => {
        if (!flags[Flagtype.CHECK]) {
            dispatch(showNotification('Prüfung durchführen', 5));
        }
        else {
            dispatch(showNotification('Prüfung nicht durchführen', 5));
        }
        dispatch(toggleFlag(Flagtype.CHECK));
    };

    const handleFlag = (flag: Flagtype) => {
        switch (flag) {
            case Flagtype.CHECK:
                handleCheck();
                break;
            case Flagtype.CANDIDATES:
                handleCandidates();
                break;
            case Flagtype.SINGLES:
                handleSingles();
                break;
            case Flagtype.HIDDENSINGLES:
                handleHiddensingles();
                break;
            case Flagtype.NAKEDPAIRS:
                handleNakedpairs();
                break;
            default:
        }
    };

    const handleValue = (value: number) => {
        let isOK = false;

        isOK = flags[Flagtype.SET] ? isCandidate(gamefields, value, selectedfield) : true;
        if (!isOK) {
            dispatch(showNotification('Eingegebene Zahl ist falsch', 5));
            return;
        }

        isOK = flags[Flagtype.CHECK] ? checkField(solutionfields, selectedfield, value) : true;
        if (isOK) {
            const seqnr = sequence.length;
            const gamefield: Field = {
                number: value,
                fieldnr: selectedfield,
                seqnr: seqnr,
                settype: flags[Flagtype.SET] ? Settype.SET : Settype.GAME
            };
            dispatch(setGamefield(gamefield));
            dispatch(pushSequence(selectedfield));
            gamefields[selectedfield] = gamefield;
            if (flags[Flagtype.CANDIDATES]) {
                const newCandidates = findCandidates(gamefields, flags[Flagtype.SINGLES], flags[Flagtype.HIDDENSINGLES], flags[Flagtype.NAKEDPAIRS]);
                dispatch(setCandidates(newCandidates));
            }
            if (checkComplete(gamefields, solutionfields)) {
                for (let index=0; index<81; index++) {
                    if (gamefields[index].settype!==Settype.SET) {
                        const gamefield = gamefields[index];
                        gamefield.settype = Settype.SOLVED;
                        dispatch(setGamefield(gamefield));
                    }
                }
                dispatch(showNotification('Spiel gelöst', 5));        
            }
        }
        else {
            dispatch(showNotification('Eingegebene Zahl ist falsch', 5));
        }
    };

    const handlePosition = (position: number) => {
        dispatch(setSelectedField(position));
    };

    const handleStart = () => {
        const [, solutionfields] = solveBacktrack(gamefields, 0);
        for (let index=0; index<81; index++) {
            dispatch(setSolutionfield(solutionfields[index]));
        }
        const gameAsString: string = game2string(gamefields);
        const solutionAsString: string = solution2string(solutionfields);
        const sudoku: SudokuNoID = {
            game: gameAsString,
            solution: solutionAsString
        }
        dispatch(addSudoku(sudoku));
        dispatch(clearFlag(Flagtype.SET));
        dispatch(showNotification('Spiel starten', 5));
    };

    const handleRead = () => {
        dispatch(initializeSequence());
        dispatch(initializeGamefields());
        dispatch(initializeSolutionfields());
        dispatch(initializeCandidates());
        dispatch(initializeFlags());
        dispatch(setSelectedField(0));
        const gameAsString: string = Object.values(sudokus)[Object.values(sudokus).length-1].game;
        const gamefieldvalues = string2game(gameAsString);
        for (let index=0; index<81; index++) {
            if (gamefieldvalues[index].settype===Settype.SET) {
                dispatch(setGamefield(gamefieldvalues[index]));
            }
            else {
                const gamefield: Field = {
                    number: 0,
                    fieldnr: index,
                    seqnr: 0,
                    settype: Settype.NONE
                };
                dispatch(setGamefield(gamefield));
            }
        }
        dispatch(clearFlag(Flagtype.SET));
        const solutionAsString: string = Object.values(sudokus)[Object.values(sudokus).length-1].solution;
        const solutionfieldvalues: Field[] = string2solution(solutionAsString);
        for (let index=0; index<81; index++) {
            dispatch(setSolutionfield(solutionfieldvalues[index]));
        }
        dispatch(showNotification('Spiel einlesen', 5));
    };

    const handleSolution = () => {
        for (let index=0; index<81; index++) {
            if (gamefields[index].settype!==Settype.SET&&gamefields[index].number!==solutionfields[index].number) {
                dispatch(setGamefield(solutionfields[index]));
            }
        }
        dispatch(showNotification('Lösung anzeigen', 5));
    };

    const handleNew = () => {
        dispatch(initializeSequence());
        dispatch(initializeGamefields());
        dispatch(initializeSolutionfields());
        dispatch(initializeCandidates());
        dispatch(initializeFlags());
        dispatch(setFlag(Flagtype.SET));
        dispatch(setSelectedField(0));
        dispatch(showNotification('Neues Spiel eingeben', 5));
    };

    const handleUndo = () => {
        const lastField = sequence[sequence.length-1];
        const gamefield: Field = {
            number: 0,
            fieldnr: lastField,
            seqnr: 0,
            settype: Settype.NONE
        };
        dispatch(setGamefield(gamefield));
        dispatch(popSequence());
    };

    const markerposition: number[] = [matrix[selectedfield][0], matrix[selectedfield][1]];
    const numberfield = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const colors: Setcolor[] = getColors(gamefields);
    const checkMessage = 'Prüfen: ' + (flags[Flagtype.CHECK] ? 'ein' : 'aus');
    const checkCandidates = 'Kandidaten: ' + (flags[Flagtype.CANDIDATES] ? 'ein' : 'aus');
    const checkSingles = '  -  Singles: ' + (flags[Flagtype.SINGLES] ? 'ein' : 'aus');
    const checkHiddensingles = '  -  Hidden Singles: ' + (flags[Flagtype.HIDDENSINGLES] ? 'ein' : 'aus');
    const checkNakedpairs = '  -  Naked Pairs: ' + (flags[Flagtype.NAKEDPAIRS] ? 'ein' : 'aus');
    const title = `Sudoku (${(Object.values(sudokus)).length} gespeicherte Spiele)`;

    return (
        <div className="App">
            <AppHeaderH2 text={title} icon='puzzle'/> 
            <Button style={styleButton} onClick={() => handleStart()}>Start</Button>
            <Button style={styleButton} onClick={() => handleNew()}>Neu</Button>
            <Button style={styleButton} onClick={() => handleRead()}>Lesen</Button>
            <Button style={styleButton} onClick={() => handleUndo()}>Zurück</Button>
            <Button style={styleButton} onClick={() => handleSolution()}>Lösung</Button>
            <svg viewBox="0 0.5 20 9.7">
                <defs>
                    <path id="quadrat" d="M0,0 h1 v1 h-1 z" stroke="black" strokeWidth="0.01"/>
                    <circle id="marker" r="0.5" strokeWidth="0.025" stroke="red" fill="none"/>
                    <rect id="border" x="0" y="0" width="9" height="9" fill="white" stroke="black" strokeWidth="0.035"/>
                    <line id="horizontal" x1="0" y1="0" x2="9" y2="0" stroke="black" strokeWidth="0.025"/>
                    <line id="vertical" x1="0" y1="0" x2="0" y2="9" stroke="black" strokeWidth="0.025"/>
                </defs>

                <text x={numbermatrix[0][0]} y={numbermatrix[8][1]+2} fontSize="0.25">{notification}</text>
                <text x={numbermatrix[0][0]} y={numbermatrix[8][1]+2.4} fontSize="0.25" onClick={() => handleFlag(Flagtype.CHECK)}>{checkMessage}</text>
                <text x={numbermatrix[0][0]} y={numbermatrix[8][1]+2.8} fontSize="0.25" onClick={() => handleFlag(Flagtype.CANDIDATES)}>{checkCandidates}</text>
                {flags[Flagtype.CANDIDATES]&&<text x={numbermatrix[0][0]} y={numbermatrix[8][1]+3.2} fontSize="0.25" onClick={() => handleFlag(Flagtype.SINGLES)}>{checkSingles}</text>}
                {flags[Flagtype.CANDIDATES]&&<text x={numbermatrix[0][0]} y={numbermatrix[8][1]+3.6} fontSize="0.25" onClick={() => handleFlag(Flagtype.HIDDENSINGLES)}>{checkHiddensingles}</text>}
                {flags[Flagtype.CANDIDATES]&&<text x={numbermatrix[0][0]} y={numbermatrix[8][1]+4} fontSize="0.25" onClick={() => handleFlag(Flagtype.NAKEDPAIRS)}>{checkNakedpairs}</text>}

                <use href="#quadrat" transform={"translate("+numbermatrix[0][0]+","+numbermatrix[0][1]+")"} onClick={() => handleValue(1)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[1][0]+","+numbermatrix[1][1]+")"} onClick={() => handleValue(2)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[2][0]+","+numbermatrix[2][1]+")"} onClick={() => handleValue(3)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[3][0]+","+numbermatrix[3][1]+")"} onClick={() => handleValue(4)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[4][0]+","+numbermatrix[4][1]+")"} onClick={() => handleValue(5)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[5][0]+","+numbermatrix[5][1]+")"} onClick={() => handleValue(6)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[6][0]+","+numbermatrix[6][1]+")"} onClick={() => handleValue(7)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[7][0]+","+numbermatrix[7][1]+")"} onClick={() => handleValue(8)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+numbermatrix[8][0]+","+numbermatrix[8][1]+")"} onClick={() => handleValue(9)} fill="lightblue"/>

                <text x={numbermatrix[0][0]+0.3} y={numbermatrix[0][1]+0.8} fontSize="0.7" onClick={() => handleValue(1)}>{numberfield[0]}</text>
                <text x={numbermatrix[1][0]+0.3} y={numbermatrix[1][1]+0.8} fontSize="0.7" onClick={() => handleValue(2)}>{numberfield[1]}</text>
                <text x={numbermatrix[2][0]+0.3} y={numbermatrix[2][1]+0.8} fontSize="0.7" onClick={() => handleValue(3)}>{numberfield[2]}</text>
                <text x={numbermatrix[3][0]+0.3} y={numbermatrix[3][1]+0.8} fontSize="0.7" onClick={() => handleValue(4)}>{numberfield[3]}</text>
                <text x={numbermatrix[4][0]+0.3} y={numbermatrix[4][1]+0.8} fontSize="0.7" onClick={() => handleValue(5)}>{numberfield[4]}</text>
                <text x={numbermatrix[5][0]+0.3} y={numbermatrix[5][1]+0.8} fontSize="0.7" onClick={() => handleValue(6)}>{numberfield[5]}</text>
                <text x={numbermatrix[6][0]+0.3} y={numbermatrix[6][1]+0.8} fontSize="0.7" onClick={() => handleValue(7)}>{numberfield[6]}</text>
                <text x={numbermatrix[7][0]+0.3} y={numbermatrix[7][1]+0.8} fontSize="0.7" onClick={() => handleValue(8)}>{numberfield[7]}</text>
                <text x={numbermatrix[8][0]+0.3} y={numbermatrix[8][1]+0.8} fontSize="0.7" onClick={() => handleValue(9)}>{numberfield[8]}</text>
 
                <use href="#quadrat" transform={"translate("+matrix[0][0]+","+matrix[0][1]+")"} onClick={() => handlePosition(0)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[1][0]+","+matrix[1][1]+")"} onClick={() => handlePosition(1)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[2][0]+","+matrix[2][1]+")"} onClick={() => handlePosition(2)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[3][0]+","+matrix[3][1]+")"} onClick={() => handlePosition(3)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[4][0]+","+matrix[4][1]+")"} onClick={() => handlePosition(4)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[5][0]+","+matrix[5][1]+")"} onClick={() => handlePosition(5)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[6][0]+","+matrix[6][1]+")"} onClick={() => handlePosition(6)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[7][0]+","+matrix[7][1]+")"} onClick={() => handlePosition(7)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[8][0]+","+matrix[8][1]+")"} onClick={() => handlePosition(8)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[9][0]+","+matrix[9][1]+")"} onClick={() => handlePosition(9)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[10][0]+","+matrix[10][1]+")"} onClick={() => handlePosition(10)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[11][0]+","+matrix[11][1]+")"} onClick={() => handlePosition(11)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[12][0]+","+matrix[12][1]+")"} onClick={() => handlePosition(12)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[13][0]+","+matrix[13][1]+")"} onClick={() => handlePosition(13)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[14][0]+","+matrix[14][1]+")"} onClick={() => handlePosition(14)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[15][0]+","+matrix[15][1]+")"} onClick={() => handlePosition(15)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[16][0]+","+matrix[16][1]+")"} onClick={() => handlePosition(16)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[17][0]+","+matrix[17][1]+")"} onClick={() => handlePosition(17)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[18][0]+","+matrix[18][1]+")"} onClick={() => handlePosition(18)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[19][0]+","+matrix[19][1]+")"} onClick={() => handlePosition(19)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[20][0]+","+matrix[20][1]+")"} onClick={() => handlePosition(20)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[21][0]+","+matrix[21][1]+")"} onClick={() => handlePosition(21)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[22][0]+","+matrix[22][1]+")"} onClick={() => handlePosition(22)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[23][0]+","+matrix[23][1]+")"} onClick={() => handlePosition(23)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[24][0]+","+matrix[24][1]+")"} onClick={() => handlePosition(24)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[25][0]+","+matrix[25][1]+")"} onClick={() => handlePosition(25)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[26][0]+","+matrix[26][1]+")"} onClick={() => handlePosition(26)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[27][0]+","+matrix[27][1]+")"} onClick={() => handlePosition(27)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[28][0]+","+matrix[28][1]+")"} onClick={() => handlePosition(28)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[29][0]+","+matrix[29][1]+")"} onClick={() => handlePosition(29)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[30][0]+","+matrix[30][1]+")"} onClick={() => handlePosition(30)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[31][0]+","+matrix[31][1]+")"} onClick={() => handlePosition(31)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[32][0]+","+matrix[32][1]+")"} onClick={() => handlePosition(32)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[33][0]+","+matrix[33][1]+")"} onClick={() => handlePosition(33)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[34][0]+","+matrix[34][1]+")"} onClick={() => handlePosition(34)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[35][0]+","+matrix[35][1]+")"} onClick={() => handlePosition(35)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[36][0]+","+matrix[36][1]+")"} onClick={() => handlePosition(36)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[37][0]+","+matrix[37][1]+")"} onClick={() => handlePosition(37)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[38][0]+","+matrix[38][1]+")"} onClick={() => handlePosition(38)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[39][0]+","+matrix[39][1]+")"} onClick={() => handlePosition(39)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[40][0]+","+matrix[40][1]+")"} onClick={() => handlePosition(40)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[41][0]+","+matrix[41][1]+")"} onClick={() => handlePosition(41)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[42][0]+","+matrix[42][1]+")"} onClick={() => handlePosition(42)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[43][0]+","+matrix[43][1]+")"} onClick={() => handlePosition(43)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[44][0]+","+matrix[44][1]+")"} onClick={() => handlePosition(44)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[45][0]+","+matrix[45][1]+")"} onClick={() => handlePosition(45)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[46][0]+","+matrix[46][1]+")"} onClick={() => handlePosition(46)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[47][0]+","+matrix[47][1]+")"} onClick={() => handlePosition(47)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[48][0]+","+matrix[48][1]+")"} onClick={() => handlePosition(48)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[49][0]+","+matrix[49][1]+")"} onClick={() => handlePosition(49)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[50][0]+","+matrix[50][1]+")"} onClick={() => handlePosition(50)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[51][0]+","+matrix[51][1]+")"} onClick={() => handlePosition(51)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[52][0]+","+matrix[52][1]+")"} onClick={() => handlePosition(52)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[53][0]+","+matrix[53][1]+")"} onClick={() => handlePosition(53)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[54][0]+","+matrix[54][1]+")"} onClick={() => handlePosition(54)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[55][0]+","+matrix[55][1]+")"} onClick={() => handlePosition(55)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[56][0]+","+matrix[56][1]+")"} onClick={() => handlePosition(56)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[57][0]+","+matrix[57][1]+")"} onClick={() => handlePosition(57)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[58][0]+","+matrix[58][1]+")"} onClick={() => handlePosition(58)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[59][0]+","+matrix[59][1]+")"} onClick={() => handlePosition(59)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[60][0]+","+matrix[60][1]+")"} onClick={() => handlePosition(60)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[61][0]+","+matrix[61][1]+")"} onClick={() => handlePosition(61)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[62][0]+","+matrix[62][1]+")"} onClick={() => handlePosition(62)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[63][0]+","+matrix[63][1]+")"} onClick={() => handlePosition(63)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[64][0]+","+matrix[64][1]+")"} onClick={() => handlePosition(64)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[65][0]+","+matrix[65][1]+")"} onClick={() => handlePosition(65)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[66][0]+","+matrix[66][1]+")"} onClick={() => handlePosition(66)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[67][0]+","+matrix[67][1]+")"} onClick={() => handlePosition(67)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[68][0]+","+matrix[68][1]+")"} onClick={() => handlePosition(68)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[69][0]+","+matrix[69][1]+")"} onClick={() => handlePosition(69)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[70][0]+","+matrix[70][1]+")"} onClick={() => handlePosition(70)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[71][0]+","+matrix[71][1]+")"} onClick={() => handlePosition(71)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[72][0]+","+matrix[72][1]+")"} onClick={() => handlePosition(72)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[73][0]+","+matrix[73][1]+")"} onClick={() => handlePosition(73)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[74][0]+","+matrix[74][1]+")"} onClick={() => handlePosition(74)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[75][0]+","+matrix[75][1]+")"} onClick={() => handlePosition(75)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[76][0]+","+matrix[76][1]+")"} onClick={() => handlePosition(76)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[77][0]+","+matrix[77][1]+")"} onClick={() => handlePosition(77)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[78][0]+","+matrix[78][1]+")"} onClick={() => handlePosition(78)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[79][0]+","+matrix[79][1]+")"} onClick={() => handlePosition(79)} fill="white"/>
                <use href="#quadrat" transform={"translate("+matrix[80][0]+","+matrix[80][1]+")"} onClick={() => handlePosition(80)} fill="white"/>

                <use href="#horizontal" transform="translate(1,1)"/>
                <use href="#horizontal" transform="translate(1,4)"/>
                <use href="#horizontal" transform="translate(1,7)"/>
                <use href="#horizontal" transform="translate(1,10)"/>
                <use href="#vertical" transform="translate(1,1)"/>
                <use href="#vertical" transform="translate(4,1)"/>
                <use href="#vertical" transform="translate(7,1)"/>
                <use href="#vertical" transform="translate(10,1)"/>
                <use href="#marker" transform={"translate("+(markerposition[0]+0.5)+","+(markerposition[1]+0.5)+")"}/>
                
                {gamefields[0].number>0&&<text fill={colors[0]} x={matrix[0][0]+0.3} y={matrix[0][1]+0.8} fontSize="0.7" onClick={() => handlePosition(0)}>{String(gamefields[0].number)}</text>}
                {gamefields[1].number>0&&<text fill={colors[1]} x={matrix[1][0]+0.3} y={matrix[1][1]+0.8} fontSize="0.7" onClick={() => handlePosition(1)}>{String(gamefields[1].number)}</text>}
                {gamefields[2].number>0&&<text fill={colors[2]} x={matrix[2][0]+0.3} y={matrix[2][1]+0.8} fontSize="0.7" onClick={() => handlePosition(2)}>{String(gamefields[2].number)}</text>}
                {gamefields[3].number>0&&<text fill={colors[3]} x={matrix[3][0]+0.3} y={matrix[3][1]+0.8} fontSize="0.7" onClick={() => handlePosition(3)}>{String(gamefields[3].number)}</text>}
                {gamefields[4].number>0&&<text fill={colors[4]} x={matrix[4][0]+0.3} y={matrix[4][1]+0.8} fontSize="0.7" onClick={() => handlePosition(4)}>{String(gamefields[4].number)}</text>}
                {gamefields[5].number>0&&<text fill={colors[5]} x={matrix[5][0]+0.3} y={matrix[5][1]+0.8} fontSize="0.7" onClick={() => handlePosition(5)}>{String(gamefields[5].number)}</text>}
                {gamefields[6].number>0&&<text fill={colors[6]} x={matrix[6][0]+0.3} y={matrix[6][1]+0.8} fontSize="0.7" onClick={() => handlePosition(6)}>{String(gamefields[6].number)}</text>}
                {gamefields[7].number>0&&<text fill={colors[7]} x={matrix[7][0]+0.3} y={matrix[7][1]+0.8} fontSize="0.7" onClick={() => handlePosition(7)}>{String(gamefields[7].number)}</text>}
                {gamefields[8].number>0&&<text fill={colors[8]} x={matrix[8][0]+0.3} y={matrix[8][1]+0.8} fontSize="0.7" onClick={() => handlePosition(8)}>{String(gamefields[8].number)}</text>}
                {gamefields[9].number>0&&<text fill={colors[9]} x={matrix[9][0]+0.3} y={matrix[9][1]+0.8} fontSize="0.7" onClick={() => handlePosition(9)}>{String(gamefields[9].number)}</text>}
                {gamefields[10].number>0&&<text fill={colors[10]} x={matrix[10][0]+0.3} y={matrix[10][1]+0.8} fontSize="0.7" onClick={() => handlePosition(10)}>{String(gamefields[10].number)}</text>}
                {gamefields[11].number>0&&<text fill={colors[11]} x={matrix[11][0]+0.3} y={matrix[11][1]+0.8} fontSize="0.7" onClick={() => handlePosition(11)}>{String(gamefields[11].number)}</text>}
                {gamefields[12].number>0&&<text fill={colors[12]} x={matrix[12][0]+0.3} y={matrix[12][1]+0.8} fontSize="0.7" onClick={() => handlePosition(12)}>{String(gamefields[12].number)}</text>}
                {gamefields[13].number>0&&<text fill={colors[13]} x={matrix[13][0]+0.3} y={matrix[13][1]+0.8} fontSize="0.7" onClick={() => handlePosition(13)}>{String(gamefields[13].number)}</text>}
                {gamefields[14].number>0&&<text fill={colors[14]} x={matrix[14][0]+0.3} y={matrix[14][1]+0.8} fontSize="0.7" onClick={() => handlePosition(14)}>{String(gamefields[14].number)}</text>}
                {gamefields[15].number>0&&<text fill={colors[15]} x={matrix[15][0]+0.3} y={matrix[15][1]+0.8} fontSize="0.7" onClick={() => handlePosition(15)}>{String(gamefields[15].number)}</text>}
                {gamefields[16].number>0&&<text fill={colors[16]} x={matrix[16][0]+0.3} y={matrix[16][1]+0.8} fontSize="0.7" onClick={() => handlePosition(16)}>{String(gamefields[16].number)}</text>}
                {gamefields[17].number>0&&<text fill={colors[17]} x={matrix[17][0]+0.3} y={matrix[17][1]+0.8} fontSize="0.7" onClick={() => handlePosition(17)}>{String(gamefields[17].number)}</text>}
                {gamefields[18].number>0&&<text fill={colors[18]} x={matrix[18][0]+0.3} y={matrix[18][1]+0.8} fontSize="0.7" onClick={() => handlePosition(18)}>{String(gamefields[18].number)}</text>}
                {gamefields[19].number>0&&<text fill={colors[19]} x={matrix[19][0]+0.3} y={matrix[19][1]+0.8} fontSize="0.7" onClick={() => handlePosition(19)}>{String(gamefields[19].number)}</text>}
                {gamefields[20].number>0&&<text fill={colors[20]} x={matrix[20][0]+0.3} y={matrix[20][1]+0.8} fontSize="0.7" onClick={() => handlePosition(20)}>{String(gamefields[20].number)}</text>}
                {gamefields[21].number>0&&<text fill={colors[21]} x={matrix[21][0]+0.3} y={matrix[21][1]+0.8} fontSize="0.7" onClick={() => handlePosition(21)}>{String(gamefields[21].number)}</text>}
                {gamefields[22].number>0&&<text fill={colors[22]} x={matrix[22][0]+0.3} y={matrix[22][1]+0.8} fontSize="0.7" onClick={() => handlePosition(22)}>{String(gamefields[22].number)}</text>}
                {gamefields[23].number>0&&<text fill={colors[23]} x={matrix[23][0]+0.3} y={matrix[23][1]+0.8} fontSize="0.7" onClick={() => handlePosition(23)}>{String(gamefields[23].number)}</text>}
                {gamefields[24].number>0&&<text fill={colors[24]} x={matrix[24][0]+0.3} y={matrix[24][1]+0.8} fontSize="0.7" onClick={() => handlePosition(24)}>{String(gamefields[24].number)}</text>}
                {gamefields[25].number>0&&<text fill={colors[25]} x={matrix[25][0]+0.3} y={matrix[25][1]+0.8} fontSize="0.7" onClick={() => handlePosition(25)}>{String(gamefields[25].number)}</text>}
                {gamefields[26].number>0&&<text fill={colors[26]} x={matrix[26][0]+0.3} y={matrix[26][1]+0.8} fontSize="0.7" onClick={() => handlePosition(26)}>{String(gamefields[26].number)}</text>}
                {gamefields[27].number>0&&<text fill={colors[27]} x={matrix[27][0]+0.3} y={matrix[27][1]+0.8} fontSize="0.7" onClick={() => handlePosition(27)}>{String(gamefields[27].number)}</text>}
                {gamefields[28].number>0&&<text fill={colors[28]} x={matrix[28][0]+0.3} y={matrix[28][1]+0.8} fontSize="0.7" onClick={() => handlePosition(28)}>{String(gamefields[28].number)}</text>}
                {gamefields[29].number>0&&<text fill={colors[29]} x={matrix[29][0]+0.3} y={matrix[29][1]+0.8} fontSize="0.7" onClick={() => handlePosition(29)}>{String(gamefields[29].number)}</text>}
                {gamefields[30].number>0&&<text fill={colors[30]} x={matrix[30][0]+0.3} y={matrix[30][1]+0.8} fontSize="0.7" onClick={() => handlePosition(30)}>{String(gamefields[30].number)}</text>}
                {gamefields[31].number>0&&<text fill={colors[31]} x={matrix[31][0]+0.3} y={matrix[31][1]+0.8} fontSize="0.7" onClick={() => handlePosition(31)}>{String(gamefields[31].number)}</text>}
                {gamefields[32].number>0&&<text fill={colors[32]} x={matrix[32][0]+0.3} y={matrix[32][1]+0.8} fontSize="0.7" onClick={() => handlePosition(32)}>{String(gamefields[32].number)}</text>}
                {gamefields[33].number>0&&<text fill={colors[33]} x={matrix[33][0]+0.3} y={matrix[33][1]+0.8} fontSize="0.7" onClick={() => handlePosition(33)}>{String(gamefields[33].number)}</text>}
                {gamefields[34].number>0&&<text fill={colors[34]} x={matrix[34][0]+0.3} y={matrix[34][1]+0.8} fontSize="0.7" onClick={() => handlePosition(34)}>{String(gamefields[34].number)}</text>}
                {gamefields[35].number>0&&<text fill={colors[35]} x={matrix[35][0]+0.3} y={matrix[35][1]+0.8} fontSize="0.7" onClick={() => handlePosition(35)}>{String(gamefields[35].number)}</text>}
                {gamefields[36].number>0&&<text fill={colors[36]} x={matrix[36][0]+0.3} y={matrix[36][1]+0.8} fontSize="0.7" onClick={() => handlePosition(36)}>{String(gamefields[36].number)}</text>}
                {gamefields[37].number>0&&<text fill={colors[37]} x={matrix[37][0]+0.3} y={matrix[37][1]+0.8} fontSize="0.7" onClick={() => handlePosition(37)}>{String(gamefields[37].number)}</text>}
                {gamefields[38].number>0&&<text fill={colors[38]} x={matrix[38][0]+0.3} y={matrix[38][1]+0.8} fontSize="0.7" onClick={() => handlePosition(38)}>{String(gamefields[38].number)}</text>}
                {gamefields[39].number>0&&<text fill={colors[39]} x={matrix[39][0]+0.3} y={matrix[39][1]+0.8} fontSize="0.7" onClick={() => handlePosition(39)}>{String(gamefields[39].number)}</text>}
                {gamefields[40].number>0&&<text fill={colors[40]} x={matrix[40][0]+0.3} y={matrix[40][1]+0.8} fontSize="0.7" onClick={() => handlePosition(40)}>{String(gamefields[40].number)}</text>}
                {gamefields[41].number>0&&<text fill={colors[41]} x={matrix[41][0]+0.3} y={matrix[41][1]+0.8} fontSize="0.7" onClick={() => handlePosition(41)}>{String(gamefields[41].number)}</text>}
                {gamefields[42].number>0&&<text fill={colors[42]} x={matrix[42][0]+0.3} y={matrix[42][1]+0.8} fontSize="0.7" onClick={() => handlePosition(42)}>{String(gamefields[42].number)}</text>}
                {gamefields[43].number>0&&<text fill={colors[43]} x={matrix[43][0]+0.3} y={matrix[43][1]+0.8} fontSize="0.7" onClick={() => handlePosition(43)}>{String(gamefields[43].number)}</text>}
                {gamefields[44].number>0&&<text fill={colors[44]} x={matrix[44][0]+0.3} y={matrix[44][1]+0.8} fontSize="0.7" onClick={() => handlePosition(44)}>{String(gamefields[44].number)}</text>}
                {gamefields[45].number>0&&<text fill={colors[45]} x={matrix[45][0]+0.3} y={matrix[45][1]+0.8} fontSize="0.7" onClick={() => handlePosition(45)}>{String(gamefields[45].number)}</text>}
                {gamefields[46].number>0&&<text fill={colors[46]} x={matrix[46][0]+0.3} y={matrix[46][1]+0.8} fontSize="0.7" onClick={() => handlePosition(46)}>{String(gamefields[46].number)}</text>}
                {gamefields[47].number>0&&<text fill={colors[47]} x={matrix[47][0]+0.3} y={matrix[47][1]+0.8} fontSize="0.7" onClick={() => handlePosition(47)}>{String(gamefields[47].number)}</text>}
                {gamefields[48].number>0&&<text fill={colors[48]} x={matrix[48][0]+0.3} y={matrix[48][1]+0.8} fontSize="0.7" onClick={() => handlePosition(48)}>{String(gamefields[48].number)}</text>}
                {gamefields[49].number>0&&<text fill={colors[49]} x={matrix[49][0]+0.3} y={matrix[49][1]+0.8} fontSize="0.7" onClick={() => handlePosition(49)}>{String(gamefields[49].number)}</text>}
                {gamefields[50].number>0&&<text fill={colors[50]} x={matrix[50][0]+0.3} y={matrix[50][1]+0.8} fontSize="0.7" onClick={() => handlePosition(50)}>{String(gamefields[50].number)}</text>}
                {gamefields[51].number>0&&<text fill={colors[51]} x={matrix[51][0]+0.3} y={matrix[51][1]+0.8} fontSize="0.7" onClick={() => handlePosition(51)}>{String(gamefields[51].number)}</text>}
                {gamefields[52].number>0&&<text fill={colors[52]} x={matrix[52][0]+0.3} y={matrix[52][1]+0.8} fontSize="0.7" onClick={() => handlePosition(52)}>{String(gamefields[52].number)}</text>}
                {gamefields[53].number>0&&<text fill={colors[53]} x={matrix[53][0]+0.3} y={matrix[53][1]+0.8} fontSize="0.7" onClick={() => handlePosition(53)}>{String(gamefields[53].number)}</text>}
                {gamefields[54].number>0&&<text fill={colors[54]} x={matrix[54][0]+0.3} y={matrix[54][1]+0.8} fontSize="0.7" onClick={() => handlePosition(54)}>{String(gamefields[54].number)}</text>}
                {gamefields[55].number>0&&<text fill={colors[55]} x={matrix[55][0]+0.3} y={matrix[55][1]+0.8} fontSize="0.7" onClick={() => handlePosition(55)}>{String(gamefields[55].number)}</text>}
                {gamefields[56].number>0&&<text fill={colors[56]} x={matrix[56][0]+0.3} y={matrix[56][1]+0.8} fontSize="0.7" onClick={() => handlePosition(56)}>{String(gamefields[56].number)}</text>}
                {gamefields[57].number>0&&<text fill={colors[57]} x={matrix[57][0]+0.3} y={matrix[57][1]+0.8} fontSize="0.7" onClick={() => handlePosition(57)}>{String(gamefields[57].number)}</text>}
                {gamefields[58].number>0&&<text fill={colors[58]} x={matrix[58][0]+0.3} y={matrix[58][1]+0.8} fontSize="0.7" onClick={() => handlePosition(58)}>{String(gamefields[58].number)}</text>}
                {gamefields[59].number>0&&<text fill={colors[59]} x={matrix[59][0]+0.3} y={matrix[59][1]+0.8} fontSize="0.7" onClick={() => handlePosition(59)}>{String(gamefields[59].number)}</text>}
                {gamefields[60].number>0&&<text fill={colors[60]} x={matrix[60][0]+0.3} y={matrix[60][1]+0.8} fontSize="0.7" onClick={() => handlePosition(60)}>{String(gamefields[60].number)}</text>}
                {gamefields[61].number>0&&<text fill={colors[61]} x={matrix[61][0]+0.3} y={matrix[61][1]+0.8} fontSize="0.7" onClick={() => handlePosition(61)}>{String(gamefields[61].number)}</text>}
                {gamefields[62].number>0&&<text fill={colors[62]} x={matrix[62][0]+0.3} y={matrix[62][1]+0.8} fontSize="0.7" onClick={() => handlePosition(62)}>{String(gamefields[62].number)}</text>}
                {gamefields[63].number>0&&<text fill={colors[63]} x={matrix[63][0]+0.3} y={matrix[63][1]+0.8} fontSize="0.7" onClick={() => handlePosition(63)}>{String(gamefields[63].number)}</text>}
                {gamefields[64].number>0&&<text fill={colors[64]} x={matrix[64][0]+0.3} y={matrix[64][1]+0.8} fontSize="0.7" onClick={() => handlePosition(64)}>{String(gamefields[64].number)}</text>}
                {gamefields[65].number>0&&<text fill={colors[65]} x={matrix[65][0]+0.3} y={matrix[65][1]+0.8} fontSize="0.7" onClick={() => handlePosition(65)}>{String(gamefields[65].number)}</text>}
                {gamefields[66].number>0&&<text fill={colors[66]} x={matrix[66][0]+0.3} y={matrix[66][1]+0.8} fontSize="0.7" onClick={() => handlePosition(66)}>{String(gamefields[66].number)}</text>}
                {gamefields[67].number>0&&<text fill={colors[67]} x={matrix[67][0]+0.3} y={matrix[67][1]+0.8} fontSize="0.7" onClick={() => handlePosition(67)}>{String(gamefields[67].number)}</text>}
                {gamefields[68].number>0&&<text fill={colors[68]} x={matrix[68][0]+0.3} y={matrix[68][1]+0.8} fontSize="0.7" onClick={() => handlePosition(68)}>{String(gamefields[68].number)}</text>}
                {gamefields[69].number>0&&<text fill={colors[69]} x={matrix[69][0]+0.3} y={matrix[69][1]+0.8} fontSize="0.7" onClick={() => handlePosition(69)}>{String(gamefields[69].number)}</text>}
                {gamefields[70].number>0&&<text fill={colors[70]} x={matrix[70][0]+0.3} y={matrix[70][1]+0.8} fontSize="0.7" onClick={() => handlePosition(70)}>{String(gamefields[70].number)}</text>}
                {gamefields[71].number>0&&<text fill={colors[71]} x={matrix[71][0]+0.3} y={matrix[71][1]+0.8} fontSize="0.7" onClick={() => handlePosition(71)}>{String(gamefields[71].number)}</text>}
                {gamefields[72].number>0&&<text fill={colors[72]} x={matrix[72][0]+0.3} y={matrix[72][1]+0.8} fontSize="0.7" onClick={() => handlePosition(72)}>{String(gamefields[72].number)}</text>}
                {gamefields[73].number>0&&<text fill={colors[73]} x={matrix[73][0]+0.3} y={matrix[73][1]+0.8} fontSize="0.7" onClick={() => handlePosition(73)}>{String(gamefields[73].number)}</text>}
                {gamefields[74].number>0&&<text fill={colors[74]} x={matrix[74][0]+0.3} y={matrix[74][1]+0.8} fontSize="0.7" onClick={() => handlePosition(74)}>{String(gamefields[74].number)}</text>}
                {gamefields[75].number>0&&<text fill={colors[75]} x={matrix[75][0]+0.3} y={matrix[75][1]+0.8} fontSize="0.7" onClick={() => handlePosition(75)}>{String(gamefields[75].number)}</text>}
                {gamefields[76].number>0&&<text fill={colors[76]} x={matrix[76][0]+0.3} y={matrix[76][1]+0.8} fontSize="0.7" onClick={() => handlePosition(76)}>{String(gamefields[76].number)}</text>}
                {gamefields[77].number>0&&<text fill={colors[77]} x={matrix[77][0]+0.3} y={matrix[77][1]+0.8} fontSize="0.7" onClick={() => handlePosition(77)}>{String(gamefields[77].number)}</text>}
                {gamefields[78].number>0&&<text fill={colors[78]} x={matrix[78][0]+0.3} y={matrix[78][1]+0.8} fontSize="0.7" onClick={() => handlePosition(78)}>{String(gamefields[78].number)}</text>}
                {gamefields[79].number>0&&<text fill={colors[79]} x={matrix[79][0]+0.3} y={matrix[79][1]+0.8} fontSize="0.7" onClick={() => handlePosition(79)}>{String(gamefields[79].number)}</text>}
                {gamefields[80].number>0&&<text fill={colors[80]} x={matrix[80][0]+0.3} y={matrix[80][1]+0.8} fontSize="0.7" onClick={() => handlePosition(80)}>{String(gamefields[80].number)}</text>}

                {flags[Flagtype.CANDIDATES]&&candidates[0]&&<text fill='red' x={candidatematrix[0][0]} y={candidatematrix[0][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[1]&&<text fill='red' x={candidatematrix[1][0]} y={candidatematrix[1][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[2]&&<text fill='red' x={candidatematrix[2][0]} y={candidatematrix[2][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[3]&&<text fill='red' x={candidatematrix[3][0]} y={candidatematrix[3][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[4]&&<text fill='red' x={candidatematrix[4][0]} y={candidatematrix[4][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[5]&&<text fill='red' x={candidatematrix[5][0]} y={candidatematrix[5][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[6]&&<text fill='red' x={candidatematrix[6][0]} y={candidatematrix[6][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[7]&&<text fill='red' x={candidatematrix[7][0]} y={candidatematrix[7][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[8]&&<text fill='red' x={candidatematrix[8][0]} y={candidatematrix[8][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[9]&&<text fill='red' x={candidatematrix[9][0]} y={candidatematrix[9][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[10]&&<text fill='red' x={candidatematrix[10][0]} y={candidatematrix[10][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[11]&&<text fill='red' x={candidatematrix[11][0]} y={candidatematrix[11][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[12]&&<text fill='red' x={candidatematrix[12][0]} y={candidatematrix[12][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[13]&&<text fill='red' x={candidatematrix[13][0]} y={candidatematrix[13][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[14]&&<text fill='red' x={candidatematrix[14][0]} y={candidatematrix[14][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[15]&&<text fill='red' x={candidatematrix[15][0]} y={candidatematrix[15][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[16]&&<text fill='red' x={candidatematrix[16][0]} y={candidatematrix[16][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[17]&&<text fill='red' x={candidatematrix[17][0]} y={candidatematrix[17][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[18]&&<text fill='red' x={candidatematrix[18][0]} y={candidatematrix[18][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[19]&&<text fill='red' x={candidatematrix[19][0]} y={candidatematrix[19][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[20]&&<text fill='red' x={candidatematrix[20][0]} y={candidatematrix[20][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[21]&&<text fill='red' x={candidatematrix[21][0]} y={candidatematrix[21][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[22]&&<text fill='red' x={candidatematrix[22][0]} y={candidatematrix[22][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[23]&&<text fill='red' x={candidatematrix[23][0]} y={candidatematrix[23][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[24]&&<text fill='red' x={candidatematrix[24][0]} y={candidatematrix[24][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[25]&&<text fill='red' x={candidatematrix[25][0]} y={candidatematrix[25][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[26]&&<text fill='red' x={candidatematrix[26][0]} y={candidatematrix[26][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[27]&&<text fill='red' x={candidatematrix[27][0]} y={candidatematrix[27][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[28]&&<text fill='red' x={candidatematrix[28][0]} y={candidatematrix[28][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[29]&&<text fill='red' x={candidatematrix[29][0]} y={candidatematrix[29][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[30]&&<text fill='red' x={candidatematrix[30][0]} y={candidatematrix[30][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[31]&&<text fill='red' x={candidatematrix[31][0]} y={candidatematrix[31][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[32]&&<text fill='red' x={candidatematrix[32][0]} y={candidatematrix[32][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[33]&&<text fill='red' x={candidatematrix[33][0]} y={candidatematrix[33][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[34]&&<text fill='red' x={candidatematrix[34][0]} y={candidatematrix[34][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[35]&&<text fill='red' x={candidatematrix[35][0]} y={candidatematrix[35][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[36]&&<text fill='red' x={candidatematrix[36][0]} y={candidatematrix[36][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[37]&&<text fill='red' x={candidatematrix[37][0]} y={candidatematrix[37][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[38]&&<text fill='red' x={candidatematrix[38][0]} y={candidatematrix[38][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[39]&&<text fill='red' x={candidatematrix[39][0]} y={candidatematrix[39][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[40]&&<text fill='red' x={candidatematrix[40][0]} y={candidatematrix[40][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[41]&&<text fill='red' x={candidatematrix[41][0]} y={candidatematrix[41][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[42]&&<text fill='red' x={candidatematrix[42][0]} y={candidatematrix[42][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[43]&&<text fill='red' x={candidatematrix[43][0]} y={candidatematrix[43][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[44]&&<text fill='red' x={candidatematrix[44][0]} y={candidatematrix[44][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[45]&&<text fill='red' x={candidatematrix[45][0]} y={candidatematrix[45][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[46]&&<text fill='red' x={candidatematrix[46][0]} y={candidatematrix[46][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[47]&&<text fill='red' x={candidatematrix[47][0]} y={candidatematrix[47][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[48]&&<text fill='red' x={candidatematrix[48][0]} y={candidatematrix[48][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[49]&&<text fill='red' x={candidatematrix[49][0]} y={candidatematrix[49][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[50]&&<text fill='red' x={candidatematrix[50][0]} y={candidatematrix[50][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[51]&&<text fill='red' x={candidatematrix[51][0]} y={candidatematrix[51][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[52]&&<text fill='red' x={candidatematrix[52][0]} y={candidatematrix[52][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[53]&&<text fill='red' x={candidatematrix[53][0]} y={candidatematrix[53][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[54]&&<text fill='red' x={candidatematrix[54][0]} y={candidatematrix[54][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[55]&&<text fill='red' x={candidatematrix[55][0]} y={candidatematrix[55][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[56]&&<text fill='red' x={candidatematrix[56][0]} y={candidatematrix[56][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[57]&&<text fill='red' x={candidatematrix[57][0]} y={candidatematrix[57][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[58]&&<text fill='red' x={candidatematrix[58][0]} y={candidatematrix[58][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[59]&&<text fill='red' x={candidatematrix[59][0]} y={candidatematrix[59][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[60]&&<text fill='red' x={candidatematrix[60][0]} y={candidatematrix[60][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[61]&&<text fill='red' x={candidatematrix[61][0]} y={candidatematrix[61][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[62]&&<text fill='red' x={candidatematrix[62][0]} y={candidatematrix[62][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[63]&&<text fill='red' x={candidatematrix[63][0]} y={candidatematrix[63][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[64]&&<text fill='red' x={candidatematrix[64][0]} y={candidatematrix[64][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[65]&&<text fill='red' x={candidatematrix[65][0]} y={candidatematrix[65][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[66]&&<text fill='red' x={candidatematrix[66][0]} y={candidatematrix[66][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[67]&&<text fill='red' x={candidatematrix[67][0]} y={candidatematrix[67][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[68]&&<text fill='red' x={candidatematrix[68][0]} y={candidatematrix[68][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[69]&&<text fill='red' x={candidatematrix[69][0]} y={candidatematrix[69][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[70]&&<text fill='red' x={candidatematrix[70][0]} y={candidatematrix[70][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[71]&&<text fill='red' x={candidatematrix[71][0]} y={candidatematrix[71][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[72]&&<text fill='red' x={candidatematrix[72][0]} y={candidatematrix[72][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[73]&&<text fill='red' x={candidatematrix[73][0]} y={candidatematrix[73][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[74]&&<text fill='red' x={candidatematrix[74][0]} y={candidatematrix[74][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[75]&&<text fill='red' x={candidatematrix[75][0]} y={candidatematrix[75][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[76]&&<text fill='red' x={candidatematrix[76][0]} y={candidatematrix[76][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[77]&&<text fill='red' x={candidatematrix[77][0]} y={candidatematrix[77][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[78]&&<text fill='red' x={candidatematrix[78][0]} y={candidatematrix[78][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[79]&&<text fill='red' x={candidatematrix[79][0]} y={candidatematrix[79][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[80]&&<text fill='red' x={candidatematrix[80][0]} y={candidatematrix[80][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[81]&&<text fill='red' x={candidatematrix[81][0]} y={candidatematrix[81][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[82]&&<text fill='red' x={candidatematrix[82][0]} y={candidatematrix[82][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[83]&&<text fill='red' x={candidatematrix[83][0]} y={candidatematrix[83][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[84]&&<text fill='red' x={candidatematrix[84][0]} y={candidatematrix[84][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[85]&&<text fill='red' x={candidatematrix[85][0]} y={candidatematrix[85][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[86]&&<text fill='red' x={candidatematrix[86][0]} y={candidatematrix[86][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[87]&&<text fill='red' x={candidatematrix[87][0]} y={candidatematrix[87][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[88]&&<text fill='red' x={candidatematrix[88][0]} y={candidatematrix[88][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[89]&&<text fill='red' x={candidatematrix[89][0]} y={candidatematrix[89][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[90]&&<text fill='red' x={candidatematrix[90][0]} y={candidatematrix[90][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[91]&&<text fill='red' x={candidatematrix[91][0]} y={candidatematrix[91][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[92]&&<text fill='red' x={candidatematrix[92][0]} y={candidatematrix[92][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[93]&&<text fill='red' x={candidatematrix[93][0]} y={candidatematrix[93][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[94]&&<text fill='red' x={candidatematrix[94][0]} y={candidatematrix[94][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[95]&&<text fill='red' x={candidatematrix[95][0]} y={candidatematrix[95][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[96]&&<text fill='red' x={candidatematrix[96][0]} y={candidatematrix[96][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[97]&&<text fill='red' x={candidatematrix[97][0]} y={candidatematrix[97][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[98]&&<text fill='red' x={candidatematrix[98][0]} y={candidatematrix[98][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[99]&&<text fill='red' x={candidatematrix[99][0]} y={candidatematrix[99][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[100]&&<text fill='red' x={candidatematrix[100][0]} y={candidatematrix[100][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[101]&&<text fill='red' x={candidatematrix[101][0]} y={candidatematrix[101][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[102]&&<text fill='red' x={candidatematrix[102][0]} y={candidatematrix[102][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[103]&&<text fill='red' x={candidatematrix[103][0]} y={candidatematrix[103][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[104]&&<text fill='red' x={candidatematrix[104][0]} y={candidatematrix[104][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[105]&&<text fill='red' x={candidatematrix[105][0]} y={candidatematrix[105][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[106]&&<text fill='red' x={candidatematrix[106][0]} y={candidatematrix[106][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[107]&&<text fill='red' x={candidatematrix[107][0]} y={candidatematrix[107][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[108]&&<text fill='red' x={candidatematrix[108][0]} y={candidatematrix[108][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[109]&&<text fill='red' x={candidatematrix[109][0]} y={candidatematrix[109][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[110]&&<text fill='red' x={candidatematrix[110][0]} y={candidatematrix[110][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[111]&&<text fill='red' x={candidatematrix[111][0]} y={candidatematrix[111][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[112]&&<text fill='red' x={candidatematrix[112][0]} y={candidatematrix[112][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[113]&&<text fill='red' x={candidatematrix[113][0]} y={candidatematrix[113][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[114]&&<text fill='red' x={candidatematrix[114][0]} y={candidatematrix[114][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[115]&&<text fill='red' x={candidatematrix[115][0]} y={candidatematrix[115][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[116]&&<text fill='red' x={candidatematrix[116][0]} y={candidatematrix[116][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[117]&&<text fill='red' x={candidatematrix[117][0]} y={candidatematrix[117][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[118]&&<text fill='red' x={candidatematrix[118][0]} y={candidatematrix[118][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[119]&&<text fill='red' x={candidatematrix[119][0]} y={candidatematrix[119][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[120]&&<text fill='red' x={candidatematrix[120][0]} y={candidatematrix[120][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[121]&&<text fill='red' x={candidatematrix[121][0]} y={candidatematrix[121][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[122]&&<text fill='red' x={candidatematrix[122][0]} y={candidatematrix[122][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[123]&&<text fill='red' x={candidatematrix[123][0]} y={candidatematrix[123][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[124]&&<text fill='red' x={candidatematrix[124][0]} y={candidatematrix[124][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[125]&&<text fill='red' x={candidatematrix[125][0]} y={candidatematrix[125][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[126]&&<text fill='red' x={candidatematrix[126][0]} y={candidatematrix[126][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[127]&&<text fill='red' x={candidatematrix[127][0]} y={candidatematrix[127][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[128]&&<text fill='red' x={candidatematrix[128][0]} y={candidatematrix[128][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[129]&&<text fill='red' x={candidatematrix[129][0]} y={candidatematrix[129][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[130]&&<text fill='red' x={candidatematrix[130][0]} y={candidatematrix[130][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[131]&&<text fill='red' x={candidatematrix[131][0]} y={candidatematrix[131][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[132]&&<text fill='red' x={candidatematrix[132][0]} y={candidatematrix[132][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[133]&&<text fill='red' x={candidatematrix[133][0]} y={candidatematrix[133][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[134]&&<text fill='red' x={candidatematrix[134][0]} y={candidatematrix[134][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[135]&&<text fill='red' x={candidatematrix[135][0]} y={candidatematrix[135][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[136]&&<text fill='red' x={candidatematrix[136][0]} y={candidatematrix[136][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[137]&&<text fill='red' x={candidatematrix[137][0]} y={candidatematrix[137][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[138]&&<text fill='red' x={candidatematrix[138][0]} y={candidatematrix[138][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[139]&&<text fill='red' x={candidatematrix[139][0]} y={candidatematrix[139][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[140]&&<text fill='red' x={candidatematrix[140][0]} y={candidatematrix[140][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[141]&&<text fill='red' x={candidatematrix[141][0]} y={candidatematrix[141][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[142]&&<text fill='red' x={candidatematrix[142][0]} y={candidatematrix[142][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[143]&&<text fill='red' x={candidatematrix[143][0]} y={candidatematrix[143][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[144]&&<text fill='red' x={candidatematrix[144][0]} y={candidatematrix[144][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[145]&&<text fill='red' x={candidatematrix[145][0]} y={candidatematrix[145][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[146]&&<text fill='red' x={candidatematrix[146][0]} y={candidatematrix[146][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[147]&&<text fill='red' x={candidatematrix[147][0]} y={candidatematrix[147][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[148]&&<text fill='red' x={candidatematrix[148][0]} y={candidatematrix[148][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[149]&&<text fill='red' x={candidatematrix[149][0]} y={candidatematrix[149][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[150]&&<text fill='red' x={candidatematrix[150][0]} y={candidatematrix[150][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[151]&&<text fill='red' x={candidatematrix[151][0]} y={candidatematrix[151][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[152]&&<text fill='red' x={candidatematrix[152][0]} y={candidatematrix[152][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[153]&&<text fill='red' x={candidatematrix[153][0]} y={candidatematrix[153][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[154]&&<text fill='red' x={candidatematrix[154][0]} y={candidatematrix[154][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[155]&&<text fill='red' x={candidatematrix[155][0]} y={candidatematrix[155][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[156]&&<text fill='red' x={candidatematrix[156][0]} y={candidatematrix[156][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[157]&&<text fill='red' x={candidatematrix[157][0]} y={candidatematrix[157][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[158]&&<text fill='red' x={candidatematrix[158][0]} y={candidatematrix[158][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[159]&&<text fill='red' x={candidatematrix[159][0]} y={candidatematrix[159][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[160]&&<text fill='red' x={candidatematrix[160][0]} y={candidatematrix[160][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[161]&&<text fill='red' x={candidatematrix[161][0]} y={candidatematrix[161][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[162]&&<text fill='red' x={candidatematrix[162][0]} y={candidatematrix[162][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[163]&&<text fill='red' x={candidatematrix[163][0]} y={candidatematrix[163][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[164]&&<text fill='red' x={candidatematrix[164][0]} y={candidatematrix[164][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[165]&&<text fill='red' x={candidatematrix[165][0]} y={candidatematrix[165][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[166]&&<text fill='red' x={candidatematrix[166][0]} y={candidatematrix[166][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[167]&&<text fill='red' x={candidatematrix[167][0]} y={candidatematrix[167][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[168]&&<text fill='red' x={candidatematrix[168][0]} y={candidatematrix[168][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[169]&&<text fill='red' x={candidatematrix[169][0]} y={candidatematrix[169][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[170]&&<text fill='red' x={candidatematrix[170][0]} y={candidatematrix[170][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[171]&&<text fill='red' x={candidatematrix[171][0]} y={candidatematrix[171][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[172]&&<text fill='red' x={candidatematrix[172][0]} y={candidatematrix[172][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[173]&&<text fill='red' x={candidatematrix[173][0]} y={candidatematrix[173][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[174]&&<text fill='red' x={candidatematrix[174][0]} y={candidatematrix[174][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[175]&&<text fill='red' x={candidatematrix[175][0]} y={candidatematrix[175][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[176]&&<text fill='red' x={candidatematrix[176][0]} y={candidatematrix[176][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[177]&&<text fill='red' x={candidatematrix[177][0]} y={candidatematrix[177][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[178]&&<text fill='red' x={candidatematrix[178][0]} y={candidatematrix[178][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[179]&&<text fill='red' x={candidatematrix[179][0]} y={candidatematrix[179][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[180]&&<text fill='red' x={candidatematrix[180][0]} y={candidatematrix[180][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[181]&&<text fill='red' x={candidatematrix[181][0]} y={candidatematrix[181][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[182]&&<text fill='red' x={candidatematrix[182][0]} y={candidatematrix[182][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[183]&&<text fill='red' x={candidatematrix[183][0]} y={candidatematrix[183][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[184]&&<text fill='red' x={candidatematrix[184][0]} y={candidatematrix[184][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[185]&&<text fill='red' x={candidatematrix[185][0]} y={candidatematrix[185][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[186]&&<text fill='red' x={candidatematrix[186][0]} y={candidatematrix[186][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[187]&&<text fill='red' x={candidatematrix[187][0]} y={candidatematrix[187][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[188]&&<text fill='red' x={candidatematrix[188][0]} y={candidatematrix[188][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[189]&&<text fill='red' x={candidatematrix[189][0]} y={candidatematrix[189][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[190]&&<text fill='red' x={candidatematrix[190][0]} y={candidatematrix[190][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[191]&&<text fill='red' x={candidatematrix[191][0]} y={candidatematrix[191][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[192]&&<text fill='red' x={candidatematrix[192][0]} y={candidatematrix[192][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[193]&&<text fill='red' x={candidatematrix[193][0]} y={candidatematrix[193][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[194]&&<text fill='red' x={candidatematrix[194][0]} y={candidatematrix[194][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[195]&&<text fill='red' x={candidatematrix[195][0]} y={candidatematrix[195][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[196]&&<text fill='red' x={candidatematrix[196][0]} y={candidatematrix[196][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[197]&&<text fill='red' x={candidatematrix[197][0]} y={candidatematrix[197][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[198]&&<text fill='red' x={candidatematrix[198][0]} y={candidatematrix[198][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[199]&&<text fill='red' x={candidatematrix[199][0]} y={candidatematrix[199][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[200]&&<text fill='red' x={candidatematrix[200][0]} y={candidatematrix[200][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[201]&&<text fill='red' x={candidatematrix[201][0]} y={candidatematrix[201][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[202]&&<text fill='red' x={candidatematrix[202][0]} y={candidatematrix[202][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[203]&&<text fill='red' x={candidatematrix[203][0]} y={candidatematrix[203][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[204]&&<text fill='red' x={candidatematrix[204][0]} y={candidatematrix[204][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[205]&&<text fill='red' x={candidatematrix[205][0]} y={candidatematrix[205][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[206]&&<text fill='red' x={candidatematrix[206][0]} y={candidatematrix[206][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[207]&&<text fill='red' x={candidatematrix[207][0]} y={candidatematrix[207][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[208]&&<text fill='red' x={candidatematrix[208][0]} y={candidatematrix[208][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[209]&&<text fill='red' x={candidatematrix[209][0]} y={candidatematrix[209][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[210]&&<text fill='red' x={candidatematrix[210][0]} y={candidatematrix[210][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[211]&&<text fill='red' x={candidatematrix[211][0]} y={candidatematrix[211][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[212]&&<text fill='red' x={candidatematrix[212][0]} y={candidatematrix[212][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[213]&&<text fill='red' x={candidatematrix[213][0]} y={candidatematrix[213][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[214]&&<text fill='red' x={candidatematrix[214][0]} y={candidatematrix[214][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[215]&&<text fill='red' x={candidatematrix[215][0]} y={candidatematrix[215][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[216]&&<text fill='red' x={candidatematrix[216][0]} y={candidatematrix[216][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[217]&&<text fill='red' x={candidatematrix[217][0]} y={candidatematrix[217][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[218]&&<text fill='red' x={candidatematrix[218][0]} y={candidatematrix[218][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[219]&&<text fill='red' x={candidatematrix[219][0]} y={candidatematrix[219][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[220]&&<text fill='red' x={candidatematrix[220][0]} y={candidatematrix[220][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[221]&&<text fill='red' x={candidatematrix[221][0]} y={candidatematrix[221][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[222]&&<text fill='red' x={candidatematrix[222][0]} y={candidatematrix[222][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[223]&&<text fill='red' x={candidatematrix[223][0]} y={candidatematrix[223][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[224]&&<text fill='red' x={candidatematrix[224][0]} y={candidatematrix[224][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[225]&&<text fill='red' x={candidatematrix[225][0]} y={candidatematrix[225][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[226]&&<text fill='red' x={candidatematrix[226][0]} y={candidatematrix[226][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[227]&&<text fill='red' x={candidatematrix[227][0]} y={candidatematrix[227][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[228]&&<text fill='red' x={candidatematrix[228][0]} y={candidatematrix[228][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[229]&&<text fill='red' x={candidatematrix[229][0]} y={candidatematrix[229][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[230]&&<text fill='red' x={candidatematrix[230][0]} y={candidatematrix[230][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[231]&&<text fill='red' x={candidatematrix[231][0]} y={candidatematrix[231][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[232]&&<text fill='red' x={candidatematrix[232][0]} y={candidatematrix[232][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[233]&&<text fill='red' x={candidatematrix[233][0]} y={candidatematrix[233][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[234]&&<text fill='red' x={candidatematrix[234][0]} y={candidatematrix[234][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[235]&&<text fill='red' x={candidatematrix[235][0]} y={candidatematrix[235][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[236]&&<text fill='red' x={candidatematrix[236][0]} y={candidatematrix[236][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[237]&&<text fill='red' x={candidatematrix[237][0]} y={candidatematrix[237][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[238]&&<text fill='red' x={candidatematrix[238][0]} y={candidatematrix[238][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[239]&&<text fill='red' x={candidatematrix[239][0]} y={candidatematrix[239][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[240]&&<text fill='red' x={candidatematrix[240][0]} y={candidatematrix[240][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[241]&&<text fill='red' x={candidatematrix[241][0]} y={candidatematrix[241][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[242]&&<text fill='red' x={candidatematrix[242][0]} y={candidatematrix[242][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[243]&&<text fill='red' x={candidatematrix[243][0]} y={candidatematrix[243][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[244]&&<text fill='red' x={candidatematrix[244][0]} y={candidatematrix[244][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[245]&&<text fill='red' x={candidatematrix[245][0]} y={candidatematrix[245][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[246]&&<text fill='red' x={candidatematrix[246][0]} y={candidatematrix[246][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[247]&&<text fill='red' x={candidatematrix[247][0]} y={candidatematrix[247][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[248]&&<text fill='red' x={candidatematrix[248][0]} y={candidatematrix[248][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[249]&&<text fill='red' x={candidatematrix[249][0]} y={candidatematrix[249][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[250]&&<text fill='red' x={candidatematrix[250][0]} y={candidatematrix[250][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[251]&&<text fill='red' x={candidatematrix[251][0]} y={candidatematrix[251][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[252]&&<text fill='red' x={candidatematrix[252][0]} y={candidatematrix[252][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[253]&&<text fill='red' x={candidatematrix[253][0]} y={candidatematrix[253][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[254]&&<text fill='red' x={candidatematrix[254][0]} y={candidatematrix[254][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[255]&&<text fill='red' x={candidatematrix[255][0]} y={candidatematrix[255][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[256]&&<text fill='red' x={candidatematrix[256][0]} y={candidatematrix[256][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[257]&&<text fill='red' x={candidatematrix[257][0]} y={candidatematrix[257][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[258]&&<text fill='red' x={candidatematrix[258][0]} y={candidatematrix[258][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[259]&&<text fill='red' x={candidatematrix[259][0]} y={candidatematrix[259][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[260]&&<text fill='red' x={candidatematrix[260][0]} y={candidatematrix[260][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[261]&&<text fill='red' x={candidatematrix[261][0]} y={candidatematrix[261][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[262]&&<text fill='red' x={candidatematrix[262][0]} y={candidatematrix[262][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[263]&&<text fill='red' x={candidatematrix[263][0]} y={candidatematrix[263][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[264]&&<text fill='red' x={candidatematrix[264][0]} y={candidatematrix[264][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[265]&&<text fill='red' x={candidatematrix[265][0]} y={candidatematrix[265][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[266]&&<text fill='red' x={candidatematrix[266][0]} y={candidatematrix[266][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[267]&&<text fill='red' x={candidatematrix[267][0]} y={candidatematrix[267][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[268]&&<text fill='red' x={candidatematrix[268][0]} y={candidatematrix[268][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[269]&&<text fill='red' x={candidatematrix[269][0]} y={candidatematrix[269][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[270]&&<text fill='red' x={candidatematrix[270][0]} y={candidatematrix[270][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[271]&&<text fill='red' x={candidatematrix[271][0]} y={candidatematrix[271][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[272]&&<text fill='red' x={candidatematrix[272][0]} y={candidatematrix[272][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[273]&&<text fill='red' x={candidatematrix[273][0]} y={candidatematrix[273][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[274]&&<text fill='red' x={candidatematrix[274][0]} y={candidatematrix[274][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[275]&&<text fill='red' x={candidatematrix[275][0]} y={candidatematrix[275][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[276]&&<text fill='red' x={candidatematrix[276][0]} y={candidatematrix[276][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[277]&&<text fill='red' x={candidatematrix[277][0]} y={candidatematrix[277][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[278]&&<text fill='red' x={candidatematrix[278][0]} y={candidatematrix[278][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[279]&&<text fill='red' x={candidatematrix[279][0]} y={candidatematrix[279][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[280]&&<text fill='red' x={candidatematrix[280][0]} y={candidatematrix[280][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[281]&&<text fill='red' x={candidatematrix[281][0]} y={candidatematrix[281][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[282]&&<text fill='red' x={candidatematrix[282][0]} y={candidatematrix[282][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[283]&&<text fill='red' x={candidatematrix[283][0]} y={candidatematrix[283][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[284]&&<text fill='red' x={candidatematrix[284][0]} y={candidatematrix[284][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[285]&&<text fill='red' x={candidatematrix[285][0]} y={candidatematrix[285][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[286]&&<text fill='red' x={candidatematrix[286][0]} y={candidatematrix[286][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[287]&&<text fill='red' x={candidatematrix[287][0]} y={candidatematrix[287][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[288]&&<text fill='red' x={candidatematrix[288][0]} y={candidatematrix[288][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[289]&&<text fill='red' x={candidatematrix[289][0]} y={candidatematrix[289][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[290]&&<text fill='red' x={candidatematrix[290][0]} y={candidatematrix[290][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[291]&&<text fill='red' x={candidatematrix[291][0]} y={candidatematrix[291][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[292]&&<text fill='red' x={candidatematrix[292][0]} y={candidatematrix[292][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[293]&&<text fill='red' x={candidatematrix[293][0]} y={candidatematrix[293][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[294]&&<text fill='red' x={candidatematrix[294][0]} y={candidatematrix[294][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[295]&&<text fill='red' x={candidatematrix[295][0]} y={candidatematrix[295][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[296]&&<text fill='red' x={candidatematrix[296][0]} y={candidatematrix[296][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[297]&&<text fill='red' x={candidatematrix[297][0]} y={candidatematrix[297][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[298]&&<text fill='red' x={candidatematrix[298][0]} y={candidatematrix[298][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[299]&&<text fill='red' x={candidatematrix[299][0]} y={candidatematrix[299][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[300]&&<text fill='red' x={candidatematrix[300][0]} y={candidatematrix[300][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[301]&&<text fill='red' x={candidatematrix[301][0]} y={candidatematrix[301][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[302]&&<text fill='red' x={candidatematrix[302][0]} y={candidatematrix[302][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[303]&&<text fill='red' x={candidatematrix[303][0]} y={candidatematrix[303][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[304]&&<text fill='red' x={candidatematrix[304][0]} y={candidatematrix[304][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[305]&&<text fill='red' x={candidatematrix[305][0]} y={candidatematrix[305][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[306]&&<text fill='red' x={candidatematrix[306][0]} y={candidatematrix[306][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[307]&&<text fill='red' x={candidatematrix[307][0]} y={candidatematrix[307][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[308]&&<text fill='red' x={candidatematrix[308][0]} y={candidatematrix[308][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[309]&&<text fill='red' x={candidatematrix[309][0]} y={candidatematrix[309][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[310]&&<text fill='red' x={candidatematrix[310][0]} y={candidatematrix[310][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[311]&&<text fill='red' x={candidatematrix[311][0]} y={candidatematrix[311][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[312]&&<text fill='red' x={candidatematrix[312][0]} y={candidatematrix[312][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[313]&&<text fill='red' x={candidatematrix[313][0]} y={candidatematrix[313][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[314]&&<text fill='red' x={candidatematrix[314][0]} y={candidatematrix[314][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[315]&&<text fill='red' x={candidatematrix[315][0]} y={candidatematrix[315][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[316]&&<text fill='red' x={candidatematrix[316][0]} y={candidatematrix[316][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[317]&&<text fill='red' x={candidatematrix[317][0]} y={candidatematrix[317][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[318]&&<text fill='red' x={candidatematrix[318][0]} y={candidatematrix[318][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[319]&&<text fill='red' x={candidatematrix[319][0]} y={candidatematrix[319][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[320]&&<text fill='red' x={candidatematrix[320][0]} y={candidatematrix[320][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[321]&&<text fill='red' x={candidatematrix[321][0]} y={candidatematrix[321][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[322]&&<text fill='red' x={candidatematrix[322][0]} y={candidatematrix[322][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[323]&&<text fill='red' x={candidatematrix[323][0]} y={candidatematrix[323][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[324]&&<text fill='red' x={candidatematrix[324][0]} y={candidatematrix[324][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[325]&&<text fill='red' x={candidatematrix[325][0]} y={candidatematrix[325][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[326]&&<text fill='red' x={candidatematrix[326][0]} y={candidatematrix[326][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[327]&&<text fill='red' x={candidatematrix[327][0]} y={candidatematrix[327][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[328]&&<text fill='red' x={candidatematrix[328][0]} y={candidatematrix[328][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[329]&&<text fill='red' x={candidatematrix[329][0]} y={candidatematrix[329][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[330]&&<text fill='red' x={candidatematrix[330][0]} y={candidatematrix[330][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[331]&&<text fill='red' x={candidatematrix[331][0]} y={candidatematrix[331][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[332]&&<text fill='red' x={candidatematrix[332][0]} y={candidatematrix[332][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[333]&&<text fill='red' x={candidatematrix[333][0]} y={candidatematrix[333][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[334]&&<text fill='red' x={candidatematrix[334][0]} y={candidatematrix[334][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[335]&&<text fill='red' x={candidatematrix[335][0]} y={candidatematrix[335][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[336]&&<text fill='red' x={candidatematrix[336][0]} y={candidatematrix[336][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[337]&&<text fill='red' x={candidatematrix[337][0]} y={candidatematrix[337][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[338]&&<text fill='red' x={candidatematrix[338][0]} y={candidatematrix[338][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[339]&&<text fill='red' x={candidatematrix[339][0]} y={candidatematrix[339][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[340]&&<text fill='red' x={candidatematrix[340][0]} y={candidatematrix[340][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[341]&&<text fill='red' x={candidatematrix[341][0]} y={candidatematrix[341][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[342]&&<text fill='red' x={candidatematrix[342][0]} y={candidatematrix[342][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[343]&&<text fill='red' x={candidatematrix[343][0]} y={candidatematrix[343][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[344]&&<text fill='red' x={candidatematrix[344][0]} y={candidatematrix[344][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[345]&&<text fill='red' x={candidatematrix[345][0]} y={candidatematrix[345][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[346]&&<text fill='red' x={candidatematrix[346][0]} y={candidatematrix[346][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[347]&&<text fill='red' x={candidatematrix[347][0]} y={candidatematrix[347][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[348]&&<text fill='red' x={candidatematrix[348][0]} y={candidatematrix[348][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[349]&&<text fill='red' x={candidatematrix[349][0]} y={candidatematrix[349][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[350]&&<text fill='red' x={candidatematrix[350][0]} y={candidatematrix[350][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[351]&&<text fill='red' x={candidatematrix[351][0]} y={candidatematrix[351][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[352]&&<text fill='red' x={candidatematrix[352][0]} y={candidatematrix[352][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[353]&&<text fill='red' x={candidatematrix[353][0]} y={candidatematrix[353][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[354]&&<text fill='red' x={candidatematrix[354][0]} y={candidatematrix[354][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[355]&&<text fill='red' x={candidatematrix[355][0]} y={candidatematrix[355][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[356]&&<text fill='red' x={candidatematrix[356][0]} y={candidatematrix[356][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[357]&&<text fill='red' x={candidatematrix[357][0]} y={candidatematrix[357][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[358]&&<text fill='red' x={candidatematrix[358][0]} y={candidatematrix[358][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[359]&&<text fill='red' x={candidatematrix[359][0]} y={candidatematrix[359][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[360]&&<text fill='red' x={candidatematrix[360][0]} y={candidatematrix[360][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[361]&&<text fill='red' x={candidatematrix[361][0]} y={candidatematrix[361][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[362]&&<text fill='red' x={candidatematrix[362][0]} y={candidatematrix[362][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[363]&&<text fill='red' x={candidatematrix[363][0]} y={candidatematrix[363][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[364]&&<text fill='red' x={candidatematrix[364][0]} y={candidatematrix[364][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[365]&&<text fill='red' x={candidatematrix[365][0]} y={candidatematrix[365][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[366]&&<text fill='red' x={candidatematrix[366][0]} y={candidatematrix[366][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[367]&&<text fill='red' x={candidatematrix[367][0]} y={candidatematrix[367][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[368]&&<text fill='red' x={candidatematrix[368][0]} y={candidatematrix[368][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[369]&&<text fill='red' x={candidatematrix[369][0]} y={candidatematrix[369][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[370]&&<text fill='red' x={candidatematrix[370][0]} y={candidatematrix[370][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[371]&&<text fill='red' x={candidatematrix[371][0]} y={candidatematrix[371][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[372]&&<text fill='red' x={candidatematrix[372][0]} y={candidatematrix[372][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[373]&&<text fill='red' x={candidatematrix[373][0]} y={candidatematrix[373][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[374]&&<text fill='red' x={candidatematrix[374][0]} y={candidatematrix[374][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[375]&&<text fill='red' x={candidatematrix[375][0]} y={candidatematrix[375][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[376]&&<text fill='red' x={candidatematrix[376][0]} y={candidatematrix[376][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[377]&&<text fill='red' x={candidatematrix[377][0]} y={candidatematrix[377][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[378]&&<text fill='red' x={candidatematrix[378][0]} y={candidatematrix[378][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[379]&&<text fill='red' x={candidatematrix[379][0]} y={candidatematrix[379][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[380]&&<text fill='red' x={candidatematrix[380][0]} y={candidatematrix[380][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[381]&&<text fill='red' x={candidatematrix[381][0]} y={candidatematrix[381][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[382]&&<text fill='red' x={candidatematrix[382][0]} y={candidatematrix[382][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[383]&&<text fill='red' x={candidatematrix[383][0]} y={candidatematrix[383][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[384]&&<text fill='red' x={candidatematrix[384][0]} y={candidatematrix[384][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[385]&&<text fill='red' x={candidatematrix[385][0]} y={candidatematrix[385][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[386]&&<text fill='red' x={candidatematrix[386][0]} y={candidatematrix[386][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[387]&&<text fill='red' x={candidatematrix[387][0]} y={candidatematrix[387][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[388]&&<text fill='red' x={candidatematrix[388][0]} y={candidatematrix[388][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[389]&&<text fill='red' x={candidatematrix[389][0]} y={candidatematrix[389][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[390]&&<text fill='red' x={candidatematrix[390][0]} y={candidatematrix[390][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[391]&&<text fill='red' x={candidatematrix[391][0]} y={candidatematrix[391][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[392]&&<text fill='red' x={candidatematrix[392][0]} y={candidatematrix[392][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[393]&&<text fill='red' x={candidatematrix[393][0]} y={candidatematrix[393][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[394]&&<text fill='red' x={candidatematrix[394][0]} y={candidatematrix[394][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[395]&&<text fill='red' x={candidatematrix[395][0]} y={candidatematrix[395][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[396]&&<text fill='red' x={candidatematrix[396][0]} y={candidatematrix[396][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[397]&&<text fill='red' x={candidatematrix[397][0]} y={candidatematrix[397][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[398]&&<text fill='red' x={candidatematrix[398][0]} y={candidatematrix[398][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[399]&&<text fill='red' x={candidatematrix[399][0]} y={candidatematrix[399][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[400]&&<text fill='red' x={candidatematrix[400][0]} y={candidatematrix[400][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[401]&&<text fill='red' x={candidatematrix[401][0]} y={candidatematrix[401][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[402]&&<text fill='red' x={candidatematrix[402][0]} y={candidatematrix[402][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[403]&&<text fill='red' x={candidatematrix[403][0]} y={candidatematrix[403][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[404]&&<text fill='red' x={candidatematrix[404][0]} y={candidatematrix[404][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[405]&&<text fill='red' x={candidatematrix[405][0]} y={candidatematrix[405][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[406]&&<text fill='red' x={candidatematrix[406][0]} y={candidatematrix[406][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[407]&&<text fill='red' x={candidatematrix[407][0]} y={candidatematrix[407][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[408]&&<text fill='red' x={candidatematrix[408][0]} y={candidatematrix[408][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[409]&&<text fill='red' x={candidatematrix[409][0]} y={candidatematrix[409][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[410]&&<text fill='red' x={candidatematrix[410][0]} y={candidatematrix[410][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[411]&&<text fill='red' x={candidatematrix[411][0]} y={candidatematrix[411][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[412]&&<text fill='red' x={candidatematrix[412][0]} y={candidatematrix[412][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[413]&&<text fill='red' x={candidatematrix[413][0]} y={candidatematrix[413][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[414]&&<text fill='red' x={candidatematrix[414][0]} y={candidatematrix[414][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[415]&&<text fill='red' x={candidatematrix[415][0]} y={candidatematrix[415][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[416]&&<text fill='red' x={candidatematrix[416][0]} y={candidatematrix[416][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[417]&&<text fill='red' x={candidatematrix[417][0]} y={candidatematrix[417][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[418]&&<text fill='red' x={candidatematrix[418][0]} y={candidatematrix[418][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[419]&&<text fill='red' x={candidatematrix[419][0]} y={candidatematrix[419][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[420]&&<text fill='red' x={candidatematrix[420][0]} y={candidatematrix[420][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[421]&&<text fill='red' x={candidatematrix[421][0]} y={candidatematrix[421][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[422]&&<text fill='red' x={candidatematrix[422][0]} y={candidatematrix[422][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[423]&&<text fill='red' x={candidatematrix[423][0]} y={candidatematrix[423][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[424]&&<text fill='red' x={candidatematrix[424][0]} y={candidatematrix[424][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[425]&&<text fill='red' x={candidatematrix[425][0]} y={candidatematrix[425][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[426]&&<text fill='red' x={candidatematrix[426][0]} y={candidatematrix[426][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[427]&&<text fill='red' x={candidatematrix[427][0]} y={candidatematrix[427][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[428]&&<text fill='red' x={candidatematrix[428][0]} y={candidatematrix[428][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[429]&&<text fill='red' x={candidatematrix[429][0]} y={candidatematrix[429][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[430]&&<text fill='red' x={candidatematrix[430][0]} y={candidatematrix[430][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[431]&&<text fill='red' x={candidatematrix[431][0]} y={candidatematrix[431][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[432]&&<text fill='red' x={candidatematrix[432][0]} y={candidatematrix[432][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[433]&&<text fill='red' x={candidatematrix[433][0]} y={candidatematrix[433][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[434]&&<text fill='red' x={candidatematrix[434][0]} y={candidatematrix[434][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[435]&&<text fill='red' x={candidatematrix[435][0]} y={candidatematrix[435][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[436]&&<text fill='red' x={candidatematrix[436][0]} y={candidatematrix[436][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[437]&&<text fill='red' x={candidatematrix[437][0]} y={candidatematrix[437][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[438]&&<text fill='red' x={candidatematrix[438][0]} y={candidatematrix[438][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[439]&&<text fill='red' x={candidatematrix[439][0]} y={candidatematrix[439][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[440]&&<text fill='red' x={candidatematrix[440][0]} y={candidatematrix[440][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[441]&&<text fill='red' x={candidatematrix[441][0]} y={candidatematrix[441][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[442]&&<text fill='red' x={candidatematrix[442][0]} y={candidatematrix[442][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[443]&&<text fill='red' x={candidatematrix[443][0]} y={candidatematrix[443][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[444]&&<text fill='red' x={candidatematrix[444][0]} y={candidatematrix[444][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[445]&&<text fill='red' x={candidatematrix[445][0]} y={candidatematrix[445][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[446]&&<text fill='red' x={candidatematrix[446][0]} y={candidatematrix[446][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[447]&&<text fill='red' x={candidatematrix[447][0]} y={candidatematrix[447][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[448]&&<text fill='red' x={candidatematrix[448][0]} y={candidatematrix[448][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[449]&&<text fill='red' x={candidatematrix[449][0]} y={candidatematrix[449][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[450]&&<text fill='red' x={candidatematrix[450][0]} y={candidatematrix[450][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[451]&&<text fill='red' x={candidatematrix[451][0]} y={candidatematrix[451][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[452]&&<text fill='red' x={candidatematrix[452][0]} y={candidatematrix[452][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[453]&&<text fill='red' x={candidatematrix[453][0]} y={candidatematrix[453][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[454]&&<text fill='red' x={candidatematrix[454][0]} y={candidatematrix[454][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[455]&&<text fill='red' x={candidatematrix[455][0]} y={candidatematrix[455][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[456]&&<text fill='red' x={candidatematrix[456][0]} y={candidatematrix[456][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[457]&&<text fill='red' x={candidatematrix[457][0]} y={candidatematrix[457][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[458]&&<text fill='red' x={candidatematrix[458][0]} y={candidatematrix[458][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[459]&&<text fill='red' x={candidatematrix[459][0]} y={candidatematrix[459][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[460]&&<text fill='red' x={candidatematrix[460][0]} y={candidatematrix[460][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[461]&&<text fill='red' x={candidatematrix[461][0]} y={candidatematrix[461][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[462]&&<text fill='red' x={candidatematrix[462][0]} y={candidatematrix[462][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[463]&&<text fill='red' x={candidatematrix[463][0]} y={candidatematrix[463][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[464]&&<text fill='red' x={candidatematrix[464][0]} y={candidatematrix[464][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[465]&&<text fill='red' x={candidatematrix[465][0]} y={candidatematrix[465][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[466]&&<text fill='red' x={candidatematrix[466][0]} y={candidatematrix[466][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[467]&&<text fill='red' x={candidatematrix[467][0]} y={candidatematrix[467][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[468]&&<text fill='red' x={candidatematrix[468][0]} y={candidatematrix[468][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[469]&&<text fill='red' x={candidatematrix[469][0]} y={candidatematrix[469][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[470]&&<text fill='red' x={candidatematrix[470][0]} y={candidatematrix[470][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[471]&&<text fill='red' x={candidatematrix[471][0]} y={candidatematrix[471][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[472]&&<text fill='red' x={candidatematrix[472][0]} y={candidatematrix[472][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[473]&&<text fill='red' x={candidatematrix[473][0]} y={candidatematrix[473][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[474]&&<text fill='red' x={candidatematrix[474][0]} y={candidatematrix[474][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[475]&&<text fill='red' x={candidatematrix[475][0]} y={candidatematrix[475][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[476]&&<text fill='red' x={candidatematrix[476][0]} y={candidatematrix[476][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[477]&&<text fill='red' x={candidatematrix[477][0]} y={candidatematrix[477][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[478]&&<text fill='red' x={candidatematrix[478][0]} y={candidatematrix[478][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[479]&&<text fill='red' x={candidatematrix[479][0]} y={candidatematrix[479][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[480]&&<text fill='red' x={candidatematrix[480][0]} y={candidatematrix[480][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[481]&&<text fill='red' x={candidatematrix[481][0]} y={candidatematrix[481][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[482]&&<text fill='red' x={candidatematrix[482][0]} y={candidatematrix[482][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[483]&&<text fill='red' x={candidatematrix[483][0]} y={candidatematrix[483][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[484]&&<text fill='red' x={candidatematrix[484][0]} y={candidatematrix[484][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[485]&&<text fill='red' x={candidatematrix[485][0]} y={candidatematrix[485][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[486]&&<text fill='red' x={candidatematrix[486][0]} y={candidatematrix[486][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[487]&&<text fill='red' x={candidatematrix[487][0]} y={candidatematrix[487][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[488]&&<text fill='red' x={candidatematrix[488][0]} y={candidatematrix[488][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[489]&&<text fill='red' x={candidatematrix[489][0]} y={candidatematrix[489][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[490]&&<text fill='red' x={candidatematrix[490][0]} y={candidatematrix[490][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[491]&&<text fill='red' x={candidatematrix[491][0]} y={candidatematrix[491][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[492]&&<text fill='red' x={candidatematrix[492][0]} y={candidatematrix[492][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[493]&&<text fill='red' x={candidatematrix[493][0]} y={candidatematrix[493][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[494]&&<text fill='red' x={candidatematrix[494][0]} y={candidatematrix[494][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[495]&&<text fill='red' x={candidatematrix[495][0]} y={candidatematrix[495][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[496]&&<text fill='red' x={candidatematrix[496][0]} y={candidatematrix[496][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[497]&&<text fill='red' x={candidatematrix[497][0]} y={candidatematrix[497][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[498]&&<text fill='red' x={candidatematrix[498][0]} y={candidatematrix[498][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[499]&&<text fill='red' x={candidatematrix[499][0]} y={candidatematrix[499][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[500]&&<text fill='red' x={candidatematrix[500][0]} y={candidatematrix[500][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[501]&&<text fill='red' x={candidatematrix[501][0]} y={candidatematrix[501][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[502]&&<text fill='red' x={candidatematrix[502][0]} y={candidatematrix[502][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[503]&&<text fill='red' x={candidatematrix[503][0]} y={candidatematrix[503][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[504]&&<text fill='red' x={candidatematrix[504][0]} y={candidatematrix[504][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[505]&&<text fill='red' x={candidatematrix[505][0]} y={candidatematrix[505][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[506]&&<text fill='red' x={candidatematrix[506][0]} y={candidatematrix[506][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[507]&&<text fill='red' x={candidatematrix[507][0]} y={candidatematrix[507][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[508]&&<text fill='red' x={candidatematrix[508][0]} y={candidatematrix[508][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[509]&&<text fill='red' x={candidatematrix[509][0]} y={candidatematrix[509][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[510]&&<text fill='red' x={candidatematrix[510][0]} y={candidatematrix[510][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[511]&&<text fill='red' x={candidatematrix[511][0]} y={candidatematrix[511][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[512]&&<text fill='red' x={candidatematrix[512][0]} y={candidatematrix[512][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[513]&&<text fill='red' x={candidatematrix[513][0]} y={candidatematrix[513][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[514]&&<text fill='red' x={candidatematrix[514][0]} y={candidatematrix[514][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[515]&&<text fill='red' x={candidatematrix[515][0]} y={candidatematrix[515][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[516]&&<text fill='red' x={candidatematrix[516][0]} y={candidatematrix[516][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[517]&&<text fill='red' x={candidatematrix[517][0]} y={candidatematrix[517][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[518]&&<text fill='red' x={candidatematrix[518][0]} y={candidatematrix[518][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[519]&&<text fill='red' x={candidatematrix[519][0]} y={candidatematrix[519][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[520]&&<text fill='red' x={candidatematrix[520][0]} y={candidatematrix[520][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[521]&&<text fill='red' x={candidatematrix[521][0]} y={candidatematrix[521][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[522]&&<text fill='red' x={candidatematrix[522][0]} y={candidatematrix[522][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[523]&&<text fill='red' x={candidatematrix[523][0]} y={candidatematrix[523][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[524]&&<text fill='red' x={candidatematrix[524][0]} y={candidatematrix[524][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[525]&&<text fill='red' x={candidatematrix[525][0]} y={candidatematrix[525][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[526]&&<text fill='red' x={candidatematrix[526][0]} y={candidatematrix[526][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[527]&&<text fill='red' x={candidatematrix[527][0]} y={candidatematrix[527][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[528]&&<text fill='red' x={candidatematrix[528][0]} y={candidatematrix[528][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[529]&&<text fill='red' x={candidatematrix[529][0]} y={candidatematrix[529][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[530]&&<text fill='red' x={candidatematrix[530][0]} y={candidatematrix[530][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[531]&&<text fill='red' x={candidatematrix[531][0]} y={candidatematrix[531][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[532]&&<text fill='red' x={candidatematrix[532][0]} y={candidatematrix[532][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[533]&&<text fill='red' x={candidatematrix[533][0]} y={candidatematrix[533][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[534]&&<text fill='red' x={candidatematrix[534][0]} y={candidatematrix[534][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[535]&&<text fill='red' x={candidatematrix[535][0]} y={candidatematrix[535][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[536]&&<text fill='red' x={candidatematrix[536][0]} y={candidatematrix[536][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[537]&&<text fill='red' x={candidatematrix[537][0]} y={candidatematrix[537][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[538]&&<text fill='red' x={candidatematrix[538][0]} y={candidatematrix[538][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[539]&&<text fill='red' x={candidatematrix[539][0]} y={candidatematrix[539][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[540]&&<text fill='red' x={candidatematrix[540][0]} y={candidatematrix[540][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[541]&&<text fill='red' x={candidatematrix[541][0]} y={candidatematrix[541][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[542]&&<text fill='red' x={candidatematrix[542][0]} y={candidatematrix[542][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[543]&&<text fill='red' x={candidatematrix[543][0]} y={candidatematrix[543][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[544]&&<text fill='red' x={candidatematrix[544][0]} y={candidatematrix[544][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[545]&&<text fill='red' x={candidatematrix[545][0]} y={candidatematrix[545][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[546]&&<text fill='red' x={candidatematrix[546][0]} y={candidatematrix[546][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[547]&&<text fill='red' x={candidatematrix[547][0]} y={candidatematrix[547][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[548]&&<text fill='red' x={candidatematrix[548][0]} y={candidatematrix[548][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[549]&&<text fill='red' x={candidatematrix[549][0]} y={candidatematrix[549][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[550]&&<text fill='red' x={candidatematrix[550][0]} y={candidatematrix[550][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[551]&&<text fill='red' x={candidatematrix[551][0]} y={candidatematrix[551][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[552]&&<text fill='red' x={candidatematrix[552][0]} y={candidatematrix[552][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[553]&&<text fill='red' x={candidatematrix[553][0]} y={candidatematrix[553][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[554]&&<text fill='red' x={candidatematrix[554][0]} y={candidatematrix[554][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[555]&&<text fill='red' x={candidatematrix[555][0]} y={candidatematrix[555][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[556]&&<text fill='red' x={candidatematrix[556][0]} y={candidatematrix[556][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[557]&&<text fill='red' x={candidatematrix[557][0]} y={candidatematrix[557][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[558]&&<text fill='red' x={candidatematrix[558][0]} y={candidatematrix[558][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[559]&&<text fill='red' x={candidatematrix[559][0]} y={candidatematrix[559][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[560]&&<text fill='red' x={candidatematrix[560][0]} y={candidatematrix[560][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[561]&&<text fill='red' x={candidatematrix[561][0]} y={candidatematrix[561][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[562]&&<text fill='red' x={candidatematrix[562][0]} y={candidatematrix[562][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[563]&&<text fill='red' x={candidatematrix[563][0]} y={candidatematrix[563][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[564]&&<text fill='red' x={candidatematrix[564][0]} y={candidatematrix[564][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[565]&&<text fill='red' x={candidatematrix[565][0]} y={candidatematrix[565][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[566]&&<text fill='red' x={candidatematrix[566][0]} y={candidatematrix[566][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[567]&&<text fill='red' x={candidatematrix[567][0]} y={candidatematrix[567][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[568]&&<text fill='red' x={candidatematrix[568][0]} y={candidatematrix[568][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[569]&&<text fill='red' x={candidatematrix[569][0]} y={candidatematrix[569][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[570]&&<text fill='red' x={candidatematrix[570][0]} y={candidatematrix[570][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[571]&&<text fill='red' x={candidatematrix[571][0]} y={candidatematrix[571][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[572]&&<text fill='red' x={candidatematrix[572][0]} y={candidatematrix[572][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[573]&&<text fill='red' x={candidatematrix[573][0]} y={candidatematrix[573][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[574]&&<text fill='red' x={candidatematrix[574][0]} y={candidatematrix[574][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[575]&&<text fill='red' x={candidatematrix[575][0]} y={candidatematrix[575][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[576]&&<text fill='red' x={candidatematrix[576][0]} y={candidatematrix[576][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[577]&&<text fill='red' x={candidatematrix[577][0]} y={candidatematrix[577][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[578]&&<text fill='red' x={candidatematrix[578][0]} y={candidatematrix[578][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[579]&&<text fill='red' x={candidatematrix[579][0]} y={candidatematrix[579][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[580]&&<text fill='red' x={candidatematrix[580][0]} y={candidatematrix[580][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[581]&&<text fill='red' x={candidatematrix[581][0]} y={candidatematrix[581][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[582]&&<text fill='red' x={candidatematrix[582][0]} y={candidatematrix[582][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[583]&&<text fill='red' x={candidatematrix[583][0]} y={candidatematrix[583][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[584]&&<text fill='red' x={candidatematrix[584][0]} y={candidatematrix[584][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[585]&&<text fill='red' x={candidatematrix[585][0]} y={candidatematrix[585][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[586]&&<text fill='red' x={candidatematrix[586][0]} y={candidatematrix[586][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[587]&&<text fill='red' x={candidatematrix[587][0]} y={candidatematrix[587][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[588]&&<text fill='red' x={candidatematrix[588][0]} y={candidatematrix[588][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[589]&&<text fill='red' x={candidatematrix[589][0]} y={candidatematrix[589][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[590]&&<text fill='red' x={candidatematrix[590][0]} y={candidatematrix[590][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[591]&&<text fill='red' x={candidatematrix[591][0]} y={candidatematrix[591][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[592]&&<text fill='red' x={candidatematrix[592][0]} y={candidatematrix[592][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[593]&&<text fill='red' x={candidatematrix[593][0]} y={candidatematrix[593][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[594]&&<text fill='red' x={candidatematrix[594][0]} y={candidatematrix[594][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[595]&&<text fill='red' x={candidatematrix[595][0]} y={candidatematrix[595][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[596]&&<text fill='red' x={candidatematrix[596][0]} y={candidatematrix[596][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[597]&&<text fill='red' x={candidatematrix[597][0]} y={candidatematrix[597][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[598]&&<text fill='red' x={candidatematrix[598][0]} y={candidatematrix[598][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[599]&&<text fill='red' x={candidatematrix[599][0]} y={candidatematrix[599][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[600]&&<text fill='red' x={candidatematrix[600][0]} y={candidatematrix[600][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[601]&&<text fill='red' x={candidatematrix[601][0]} y={candidatematrix[601][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[602]&&<text fill='red' x={candidatematrix[602][0]} y={candidatematrix[602][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[603]&&<text fill='red' x={candidatematrix[603][0]} y={candidatematrix[603][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[604]&&<text fill='red' x={candidatematrix[604][0]} y={candidatematrix[604][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[605]&&<text fill='red' x={candidatematrix[605][0]} y={candidatematrix[605][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[606]&&<text fill='red' x={candidatematrix[606][0]} y={candidatematrix[606][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[607]&&<text fill='red' x={candidatematrix[607][0]} y={candidatematrix[607][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[608]&&<text fill='red' x={candidatematrix[608][0]} y={candidatematrix[608][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[609]&&<text fill='red' x={candidatematrix[609][0]} y={candidatematrix[609][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[610]&&<text fill='red' x={candidatematrix[610][0]} y={candidatematrix[610][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[611]&&<text fill='red' x={candidatematrix[611][0]} y={candidatematrix[611][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[612]&&<text fill='red' x={candidatematrix[612][0]} y={candidatematrix[612][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[613]&&<text fill='red' x={candidatematrix[613][0]} y={candidatematrix[613][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[614]&&<text fill='red' x={candidatematrix[614][0]} y={candidatematrix[614][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[615]&&<text fill='red' x={candidatematrix[615][0]} y={candidatematrix[615][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[616]&&<text fill='red' x={candidatematrix[616][0]} y={candidatematrix[616][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[617]&&<text fill='red' x={candidatematrix[617][0]} y={candidatematrix[617][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[618]&&<text fill='red' x={candidatematrix[618][0]} y={candidatematrix[618][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[619]&&<text fill='red' x={candidatematrix[619][0]} y={candidatematrix[619][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[620]&&<text fill='red' x={candidatematrix[620][0]} y={candidatematrix[620][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[621]&&<text fill='red' x={candidatematrix[621][0]} y={candidatematrix[621][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[622]&&<text fill='red' x={candidatematrix[622][0]} y={candidatematrix[622][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[623]&&<text fill='red' x={candidatematrix[623][0]} y={candidatematrix[623][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[624]&&<text fill='red' x={candidatematrix[624][0]} y={candidatematrix[624][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[625]&&<text fill='red' x={candidatematrix[625][0]} y={candidatematrix[625][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[626]&&<text fill='red' x={candidatematrix[626][0]} y={candidatematrix[626][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[627]&&<text fill='red' x={candidatematrix[627][0]} y={candidatematrix[627][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[628]&&<text fill='red' x={candidatematrix[628][0]} y={candidatematrix[628][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[629]&&<text fill='red' x={candidatematrix[629][0]} y={candidatematrix[629][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[630]&&<text fill='red' x={candidatematrix[630][0]} y={candidatematrix[630][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[631]&&<text fill='red' x={candidatematrix[631][0]} y={candidatematrix[631][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[632]&&<text fill='red' x={candidatematrix[632][0]} y={candidatematrix[632][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[633]&&<text fill='red' x={candidatematrix[633][0]} y={candidatematrix[633][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[634]&&<text fill='red' x={candidatematrix[634][0]} y={candidatematrix[634][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[635]&&<text fill='red' x={candidatematrix[635][0]} y={candidatematrix[635][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[636]&&<text fill='red' x={candidatematrix[636][0]} y={candidatematrix[636][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[637]&&<text fill='red' x={candidatematrix[637][0]} y={candidatematrix[637][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[638]&&<text fill='red' x={candidatematrix[638][0]} y={candidatematrix[638][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[639]&&<text fill='red' x={candidatematrix[639][0]} y={candidatematrix[639][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[640]&&<text fill='red' x={candidatematrix[640][0]} y={candidatematrix[640][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[641]&&<text fill='red' x={candidatematrix[641][0]} y={candidatematrix[641][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[642]&&<text fill='red' x={candidatematrix[642][0]} y={candidatematrix[642][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[643]&&<text fill='red' x={candidatematrix[643][0]} y={candidatematrix[643][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[644]&&<text fill='red' x={candidatematrix[644][0]} y={candidatematrix[644][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[645]&&<text fill='red' x={candidatematrix[645][0]} y={candidatematrix[645][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[646]&&<text fill='red' x={candidatematrix[646][0]} y={candidatematrix[646][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[647]&&<text fill='red' x={candidatematrix[647][0]} y={candidatematrix[647][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[648]&&<text fill='red' x={candidatematrix[648][0]} y={candidatematrix[648][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[649]&&<text fill='red' x={candidatematrix[649][0]} y={candidatematrix[649][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[650]&&<text fill='red' x={candidatematrix[650][0]} y={candidatematrix[650][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[651]&&<text fill='red' x={candidatematrix[651][0]} y={candidatematrix[651][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[652]&&<text fill='red' x={candidatematrix[652][0]} y={candidatematrix[652][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[653]&&<text fill='red' x={candidatematrix[653][0]} y={candidatematrix[653][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[654]&&<text fill='red' x={candidatematrix[654][0]} y={candidatematrix[654][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[655]&&<text fill='red' x={candidatematrix[655][0]} y={candidatematrix[655][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[656]&&<text fill='red' x={candidatematrix[656][0]} y={candidatematrix[656][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[657]&&<text fill='red' x={candidatematrix[657][0]} y={candidatematrix[657][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[658]&&<text fill='red' x={candidatematrix[658][0]} y={candidatematrix[658][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[659]&&<text fill='red' x={candidatematrix[659][0]} y={candidatematrix[659][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[660]&&<text fill='red' x={candidatematrix[660][0]} y={candidatematrix[660][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[661]&&<text fill='red' x={candidatematrix[661][0]} y={candidatematrix[661][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[662]&&<text fill='red' x={candidatematrix[662][0]} y={candidatematrix[662][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[663]&&<text fill='red' x={candidatematrix[663][0]} y={candidatematrix[663][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[664]&&<text fill='red' x={candidatematrix[664][0]} y={candidatematrix[664][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[665]&&<text fill='red' x={candidatematrix[665][0]} y={candidatematrix[665][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[666]&&<text fill='red' x={candidatematrix[666][0]} y={candidatematrix[666][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[667]&&<text fill='red' x={candidatematrix[667][0]} y={candidatematrix[667][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[668]&&<text fill='red' x={candidatematrix[668][0]} y={candidatematrix[668][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[669]&&<text fill='red' x={candidatematrix[669][0]} y={candidatematrix[669][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[670]&&<text fill='red' x={candidatematrix[670][0]} y={candidatematrix[670][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[671]&&<text fill='red' x={candidatematrix[671][0]} y={candidatematrix[671][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[672]&&<text fill='red' x={candidatematrix[672][0]} y={candidatematrix[672][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[673]&&<text fill='red' x={candidatematrix[673][0]} y={candidatematrix[673][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[674]&&<text fill='red' x={candidatematrix[674][0]} y={candidatematrix[674][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[675]&&<text fill='red' x={candidatematrix[675][0]} y={candidatematrix[675][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[676]&&<text fill='red' x={candidatematrix[676][0]} y={candidatematrix[676][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[677]&&<text fill='red' x={candidatematrix[677][0]} y={candidatematrix[677][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[678]&&<text fill='red' x={candidatematrix[678][0]} y={candidatematrix[678][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[679]&&<text fill='red' x={candidatematrix[679][0]} y={candidatematrix[679][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[680]&&<text fill='red' x={candidatematrix[680][0]} y={candidatematrix[680][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[681]&&<text fill='red' x={candidatematrix[681][0]} y={candidatematrix[681][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[682]&&<text fill='red' x={candidatematrix[682][0]} y={candidatematrix[682][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[683]&&<text fill='red' x={candidatematrix[683][0]} y={candidatematrix[683][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[684]&&<text fill='red' x={candidatematrix[684][0]} y={candidatematrix[684][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[685]&&<text fill='red' x={candidatematrix[685][0]} y={candidatematrix[685][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[686]&&<text fill='red' x={candidatematrix[686][0]} y={candidatematrix[686][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[687]&&<text fill='red' x={candidatematrix[687][0]} y={candidatematrix[687][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[688]&&<text fill='red' x={candidatematrix[688][0]} y={candidatematrix[688][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[689]&&<text fill='red' x={candidatematrix[689][0]} y={candidatematrix[689][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[690]&&<text fill='red' x={candidatematrix[690][0]} y={candidatematrix[690][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[691]&&<text fill='red' x={candidatematrix[691][0]} y={candidatematrix[691][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[692]&&<text fill='red' x={candidatematrix[692][0]} y={candidatematrix[692][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[693]&&<text fill='red' x={candidatematrix[693][0]} y={candidatematrix[693][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[694]&&<text fill='red' x={candidatematrix[694][0]} y={candidatematrix[694][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[695]&&<text fill='red' x={candidatematrix[695][0]} y={candidatematrix[695][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[696]&&<text fill='red' x={candidatematrix[696][0]} y={candidatematrix[696][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[697]&&<text fill='red' x={candidatematrix[697][0]} y={candidatematrix[697][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[698]&&<text fill='red' x={candidatematrix[698][0]} y={candidatematrix[698][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[699]&&<text fill='red' x={candidatematrix[699][0]} y={candidatematrix[699][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[700]&&<text fill='red' x={candidatematrix[700][0]} y={candidatematrix[700][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[701]&&<text fill='red' x={candidatematrix[701][0]} y={candidatematrix[701][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[702]&&<text fill='red' x={candidatematrix[702][0]} y={candidatematrix[702][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[703]&&<text fill='red' x={candidatematrix[703][0]} y={candidatematrix[703][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[704]&&<text fill='red' x={candidatematrix[704][0]} y={candidatematrix[704][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[705]&&<text fill='red' x={candidatematrix[705][0]} y={candidatematrix[705][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[706]&&<text fill='red' x={candidatematrix[706][0]} y={candidatematrix[706][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[707]&&<text fill='red' x={candidatematrix[707][0]} y={candidatematrix[707][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[708]&&<text fill='red' x={candidatematrix[708][0]} y={candidatematrix[708][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[709]&&<text fill='red' x={candidatematrix[709][0]} y={candidatematrix[709][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[710]&&<text fill='red' x={candidatematrix[710][0]} y={candidatematrix[710][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[711]&&<text fill='red' x={candidatematrix[711][0]} y={candidatematrix[711][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[712]&&<text fill='red' x={candidatematrix[712][0]} y={candidatematrix[712][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[713]&&<text fill='red' x={candidatematrix[713][0]} y={candidatematrix[713][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[714]&&<text fill='red' x={candidatematrix[714][0]} y={candidatematrix[714][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[715]&&<text fill='red' x={candidatematrix[715][0]} y={candidatematrix[715][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[716]&&<text fill='red' x={candidatematrix[716][0]} y={candidatematrix[716][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[717]&&<text fill='red' x={candidatematrix[717][0]} y={candidatematrix[717][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[718]&&<text fill='red' x={candidatematrix[718][0]} y={candidatematrix[718][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[719]&&<text fill='red' x={candidatematrix[719][0]} y={candidatematrix[719][1]} fontSize="0.2">9</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[720]&&<text fill='red' x={candidatematrix[720][0]} y={candidatematrix[720][1]} fontSize="0.2">1</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[721]&&<text fill='red' x={candidatematrix[721][0]} y={candidatematrix[721][1]} fontSize="0.2">2</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[722]&&<text fill='red' x={candidatematrix[722][0]} y={candidatematrix[722][1]} fontSize="0.2">3</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[723]&&<text fill='red' x={candidatematrix[723][0]} y={candidatematrix[723][1]} fontSize="0.2">4</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[724]&&<text fill='red' x={candidatematrix[724][0]} y={candidatematrix[724][1]} fontSize="0.2">5</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[725]&&<text fill='red' x={candidatematrix[725][0]} y={candidatematrix[725][1]} fontSize="0.2">6</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[726]&&<text fill='red' x={candidatematrix[726][0]} y={candidatematrix[726][1]} fontSize="0.2">7</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[727]&&<text fill='red' x={candidatematrix[727][0]} y={candidatematrix[727][1]} fontSize="0.2">8</text>}
                {flags[Flagtype.CANDIDATES]&&candidates[728]&&<text fill='red' x={candidatematrix[728][0]} y={candidatematrix[728][1]} fontSize="0.2">9</text>}
            </svg>
        </div>
    );
}

export default SudokuResolver