import { createStore } from 'redux';
import appReducers from  './reducers/appReducers';
export default(initialState) => {
    return createStore(appReducers, initialState);
}