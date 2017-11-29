import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import appReducers from './reducers/appReducers';

let store = createStore(appReducers);
ReactDOM.render(
	<Provider store = {store} >
	<App />
	</Provider>, document.getElementById('root')
);
registerServiceWorker();
