exports.config = function(){
    var application = {};
    application.serverUrl = "http://localhost:3000";
    application.fetchRoasterUrl = application.serverUrl + "/tenant/tenantHolidayMapping/all";
    return application;
};
