import ActionList from './ActionList';
var roasterList = require('../testJson/roasterData.js');
var roasterData = roasterList.getRoasterData();

export const DefaultAction = data => {
    return {}
};
export const fetchWeeklyRoasterData = function(payload){
    makeFetchcall(payload);
    return {
        type: ActionList.FETCH_WEEKLY_ROASTER_DATA,
    }
}

export const weeklyRoasterSuccess = function(data){
    return {
        type: ActionList.WEEKLY_ROASTER_SUCCESS,
        dashboardData: data.dashboardData,
        columns: data.columns,
        loaded: data.loaded
    }
}

export const weeklyRoasterFailed = function (data) {
    return {
        type: ActionList.WEEKLY_ROASTER_FAILED
    }
}

export const unsetRoasterState = function () {
    return {
        type: ActionList.UNSET_ROASTER_STATE
    }
}

function makeFetchcall(payload){
    let requestOptions = {
        url: payload.urlWithParams,
        options: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': payload.authorization
            }
        }
    }
    // Api call to Backend Server
    fetch(requestOptions.url,requestOptions.options)
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server"); // show error message dialog instead of error.
            }
            return response.json();
        }).then(function(data) {
        //Currently not using the response from the server,loading required json from file
        let columns = filterResponseToCreateColumns(roasterData);
        payload.successHandler({dashboardData:roasterData,columns:columns,loaded:true});
    });
}

function filterResponseToCreateColumns(response){
    let columns = {"employeeName":"Employee"};
    if(response[0] !== undefined){
        let target = response[0];
        for(var i in target){
            if (target.hasOwnProperty(i)) {
                let key = i;
                columns[key] = key;
            }
        }
    }
    return columns;
}

export default DefaultAction;