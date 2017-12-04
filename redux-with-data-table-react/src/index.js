import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

const StoreInstance = Store();
ReactDOM.render(
	<Provider store = {StoreInstance} >
	<App />
	</Provider>, document.getElementById('root')
);
registerServiceWorker();
