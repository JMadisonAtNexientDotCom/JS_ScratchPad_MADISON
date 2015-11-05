
//KnownAP == "Known Actual Parameter".
//(Actual param, as apposed to formal param)
//It is called "known" because the handle_id has been resolved
//to an actual var_name rather than an id.
//
//Could think of query string argument as the
//"instantiated / non-abstract" version of HandleForArgument.js
//All proxies should take an array of query string arguments as input.
var KnownAP = function(){
	
	//The actual name used in the query string.
	this.var_name = "VAR_NAME_NOT_SET";
	
	//The actual value. Should be a string or number.
	//Cant really build a query string out of anything else.
	this.var_value= null;
	
};//