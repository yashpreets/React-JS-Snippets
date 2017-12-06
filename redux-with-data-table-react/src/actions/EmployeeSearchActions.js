import ActionList from './ActionList';
import commonFunctions from './../common/commonFunctions';

export const fetchShiftMappingData = function(payload){
    if(commonFunctions.getFromStore("shiftMapping") == undefined){
        fetchShiftMapping(payload);
    }else{
        payload.successHandler({loaded:true});
    }
    return {
        type: ActionList.FETCH_SHIFT_MAPPING_DATA,
    }
}

export const redirectAfterDataLoad = function(){
    return {
        type: ActionList.REDIRECT_MASTER_DATA_LOADED,
        loaded: true,
    }
}

function fetchShiftMapping(payload){
    let requestOptions = {
        url: payload.url,
        options: {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': payload.authorization
            },
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
        let filteredData = filterShiftMapping(data.payload);
        commonFunctions.setInStore("shiftMapping",JSON.stringify(filteredData));
        payload.successHandler({loaded:true});
    });
}

function filterShiftMapping(shiftMapping){
    let map = {};
    for(var i in shiftMapping){
        if(shiftMapping.hasOwnProperty(i)){
            map[shiftMapping[i].id] = shiftMapping[i].shift;
        }
    }
    return map;
}
