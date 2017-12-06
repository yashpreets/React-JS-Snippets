exports.getRoasterData = function(){
    let obj = [{
        "employeeName":"yash 8",
        "Monday 2017-11-27":"8-16",
            },
        {
            "employeeName":"yash 5",
            "Monday 2017-11-27":"8-16",
                 },
        {
            "employeeName":"yash 3",
            "Monday 2017-11-27":"8-15",
        }]
    return obj;
}

exports.getStatusData = function(){
    let obj = [{
        "employeeName":"yash 1",
        "Monday 2017-11-27":"Present",
        "Tuesday 2017-11-28":"Present",
        "Wednesday 2017-11-29":"Half Day",
        "Thursday 2017-11-30":"Absent",
        "Friday 2017-12-01":"Paid Leave",
        "Saturday 2017-12-02":"Unpaid Leave",
        "Sunday 2017-12-03":"Weekly off"
    }]
    return obj;
}