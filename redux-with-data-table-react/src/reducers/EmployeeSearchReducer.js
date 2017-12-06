import ActionList from '../actions/ActionList';
let defaultState = {

};
export const EmployeeSearchReducer = (state = defaultState, action) => {
    switch(action.type){
        case ActionList.REDIRECT_MASTER_DATA_LOADED:
            return Object.assign({}, state, {
                loaded:action.loaded,
            });
        default: return state;
    }
}
export default EmployeeSearchReducer;