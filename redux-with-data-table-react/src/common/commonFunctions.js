/*
	This file is for common functions and error codes.
*/

exports.alertOptionsObject = function (position){
	if(!position || position.length == 0){
		position = 'bottom right';
	}
	let obj = {
		    offset: 14,
		    position: position,
		    theme: 'dark',
		    time: 10000,
		    transition: 'scale'
  		}
	return obj;
};

exports.getErrorCodes = function(){
	let obj = {
		logout:"R-102"
	}
	return obj;
};

exports.getActions = function(){
	let obj = {
        "login": "/login",
        "logout":"/logout",
        "dashboard": "/dashboard",
    }
    return obj;
};

exports.isEmpty = function(argument){
	if(argument== undefined || argument == '' || argument.length == 0){
		return true;
 	}
 	return false;
};

exports.constants = function(){
	let obj = {
		"loaderTimeout":2000,
		"somethingWentWrongTimeout":20000
	}
	return obj;
};

exports.errorMessages = function(){
	var constants = exports.constants();
	let obj = {
		"serverError":"Something Went Wrong",
	}
	return obj;
}

exports.successMessages = function(){
	let obj = {
		"success":"Success",
	}
	return obj;
}

exports.getCurrentDate = function(){
	var today = new Date();
	 var dd = today.getDate(); 
	 var mm = today.getMonth()+1; //January is 0! 
	 var yyyy = today.getFullYear(); 
	 if(dd<10){ 
	 	dd='0'+dd; 
	 } 
	 if(mm<10){ 
	 	mm='0'+mm; 
	 } 
	 var today = yyyy+'-'+mm+'-'+dd;
	 return today;
};

exports.getdateString = function(date){
    let month = (parseInt(date.getMonth()) + 1);
    if(month < 10){
        month = "0"+month;
    }
    let dd = parseInt(date.getDate());
    if(dd < 10){
    	dd = "0"+dd;
    }
    let dateString = date.getFullYear() + "-" + month + "-" + dd;
    return dateString;
};

//works if sum is less than 30
exports.addDaysToDate = function(date,daysToAdd){
	let month = (parseInt(date.getMonth()) + 1);
    if(month < 10){
        month = "0"+month;
    }
    if(daysToAdd == undefined || daysToAdd < 1){
    	daysToAdd = 0;
    }
    let dd = parseInt(date.getDate())+daysToAdd;
    if(dd < 10){
    	dd = "0"+dd;
    }
    let dateString = date.getFullYear() + "-" + month + "-" + dd;
    return dateString;
};

Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}

exports.getStringTimestamp = function(date){
    let dformat = [ date.getFullYear(),(date.getMonth()+1).padLeft(), date.getDate().padLeft()].join('-') ;
    			// + ' ' +
       //          [date.getHours().padLeft(),
       //          date.getMinutes().padLeft(),
       //          date.getSeconds().padLeft()].join(':');
    return dformat;
}

exports.deleteSession = function() {
    sessionStorage.clear();
};