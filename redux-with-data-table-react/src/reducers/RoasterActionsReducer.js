let defaultState = {
    dashboardData: "",
    columns:"",
    loaded:false,
};
export const RoasterActionsReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'WEEKLY_ROASTER_SUCCESS' :
            return Object.assign({}, state, {
                dashboardData: action.dashboardData,
                columns:action.columns,
                loaded:action.loaded,
            });
        case 'WEEKLY_ROASTER_FAILED':
        default:
            return state;
    }
}
export default RoasterActionsReducer;