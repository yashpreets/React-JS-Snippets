import ActionList from './ActionList';
import commonFunctions from './../common/commonFunctions';

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
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': payload.authorization
            },
            body: JSON.stringify(payload.requestPayload)
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
        let filteredData = getFilteredResponse(data.payload);
        payload.successHandler({dashboardData:filteredData[1],columns:filteredData[0],loaded:true});
    });
}

function getFilteredResponse(payload){
    let entityIdMap = {1:"yash1"};
    let shiftMapping = JSON.parse(commonFunctions.getFromStore("shiftMapping"));
    shiftMapping["WeeklyOff"] = "WeeklyOff";
    let data = []
    for(var entityId in payload){
        if (payload.hasOwnProperty(entityId)) {
            let entityName = entityIdMap[entityId];
            let obj = { "employeeName" : entityName };
            for(var i in payload[entityId]){
                if(payload[entityId].hasOwnProperty(i)){
                    let key = payload[entityId][i].dayOfWeek + " " + payload[entityId][i].date;
                    let status = (payload[entityId][i].status).toString();
                    let value = shiftMapping[status];
                    obj[key] = value;
                }
            }
            data.push(obj);
        }
    }
    let columns = {};
    if(data[0] !== undefined){
         let target = data[0];
         for(var j in target){
             if (target.hasOwnProperty(j)) {
                 let key = j;
                 columns[key] = key;
             }
         }
    }
    return [columns,data];
}

export default DefaultAction;