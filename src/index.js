import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App history={history}/>
);
