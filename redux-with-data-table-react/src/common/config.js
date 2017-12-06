var serverUrl = "http://localhost:3000";

if(process.env.NODE_ENV === "development"){
    serverUrl = "http://localhost:3000";
}else if(process.env.NODE_ENV === "production"){
    serverUrl = "http://localhost:5000";
}

const config = {
    serverUrl : serverUrl,
    fetchRoasterUrl : serverUrl+"/roster/rosterWeekly/",
    stateMappingUrl: serverUrl+"/master/states/all",
    shiftMappingUrl: serverUrl+"/master/shifts/all",
    holidayMappingUrl: serverUrl+"/master/holiday/"
}
export default config;
