import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Container } from "semantic-ui-react";

import { RootState } from './state2/store';
import { setMainpage } from './state2/mainpage/actions';
import { Page } from './state2/mainpage/types';

import { checkService } from "./services/ping";

import { AppHeaderH1 } from "./components/basic/header";
import { AppMenu, Item } from "./components/basic/menu";
import AppFooter from "./components/basic/footer";

import { backgroundColor, styleMainMenu } from "./constants";

import Home from "./components/home";
import Pressure from "./components/pressure";
import Network from "./components/network";
import Movie from "./components/movie";
import Book from "./components/book";
import Address from "./components/address";


const App: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        checkService();
        const page: Page = { name: 'home' };
        dispatch(setMainpage(page));
    }, [dispatch]);

    const handleSelection = (selected: string) => {
        const page: Page = { name: selected };
        dispatch(setMainpage(page));
    };

    const buttons: Item[] = 
    [
      {
        name: 'home',
        title: 'Home',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'address',
        title: 'Adresse',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'network',
        title: 'Netzwerk',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'pressure',
        title: 'Blutdruck',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'movie',
        title: 'Film',
        color: 'blue',
        onClick: handleSelection
      },
      {
        name: 'book',
        title: 'Buch',
        color: 'blue',
        onClick: handleSelection
      },      
    ];

    const mainpage = useSelector((state: RootState) => state.mainpage.name);      

    return (
        <div className="App">
            <Router>
                <Container style={{ background: backgroundColor }}>
                    <AppHeaderH1 text='Datenablagen' icon='database'/>
                    <AppMenu menuItems={buttons} style={styleMainMenu} backgroundColor={backgroundColor}/>
                    <Divider/>
                    {mainpage==='home'&&<Home/>}
                    {mainpage==='address'&&<Address/>}
                    {mainpage==='network'&&<Network/>}
                    {mainpage==='pressure'&&<Pressure/>}
                    {mainpage==='movie'&&<Movie/>}
                    {mainpage==='book'&&<Book/>}
                    <Divider/>
                    <AppFooter/>
                </Container>
            </Router>
        </div>
    );
}

export default App;
