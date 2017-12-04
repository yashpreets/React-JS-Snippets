export const RoasterActions = data => {
    //console.log('roaster actions:', data);
    switch (data.type){
        case "fetchRoasterData":
            return {
                type: 'FETCH_DASHBOARD_DATA',
            }
        case "roasterDataLoaded":
            return {
                type: 'DASHBOARD_DATA_FETCHED',
                dashboardData: data.dashboardData,
                columns: data.columns,
                loaded: data.loaded
            }
        default:
            return {
                type: 'FETCH_DASHBOARD_DATA',
            }
    }
};
export default RoasterActions;