import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reducer, StateProvider } from "./state";
import App from './App';
import store from './state2/store';
import 'semantic-ui-css/semantic.min.css';



ReactDOM.render(
    <StateProvider reducer={reducer}>
        <Provider store={store}>
            <App />
        </Provider>
    </StateProvider>,
    document.getElementById('root')
);
