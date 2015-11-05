

//Similar to HandleForArgument, 
//but used as handle for an api service call. 
//@Author:JMadison@Nexient.com 2015.11.03(Nov3rd,Year2015);
var HandleForServiceCall = function(){
	
	this.id          = 0; //the integer used to identify the handle.
	this.http_method = "GET"; //<--an all caps http method like, GET,POST,PUT
	this.about       = "Example description about what service does.";
	
};//CLASS::END