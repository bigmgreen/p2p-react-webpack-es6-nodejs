import React from 'react';
import ReactDOM from 'react-dom';

export default class App {
    static render(app) {
        ReactDOM.render(app, document.getElementById('app'));
    }
}