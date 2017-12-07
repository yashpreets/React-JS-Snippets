import ActionList from '../actions/ActionList';
let defaultState = {

};
export const RoasterActionsReducer = (state = defaultState, action) => {
    switch(action.type){
        case ActionList.WEEKLY_ROASTER_SUCCESS :
            return Object.assign({}, state, {
                dashboardData: action.dashboardData,
                columns:action.columns,
                loaded:action.loaded,
            });
        case ActionList.UNSET_ROASTER_STATE:
            return Object.assign({}, state, {
                dashboardData: '',
                columns:'',
                loaded:false
            });
        case ActionList.WEEKLY_ROASTER_FAILED:
        default:
            return state;
    }
}
export default RoasterActionsReducer;