exports.getRoasterData = function(){
	let obj = [{
		"employeeName":"yash 1",
		"Monday 2017-11-27":"8-16",
		"Tuesday 2017-11-28":"8-16",
		"Wednesday 2017-11-29":"8-16",
		"Thursday 2017-11-30":"8-16",
		"Friday 2017-12-01":"8-16",
		"Saturday 2017-12-02":"8-16",
		"Sunday 2017-12-03":"Weekly off"
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