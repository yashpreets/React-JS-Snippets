import { combineReducers } from 'redux';
import oneViewTabChange from './oneViewTabChange.js';
import RoasterActionsReducer from './RoasterActionsReducer';
import EmployeeSearchReducer from './EmployeeSearchReducer';

const appReducers = combineReducers({
	oneViewTabChange,
    RoasterActionsReducer,
    EmployeeSearchReducer
})
export default appReducers;