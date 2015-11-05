

//Represents a bundle of KnownAP (Known Actual Parameters)
//Which can be thought of as query string arguments.
//Since we are going to use them that way.
//Used to invoke a rest service or a rest service mock
//@Author: JMadison@Nexient.com :2015.11.04_0845AM(Nov4th,Year2015)
var KnownBundle = function(){
	
	//Array of KnownAP
	//"actual parameter" is the opposite of "formal parameter".
	//You could think of it as an:
	//"instance of parameters used to invoke a function"
	this.known_actual_parameters = [];
	
	//todo: type validation of array.
	
};//FUNC::END