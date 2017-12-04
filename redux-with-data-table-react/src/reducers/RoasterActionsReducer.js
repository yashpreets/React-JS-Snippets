let defaultState = {
    dashboardData: "",
    columns:"",
    loaded:false,
};
export const RoasterActionsReducer = (state = defaultState, action) => {
    //console.log("Roaster Reducer Called" ,action);
    switch(action.type){
        case 'DASHBOARD_DATA_FETCHED' :
            return Object.assign({}, state, {
                dashboardData: action.dashboardData,
                columns:action.columns,
                loaded:action.loaded,
            });
        default:
            return state;
    }
}
export default RoasterActionsReducer;