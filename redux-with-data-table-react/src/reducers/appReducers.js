import { combineReducers } from 'redux';
import oneViewTabChange from './oneViewTabChange.js';
import RoasterActionsReducer from './RoasterActionsReducer';

const appReducers = combineReducers({
	oneViewTabChange,
    RoasterActionsReducer
})
export default appReducers;