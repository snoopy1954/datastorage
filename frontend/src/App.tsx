import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Container } from "semantic-ui-react";
import { styleButton }from './constants';

import { RootState } from './state/store';
import { setPage } from './state/page/actions';
import { Page } from './state/page/types';
import { initializeInfos } from './state/info/infos/actions';

import { checkService } from "./services/ping";

import { AppHeaderH1WithClick } from "./components/basic/header";
import { AppFooter } from "./components/basic/footer";

import Home from "./components/home";
import Pressure from "./components/pressure";
import Axa from './components/axa';
import Sport from './components/sport';
import Network from "./components/network";
import Movie from "./components/movie";
import Book from "./components/book";
import Music from "./components/music";
import Address from "./components/address";
import Sudoku from './components/sudoku';
import Account from './components/account';
import Recipe from './components/recipe';
import Document from './components/document';
import Info from './components/info';


const App: React.FC = () => {
    const dispatch = useDispatch();
    const mainpage = useSelector((state: RootState) => state.page.mainpage);      

    React.useEffect(() => {
        checkService();
        const page: Page = { mainpage: 'home', subpage: '' };
        dispatch(setPage(page));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(initializeInfos());
    }, [dispatch]);
    
    const handleSelection = (selected: string) => {
        const page: Page = { mainpage: selected, subpage: '' };
        dispatch(setPage(page));
    };

    const handleHome = () => {
        const page: Page = { mainpage: 'home', subpage: '' };
        dispatch(setPage(page));
    };

    return (
        <Router>
            <Container fluid>
                <AppHeaderH1WithClick text='Datenbanken' icon='database' onClick={handleHome}/>
                <Button style={styleButton} onClick={() => handleSelection('document')}>Dokument</Button>
                <Button style={styleButton} onClick={() => handleSelection('account')}>Konto</Button>
                <Button style={styleButton} onClick={() => handleSelection('axa')}>AXA</Button>
                <Button style={styleButton} onClick={() => handleSelection('pressure')}>Blutdruck</Button>
                <Button style={styleButton} onClick={() => handleSelection('sport')}>Sport</Button>
                <Button style={styleButton} onClick={() => handleSelection('address')}>Adresse</Button>
                <Button style={styleButton} onClick={() => handleSelection('network')}>Netzwerk</Button>
                <Button style={styleButton} onClick={() => handleSelection('recipe')}>Rezept</Button>
                <Button style={styleButton} onClick={() => handleSelection('movie')}>Film</Button>
                <Button style={styleButton} onClick={() => handleSelection('book')}>Buch</Button>
                <Button style={styleButton} onClick={() => handleSelection('music')}>Musik</Button>
                <Button style={styleButton} onClick={() => handleSelection('sudoku')}>Sudoku</Button>
            </Container>
            <Container fluid>
                {mainpage==='home'&&<Home/>}
                {mainpage==='document'&&<Document/>}
                {mainpage==='account'&&<Account/>}
                {mainpage==='recipe'&&<Recipe/>}
                {mainpage==='address'&&<Address/>}
                {mainpage==='network'&&<Network/>}
                {mainpage==='pressure'&&<Pressure/>}
                {mainpage==='sport'&&<Sport/>}
                {mainpage==='axa'&&<Axa/>}
                {mainpage==='movie'&&<Movie/>}
                {mainpage==='book'&&<Book/>}
                {mainpage==='music'&&<Music/>}
                {mainpage==='sudoku'&&<Sudoku/>}
                {mainpage==='info'&&<Info/>}
            </Container>
            <Divider/>
            <AppFooter/>
        </Router>
    );
};

export default App;
