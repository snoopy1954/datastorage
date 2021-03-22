import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { styleButton } from '../../constants';

import { Sudoku, SudokuNoID } from '../../../../backend/src/types/sudoku';
import { Field, Settype, Setcolor } from '../../types/sudoku';

import { getAll } from '../../services/postgres';

import { RootState } from '../../state/store';
import { initializeSudokus, addSudoku, updateSudoku } from '../../state/sudoku/sudokus/actions';
import { showNotification } from '../../state/sudoku/notification/actions';

import { AppHeaderH2 } from "../basic/header";

import { getRandomNumber } from '../../utils/basic/basic';
import { 
    setMatrix, 
    setNumbermatrix, 
    setCandidatematrix,
    initializeValues,
    initializeCandidates,
    game2string, 
    string2game, 
    solveBacktrack, 
    solution2string, 
//    string2solution, 
    getColors, 
    checkField, 
    findCandidates,
    checkComplete,
    isCandidate
} from '../../utils/sudoku/sudoku';


const SudokuResolver: React.FC = () => {
    const [id, setId] = useState('');
    const [flagSet, setFlagSet] = useState(true);
    const [flagCheck, setFlagCheck] = useState(false);
    const [flagCandidates, setFlagCandidates] = useState(false);
    const [flagSingles, setFlagSingles] = useState(false);
    const [flagHiddenSingles, setFlagHiddenSingles] = useState(false);
    const [flagNakedPairs, setFlagNakedPairs] = useState(false);
    const [graphicPositions,] = useState(setNumbermatrix());
    const [gamePositions,] = useState(setMatrix());
    const [candidatePositions,] = useState(setCandidatematrix());
    const [selectedPosition, setSelectedPosition] = useState(0);
    const [candidateMatrix, setCandidateMatrix] = useState(initializeCandidates());
    const [solutionMatrix, setSolutionMatrix] = useState(initializeValues());
    const [gameMatrix, setGameMatrix] = useState(initializeValues());
    const [sequence, setSequence] = useState<Array<number>>([]);

    const dispatch = useDispatch();

    const sudokus: Sudoku[] = useSelector((state: RootState) => state.sudokus);
    const notification: string = useSelector((state: RootState) => state.notification);

    React.useEffect(() => {
        const readSudokus = async () => {
            dispatch(await initializeSudokus());
        };
        readSudokus();
    }, [dispatch]);

    const handleCandidates = () => {
        if (!flagCandidates) {
            const newCandidates = findCandidates(gameMatrix, false, false, false);
            setCandidateMatrix(newCandidates);
            setFlagCandidates(true);
            setFlagSingles(false);
            setFlagHiddenSingles(false);
            setFlagNakedPairs(false);
            dispatch(showNotification('Kandidaten anzeigen', 5));
        }
        else {
            setFlagCandidates(false);
            setFlagSingles(false);
            setFlagHiddenSingles(false);
            setFlagNakedPairs(false);
            dispatch(showNotification('Kandidaten nicht anzeigen', 5));
        }
    };

    const handleSingles = () => {
        if (!flagSingles) {
            const newCandidates = findCandidates(gameMatrix, true, flagHiddenSingles, flagNakedPairs); 
            setCandidateMatrix(newCandidates);
            setFlagSingles(true);
            dispatch(showNotification('Singles filtern', 5));
        }
        else {
            setFlagSingles(false);
            dispatch(showNotification('Singles nicht filtern', 5));
        }
    };

    const handleHiddensingles = () => {
        if (!flagHiddenSingles) {
            const newCandidates = findCandidates(gameMatrix, flagSingles, true, flagNakedPairs); 
            setCandidateMatrix(newCandidates);
            setFlagHiddenSingles(true);
            dispatch(showNotification('Hidden Singles filtern', 5));
        }
        else {
            setFlagHiddenSingles(false);
            dispatch(showNotification('Hidden Singles nicht filtern', 5));
        }
    };

    const handleNakedpairs = () => {
        if (!flagNakedPairs) {
            const newCandidates = findCandidates(gameMatrix, flagSingles, flagHiddenSingles, true); 
            setCandidateMatrix(newCandidates);
            setFlagNakedPairs(true);
            dispatch(showNotification('Naked Pairs filtern', 5));
        }
        else {
            setFlagNakedPairs(false);
            dispatch(showNotification('Naked Pairs nicht filtern', 5));
        }
    };

    const handleCheck = () => {
        if (!flagCheck) {
            setFlagCheck(true);
            dispatch(showNotification('Prüfung durchführen', 5));
        }
        else {
            setFlagCheck(false);
            dispatch(showNotification('Prüfung nicht durchführen', 5));
        }
    };

   const handleValue = (value: number) => {
        let isOK = false;

        isOK = flagSet ? isCandidate(gameMatrix, value, selectedPosition) : true;
        if (!isOK) {
            dispatch(showNotification('Die eingegebene Zahl ist falsch', 5));
            return;
        }

        isOK = flagCheck ? checkField(solutionMatrix, selectedPosition, value) : true;
        if (isOK) {
            const seqnr = sequence.length;
            const gamefield: Field = {
                number: value,
                fieldnr: selectedPosition,
                seqnr: seqnr,
                settype: flagSet ? Settype.SET : Settype.GAME
            };
            const matrix = { ...gameMatrix }; 
            matrix[selectedPosition] = gamefield;
            setGameMatrix(matrix);
            setSequence(sequence.concat(selectedPosition));
            if (flagCandidates) {
                const newCandidates = findCandidates(matrix, flagSingles, flagHiddenSingles, flagNakedPairs);
                setCandidateMatrix(newCandidates);
            }
            if (checkComplete(matrix, solutionMatrix)) {
                for (let index=0; index<81; index++) {
                    if (matrix[index].settype!==Settype.SET) {
                        const gamefield = matrix[index];
                        gamefield.settype = Settype.SOLVED;
                    }
                }
                setGameMatrix(matrix);
                dispatch(showNotification('Spiel gelöst', 5));        
            }
        }
        else {
            dispatch(showNotification('Eingegebene Zahl ist falsch', 5));
        }
    };

    const handlePosition = (position: number) => {
        setSelectedPosition(position);
    };

    const handleStart = () => {
        const [, solutionfields] = solveBacktrack(gameMatrix, 0);
        setSolutionMatrix(solutionfields);
        if (id==='') {
            const gameAsString: string = game2string(gameMatrix);
            const solutionAsString: string = solution2string(solutionfields);
            const sudoku: SudokuNoID = {
                game: gameAsString,
                solution: solutionAsString
            }
            dispatch(addSudoku(sudoku));    
        }
        setFlagSet(false);
        dispatch(showNotification('Spiel wurde gestartet', 5));
    };

    const handleRead = async (gamenumber: number) => {
        setId(Object.values(sudokus)[gamenumber].id);
        setSequence([]);
        setGameMatrix(initializeValues());
        setSolutionMatrix(initializeValues());
        setCandidateMatrix(initializeCandidates());
        setFlagCheck(false);
        setFlagCandidates(false);
        setFlagSingles(false);
        setFlagHiddenSingles(false);
        setFlagNakedPairs(false);
        setFlagSet(true);
        setSelectedPosition(0);

        const gameAsString: string = Object.values(sudokus)[gamenumber].game;
        const gamefieldvalues: Field[] = string2game(gameAsString);
        const [, solutionfields] = solveBacktrack(gamefieldvalues, 0);
        setGameMatrix(gamefieldvalues);
        setSolutionMatrix(solutionfields);
        const solutionAsString: string = solution2string(solutionfields);
        const sudoku: Sudoku = {
            id: Object.values(sudokus)[gamenumber].id,
            game: gameAsString,
            solution: solutionAsString
        }
        setFlagSet(false);
        if (solutionAsString!==Object.values(sudokus)[gamenumber].solution) {
            dispatch(updateSudoku(sudoku));    
            dispatch(showNotification(`Spiel wurde eingelesen; falsche Solution in Mongo!, Ersetze die ${gamenumber}`, 5));
        }
        else {
            dispatch(showNotification('Spiel wurde eingelesen', 5));
        }
    };

    const handleSolution = () => {
        const matrix = { ...gameMatrix };
        for (let index=0; index<81; index++) {
            if (matrix[index].settype!==Settype.SET&&matrix[index].number!==solutionMatrix[index].number) {
                matrix[index] = solutionMatrix[index];
            }
        }
        setGameMatrix(matrix);
        dispatch(showNotification('Lösung anzeigen', 5));
    };

    const handleNew = () => {
        setId('');
        setSequence([]);
        setGameMatrix(initializeValues());
        setSolutionMatrix(initializeValues());
        setCandidateMatrix(initializeCandidates());
        setFlagCheck(false);
        setFlagCandidates(false);
        setFlagSingles(false);
        setFlagHiddenSingles(false);
        setFlagNakedPairs(false);
        setFlagSet(true);
        setSelectedPosition(0);
        dispatch(showNotification('Neues Spiel eingeben', 5));
    };

    const handleUndo = () => {
        const matrix = { ...gameMatrix };
        const lastField = sequence[sequence.length-1];
        const gamefield: Field = {
            number: 0,
            fieldnr: lastField,
            seqnr: 0,
            settype: Settype.NONE
        };
        matrix[lastField] = gamefield;
        setGameMatrix(matrix);
        setSequence(sequence.splice(0, sequence.length-1));
    };

    const formatData = (migrateData: any): string[] => {
        const formatedData: string[] = migrateData;
        return formatedData;
    };

    const handleImport = async () => {
        const games = formatData(await getAll('sudoku', 'games'));
        for (let item=1; item<games.length; item++) {
            let gameAsString = games[item].replace('{', '').replace('}', '').split(',')[2].split(':')[1].replace('"', '').replace('"', '')
            let solutionAsString = '';
            const solutionAsString4 = games[item].replace('{', '').replace('}', '').split(',')[3].split(':')[1].replace('"', '').replace('"', '')
            for (let index=0; index<81;index++) {
                if(gameAsString.substr(index*4,1)!=='0') {
                    gameAsString = gameAsString.substr(0,index*4+1) + '1' + gameAsString.substr(index*4+2);
                }
            }
            for (let index=0; index<81;index++) {
                solutionAsString = solutionAsString + solutionAsString4.substr(index*4, 1);
            }
            const sudoku: SudokuNoID = {
                game: gameAsString,
                solution: solutionAsString
            };
            dispatch(addSudoku(sudoku));
        }
    };

    const markerposition: number[] = [gamePositions[selectedPosition][0], gamePositions[selectedPosition][1]];
    const numberfield = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const colors: Setcolor[] = getColors(gameMatrix);
    const checkMessage = 'Prüfen: ' + (flagCheck ? 'ein' : 'aus');
    const checkCandidates = 'Kandidaten: ' + (flagCandidates ? 'ein' : 'aus');
    const checkSingles = '  -  Singles: ' + (flagSingles ? 'ein' : 'aus');
    const checkHiddensingles = '  -  Hidden Singles: ' + (flagHiddenSingles ? 'ein' : 'aus');
    const checkNakedpairs = '  -  Naked Pairs: ' + (flagNakedPairs ? 'ein' : 'aus');
    const title = `Sudoku (${(Object.values(sudokus)).length} gespeicherte Spiele)`;


    return (
        <div className="App">
            <AppHeaderH2 text={title} icon='puzzle'/> 
            <Button style={styleButton} onClick={() => handleStart()}>Start</Button>
            <Button style={styleButton} onClick={() => handleNew()}>Neu</Button>
            <Button style={styleButton} onClick={() => handleRead(Object.values(sudokus).length-1)}>Lesen</Button>
            <Button style={styleButton} onClick={() => handleRead(getRandomNumber(Object.values(sudokus).length-1))}>Zufall</Button>
            <Button style={styleButton} onClick={() => handleUndo()}>Zurück</Button>
            <Button style={styleButton} onClick={() => handleSolution()}>Lösung</Button>
            <Button style={styleButton} onClick={() => handleImport()} disabled={true}>Import</Button>
            {/* <svg viewBox="0 0.5 20 9.7"> */}
            <svg viewBox="0 0.5 30 10">
                <defs>
                    <path id="quadrat" d="M0,0 h1 v1 h-1 z" stroke="black" strokeWidth="0.01"/>
                    <circle id="marker" r="0.5" strokeWidth="0.025" stroke="red" fill="none"/>
                    <rect id="border" x="0" y="0" width="9" height="9" fill="white" stroke="black" strokeWidth="0.035"/>
                    <line id="horizontal" x1="0" y1="0" x2="9" y2="0" stroke="black" strokeWidth="0.025"/>
                    <line id="vertical" x1="0" y1="0" x2="0" y2="9" stroke="black" strokeWidth="0.025"/>
                </defs>

                <text x={graphicPositions[0][0]} y={graphicPositions[8][1]+2} fontSize="0.25">{notification}</text>
                <text x={graphicPositions[0][0]} y={graphicPositions[8][1]+2.4} fontSize="0.25" onClick={() => handleCheck()}>{checkMessage}</text>
                <text x={graphicPositions[0][0]} y={graphicPositions[8][1]+2.8} fontSize="0.25" onClick={() => handleCandidates()}>{checkCandidates}</text>
                {flagCandidates&&<text x={graphicPositions[0][0]} y={graphicPositions[8][1]+3.2} fontSize="0.25" onClick={() => handleSingles()}>{checkSingles}</text>}
                {flagCandidates&&<text x={graphicPositions[0][0]} y={graphicPositions[8][1]+3.6} fontSize="0.25" onClick={() => handleHiddensingles()}>{checkHiddensingles}</text>}
                {flagCandidates&&<text x={graphicPositions[0][0]} y={graphicPositions[8][1]+4} fontSize="0.25" onClick={() => handleNakedpairs()}>{checkNakedpairs}</text>}

                <use href="#quadrat" transform={"translate("+graphicPositions[0][0]+","+graphicPositions[0][1]+")"} onClick={() => handleValue(1)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[1][0]+","+graphicPositions[1][1]+")"} onClick={() => handleValue(2)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[2][0]+","+graphicPositions[2][1]+")"} onClick={() => handleValue(3)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[3][0]+","+graphicPositions[3][1]+")"} onClick={() => handleValue(4)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[4][0]+","+graphicPositions[4][1]+")"} onClick={() => handleValue(5)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[5][0]+","+graphicPositions[5][1]+")"} onClick={() => handleValue(6)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[6][0]+","+graphicPositions[6][1]+")"} onClick={() => handleValue(7)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[7][0]+","+graphicPositions[7][1]+")"} onClick={() => handleValue(8)} fill="lightblue"/>
                <use href="#quadrat" transform={"translate("+graphicPositions[8][0]+","+graphicPositions[8][1]+")"} onClick={() => handleValue(9)} fill="lightblue"/>

                <text x={graphicPositions[0][0]+0.3} y={graphicPositions[0][1]+0.8} fontSize="0.7" onClick={() => handleValue(1)}>{numberfield[0]}</text>
                <text x={graphicPositions[1][0]+0.3} y={graphicPositions[1][1]+0.8} fontSize="0.7" onClick={() => handleValue(2)}>{numberfield[1]}</text>
                <text x={graphicPositions[2][0]+0.3} y={graphicPositions[2][1]+0.8} fontSize="0.7" onClick={() => handleValue(3)}>{numberfield[2]}</text>
                <text x={graphicPositions[3][0]+0.3} y={graphicPositions[3][1]+0.8} fontSize="0.7" onClick={() => handleValue(4)}>{numberfield[3]}</text>
                <text x={graphicPositions[4][0]+0.3} y={graphicPositions[4][1]+0.8} fontSize="0.7" onClick={() => handleValue(5)}>{numberfield[4]}</text>
                <text x={graphicPositions[5][0]+0.3} y={graphicPositions[5][1]+0.8} fontSize="0.7" onClick={() => handleValue(6)}>{numberfield[5]}</text>
                <text x={graphicPositions[6][0]+0.3} y={graphicPositions[6][1]+0.8} fontSize="0.7" onClick={() => handleValue(7)}>{numberfield[6]}</text>
                <text x={graphicPositions[7][0]+0.3} y={graphicPositions[7][1]+0.8} fontSize="0.7" onClick={() => handleValue(8)}>{numberfield[7]}</text>
                <text x={graphicPositions[8][0]+0.3} y={graphicPositions[8][1]+0.8} fontSize="0.7" onClick={() => handleValue(9)}>{numberfield[8]}</text>
 
                <use href="#quadrat" transform={"translate("+gamePositions[0][0]+","+gamePositions[0][1]+")"} onClick={() => handlePosition(0)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[1][0]+","+gamePositions[1][1]+")"} onClick={() => handlePosition(1)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[2][0]+","+gamePositions[2][1]+")"} onClick={() => handlePosition(2)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[3][0]+","+gamePositions[3][1]+")"} onClick={() => handlePosition(3)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[4][0]+","+gamePositions[4][1]+")"} onClick={() => handlePosition(4)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[5][0]+","+gamePositions[5][1]+")"} onClick={() => handlePosition(5)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[6][0]+","+gamePositions[6][1]+")"} onClick={() => handlePosition(6)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[7][0]+","+gamePositions[7][1]+")"} onClick={() => handlePosition(7)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[8][0]+","+gamePositions[8][1]+")"} onClick={() => handlePosition(8)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[9][0]+","+gamePositions[9][1]+")"} onClick={() => handlePosition(9)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[10][0]+","+gamePositions[10][1]+")"} onClick={() => handlePosition(10)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[11][0]+","+gamePositions[11][1]+")"} onClick={() => handlePosition(11)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[12][0]+","+gamePositions[12][1]+")"} onClick={() => handlePosition(12)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[13][0]+","+gamePositions[13][1]+")"} onClick={() => handlePosition(13)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[14][0]+","+gamePositions[14][1]+")"} onClick={() => handlePosition(14)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[15][0]+","+gamePositions[15][1]+")"} onClick={() => handlePosition(15)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[16][0]+","+gamePositions[16][1]+")"} onClick={() => handlePosition(16)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[17][0]+","+gamePositions[17][1]+")"} onClick={() => handlePosition(17)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[18][0]+","+gamePositions[18][1]+")"} onClick={() => handlePosition(18)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[19][0]+","+gamePositions[19][1]+")"} onClick={() => handlePosition(19)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[20][0]+","+gamePositions[20][1]+")"} onClick={() => handlePosition(20)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[21][0]+","+gamePositions[21][1]+")"} onClick={() => handlePosition(21)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[22][0]+","+gamePositions[22][1]+")"} onClick={() => handlePosition(22)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[23][0]+","+gamePositions[23][1]+")"} onClick={() => handlePosition(23)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[24][0]+","+gamePositions[24][1]+")"} onClick={() => handlePosition(24)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[25][0]+","+gamePositions[25][1]+")"} onClick={() => handlePosition(25)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[26][0]+","+gamePositions[26][1]+")"} onClick={() => handlePosition(26)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[27][0]+","+gamePositions[27][1]+")"} onClick={() => handlePosition(27)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[28][0]+","+gamePositions[28][1]+")"} onClick={() => handlePosition(28)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[29][0]+","+gamePositions[29][1]+")"} onClick={() => handlePosition(29)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[30][0]+","+gamePositions[30][1]+")"} onClick={() => handlePosition(30)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[31][0]+","+gamePositions[31][1]+")"} onClick={() => handlePosition(31)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[32][0]+","+gamePositions[32][1]+")"} onClick={() => handlePosition(32)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[33][0]+","+gamePositions[33][1]+")"} onClick={() => handlePosition(33)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[34][0]+","+gamePositions[34][1]+")"} onClick={() => handlePosition(34)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[35][0]+","+gamePositions[35][1]+")"} onClick={() => handlePosition(35)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[36][0]+","+gamePositions[36][1]+")"} onClick={() => handlePosition(36)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[37][0]+","+gamePositions[37][1]+")"} onClick={() => handlePosition(37)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[38][0]+","+gamePositions[38][1]+")"} onClick={() => handlePosition(38)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[39][0]+","+gamePositions[39][1]+")"} onClick={() => handlePosition(39)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[40][0]+","+gamePositions[40][1]+")"} onClick={() => handlePosition(40)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[41][0]+","+gamePositions[41][1]+")"} onClick={() => handlePosition(41)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[42][0]+","+gamePositions[42][1]+")"} onClick={() => handlePosition(42)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[43][0]+","+gamePositions[43][1]+")"} onClick={() => handlePosition(43)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[44][0]+","+gamePositions[44][1]+")"} onClick={() => handlePosition(44)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[45][0]+","+gamePositions[45][1]+")"} onClick={() => handlePosition(45)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[46][0]+","+gamePositions[46][1]+")"} onClick={() => handlePosition(46)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[47][0]+","+gamePositions[47][1]+")"} onClick={() => handlePosition(47)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[48][0]+","+gamePositions[48][1]+")"} onClick={() => handlePosition(48)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[49][0]+","+gamePositions[49][1]+")"} onClick={() => handlePosition(49)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[50][0]+","+gamePositions[50][1]+")"} onClick={() => handlePosition(50)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[51][0]+","+gamePositions[51][1]+")"} onClick={() => handlePosition(51)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[52][0]+","+gamePositions[52][1]+")"} onClick={() => handlePosition(52)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[53][0]+","+gamePositions[53][1]+")"} onClick={() => handlePosition(53)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[54][0]+","+gamePositions[54][1]+")"} onClick={() => handlePosition(54)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[55][0]+","+gamePositions[55][1]+")"} onClick={() => handlePosition(55)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[56][0]+","+gamePositions[56][1]+")"} onClick={() => handlePosition(56)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[57][0]+","+gamePositions[57][1]+")"} onClick={() => handlePosition(57)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[58][0]+","+gamePositions[58][1]+")"} onClick={() => handlePosition(58)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[59][0]+","+gamePositions[59][1]+")"} onClick={() => handlePosition(59)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[60][0]+","+gamePositions[60][1]+")"} onClick={() => handlePosition(60)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[61][0]+","+gamePositions[61][1]+")"} onClick={() => handlePosition(61)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[62][0]+","+gamePositions[62][1]+")"} onClick={() => handlePosition(62)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[63][0]+","+gamePositions[63][1]+")"} onClick={() => handlePosition(63)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[64][0]+","+gamePositions[64][1]+")"} onClick={() => handlePosition(64)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[65][0]+","+gamePositions[65][1]+")"} onClick={() => handlePosition(65)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[66][0]+","+gamePositions[66][1]+")"} onClick={() => handlePosition(66)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[67][0]+","+gamePositions[67][1]+")"} onClick={() => handlePosition(67)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[68][0]+","+gamePositions[68][1]+")"} onClick={() => handlePosition(68)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[69][0]+","+gamePositions[69][1]+")"} onClick={() => handlePosition(69)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[70][0]+","+gamePositions[70][1]+")"} onClick={() => handlePosition(70)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[71][0]+","+gamePositions[71][1]+")"} onClick={() => handlePosition(71)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[72][0]+","+gamePositions[72][1]+")"} onClick={() => handlePosition(72)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[73][0]+","+gamePositions[73][1]+")"} onClick={() => handlePosition(73)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[74][0]+","+gamePositions[74][1]+")"} onClick={() => handlePosition(74)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[75][0]+","+gamePositions[75][1]+")"} onClick={() => handlePosition(75)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[76][0]+","+gamePositions[76][1]+")"} onClick={() => handlePosition(76)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[77][0]+","+gamePositions[77][1]+")"} onClick={() => handlePosition(77)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[78][0]+","+gamePositions[78][1]+")"} onClick={() => handlePosition(78)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[79][0]+","+gamePositions[79][1]+")"} onClick={() => handlePosition(79)} fill="white"/>
                <use href="#quadrat" transform={"translate("+gamePositions[80][0]+","+gamePositions[80][1]+")"} onClick={() => handlePosition(80)} fill="white"/>

                <use href="#horizontal" transform="translate(1,1)"/>
                <use href="#horizontal" transform="translate(1,4)"/>
                <use href="#horizontal" transform="translate(1,7)"/>
                <use href="#horizontal" transform="translate(1,10)"/>
                <use href="#vertical" transform="translate(1,1)"/>
                <use href="#vertical" transform="translate(4,1)"/>
                <use href="#vertical" transform="translate(7,1)"/>
                <use href="#vertical" transform="translate(10,1)"/>
                <use href="#marker" transform={"translate("+(markerposition[0]+0.5)+","+(markerposition[1]+0.5)+")"}/>
                
                {gameMatrix[0].number>0&&<text fill={colors[0]} x={gamePositions[0][0]+0.3} y={gamePositions[0][1]+0.8} fontSize="0.7" onClick={() => handlePosition(0)}>{String(gameMatrix[0].number)}</text>}
                {gameMatrix[1].number>0&&<text fill={colors[1]} x={gamePositions[1][0]+0.3} y={gamePositions[1][1]+0.8} fontSize="0.7" onClick={() => handlePosition(1)}>{String(gameMatrix[1].number)}</text>}
                {gameMatrix[2].number>0&&<text fill={colors[2]} x={gamePositions[2][0]+0.3} y={gamePositions[2][1]+0.8} fontSize="0.7" onClick={() => handlePosition(2)}>{String(gameMatrix[2].number)}</text>}
                {gameMatrix[3].number>0&&<text fill={colors[3]} x={gamePositions[3][0]+0.3} y={gamePositions[3][1]+0.8} fontSize="0.7" onClick={() => handlePosition(3)}>{String(gameMatrix[3].number)}</text>}
                {gameMatrix[4].number>0&&<text fill={colors[4]} x={gamePositions[4][0]+0.3} y={gamePositions[4][1]+0.8} fontSize="0.7" onClick={() => handlePosition(4)}>{String(gameMatrix[4].number)}</text>}
                {gameMatrix[5].number>0&&<text fill={colors[5]} x={gamePositions[5][0]+0.3} y={gamePositions[5][1]+0.8} fontSize="0.7" onClick={() => handlePosition(5)}>{String(gameMatrix[5].number)}</text>}
                {gameMatrix[6].number>0&&<text fill={colors[6]} x={gamePositions[6][0]+0.3} y={gamePositions[6][1]+0.8} fontSize="0.7" onClick={() => handlePosition(6)}>{String(gameMatrix[6].number)}</text>}
                {gameMatrix[7].number>0&&<text fill={colors[7]} x={gamePositions[7][0]+0.3} y={gamePositions[7][1]+0.8} fontSize="0.7" onClick={() => handlePosition(7)}>{String(gameMatrix[7].number)}</text>}
                {gameMatrix[8].number>0&&<text fill={colors[8]} x={gamePositions[8][0]+0.3} y={gamePositions[8][1]+0.8} fontSize="0.7" onClick={() => handlePosition(8)}>{String(gameMatrix[8].number)}</text>}
                {gameMatrix[9].number>0&&<text fill={colors[9]} x={gamePositions[9][0]+0.3} y={gamePositions[9][1]+0.8} fontSize="0.7" onClick={() => handlePosition(9)}>{String(gameMatrix[9].number)}</text>}
                {gameMatrix[10].number>0&&<text fill={colors[10]} x={gamePositions[10][0]+0.3} y={gamePositions[10][1]+0.8} fontSize="0.7" onClick={() => handlePosition(10)}>{String(gameMatrix[10].number)}</text>}
                {gameMatrix[11].number>0&&<text fill={colors[11]} x={gamePositions[11][0]+0.3} y={gamePositions[11][1]+0.8} fontSize="0.7" onClick={() => handlePosition(11)}>{String(gameMatrix[11].number)}</text>}
                {gameMatrix[12].number>0&&<text fill={colors[12]} x={gamePositions[12][0]+0.3} y={gamePositions[12][1]+0.8} fontSize="0.7" onClick={() => handlePosition(12)}>{String(gameMatrix[12].number)}</text>}
                {gameMatrix[13].number>0&&<text fill={colors[13]} x={gamePositions[13][0]+0.3} y={gamePositions[13][1]+0.8} fontSize="0.7" onClick={() => handlePosition(13)}>{String(gameMatrix[13].number)}</text>}
                {gameMatrix[14].number>0&&<text fill={colors[14]} x={gamePositions[14][0]+0.3} y={gamePositions[14][1]+0.8} fontSize="0.7" onClick={() => handlePosition(14)}>{String(gameMatrix[14].number)}</text>}
                {gameMatrix[15].number>0&&<text fill={colors[15]} x={gamePositions[15][0]+0.3} y={gamePositions[15][1]+0.8} fontSize="0.7" onClick={() => handlePosition(15)}>{String(gameMatrix[15].number)}</text>}
                {gameMatrix[16].number>0&&<text fill={colors[16]} x={gamePositions[16][0]+0.3} y={gamePositions[16][1]+0.8} fontSize="0.7" onClick={() => handlePosition(16)}>{String(gameMatrix[16].number)}</text>}
                {gameMatrix[17].number>0&&<text fill={colors[17]} x={gamePositions[17][0]+0.3} y={gamePositions[17][1]+0.8} fontSize="0.7" onClick={() => handlePosition(17)}>{String(gameMatrix[17].number)}</text>}
                {gameMatrix[18].number>0&&<text fill={colors[18]} x={gamePositions[18][0]+0.3} y={gamePositions[18][1]+0.8} fontSize="0.7" onClick={() => handlePosition(18)}>{String(gameMatrix[18].number)}</text>}
                {gameMatrix[19].number>0&&<text fill={colors[19]} x={gamePositions[19][0]+0.3} y={gamePositions[19][1]+0.8} fontSize="0.7" onClick={() => handlePosition(19)}>{String(gameMatrix[19].number)}</text>}
                {gameMatrix[20].number>0&&<text fill={colors[20]} x={gamePositions[20][0]+0.3} y={gamePositions[20][1]+0.8} fontSize="0.7" onClick={() => handlePosition(20)}>{String(gameMatrix[20].number)}</text>}
                {gameMatrix[21].number>0&&<text fill={colors[21]} x={gamePositions[21][0]+0.3} y={gamePositions[21][1]+0.8} fontSize="0.7" onClick={() => handlePosition(21)}>{String(gameMatrix[21].number)}</text>}
                {gameMatrix[22].number>0&&<text fill={colors[22]} x={gamePositions[22][0]+0.3} y={gamePositions[22][1]+0.8} fontSize="0.7" onClick={() => handlePosition(22)}>{String(gameMatrix[22].number)}</text>}
                {gameMatrix[23].number>0&&<text fill={colors[23]} x={gamePositions[23][0]+0.3} y={gamePositions[23][1]+0.8} fontSize="0.7" onClick={() => handlePosition(23)}>{String(gameMatrix[23].number)}</text>}
                {gameMatrix[24].number>0&&<text fill={colors[24]} x={gamePositions[24][0]+0.3} y={gamePositions[24][1]+0.8} fontSize="0.7" onClick={() => handlePosition(24)}>{String(gameMatrix[24].number)}</text>}
                {gameMatrix[25].number>0&&<text fill={colors[25]} x={gamePositions[25][0]+0.3} y={gamePositions[25][1]+0.8} fontSize="0.7" onClick={() => handlePosition(25)}>{String(gameMatrix[25].number)}</text>}
                {gameMatrix[26].number>0&&<text fill={colors[26]} x={gamePositions[26][0]+0.3} y={gamePositions[26][1]+0.8} fontSize="0.7" onClick={() => handlePosition(26)}>{String(gameMatrix[26].number)}</text>}
                {gameMatrix[27].number>0&&<text fill={colors[27]} x={gamePositions[27][0]+0.3} y={gamePositions[27][1]+0.8} fontSize="0.7" onClick={() => handlePosition(27)}>{String(gameMatrix[27].number)}</text>}
                {gameMatrix[28].number>0&&<text fill={colors[28]} x={gamePositions[28][0]+0.3} y={gamePositions[28][1]+0.8} fontSize="0.7" onClick={() => handlePosition(28)}>{String(gameMatrix[28].number)}</text>}
                {gameMatrix[29].number>0&&<text fill={colors[29]} x={gamePositions[29][0]+0.3} y={gamePositions[29][1]+0.8} fontSize="0.7" onClick={() => handlePosition(29)}>{String(gameMatrix[29].number)}</text>}
                {gameMatrix[30].number>0&&<text fill={colors[30]} x={gamePositions[30][0]+0.3} y={gamePositions[30][1]+0.8} fontSize="0.7" onClick={() => handlePosition(30)}>{String(gameMatrix[30].number)}</text>}
                {gameMatrix[31].number>0&&<text fill={colors[31]} x={gamePositions[31][0]+0.3} y={gamePositions[31][1]+0.8} fontSize="0.7" onClick={() => handlePosition(31)}>{String(gameMatrix[31].number)}</text>}
                {gameMatrix[32].number>0&&<text fill={colors[32]} x={gamePositions[32][0]+0.3} y={gamePositions[32][1]+0.8} fontSize="0.7" onClick={() => handlePosition(32)}>{String(gameMatrix[32].number)}</text>}
                {gameMatrix[33].number>0&&<text fill={colors[33]} x={gamePositions[33][0]+0.3} y={gamePositions[33][1]+0.8} fontSize="0.7" onClick={() => handlePosition(33)}>{String(gameMatrix[33].number)}</text>}
                {gameMatrix[34].number>0&&<text fill={colors[34]} x={gamePositions[34][0]+0.3} y={gamePositions[34][1]+0.8} fontSize="0.7" onClick={() => handlePosition(34)}>{String(gameMatrix[34].number)}</text>}
                {gameMatrix[35].number>0&&<text fill={colors[35]} x={gamePositions[35][0]+0.3} y={gamePositions[35][1]+0.8} fontSize="0.7" onClick={() => handlePosition(35)}>{String(gameMatrix[35].number)}</text>}
                {gameMatrix[36].number>0&&<text fill={colors[36]} x={gamePositions[36][0]+0.3} y={gamePositions[36][1]+0.8} fontSize="0.7" onClick={() => handlePosition(36)}>{String(gameMatrix[36].number)}</text>}
                {gameMatrix[37].number>0&&<text fill={colors[37]} x={gamePositions[37][0]+0.3} y={gamePositions[37][1]+0.8} fontSize="0.7" onClick={() => handlePosition(37)}>{String(gameMatrix[37].number)}</text>}
                {gameMatrix[38].number>0&&<text fill={colors[38]} x={gamePositions[38][0]+0.3} y={gamePositions[38][1]+0.8} fontSize="0.7" onClick={() => handlePosition(38)}>{String(gameMatrix[38].number)}</text>}
                {gameMatrix[39].number>0&&<text fill={colors[39]} x={gamePositions[39][0]+0.3} y={gamePositions[39][1]+0.8} fontSize="0.7" onClick={() => handlePosition(39)}>{String(gameMatrix[39].number)}</text>}
                {gameMatrix[40].number>0&&<text fill={colors[40]} x={gamePositions[40][0]+0.3} y={gamePositions[40][1]+0.8} fontSize="0.7" onClick={() => handlePosition(40)}>{String(gameMatrix[40].number)}</text>}
                {gameMatrix[41].number>0&&<text fill={colors[41]} x={gamePositions[41][0]+0.3} y={gamePositions[41][1]+0.8} fontSize="0.7" onClick={() => handlePosition(41)}>{String(gameMatrix[41].number)}</text>}
                {gameMatrix[42].number>0&&<text fill={colors[42]} x={gamePositions[42][0]+0.3} y={gamePositions[42][1]+0.8} fontSize="0.7" onClick={() => handlePosition(42)}>{String(gameMatrix[42].number)}</text>}
                {gameMatrix[43].number>0&&<text fill={colors[43]} x={gamePositions[43][0]+0.3} y={gamePositions[43][1]+0.8} fontSize="0.7" onClick={() => handlePosition(43)}>{String(gameMatrix[43].number)}</text>}
                {gameMatrix[44].number>0&&<text fill={colors[44]} x={gamePositions[44][0]+0.3} y={gamePositions[44][1]+0.8} fontSize="0.7" onClick={() => handlePosition(44)}>{String(gameMatrix[44].number)}</text>}
                {gameMatrix[45].number>0&&<text fill={colors[45]} x={gamePositions[45][0]+0.3} y={gamePositions[45][1]+0.8} fontSize="0.7" onClick={() => handlePosition(45)}>{String(gameMatrix[45].number)}</text>}
                {gameMatrix[46].number>0&&<text fill={colors[46]} x={gamePositions[46][0]+0.3} y={gamePositions[46][1]+0.8} fontSize="0.7" onClick={() => handlePosition(46)}>{String(gameMatrix[46].number)}</text>}
                {gameMatrix[47].number>0&&<text fill={colors[47]} x={gamePositions[47][0]+0.3} y={gamePositions[47][1]+0.8} fontSize="0.7" onClick={() => handlePosition(47)}>{String(gameMatrix[47].number)}</text>}
                {gameMatrix[48].number>0&&<text fill={colors[48]} x={gamePositions[48][0]+0.3} y={gamePositions[48][1]+0.8} fontSize="0.7" onClick={() => handlePosition(48)}>{String(gameMatrix[48].number)}</text>}
                {gameMatrix[49].number>0&&<text fill={colors[49]} x={gamePositions[49][0]+0.3} y={gamePositions[49][1]+0.8} fontSize="0.7" onClick={() => handlePosition(49)}>{String(gameMatrix[49].number)}</text>}
                {gameMatrix[50].number>0&&<text fill={colors[50]} x={gamePositions[50][0]+0.3} y={gamePositions[50][1]+0.8} fontSize="0.7" onClick={() => handlePosition(50)}>{String(gameMatrix[50].number)}</text>}
                {gameMatrix[51].number>0&&<text fill={colors[51]} x={gamePositions[51][0]+0.3} y={gamePositions[51][1]+0.8} fontSize="0.7" onClick={() => handlePosition(51)}>{String(gameMatrix[51].number)}</text>}
                {gameMatrix[52].number>0&&<text fill={colors[52]} x={gamePositions[52][0]+0.3} y={gamePositions[52][1]+0.8} fontSize="0.7" onClick={() => handlePosition(52)}>{String(gameMatrix[52].number)}</text>}
                {gameMatrix[53].number>0&&<text fill={colors[53]} x={gamePositions[53][0]+0.3} y={gamePositions[53][1]+0.8} fontSize="0.7" onClick={() => handlePosition(53)}>{String(gameMatrix[53].number)}</text>}
                {gameMatrix[54].number>0&&<text fill={colors[54]} x={gamePositions[54][0]+0.3} y={gamePositions[54][1]+0.8} fontSize="0.7" onClick={() => handlePosition(54)}>{String(gameMatrix[54].number)}</text>}
                {gameMatrix[55].number>0&&<text fill={colors[55]} x={gamePositions[55][0]+0.3} y={gamePositions[55][1]+0.8} fontSize="0.7" onClick={() => handlePosition(55)}>{String(gameMatrix[55].number)}</text>}
                {gameMatrix[56].number>0&&<text fill={colors[56]} x={gamePositions[56][0]+0.3} y={gamePositions[56][1]+0.8} fontSize="0.7" onClick={() => handlePosition(56)}>{String(gameMatrix[56].number)}</text>}
                {gameMatrix[57].number>0&&<text fill={colors[57]} x={gamePositions[57][0]+0.3} y={gamePositions[57][1]+0.8} fontSize="0.7" onClick={() => handlePosition(57)}>{String(gameMatrix[57].number)}</text>}
                {gameMatrix[58].number>0&&<text fill={colors[58]} x={gamePositions[58][0]+0.3} y={gamePositions[58][1]+0.8} fontSize="0.7" onClick={() => handlePosition(58)}>{String(gameMatrix[58].number)}</text>}
                {gameMatrix[59].number>0&&<text fill={colors[59]} x={gamePositions[59][0]+0.3} y={gamePositions[59][1]+0.8} fontSize="0.7" onClick={() => handlePosition(59)}>{String(gameMatrix[59].number)}</text>}
                {gameMatrix[60].number>0&&<text fill={colors[60]} x={gamePositions[60][0]+0.3} y={gamePositions[60][1]+0.8} fontSize="0.7" onClick={() => handlePosition(60)}>{String(gameMatrix[60].number)}</text>}
                {gameMatrix[61].number>0&&<text fill={colors[61]} x={gamePositions[61][0]+0.3} y={gamePositions[61][1]+0.8} fontSize="0.7" onClick={() => handlePosition(61)}>{String(gameMatrix[61].number)}</text>}
                {gameMatrix[62].number>0&&<text fill={colors[62]} x={gamePositions[62][0]+0.3} y={gamePositions[62][1]+0.8} fontSize="0.7" onClick={() => handlePosition(62)}>{String(gameMatrix[62].number)}</text>}
                {gameMatrix[63].number>0&&<text fill={colors[63]} x={gamePositions[63][0]+0.3} y={gamePositions[63][1]+0.8} fontSize="0.7" onClick={() => handlePosition(63)}>{String(gameMatrix[63].number)}</text>}
                {gameMatrix[64].number>0&&<text fill={colors[64]} x={gamePositions[64][0]+0.3} y={gamePositions[64][1]+0.8} fontSize="0.7" onClick={() => handlePosition(64)}>{String(gameMatrix[64].number)}</text>}
                {gameMatrix[65].number>0&&<text fill={colors[65]} x={gamePositions[65][0]+0.3} y={gamePositions[65][1]+0.8} fontSize="0.7" onClick={() => handlePosition(65)}>{String(gameMatrix[65].number)}</text>}
                {gameMatrix[66].number>0&&<text fill={colors[66]} x={gamePositions[66][0]+0.3} y={gamePositions[66][1]+0.8} fontSize="0.7" onClick={() => handlePosition(66)}>{String(gameMatrix[66].number)}</text>}
                {gameMatrix[67].number>0&&<text fill={colors[67]} x={gamePositions[67][0]+0.3} y={gamePositions[67][1]+0.8} fontSize="0.7" onClick={() => handlePosition(67)}>{String(gameMatrix[67].number)}</text>}
                {gameMatrix[68].number>0&&<text fill={colors[68]} x={gamePositions[68][0]+0.3} y={gamePositions[68][1]+0.8} fontSize="0.7" onClick={() => handlePosition(68)}>{String(gameMatrix[68].number)}</text>}
                {gameMatrix[69].number>0&&<text fill={colors[69]} x={gamePositions[69][0]+0.3} y={gamePositions[69][1]+0.8} fontSize="0.7" onClick={() => handlePosition(69)}>{String(gameMatrix[69].number)}</text>}
                {gameMatrix[70].number>0&&<text fill={colors[70]} x={gamePositions[70][0]+0.3} y={gamePositions[70][1]+0.8} fontSize="0.7" onClick={() => handlePosition(70)}>{String(gameMatrix[70].number)}</text>}
                {gameMatrix[71].number>0&&<text fill={colors[71]} x={gamePositions[71][0]+0.3} y={gamePositions[71][1]+0.8} fontSize="0.7" onClick={() => handlePosition(71)}>{String(gameMatrix[71].number)}</text>}
                {gameMatrix[72].number>0&&<text fill={colors[72]} x={gamePositions[72][0]+0.3} y={gamePositions[72][1]+0.8} fontSize="0.7" onClick={() => handlePosition(72)}>{String(gameMatrix[72].number)}</text>}
                {gameMatrix[73].number>0&&<text fill={colors[73]} x={gamePositions[73][0]+0.3} y={gamePositions[73][1]+0.8} fontSize="0.7" onClick={() => handlePosition(73)}>{String(gameMatrix[73].number)}</text>}
                {gameMatrix[74].number>0&&<text fill={colors[74]} x={gamePositions[74][0]+0.3} y={gamePositions[74][1]+0.8} fontSize="0.7" onClick={() => handlePosition(74)}>{String(gameMatrix[74].number)}</text>}
                {gameMatrix[75].number>0&&<text fill={colors[75]} x={gamePositions[75][0]+0.3} y={gamePositions[75][1]+0.8} fontSize="0.7" onClick={() => handlePosition(75)}>{String(gameMatrix[75].number)}</text>}
                {gameMatrix[76].number>0&&<text fill={colors[76]} x={gamePositions[76][0]+0.3} y={gamePositions[76][1]+0.8} fontSize="0.7" onClick={() => handlePosition(76)}>{String(gameMatrix[76].number)}</text>}
                {gameMatrix[77].number>0&&<text fill={colors[77]} x={gamePositions[77][0]+0.3} y={gamePositions[77][1]+0.8} fontSize="0.7" onClick={() => handlePosition(77)}>{String(gameMatrix[77].number)}</text>}
                {gameMatrix[78].number>0&&<text fill={colors[78]} x={gamePositions[78][0]+0.3} y={gamePositions[78][1]+0.8} fontSize="0.7" onClick={() => handlePosition(78)}>{String(gameMatrix[78].number)}</text>}
                {gameMatrix[79].number>0&&<text fill={colors[79]} x={gamePositions[79][0]+0.3} y={gamePositions[79][1]+0.8} fontSize="0.7" onClick={() => handlePosition(79)}>{String(gameMatrix[79].number)}</text>}
                {gameMatrix[80].number>0&&<text fill={colors[80]} x={gamePositions[80][0]+0.3} y={gamePositions[80][1]+0.8} fontSize="0.7" onClick={() => handlePosition(80)}>{String(gameMatrix[80].number)}</text>}

                {flagCandidates&&candidateMatrix[0]&&<text fill='red' x={candidatePositions[0][0]} y={candidatePositions[0][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[1]&&<text fill='red' x={candidatePositions[1][0]} y={candidatePositions[1][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[2]&&<text fill='red' x={candidatePositions[2][0]} y={candidatePositions[2][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[3]&&<text fill='red' x={candidatePositions[3][0]} y={candidatePositions[3][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[4]&&<text fill='red' x={candidatePositions[4][0]} y={candidatePositions[4][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[5]&&<text fill='red' x={candidatePositions[5][0]} y={candidatePositions[5][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[6]&&<text fill='red' x={candidatePositions[6][0]} y={candidatePositions[6][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[7]&&<text fill='red' x={candidatePositions[7][0]} y={candidatePositions[7][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[8]&&<text fill='red' x={candidatePositions[8][0]} y={candidatePositions[8][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[9]&&<text fill='red' x={candidatePositions[9][0]} y={candidatePositions[9][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[10]&&<text fill='red' x={candidatePositions[10][0]} y={candidatePositions[10][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[11]&&<text fill='red' x={candidatePositions[11][0]} y={candidatePositions[11][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[12]&&<text fill='red' x={candidatePositions[12][0]} y={candidatePositions[12][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[13]&&<text fill='red' x={candidatePositions[13][0]} y={candidatePositions[13][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[14]&&<text fill='red' x={candidatePositions[14][0]} y={candidatePositions[14][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[15]&&<text fill='red' x={candidatePositions[15][0]} y={candidatePositions[15][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[16]&&<text fill='red' x={candidatePositions[16][0]} y={candidatePositions[16][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[17]&&<text fill='red' x={candidatePositions[17][0]} y={candidatePositions[17][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[18]&&<text fill='red' x={candidatePositions[18][0]} y={candidatePositions[18][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[19]&&<text fill='red' x={candidatePositions[19][0]} y={candidatePositions[19][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[20]&&<text fill='red' x={candidatePositions[20][0]} y={candidatePositions[20][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[21]&&<text fill='red' x={candidatePositions[21][0]} y={candidatePositions[21][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[22]&&<text fill='red' x={candidatePositions[22][0]} y={candidatePositions[22][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[23]&&<text fill='red' x={candidatePositions[23][0]} y={candidatePositions[23][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[24]&&<text fill='red' x={candidatePositions[24][0]} y={candidatePositions[24][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[25]&&<text fill='red' x={candidatePositions[25][0]} y={candidatePositions[25][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[26]&&<text fill='red' x={candidatePositions[26][0]} y={candidatePositions[26][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[27]&&<text fill='red' x={candidatePositions[27][0]} y={candidatePositions[27][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[28]&&<text fill='red' x={candidatePositions[28][0]} y={candidatePositions[28][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[29]&&<text fill='red' x={candidatePositions[29][0]} y={candidatePositions[29][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[30]&&<text fill='red' x={candidatePositions[30][0]} y={candidatePositions[30][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[31]&&<text fill='red' x={candidatePositions[31][0]} y={candidatePositions[31][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[32]&&<text fill='red' x={candidatePositions[32][0]} y={candidatePositions[32][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[33]&&<text fill='red' x={candidatePositions[33][0]} y={candidatePositions[33][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[34]&&<text fill='red' x={candidatePositions[34][0]} y={candidatePositions[34][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[35]&&<text fill='red' x={candidatePositions[35][0]} y={candidatePositions[35][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[36]&&<text fill='red' x={candidatePositions[36][0]} y={candidatePositions[36][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[37]&&<text fill='red' x={candidatePositions[37][0]} y={candidatePositions[37][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[38]&&<text fill='red' x={candidatePositions[38][0]} y={candidatePositions[38][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[39]&&<text fill='red' x={candidatePositions[39][0]} y={candidatePositions[39][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[40]&&<text fill='red' x={candidatePositions[40][0]} y={candidatePositions[40][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[41]&&<text fill='red' x={candidatePositions[41][0]} y={candidatePositions[41][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[42]&&<text fill='red' x={candidatePositions[42][0]} y={candidatePositions[42][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[43]&&<text fill='red' x={candidatePositions[43][0]} y={candidatePositions[43][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[44]&&<text fill='red' x={candidatePositions[44][0]} y={candidatePositions[44][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[45]&&<text fill='red' x={candidatePositions[45][0]} y={candidatePositions[45][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[46]&&<text fill='red' x={candidatePositions[46][0]} y={candidatePositions[46][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[47]&&<text fill='red' x={candidatePositions[47][0]} y={candidatePositions[47][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[48]&&<text fill='red' x={candidatePositions[48][0]} y={candidatePositions[48][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[49]&&<text fill='red' x={candidatePositions[49][0]} y={candidatePositions[49][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[50]&&<text fill='red' x={candidatePositions[50][0]} y={candidatePositions[50][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[51]&&<text fill='red' x={candidatePositions[51][0]} y={candidatePositions[51][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[52]&&<text fill='red' x={candidatePositions[52][0]} y={candidatePositions[52][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[53]&&<text fill='red' x={candidatePositions[53][0]} y={candidatePositions[53][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[54]&&<text fill='red' x={candidatePositions[54][0]} y={candidatePositions[54][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[55]&&<text fill='red' x={candidatePositions[55][0]} y={candidatePositions[55][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[56]&&<text fill='red' x={candidatePositions[56][0]} y={candidatePositions[56][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[57]&&<text fill='red' x={candidatePositions[57][0]} y={candidatePositions[57][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[58]&&<text fill='red' x={candidatePositions[58][0]} y={candidatePositions[58][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[59]&&<text fill='red' x={candidatePositions[59][0]} y={candidatePositions[59][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[60]&&<text fill='red' x={candidatePositions[60][0]} y={candidatePositions[60][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[61]&&<text fill='red' x={candidatePositions[61][0]} y={candidatePositions[61][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[62]&&<text fill='red' x={candidatePositions[62][0]} y={candidatePositions[62][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[63]&&<text fill='red' x={candidatePositions[63][0]} y={candidatePositions[63][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[64]&&<text fill='red' x={candidatePositions[64][0]} y={candidatePositions[64][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[65]&&<text fill='red' x={candidatePositions[65][0]} y={candidatePositions[65][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[66]&&<text fill='red' x={candidatePositions[66][0]} y={candidatePositions[66][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[67]&&<text fill='red' x={candidatePositions[67][0]} y={candidatePositions[67][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[68]&&<text fill='red' x={candidatePositions[68][0]} y={candidatePositions[68][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[69]&&<text fill='red' x={candidatePositions[69][0]} y={candidatePositions[69][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[70]&&<text fill='red' x={candidatePositions[70][0]} y={candidatePositions[70][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[71]&&<text fill='red' x={candidatePositions[71][0]} y={candidatePositions[71][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[72]&&<text fill='red' x={candidatePositions[72][0]} y={candidatePositions[72][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[73]&&<text fill='red' x={candidatePositions[73][0]} y={candidatePositions[73][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[74]&&<text fill='red' x={candidatePositions[74][0]} y={candidatePositions[74][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[75]&&<text fill='red' x={candidatePositions[75][0]} y={candidatePositions[75][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[76]&&<text fill='red' x={candidatePositions[76][0]} y={candidatePositions[76][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[77]&&<text fill='red' x={candidatePositions[77][0]} y={candidatePositions[77][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[78]&&<text fill='red' x={candidatePositions[78][0]} y={candidatePositions[78][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[79]&&<text fill='red' x={candidatePositions[79][0]} y={candidatePositions[79][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[80]&&<text fill='red' x={candidatePositions[80][0]} y={candidatePositions[80][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[81]&&<text fill='red' x={candidatePositions[81][0]} y={candidatePositions[81][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[82]&&<text fill='red' x={candidatePositions[82][0]} y={candidatePositions[82][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[83]&&<text fill='red' x={candidatePositions[83][0]} y={candidatePositions[83][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[84]&&<text fill='red' x={candidatePositions[84][0]} y={candidatePositions[84][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[85]&&<text fill='red' x={candidatePositions[85][0]} y={candidatePositions[85][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[86]&&<text fill='red' x={candidatePositions[86][0]} y={candidatePositions[86][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[87]&&<text fill='red' x={candidatePositions[87][0]} y={candidatePositions[87][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[88]&&<text fill='red' x={candidatePositions[88][0]} y={candidatePositions[88][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[89]&&<text fill='red' x={candidatePositions[89][0]} y={candidatePositions[89][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[90]&&<text fill='red' x={candidatePositions[90][0]} y={candidatePositions[90][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[91]&&<text fill='red' x={candidatePositions[91][0]} y={candidatePositions[91][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[92]&&<text fill='red' x={candidatePositions[92][0]} y={candidatePositions[92][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[93]&&<text fill='red' x={candidatePositions[93][0]} y={candidatePositions[93][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[94]&&<text fill='red' x={candidatePositions[94][0]} y={candidatePositions[94][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[95]&&<text fill='red' x={candidatePositions[95][0]} y={candidatePositions[95][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[96]&&<text fill='red' x={candidatePositions[96][0]} y={candidatePositions[96][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[97]&&<text fill='red' x={candidatePositions[97][0]} y={candidatePositions[97][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[98]&&<text fill='red' x={candidatePositions[98][0]} y={candidatePositions[98][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[99]&&<text fill='red' x={candidatePositions[99][0]} y={candidatePositions[99][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[100]&&<text fill='red' x={candidatePositions[100][0]} y={candidatePositions[100][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[101]&&<text fill='red' x={candidatePositions[101][0]} y={candidatePositions[101][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[102]&&<text fill='red' x={candidatePositions[102][0]} y={candidatePositions[102][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[103]&&<text fill='red' x={candidatePositions[103][0]} y={candidatePositions[103][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[104]&&<text fill='red' x={candidatePositions[104][0]} y={candidatePositions[104][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[105]&&<text fill='red' x={candidatePositions[105][0]} y={candidatePositions[105][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[106]&&<text fill='red' x={candidatePositions[106][0]} y={candidatePositions[106][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[107]&&<text fill='red' x={candidatePositions[107][0]} y={candidatePositions[107][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[108]&&<text fill='red' x={candidatePositions[108][0]} y={candidatePositions[108][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[109]&&<text fill='red' x={candidatePositions[109][0]} y={candidatePositions[109][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[110]&&<text fill='red' x={candidatePositions[110][0]} y={candidatePositions[110][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[111]&&<text fill='red' x={candidatePositions[111][0]} y={candidatePositions[111][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[112]&&<text fill='red' x={candidatePositions[112][0]} y={candidatePositions[112][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[113]&&<text fill='red' x={candidatePositions[113][0]} y={candidatePositions[113][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[114]&&<text fill='red' x={candidatePositions[114][0]} y={candidatePositions[114][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[115]&&<text fill='red' x={candidatePositions[115][0]} y={candidatePositions[115][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[116]&&<text fill='red' x={candidatePositions[116][0]} y={candidatePositions[116][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[117]&&<text fill='red' x={candidatePositions[117][0]} y={candidatePositions[117][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[118]&&<text fill='red' x={candidatePositions[118][0]} y={candidatePositions[118][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[119]&&<text fill='red' x={candidatePositions[119][0]} y={candidatePositions[119][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[120]&&<text fill='red' x={candidatePositions[120][0]} y={candidatePositions[120][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[121]&&<text fill='red' x={candidatePositions[121][0]} y={candidatePositions[121][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[122]&&<text fill='red' x={candidatePositions[122][0]} y={candidatePositions[122][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[123]&&<text fill='red' x={candidatePositions[123][0]} y={candidatePositions[123][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[124]&&<text fill='red' x={candidatePositions[124][0]} y={candidatePositions[124][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[125]&&<text fill='red' x={candidatePositions[125][0]} y={candidatePositions[125][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[126]&&<text fill='red' x={candidatePositions[126][0]} y={candidatePositions[126][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[127]&&<text fill='red' x={candidatePositions[127][0]} y={candidatePositions[127][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[128]&&<text fill='red' x={candidatePositions[128][0]} y={candidatePositions[128][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[129]&&<text fill='red' x={candidatePositions[129][0]} y={candidatePositions[129][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[130]&&<text fill='red' x={candidatePositions[130][0]} y={candidatePositions[130][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[131]&&<text fill='red' x={candidatePositions[131][0]} y={candidatePositions[131][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[132]&&<text fill='red' x={candidatePositions[132][0]} y={candidatePositions[132][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[133]&&<text fill='red' x={candidatePositions[133][0]} y={candidatePositions[133][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[134]&&<text fill='red' x={candidatePositions[134][0]} y={candidatePositions[134][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[135]&&<text fill='red' x={candidatePositions[135][0]} y={candidatePositions[135][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[136]&&<text fill='red' x={candidatePositions[136][0]} y={candidatePositions[136][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[137]&&<text fill='red' x={candidatePositions[137][0]} y={candidatePositions[137][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[138]&&<text fill='red' x={candidatePositions[138][0]} y={candidatePositions[138][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[139]&&<text fill='red' x={candidatePositions[139][0]} y={candidatePositions[139][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[140]&&<text fill='red' x={candidatePositions[140][0]} y={candidatePositions[140][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[141]&&<text fill='red' x={candidatePositions[141][0]} y={candidatePositions[141][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[142]&&<text fill='red' x={candidatePositions[142][0]} y={candidatePositions[142][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[143]&&<text fill='red' x={candidatePositions[143][0]} y={candidatePositions[143][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[144]&&<text fill='red' x={candidatePositions[144][0]} y={candidatePositions[144][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[145]&&<text fill='red' x={candidatePositions[145][0]} y={candidatePositions[145][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[146]&&<text fill='red' x={candidatePositions[146][0]} y={candidatePositions[146][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[147]&&<text fill='red' x={candidatePositions[147][0]} y={candidatePositions[147][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[148]&&<text fill='red' x={candidatePositions[148][0]} y={candidatePositions[148][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[149]&&<text fill='red' x={candidatePositions[149][0]} y={candidatePositions[149][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[150]&&<text fill='red' x={candidatePositions[150][0]} y={candidatePositions[150][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[151]&&<text fill='red' x={candidatePositions[151][0]} y={candidatePositions[151][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[152]&&<text fill='red' x={candidatePositions[152][0]} y={candidatePositions[152][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[153]&&<text fill='red' x={candidatePositions[153][0]} y={candidatePositions[153][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[154]&&<text fill='red' x={candidatePositions[154][0]} y={candidatePositions[154][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[155]&&<text fill='red' x={candidatePositions[155][0]} y={candidatePositions[155][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[156]&&<text fill='red' x={candidatePositions[156][0]} y={candidatePositions[156][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[157]&&<text fill='red' x={candidatePositions[157][0]} y={candidatePositions[157][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[158]&&<text fill='red' x={candidatePositions[158][0]} y={candidatePositions[158][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[159]&&<text fill='red' x={candidatePositions[159][0]} y={candidatePositions[159][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[160]&&<text fill='red' x={candidatePositions[160][0]} y={candidatePositions[160][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[161]&&<text fill='red' x={candidatePositions[161][0]} y={candidatePositions[161][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[162]&&<text fill='red' x={candidatePositions[162][0]} y={candidatePositions[162][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[163]&&<text fill='red' x={candidatePositions[163][0]} y={candidatePositions[163][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[164]&&<text fill='red' x={candidatePositions[164][0]} y={candidatePositions[164][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[165]&&<text fill='red' x={candidatePositions[165][0]} y={candidatePositions[165][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[166]&&<text fill='red' x={candidatePositions[166][0]} y={candidatePositions[166][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[167]&&<text fill='red' x={candidatePositions[167][0]} y={candidatePositions[167][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[168]&&<text fill='red' x={candidatePositions[168][0]} y={candidatePositions[168][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[169]&&<text fill='red' x={candidatePositions[169][0]} y={candidatePositions[169][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[170]&&<text fill='red' x={candidatePositions[170][0]} y={candidatePositions[170][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[171]&&<text fill='red' x={candidatePositions[171][0]} y={candidatePositions[171][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[172]&&<text fill='red' x={candidatePositions[172][0]} y={candidatePositions[172][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[173]&&<text fill='red' x={candidatePositions[173][0]} y={candidatePositions[173][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[174]&&<text fill='red' x={candidatePositions[174][0]} y={candidatePositions[174][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[175]&&<text fill='red' x={candidatePositions[175][0]} y={candidatePositions[175][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[176]&&<text fill='red' x={candidatePositions[176][0]} y={candidatePositions[176][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[177]&&<text fill='red' x={candidatePositions[177][0]} y={candidatePositions[177][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[178]&&<text fill='red' x={candidatePositions[178][0]} y={candidatePositions[178][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[179]&&<text fill='red' x={candidatePositions[179][0]} y={candidatePositions[179][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[180]&&<text fill='red' x={candidatePositions[180][0]} y={candidatePositions[180][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[181]&&<text fill='red' x={candidatePositions[181][0]} y={candidatePositions[181][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[182]&&<text fill='red' x={candidatePositions[182][0]} y={candidatePositions[182][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[183]&&<text fill='red' x={candidatePositions[183][0]} y={candidatePositions[183][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[184]&&<text fill='red' x={candidatePositions[184][0]} y={candidatePositions[184][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[185]&&<text fill='red' x={candidatePositions[185][0]} y={candidatePositions[185][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[186]&&<text fill='red' x={candidatePositions[186][0]} y={candidatePositions[186][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[187]&&<text fill='red' x={candidatePositions[187][0]} y={candidatePositions[187][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[188]&&<text fill='red' x={candidatePositions[188][0]} y={candidatePositions[188][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[189]&&<text fill='red' x={candidatePositions[189][0]} y={candidatePositions[189][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[190]&&<text fill='red' x={candidatePositions[190][0]} y={candidatePositions[190][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[191]&&<text fill='red' x={candidatePositions[191][0]} y={candidatePositions[191][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[192]&&<text fill='red' x={candidatePositions[192][0]} y={candidatePositions[192][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[193]&&<text fill='red' x={candidatePositions[193][0]} y={candidatePositions[193][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[194]&&<text fill='red' x={candidatePositions[194][0]} y={candidatePositions[194][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[195]&&<text fill='red' x={candidatePositions[195][0]} y={candidatePositions[195][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[196]&&<text fill='red' x={candidatePositions[196][0]} y={candidatePositions[196][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[197]&&<text fill='red' x={candidatePositions[197][0]} y={candidatePositions[197][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[198]&&<text fill='red' x={candidatePositions[198][0]} y={candidatePositions[198][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[199]&&<text fill='red' x={candidatePositions[199][0]} y={candidatePositions[199][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[200]&&<text fill='red' x={candidatePositions[200][0]} y={candidatePositions[200][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[201]&&<text fill='red' x={candidatePositions[201][0]} y={candidatePositions[201][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[202]&&<text fill='red' x={candidatePositions[202][0]} y={candidatePositions[202][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[203]&&<text fill='red' x={candidatePositions[203][0]} y={candidatePositions[203][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[204]&&<text fill='red' x={candidatePositions[204][0]} y={candidatePositions[204][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[205]&&<text fill='red' x={candidatePositions[205][0]} y={candidatePositions[205][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[206]&&<text fill='red' x={candidatePositions[206][0]} y={candidatePositions[206][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[207]&&<text fill='red' x={candidatePositions[207][0]} y={candidatePositions[207][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[208]&&<text fill='red' x={candidatePositions[208][0]} y={candidatePositions[208][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[209]&&<text fill='red' x={candidatePositions[209][0]} y={candidatePositions[209][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[210]&&<text fill='red' x={candidatePositions[210][0]} y={candidatePositions[210][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[211]&&<text fill='red' x={candidatePositions[211][0]} y={candidatePositions[211][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[212]&&<text fill='red' x={candidatePositions[212][0]} y={candidatePositions[212][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[213]&&<text fill='red' x={candidatePositions[213][0]} y={candidatePositions[213][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[214]&&<text fill='red' x={candidatePositions[214][0]} y={candidatePositions[214][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[215]&&<text fill='red' x={candidatePositions[215][0]} y={candidatePositions[215][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[216]&&<text fill='red' x={candidatePositions[216][0]} y={candidatePositions[216][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[217]&&<text fill='red' x={candidatePositions[217][0]} y={candidatePositions[217][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[218]&&<text fill='red' x={candidatePositions[218][0]} y={candidatePositions[218][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[219]&&<text fill='red' x={candidatePositions[219][0]} y={candidatePositions[219][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[220]&&<text fill='red' x={candidatePositions[220][0]} y={candidatePositions[220][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[221]&&<text fill='red' x={candidatePositions[221][0]} y={candidatePositions[221][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[222]&&<text fill='red' x={candidatePositions[222][0]} y={candidatePositions[222][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[223]&&<text fill='red' x={candidatePositions[223][0]} y={candidatePositions[223][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[224]&&<text fill='red' x={candidatePositions[224][0]} y={candidatePositions[224][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[225]&&<text fill='red' x={candidatePositions[225][0]} y={candidatePositions[225][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[226]&&<text fill='red' x={candidatePositions[226][0]} y={candidatePositions[226][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[227]&&<text fill='red' x={candidatePositions[227][0]} y={candidatePositions[227][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[228]&&<text fill='red' x={candidatePositions[228][0]} y={candidatePositions[228][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[229]&&<text fill='red' x={candidatePositions[229][0]} y={candidatePositions[229][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[230]&&<text fill='red' x={candidatePositions[230][0]} y={candidatePositions[230][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[231]&&<text fill='red' x={candidatePositions[231][0]} y={candidatePositions[231][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[232]&&<text fill='red' x={candidatePositions[232][0]} y={candidatePositions[232][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[233]&&<text fill='red' x={candidatePositions[233][0]} y={candidatePositions[233][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[234]&&<text fill='red' x={candidatePositions[234][0]} y={candidatePositions[234][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[235]&&<text fill='red' x={candidatePositions[235][0]} y={candidatePositions[235][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[236]&&<text fill='red' x={candidatePositions[236][0]} y={candidatePositions[236][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[237]&&<text fill='red' x={candidatePositions[237][0]} y={candidatePositions[237][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[238]&&<text fill='red' x={candidatePositions[238][0]} y={candidatePositions[238][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[239]&&<text fill='red' x={candidatePositions[239][0]} y={candidatePositions[239][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[240]&&<text fill='red' x={candidatePositions[240][0]} y={candidatePositions[240][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[241]&&<text fill='red' x={candidatePositions[241][0]} y={candidatePositions[241][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[242]&&<text fill='red' x={candidatePositions[242][0]} y={candidatePositions[242][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[243]&&<text fill='red' x={candidatePositions[243][0]} y={candidatePositions[243][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[244]&&<text fill='red' x={candidatePositions[244][0]} y={candidatePositions[244][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[245]&&<text fill='red' x={candidatePositions[245][0]} y={candidatePositions[245][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[246]&&<text fill='red' x={candidatePositions[246][0]} y={candidatePositions[246][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[247]&&<text fill='red' x={candidatePositions[247][0]} y={candidatePositions[247][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[248]&&<text fill='red' x={candidatePositions[248][0]} y={candidatePositions[248][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[249]&&<text fill='red' x={candidatePositions[249][0]} y={candidatePositions[249][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[250]&&<text fill='red' x={candidatePositions[250][0]} y={candidatePositions[250][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[251]&&<text fill='red' x={candidatePositions[251][0]} y={candidatePositions[251][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[252]&&<text fill='red' x={candidatePositions[252][0]} y={candidatePositions[252][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[253]&&<text fill='red' x={candidatePositions[253][0]} y={candidatePositions[253][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[254]&&<text fill='red' x={candidatePositions[254][0]} y={candidatePositions[254][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[255]&&<text fill='red' x={candidatePositions[255][0]} y={candidatePositions[255][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[256]&&<text fill='red' x={candidatePositions[256][0]} y={candidatePositions[256][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[257]&&<text fill='red' x={candidatePositions[257][0]} y={candidatePositions[257][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[258]&&<text fill='red' x={candidatePositions[258][0]} y={candidatePositions[258][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[259]&&<text fill='red' x={candidatePositions[259][0]} y={candidatePositions[259][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[260]&&<text fill='red' x={candidatePositions[260][0]} y={candidatePositions[260][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[261]&&<text fill='red' x={candidatePositions[261][0]} y={candidatePositions[261][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[262]&&<text fill='red' x={candidatePositions[262][0]} y={candidatePositions[262][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[263]&&<text fill='red' x={candidatePositions[263][0]} y={candidatePositions[263][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[264]&&<text fill='red' x={candidatePositions[264][0]} y={candidatePositions[264][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[265]&&<text fill='red' x={candidatePositions[265][0]} y={candidatePositions[265][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[266]&&<text fill='red' x={candidatePositions[266][0]} y={candidatePositions[266][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[267]&&<text fill='red' x={candidatePositions[267][0]} y={candidatePositions[267][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[268]&&<text fill='red' x={candidatePositions[268][0]} y={candidatePositions[268][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[269]&&<text fill='red' x={candidatePositions[269][0]} y={candidatePositions[269][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[270]&&<text fill='red' x={candidatePositions[270][0]} y={candidatePositions[270][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[271]&&<text fill='red' x={candidatePositions[271][0]} y={candidatePositions[271][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[272]&&<text fill='red' x={candidatePositions[272][0]} y={candidatePositions[272][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[273]&&<text fill='red' x={candidatePositions[273][0]} y={candidatePositions[273][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[274]&&<text fill='red' x={candidatePositions[274][0]} y={candidatePositions[274][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[275]&&<text fill='red' x={candidatePositions[275][0]} y={candidatePositions[275][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[276]&&<text fill='red' x={candidatePositions[276][0]} y={candidatePositions[276][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[277]&&<text fill='red' x={candidatePositions[277][0]} y={candidatePositions[277][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[278]&&<text fill='red' x={candidatePositions[278][0]} y={candidatePositions[278][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[279]&&<text fill='red' x={candidatePositions[279][0]} y={candidatePositions[279][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[280]&&<text fill='red' x={candidatePositions[280][0]} y={candidatePositions[280][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[281]&&<text fill='red' x={candidatePositions[281][0]} y={candidatePositions[281][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[282]&&<text fill='red' x={candidatePositions[282][0]} y={candidatePositions[282][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[283]&&<text fill='red' x={candidatePositions[283][0]} y={candidatePositions[283][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[284]&&<text fill='red' x={candidatePositions[284][0]} y={candidatePositions[284][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[285]&&<text fill='red' x={candidatePositions[285][0]} y={candidatePositions[285][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[286]&&<text fill='red' x={candidatePositions[286][0]} y={candidatePositions[286][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[287]&&<text fill='red' x={candidatePositions[287][0]} y={candidatePositions[287][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[288]&&<text fill='red' x={candidatePositions[288][0]} y={candidatePositions[288][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[289]&&<text fill='red' x={candidatePositions[289][0]} y={candidatePositions[289][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[290]&&<text fill='red' x={candidatePositions[290][0]} y={candidatePositions[290][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[291]&&<text fill='red' x={candidatePositions[291][0]} y={candidatePositions[291][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[292]&&<text fill='red' x={candidatePositions[292][0]} y={candidatePositions[292][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[293]&&<text fill='red' x={candidatePositions[293][0]} y={candidatePositions[293][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[294]&&<text fill='red' x={candidatePositions[294][0]} y={candidatePositions[294][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[295]&&<text fill='red' x={candidatePositions[295][0]} y={candidatePositions[295][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[296]&&<text fill='red' x={candidatePositions[296][0]} y={candidatePositions[296][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[297]&&<text fill='red' x={candidatePositions[297][0]} y={candidatePositions[297][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[298]&&<text fill='red' x={candidatePositions[298][0]} y={candidatePositions[298][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[299]&&<text fill='red' x={candidatePositions[299][0]} y={candidatePositions[299][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[300]&&<text fill='red' x={candidatePositions[300][0]} y={candidatePositions[300][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[301]&&<text fill='red' x={candidatePositions[301][0]} y={candidatePositions[301][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[302]&&<text fill='red' x={candidatePositions[302][0]} y={candidatePositions[302][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[303]&&<text fill='red' x={candidatePositions[303][0]} y={candidatePositions[303][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[304]&&<text fill='red' x={candidatePositions[304][0]} y={candidatePositions[304][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[305]&&<text fill='red' x={candidatePositions[305][0]} y={candidatePositions[305][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[306]&&<text fill='red' x={candidatePositions[306][0]} y={candidatePositions[306][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[307]&&<text fill='red' x={candidatePositions[307][0]} y={candidatePositions[307][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[308]&&<text fill='red' x={candidatePositions[308][0]} y={candidatePositions[308][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[309]&&<text fill='red' x={candidatePositions[309][0]} y={candidatePositions[309][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[310]&&<text fill='red' x={candidatePositions[310][0]} y={candidatePositions[310][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[311]&&<text fill='red' x={candidatePositions[311][0]} y={candidatePositions[311][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[312]&&<text fill='red' x={candidatePositions[312][0]} y={candidatePositions[312][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[313]&&<text fill='red' x={candidatePositions[313][0]} y={candidatePositions[313][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[314]&&<text fill='red' x={candidatePositions[314][0]} y={candidatePositions[314][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[315]&&<text fill='red' x={candidatePositions[315][0]} y={candidatePositions[315][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[316]&&<text fill='red' x={candidatePositions[316][0]} y={candidatePositions[316][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[317]&&<text fill='red' x={candidatePositions[317][0]} y={candidatePositions[317][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[318]&&<text fill='red' x={candidatePositions[318][0]} y={candidatePositions[318][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[319]&&<text fill='red' x={candidatePositions[319][0]} y={candidatePositions[319][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[320]&&<text fill='red' x={candidatePositions[320][0]} y={candidatePositions[320][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[321]&&<text fill='red' x={candidatePositions[321][0]} y={candidatePositions[321][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[322]&&<text fill='red' x={candidatePositions[322][0]} y={candidatePositions[322][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[323]&&<text fill='red' x={candidatePositions[323][0]} y={candidatePositions[323][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[324]&&<text fill='red' x={candidatePositions[324][0]} y={candidatePositions[324][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[325]&&<text fill='red' x={candidatePositions[325][0]} y={candidatePositions[325][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[326]&&<text fill='red' x={candidatePositions[326][0]} y={candidatePositions[326][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[327]&&<text fill='red' x={candidatePositions[327][0]} y={candidatePositions[327][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[328]&&<text fill='red' x={candidatePositions[328][0]} y={candidatePositions[328][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[329]&&<text fill='red' x={candidatePositions[329][0]} y={candidatePositions[329][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[330]&&<text fill='red' x={candidatePositions[330][0]} y={candidatePositions[330][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[331]&&<text fill='red' x={candidatePositions[331][0]} y={candidatePositions[331][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[332]&&<text fill='red' x={candidatePositions[332][0]} y={candidatePositions[332][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[333]&&<text fill='red' x={candidatePositions[333][0]} y={candidatePositions[333][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[334]&&<text fill='red' x={candidatePositions[334][0]} y={candidatePositions[334][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[335]&&<text fill='red' x={candidatePositions[335][0]} y={candidatePositions[335][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[336]&&<text fill='red' x={candidatePositions[336][0]} y={candidatePositions[336][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[337]&&<text fill='red' x={candidatePositions[337][0]} y={candidatePositions[337][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[338]&&<text fill='red' x={candidatePositions[338][0]} y={candidatePositions[338][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[339]&&<text fill='red' x={candidatePositions[339][0]} y={candidatePositions[339][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[340]&&<text fill='red' x={candidatePositions[340][0]} y={candidatePositions[340][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[341]&&<text fill='red' x={candidatePositions[341][0]} y={candidatePositions[341][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[342]&&<text fill='red' x={candidatePositions[342][0]} y={candidatePositions[342][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[343]&&<text fill='red' x={candidatePositions[343][0]} y={candidatePositions[343][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[344]&&<text fill='red' x={candidatePositions[344][0]} y={candidatePositions[344][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[345]&&<text fill='red' x={candidatePositions[345][0]} y={candidatePositions[345][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[346]&&<text fill='red' x={candidatePositions[346][0]} y={candidatePositions[346][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[347]&&<text fill='red' x={candidatePositions[347][0]} y={candidatePositions[347][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[348]&&<text fill='red' x={candidatePositions[348][0]} y={candidatePositions[348][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[349]&&<text fill='red' x={candidatePositions[349][0]} y={candidatePositions[349][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[350]&&<text fill='red' x={candidatePositions[350][0]} y={candidatePositions[350][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[351]&&<text fill='red' x={candidatePositions[351][0]} y={candidatePositions[351][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[352]&&<text fill='red' x={candidatePositions[352][0]} y={candidatePositions[352][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[353]&&<text fill='red' x={candidatePositions[353][0]} y={candidatePositions[353][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[354]&&<text fill='red' x={candidatePositions[354][0]} y={candidatePositions[354][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[355]&&<text fill='red' x={candidatePositions[355][0]} y={candidatePositions[355][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[356]&&<text fill='red' x={candidatePositions[356][0]} y={candidatePositions[356][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[357]&&<text fill='red' x={candidatePositions[357][0]} y={candidatePositions[357][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[358]&&<text fill='red' x={candidatePositions[358][0]} y={candidatePositions[358][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[359]&&<text fill='red' x={candidatePositions[359][0]} y={candidatePositions[359][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[360]&&<text fill='red' x={candidatePositions[360][0]} y={candidatePositions[360][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[361]&&<text fill='red' x={candidatePositions[361][0]} y={candidatePositions[361][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[362]&&<text fill='red' x={candidatePositions[362][0]} y={candidatePositions[362][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[363]&&<text fill='red' x={candidatePositions[363][0]} y={candidatePositions[363][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[364]&&<text fill='red' x={candidatePositions[364][0]} y={candidatePositions[364][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[365]&&<text fill='red' x={candidatePositions[365][0]} y={candidatePositions[365][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[366]&&<text fill='red' x={candidatePositions[366][0]} y={candidatePositions[366][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[367]&&<text fill='red' x={candidatePositions[367][0]} y={candidatePositions[367][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[368]&&<text fill='red' x={candidatePositions[368][0]} y={candidatePositions[368][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[369]&&<text fill='red' x={candidatePositions[369][0]} y={candidatePositions[369][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[370]&&<text fill='red' x={candidatePositions[370][0]} y={candidatePositions[370][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[371]&&<text fill='red' x={candidatePositions[371][0]} y={candidatePositions[371][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[372]&&<text fill='red' x={candidatePositions[372][0]} y={candidatePositions[372][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[373]&&<text fill='red' x={candidatePositions[373][0]} y={candidatePositions[373][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[374]&&<text fill='red' x={candidatePositions[374][0]} y={candidatePositions[374][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[375]&&<text fill='red' x={candidatePositions[375][0]} y={candidatePositions[375][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[376]&&<text fill='red' x={candidatePositions[376][0]} y={candidatePositions[376][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[377]&&<text fill='red' x={candidatePositions[377][0]} y={candidatePositions[377][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[378]&&<text fill='red' x={candidatePositions[378][0]} y={candidatePositions[378][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[379]&&<text fill='red' x={candidatePositions[379][0]} y={candidatePositions[379][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[380]&&<text fill='red' x={candidatePositions[380][0]} y={candidatePositions[380][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[381]&&<text fill='red' x={candidatePositions[381][0]} y={candidatePositions[381][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[382]&&<text fill='red' x={candidatePositions[382][0]} y={candidatePositions[382][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[383]&&<text fill='red' x={candidatePositions[383][0]} y={candidatePositions[383][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[384]&&<text fill='red' x={candidatePositions[384][0]} y={candidatePositions[384][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[385]&&<text fill='red' x={candidatePositions[385][0]} y={candidatePositions[385][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[386]&&<text fill='red' x={candidatePositions[386][0]} y={candidatePositions[386][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[387]&&<text fill='red' x={candidatePositions[387][0]} y={candidatePositions[387][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[388]&&<text fill='red' x={candidatePositions[388][0]} y={candidatePositions[388][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[389]&&<text fill='red' x={candidatePositions[389][0]} y={candidatePositions[389][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[390]&&<text fill='red' x={candidatePositions[390][0]} y={candidatePositions[390][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[391]&&<text fill='red' x={candidatePositions[391][0]} y={candidatePositions[391][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[392]&&<text fill='red' x={candidatePositions[392][0]} y={candidatePositions[392][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[393]&&<text fill='red' x={candidatePositions[393][0]} y={candidatePositions[393][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[394]&&<text fill='red' x={candidatePositions[394][0]} y={candidatePositions[394][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[395]&&<text fill='red' x={candidatePositions[395][0]} y={candidatePositions[395][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[396]&&<text fill='red' x={candidatePositions[396][0]} y={candidatePositions[396][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[397]&&<text fill='red' x={candidatePositions[397][0]} y={candidatePositions[397][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[398]&&<text fill='red' x={candidatePositions[398][0]} y={candidatePositions[398][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[399]&&<text fill='red' x={candidatePositions[399][0]} y={candidatePositions[399][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[400]&&<text fill='red' x={candidatePositions[400][0]} y={candidatePositions[400][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[401]&&<text fill='red' x={candidatePositions[401][0]} y={candidatePositions[401][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[402]&&<text fill='red' x={candidatePositions[402][0]} y={candidatePositions[402][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[403]&&<text fill='red' x={candidatePositions[403][0]} y={candidatePositions[403][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[404]&&<text fill='red' x={candidatePositions[404][0]} y={candidatePositions[404][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[405]&&<text fill='red' x={candidatePositions[405][0]} y={candidatePositions[405][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[406]&&<text fill='red' x={candidatePositions[406][0]} y={candidatePositions[406][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[407]&&<text fill='red' x={candidatePositions[407][0]} y={candidatePositions[407][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[408]&&<text fill='red' x={candidatePositions[408][0]} y={candidatePositions[408][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[409]&&<text fill='red' x={candidatePositions[409][0]} y={candidatePositions[409][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[410]&&<text fill='red' x={candidatePositions[410][0]} y={candidatePositions[410][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[411]&&<text fill='red' x={candidatePositions[411][0]} y={candidatePositions[411][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[412]&&<text fill='red' x={candidatePositions[412][0]} y={candidatePositions[412][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[413]&&<text fill='red' x={candidatePositions[413][0]} y={candidatePositions[413][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[414]&&<text fill='red' x={candidatePositions[414][0]} y={candidatePositions[414][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[415]&&<text fill='red' x={candidatePositions[415][0]} y={candidatePositions[415][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[416]&&<text fill='red' x={candidatePositions[416][0]} y={candidatePositions[416][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[417]&&<text fill='red' x={candidatePositions[417][0]} y={candidatePositions[417][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[418]&&<text fill='red' x={candidatePositions[418][0]} y={candidatePositions[418][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[419]&&<text fill='red' x={candidatePositions[419][0]} y={candidatePositions[419][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[420]&&<text fill='red' x={candidatePositions[420][0]} y={candidatePositions[420][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[421]&&<text fill='red' x={candidatePositions[421][0]} y={candidatePositions[421][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[422]&&<text fill='red' x={candidatePositions[422][0]} y={candidatePositions[422][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[423]&&<text fill='red' x={candidatePositions[423][0]} y={candidatePositions[423][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[424]&&<text fill='red' x={candidatePositions[424][0]} y={candidatePositions[424][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[425]&&<text fill='red' x={candidatePositions[425][0]} y={candidatePositions[425][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[426]&&<text fill='red' x={candidatePositions[426][0]} y={candidatePositions[426][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[427]&&<text fill='red' x={candidatePositions[427][0]} y={candidatePositions[427][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[428]&&<text fill='red' x={candidatePositions[428][0]} y={candidatePositions[428][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[429]&&<text fill='red' x={candidatePositions[429][0]} y={candidatePositions[429][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[430]&&<text fill='red' x={candidatePositions[430][0]} y={candidatePositions[430][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[431]&&<text fill='red' x={candidatePositions[431][0]} y={candidatePositions[431][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[432]&&<text fill='red' x={candidatePositions[432][0]} y={candidatePositions[432][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[433]&&<text fill='red' x={candidatePositions[433][0]} y={candidatePositions[433][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[434]&&<text fill='red' x={candidatePositions[434][0]} y={candidatePositions[434][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[435]&&<text fill='red' x={candidatePositions[435][0]} y={candidatePositions[435][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[436]&&<text fill='red' x={candidatePositions[436][0]} y={candidatePositions[436][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[437]&&<text fill='red' x={candidatePositions[437][0]} y={candidatePositions[437][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[438]&&<text fill='red' x={candidatePositions[438][0]} y={candidatePositions[438][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[439]&&<text fill='red' x={candidatePositions[439][0]} y={candidatePositions[439][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[440]&&<text fill='red' x={candidatePositions[440][0]} y={candidatePositions[440][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[441]&&<text fill='red' x={candidatePositions[441][0]} y={candidatePositions[441][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[442]&&<text fill='red' x={candidatePositions[442][0]} y={candidatePositions[442][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[443]&&<text fill='red' x={candidatePositions[443][0]} y={candidatePositions[443][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[444]&&<text fill='red' x={candidatePositions[444][0]} y={candidatePositions[444][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[445]&&<text fill='red' x={candidatePositions[445][0]} y={candidatePositions[445][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[446]&&<text fill='red' x={candidatePositions[446][0]} y={candidatePositions[446][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[447]&&<text fill='red' x={candidatePositions[447][0]} y={candidatePositions[447][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[448]&&<text fill='red' x={candidatePositions[448][0]} y={candidatePositions[448][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[449]&&<text fill='red' x={candidatePositions[449][0]} y={candidatePositions[449][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[450]&&<text fill='red' x={candidatePositions[450][0]} y={candidatePositions[450][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[451]&&<text fill='red' x={candidatePositions[451][0]} y={candidatePositions[451][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[452]&&<text fill='red' x={candidatePositions[452][0]} y={candidatePositions[452][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[453]&&<text fill='red' x={candidatePositions[453][0]} y={candidatePositions[453][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[454]&&<text fill='red' x={candidatePositions[454][0]} y={candidatePositions[454][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[455]&&<text fill='red' x={candidatePositions[455][0]} y={candidatePositions[455][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[456]&&<text fill='red' x={candidatePositions[456][0]} y={candidatePositions[456][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[457]&&<text fill='red' x={candidatePositions[457][0]} y={candidatePositions[457][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[458]&&<text fill='red' x={candidatePositions[458][0]} y={candidatePositions[458][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[459]&&<text fill='red' x={candidatePositions[459][0]} y={candidatePositions[459][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[460]&&<text fill='red' x={candidatePositions[460][0]} y={candidatePositions[460][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[461]&&<text fill='red' x={candidatePositions[461][0]} y={candidatePositions[461][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[462]&&<text fill='red' x={candidatePositions[462][0]} y={candidatePositions[462][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[463]&&<text fill='red' x={candidatePositions[463][0]} y={candidatePositions[463][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[464]&&<text fill='red' x={candidatePositions[464][0]} y={candidatePositions[464][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[465]&&<text fill='red' x={candidatePositions[465][0]} y={candidatePositions[465][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[466]&&<text fill='red' x={candidatePositions[466][0]} y={candidatePositions[466][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[467]&&<text fill='red' x={candidatePositions[467][0]} y={candidatePositions[467][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[468]&&<text fill='red' x={candidatePositions[468][0]} y={candidatePositions[468][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[469]&&<text fill='red' x={candidatePositions[469][0]} y={candidatePositions[469][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[470]&&<text fill='red' x={candidatePositions[470][0]} y={candidatePositions[470][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[471]&&<text fill='red' x={candidatePositions[471][0]} y={candidatePositions[471][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[472]&&<text fill='red' x={candidatePositions[472][0]} y={candidatePositions[472][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[473]&&<text fill='red' x={candidatePositions[473][0]} y={candidatePositions[473][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[474]&&<text fill='red' x={candidatePositions[474][0]} y={candidatePositions[474][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[475]&&<text fill='red' x={candidatePositions[475][0]} y={candidatePositions[475][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[476]&&<text fill='red' x={candidatePositions[476][0]} y={candidatePositions[476][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[477]&&<text fill='red' x={candidatePositions[477][0]} y={candidatePositions[477][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[478]&&<text fill='red' x={candidatePositions[478][0]} y={candidatePositions[478][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[479]&&<text fill='red' x={candidatePositions[479][0]} y={candidatePositions[479][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[480]&&<text fill='red' x={candidatePositions[480][0]} y={candidatePositions[480][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[481]&&<text fill='red' x={candidatePositions[481][0]} y={candidatePositions[481][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[482]&&<text fill='red' x={candidatePositions[482][0]} y={candidatePositions[482][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[483]&&<text fill='red' x={candidatePositions[483][0]} y={candidatePositions[483][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[484]&&<text fill='red' x={candidatePositions[484][0]} y={candidatePositions[484][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[485]&&<text fill='red' x={candidatePositions[485][0]} y={candidatePositions[485][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[486]&&<text fill='red' x={candidatePositions[486][0]} y={candidatePositions[486][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[487]&&<text fill='red' x={candidatePositions[487][0]} y={candidatePositions[487][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[488]&&<text fill='red' x={candidatePositions[488][0]} y={candidatePositions[488][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[489]&&<text fill='red' x={candidatePositions[489][0]} y={candidatePositions[489][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[490]&&<text fill='red' x={candidatePositions[490][0]} y={candidatePositions[490][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[491]&&<text fill='red' x={candidatePositions[491][0]} y={candidatePositions[491][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[492]&&<text fill='red' x={candidatePositions[492][0]} y={candidatePositions[492][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[493]&&<text fill='red' x={candidatePositions[493][0]} y={candidatePositions[493][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[494]&&<text fill='red' x={candidatePositions[494][0]} y={candidatePositions[494][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[495]&&<text fill='red' x={candidatePositions[495][0]} y={candidatePositions[495][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[496]&&<text fill='red' x={candidatePositions[496][0]} y={candidatePositions[496][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[497]&&<text fill='red' x={candidatePositions[497][0]} y={candidatePositions[497][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[498]&&<text fill='red' x={candidatePositions[498][0]} y={candidatePositions[498][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[499]&&<text fill='red' x={candidatePositions[499][0]} y={candidatePositions[499][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[500]&&<text fill='red' x={candidatePositions[500][0]} y={candidatePositions[500][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[501]&&<text fill='red' x={candidatePositions[501][0]} y={candidatePositions[501][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[502]&&<text fill='red' x={candidatePositions[502][0]} y={candidatePositions[502][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[503]&&<text fill='red' x={candidatePositions[503][0]} y={candidatePositions[503][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[504]&&<text fill='red' x={candidatePositions[504][0]} y={candidatePositions[504][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[505]&&<text fill='red' x={candidatePositions[505][0]} y={candidatePositions[505][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[506]&&<text fill='red' x={candidatePositions[506][0]} y={candidatePositions[506][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[507]&&<text fill='red' x={candidatePositions[507][0]} y={candidatePositions[507][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[508]&&<text fill='red' x={candidatePositions[508][0]} y={candidatePositions[508][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[509]&&<text fill='red' x={candidatePositions[509][0]} y={candidatePositions[509][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[510]&&<text fill='red' x={candidatePositions[510][0]} y={candidatePositions[510][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[511]&&<text fill='red' x={candidatePositions[511][0]} y={candidatePositions[511][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[512]&&<text fill='red' x={candidatePositions[512][0]} y={candidatePositions[512][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[513]&&<text fill='red' x={candidatePositions[513][0]} y={candidatePositions[513][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[514]&&<text fill='red' x={candidatePositions[514][0]} y={candidatePositions[514][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[515]&&<text fill='red' x={candidatePositions[515][0]} y={candidatePositions[515][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[516]&&<text fill='red' x={candidatePositions[516][0]} y={candidatePositions[516][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[517]&&<text fill='red' x={candidatePositions[517][0]} y={candidatePositions[517][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[518]&&<text fill='red' x={candidatePositions[518][0]} y={candidatePositions[518][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[519]&&<text fill='red' x={candidatePositions[519][0]} y={candidatePositions[519][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[520]&&<text fill='red' x={candidatePositions[520][0]} y={candidatePositions[520][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[521]&&<text fill='red' x={candidatePositions[521][0]} y={candidatePositions[521][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[522]&&<text fill='red' x={candidatePositions[522][0]} y={candidatePositions[522][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[523]&&<text fill='red' x={candidatePositions[523][0]} y={candidatePositions[523][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[524]&&<text fill='red' x={candidatePositions[524][0]} y={candidatePositions[524][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[525]&&<text fill='red' x={candidatePositions[525][0]} y={candidatePositions[525][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[526]&&<text fill='red' x={candidatePositions[526][0]} y={candidatePositions[526][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[527]&&<text fill='red' x={candidatePositions[527][0]} y={candidatePositions[527][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[528]&&<text fill='red' x={candidatePositions[528][0]} y={candidatePositions[528][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[529]&&<text fill='red' x={candidatePositions[529][0]} y={candidatePositions[529][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[530]&&<text fill='red' x={candidatePositions[530][0]} y={candidatePositions[530][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[531]&&<text fill='red' x={candidatePositions[531][0]} y={candidatePositions[531][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[532]&&<text fill='red' x={candidatePositions[532][0]} y={candidatePositions[532][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[533]&&<text fill='red' x={candidatePositions[533][0]} y={candidatePositions[533][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[534]&&<text fill='red' x={candidatePositions[534][0]} y={candidatePositions[534][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[535]&&<text fill='red' x={candidatePositions[535][0]} y={candidatePositions[535][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[536]&&<text fill='red' x={candidatePositions[536][0]} y={candidatePositions[536][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[537]&&<text fill='red' x={candidatePositions[537][0]} y={candidatePositions[537][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[538]&&<text fill='red' x={candidatePositions[538][0]} y={candidatePositions[538][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[539]&&<text fill='red' x={candidatePositions[539][0]} y={candidatePositions[539][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[540]&&<text fill='red' x={candidatePositions[540][0]} y={candidatePositions[540][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[541]&&<text fill='red' x={candidatePositions[541][0]} y={candidatePositions[541][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[542]&&<text fill='red' x={candidatePositions[542][0]} y={candidatePositions[542][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[543]&&<text fill='red' x={candidatePositions[543][0]} y={candidatePositions[543][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[544]&&<text fill='red' x={candidatePositions[544][0]} y={candidatePositions[544][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[545]&&<text fill='red' x={candidatePositions[545][0]} y={candidatePositions[545][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[546]&&<text fill='red' x={candidatePositions[546][0]} y={candidatePositions[546][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[547]&&<text fill='red' x={candidatePositions[547][0]} y={candidatePositions[547][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[548]&&<text fill='red' x={candidatePositions[548][0]} y={candidatePositions[548][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[549]&&<text fill='red' x={candidatePositions[549][0]} y={candidatePositions[549][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[550]&&<text fill='red' x={candidatePositions[550][0]} y={candidatePositions[550][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[551]&&<text fill='red' x={candidatePositions[551][0]} y={candidatePositions[551][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[552]&&<text fill='red' x={candidatePositions[552][0]} y={candidatePositions[552][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[553]&&<text fill='red' x={candidatePositions[553][0]} y={candidatePositions[553][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[554]&&<text fill='red' x={candidatePositions[554][0]} y={candidatePositions[554][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[555]&&<text fill='red' x={candidatePositions[555][0]} y={candidatePositions[555][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[556]&&<text fill='red' x={candidatePositions[556][0]} y={candidatePositions[556][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[557]&&<text fill='red' x={candidatePositions[557][0]} y={candidatePositions[557][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[558]&&<text fill='red' x={candidatePositions[558][0]} y={candidatePositions[558][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[559]&&<text fill='red' x={candidatePositions[559][0]} y={candidatePositions[559][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[560]&&<text fill='red' x={candidatePositions[560][0]} y={candidatePositions[560][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[561]&&<text fill='red' x={candidatePositions[561][0]} y={candidatePositions[561][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[562]&&<text fill='red' x={candidatePositions[562][0]} y={candidatePositions[562][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[563]&&<text fill='red' x={candidatePositions[563][0]} y={candidatePositions[563][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[564]&&<text fill='red' x={candidatePositions[564][0]} y={candidatePositions[564][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[565]&&<text fill='red' x={candidatePositions[565][0]} y={candidatePositions[565][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[566]&&<text fill='red' x={candidatePositions[566][0]} y={candidatePositions[566][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[567]&&<text fill='red' x={candidatePositions[567][0]} y={candidatePositions[567][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[568]&&<text fill='red' x={candidatePositions[568][0]} y={candidatePositions[568][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[569]&&<text fill='red' x={candidatePositions[569][0]} y={candidatePositions[569][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[570]&&<text fill='red' x={candidatePositions[570][0]} y={candidatePositions[570][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[571]&&<text fill='red' x={candidatePositions[571][0]} y={candidatePositions[571][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[572]&&<text fill='red' x={candidatePositions[572][0]} y={candidatePositions[572][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[573]&&<text fill='red' x={candidatePositions[573][0]} y={candidatePositions[573][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[574]&&<text fill='red' x={candidatePositions[574][0]} y={candidatePositions[574][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[575]&&<text fill='red' x={candidatePositions[575][0]} y={candidatePositions[575][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[576]&&<text fill='red' x={candidatePositions[576][0]} y={candidatePositions[576][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[577]&&<text fill='red' x={candidatePositions[577][0]} y={candidatePositions[577][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[578]&&<text fill='red' x={candidatePositions[578][0]} y={candidatePositions[578][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[579]&&<text fill='red' x={candidatePositions[579][0]} y={candidatePositions[579][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[580]&&<text fill='red' x={candidatePositions[580][0]} y={candidatePositions[580][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[581]&&<text fill='red' x={candidatePositions[581][0]} y={candidatePositions[581][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[582]&&<text fill='red' x={candidatePositions[582][0]} y={candidatePositions[582][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[583]&&<text fill='red' x={candidatePositions[583][0]} y={candidatePositions[583][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[584]&&<text fill='red' x={candidatePositions[584][0]} y={candidatePositions[584][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[585]&&<text fill='red' x={candidatePositions[585][0]} y={candidatePositions[585][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[586]&&<text fill='red' x={candidatePositions[586][0]} y={candidatePositions[586][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[587]&&<text fill='red' x={candidatePositions[587][0]} y={candidatePositions[587][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[588]&&<text fill='red' x={candidatePositions[588][0]} y={candidatePositions[588][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[589]&&<text fill='red' x={candidatePositions[589][0]} y={candidatePositions[589][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[590]&&<text fill='red' x={candidatePositions[590][0]} y={candidatePositions[590][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[591]&&<text fill='red' x={candidatePositions[591][0]} y={candidatePositions[591][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[592]&&<text fill='red' x={candidatePositions[592][0]} y={candidatePositions[592][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[593]&&<text fill='red' x={candidatePositions[593][0]} y={candidatePositions[593][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[594]&&<text fill='red' x={candidatePositions[594][0]} y={candidatePositions[594][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[595]&&<text fill='red' x={candidatePositions[595][0]} y={candidatePositions[595][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[596]&&<text fill='red' x={candidatePositions[596][0]} y={candidatePositions[596][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[597]&&<text fill='red' x={candidatePositions[597][0]} y={candidatePositions[597][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[598]&&<text fill='red' x={candidatePositions[598][0]} y={candidatePositions[598][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[599]&&<text fill='red' x={candidatePositions[599][0]} y={candidatePositions[599][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[600]&&<text fill='red' x={candidatePositions[600][0]} y={candidatePositions[600][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[601]&&<text fill='red' x={candidatePositions[601][0]} y={candidatePositions[601][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[602]&&<text fill='red' x={candidatePositions[602][0]} y={candidatePositions[602][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[603]&&<text fill='red' x={candidatePositions[603][0]} y={candidatePositions[603][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[604]&&<text fill='red' x={candidatePositions[604][0]} y={candidatePositions[604][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[605]&&<text fill='red' x={candidatePositions[605][0]} y={candidatePositions[605][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[606]&&<text fill='red' x={candidatePositions[606][0]} y={candidatePositions[606][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[607]&&<text fill='red' x={candidatePositions[607][0]} y={candidatePositions[607][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[608]&&<text fill='red' x={candidatePositions[608][0]} y={candidatePositions[608][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[609]&&<text fill='red' x={candidatePositions[609][0]} y={candidatePositions[609][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[610]&&<text fill='red' x={candidatePositions[610][0]} y={candidatePositions[610][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[611]&&<text fill='red' x={candidatePositions[611][0]} y={candidatePositions[611][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[612]&&<text fill='red' x={candidatePositions[612][0]} y={candidatePositions[612][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[613]&&<text fill='red' x={candidatePositions[613][0]} y={candidatePositions[613][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[614]&&<text fill='red' x={candidatePositions[614][0]} y={candidatePositions[614][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[615]&&<text fill='red' x={candidatePositions[615][0]} y={candidatePositions[615][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[616]&&<text fill='red' x={candidatePositions[616][0]} y={candidatePositions[616][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[617]&&<text fill='red' x={candidatePositions[617][0]} y={candidatePositions[617][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[618]&&<text fill='red' x={candidatePositions[618][0]} y={candidatePositions[618][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[619]&&<text fill='red' x={candidatePositions[619][0]} y={candidatePositions[619][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[620]&&<text fill='red' x={candidatePositions[620][0]} y={candidatePositions[620][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[621]&&<text fill='red' x={candidatePositions[621][0]} y={candidatePositions[621][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[622]&&<text fill='red' x={candidatePositions[622][0]} y={candidatePositions[622][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[623]&&<text fill='red' x={candidatePositions[623][0]} y={candidatePositions[623][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[624]&&<text fill='red' x={candidatePositions[624][0]} y={candidatePositions[624][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[625]&&<text fill='red' x={candidatePositions[625][0]} y={candidatePositions[625][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[626]&&<text fill='red' x={candidatePositions[626][0]} y={candidatePositions[626][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[627]&&<text fill='red' x={candidatePositions[627][0]} y={candidatePositions[627][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[628]&&<text fill='red' x={candidatePositions[628][0]} y={candidatePositions[628][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[629]&&<text fill='red' x={candidatePositions[629][0]} y={candidatePositions[629][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[630]&&<text fill='red' x={candidatePositions[630][0]} y={candidatePositions[630][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[631]&&<text fill='red' x={candidatePositions[631][0]} y={candidatePositions[631][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[632]&&<text fill='red' x={candidatePositions[632][0]} y={candidatePositions[632][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[633]&&<text fill='red' x={candidatePositions[633][0]} y={candidatePositions[633][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[634]&&<text fill='red' x={candidatePositions[634][0]} y={candidatePositions[634][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[635]&&<text fill='red' x={candidatePositions[635][0]} y={candidatePositions[635][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[636]&&<text fill='red' x={candidatePositions[636][0]} y={candidatePositions[636][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[637]&&<text fill='red' x={candidatePositions[637][0]} y={candidatePositions[637][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[638]&&<text fill='red' x={candidatePositions[638][0]} y={candidatePositions[638][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[639]&&<text fill='red' x={candidatePositions[639][0]} y={candidatePositions[639][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[640]&&<text fill='red' x={candidatePositions[640][0]} y={candidatePositions[640][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[641]&&<text fill='red' x={candidatePositions[641][0]} y={candidatePositions[641][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[642]&&<text fill='red' x={candidatePositions[642][0]} y={candidatePositions[642][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[643]&&<text fill='red' x={candidatePositions[643][0]} y={candidatePositions[643][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[644]&&<text fill='red' x={candidatePositions[644][0]} y={candidatePositions[644][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[645]&&<text fill='red' x={candidatePositions[645][0]} y={candidatePositions[645][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[646]&&<text fill='red' x={candidatePositions[646][0]} y={candidatePositions[646][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[647]&&<text fill='red' x={candidatePositions[647][0]} y={candidatePositions[647][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[648]&&<text fill='red' x={candidatePositions[648][0]} y={candidatePositions[648][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[649]&&<text fill='red' x={candidatePositions[649][0]} y={candidatePositions[649][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[650]&&<text fill='red' x={candidatePositions[650][0]} y={candidatePositions[650][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[651]&&<text fill='red' x={candidatePositions[651][0]} y={candidatePositions[651][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[652]&&<text fill='red' x={candidatePositions[652][0]} y={candidatePositions[652][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[653]&&<text fill='red' x={candidatePositions[653][0]} y={candidatePositions[653][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[654]&&<text fill='red' x={candidatePositions[654][0]} y={candidatePositions[654][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[655]&&<text fill='red' x={candidatePositions[655][0]} y={candidatePositions[655][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[656]&&<text fill='red' x={candidatePositions[656][0]} y={candidatePositions[656][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[657]&&<text fill='red' x={candidatePositions[657][0]} y={candidatePositions[657][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[658]&&<text fill='red' x={candidatePositions[658][0]} y={candidatePositions[658][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[659]&&<text fill='red' x={candidatePositions[659][0]} y={candidatePositions[659][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[660]&&<text fill='red' x={candidatePositions[660][0]} y={candidatePositions[660][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[661]&&<text fill='red' x={candidatePositions[661][0]} y={candidatePositions[661][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[662]&&<text fill='red' x={candidatePositions[662][0]} y={candidatePositions[662][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[663]&&<text fill='red' x={candidatePositions[663][0]} y={candidatePositions[663][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[664]&&<text fill='red' x={candidatePositions[664][0]} y={candidatePositions[664][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[665]&&<text fill='red' x={candidatePositions[665][0]} y={candidatePositions[665][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[666]&&<text fill='red' x={candidatePositions[666][0]} y={candidatePositions[666][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[667]&&<text fill='red' x={candidatePositions[667][0]} y={candidatePositions[667][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[668]&&<text fill='red' x={candidatePositions[668][0]} y={candidatePositions[668][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[669]&&<text fill='red' x={candidatePositions[669][0]} y={candidatePositions[669][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[670]&&<text fill='red' x={candidatePositions[670][0]} y={candidatePositions[670][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[671]&&<text fill='red' x={candidatePositions[671][0]} y={candidatePositions[671][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[672]&&<text fill='red' x={candidatePositions[672][0]} y={candidatePositions[672][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[673]&&<text fill='red' x={candidatePositions[673][0]} y={candidatePositions[673][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[674]&&<text fill='red' x={candidatePositions[674][0]} y={candidatePositions[674][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[675]&&<text fill='red' x={candidatePositions[675][0]} y={candidatePositions[675][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[676]&&<text fill='red' x={candidatePositions[676][0]} y={candidatePositions[676][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[677]&&<text fill='red' x={candidatePositions[677][0]} y={candidatePositions[677][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[678]&&<text fill='red' x={candidatePositions[678][0]} y={candidatePositions[678][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[679]&&<text fill='red' x={candidatePositions[679][0]} y={candidatePositions[679][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[680]&&<text fill='red' x={candidatePositions[680][0]} y={candidatePositions[680][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[681]&&<text fill='red' x={candidatePositions[681][0]} y={candidatePositions[681][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[682]&&<text fill='red' x={candidatePositions[682][0]} y={candidatePositions[682][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[683]&&<text fill='red' x={candidatePositions[683][0]} y={candidatePositions[683][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[684]&&<text fill='red' x={candidatePositions[684][0]} y={candidatePositions[684][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[685]&&<text fill='red' x={candidatePositions[685][0]} y={candidatePositions[685][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[686]&&<text fill='red' x={candidatePositions[686][0]} y={candidatePositions[686][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[687]&&<text fill='red' x={candidatePositions[687][0]} y={candidatePositions[687][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[688]&&<text fill='red' x={candidatePositions[688][0]} y={candidatePositions[688][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[689]&&<text fill='red' x={candidatePositions[689][0]} y={candidatePositions[689][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[690]&&<text fill='red' x={candidatePositions[690][0]} y={candidatePositions[690][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[691]&&<text fill='red' x={candidatePositions[691][0]} y={candidatePositions[691][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[692]&&<text fill='red' x={candidatePositions[692][0]} y={candidatePositions[692][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[693]&&<text fill='red' x={candidatePositions[693][0]} y={candidatePositions[693][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[694]&&<text fill='red' x={candidatePositions[694][0]} y={candidatePositions[694][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[695]&&<text fill='red' x={candidatePositions[695][0]} y={candidatePositions[695][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[696]&&<text fill='red' x={candidatePositions[696][0]} y={candidatePositions[696][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[697]&&<text fill='red' x={candidatePositions[697][0]} y={candidatePositions[697][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[698]&&<text fill='red' x={candidatePositions[698][0]} y={candidatePositions[698][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[699]&&<text fill='red' x={candidatePositions[699][0]} y={candidatePositions[699][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[700]&&<text fill='red' x={candidatePositions[700][0]} y={candidatePositions[700][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[701]&&<text fill='red' x={candidatePositions[701][0]} y={candidatePositions[701][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[702]&&<text fill='red' x={candidatePositions[702][0]} y={candidatePositions[702][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[703]&&<text fill='red' x={candidatePositions[703][0]} y={candidatePositions[703][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[704]&&<text fill='red' x={candidatePositions[704][0]} y={candidatePositions[704][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[705]&&<text fill='red' x={candidatePositions[705][0]} y={candidatePositions[705][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[706]&&<text fill='red' x={candidatePositions[706][0]} y={candidatePositions[706][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[707]&&<text fill='red' x={candidatePositions[707][0]} y={candidatePositions[707][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[708]&&<text fill='red' x={candidatePositions[708][0]} y={candidatePositions[708][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[709]&&<text fill='red' x={candidatePositions[709][0]} y={candidatePositions[709][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[710]&&<text fill='red' x={candidatePositions[710][0]} y={candidatePositions[710][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[711]&&<text fill='red' x={candidatePositions[711][0]} y={candidatePositions[711][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[712]&&<text fill='red' x={candidatePositions[712][0]} y={candidatePositions[712][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[713]&&<text fill='red' x={candidatePositions[713][0]} y={candidatePositions[713][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[714]&&<text fill='red' x={candidatePositions[714][0]} y={candidatePositions[714][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[715]&&<text fill='red' x={candidatePositions[715][0]} y={candidatePositions[715][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[716]&&<text fill='red' x={candidatePositions[716][0]} y={candidatePositions[716][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[717]&&<text fill='red' x={candidatePositions[717][0]} y={candidatePositions[717][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[718]&&<text fill='red' x={candidatePositions[718][0]} y={candidatePositions[718][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[719]&&<text fill='red' x={candidatePositions[719][0]} y={candidatePositions[719][1]} fontSize="0.2">9</text>}
                {flagCandidates&&candidateMatrix[720]&&<text fill='red' x={candidatePositions[720][0]} y={candidatePositions[720][1]} fontSize="0.2">1</text>}
                {flagCandidates&&candidateMatrix[721]&&<text fill='red' x={candidatePositions[721][0]} y={candidatePositions[721][1]} fontSize="0.2">2</text>}
                {flagCandidates&&candidateMatrix[722]&&<text fill='red' x={candidatePositions[722][0]} y={candidatePositions[722][1]} fontSize="0.2">3</text>}
                {flagCandidates&&candidateMatrix[723]&&<text fill='red' x={candidatePositions[723][0]} y={candidatePositions[723][1]} fontSize="0.2">4</text>}
                {flagCandidates&&candidateMatrix[724]&&<text fill='red' x={candidatePositions[724][0]} y={candidatePositions[724][1]} fontSize="0.2">5</text>}
                {flagCandidates&&candidateMatrix[725]&&<text fill='red' x={candidatePositions[725][0]} y={candidatePositions[725][1]} fontSize="0.2">6</text>}
                {flagCandidates&&candidateMatrix[726]&&<text fill='red' x={candidatePositions[726][0]} y={candidatePositions[726][1]} fontSize="0.2">7</text>}
                {flagCandidates&&candidateMatrix[727]&&<text fill='red' x={candidatePositions[727][0]} y={candidatePositions[727][1]} fontSize="0.2">8</text>}
                {flagCandidates&&candidateMatrix[728]&&<text fill='red' x={candidatePositions[728][0]} y={candidatePositions[728][1]} fontSize="0.2">9</text>}
            </svg>
        </div>
    );
}

export default SudokuResolver