
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//Creates a signature to identify a function call by.
//It uses handles rather than actual variable names so that
//1: The proxy can abstract it's meaning at a later date.
//2: Refactoring of ui code will be easier since the handles
//   referenced in UI code will not have to be changed when
//   back-end does a variable re-name on their api.

//@Author: JMadison@Nexient.com: 2015.11.04_0644PM(Nov4th,Year2015);
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var ServiceSignature = function(){
	
	//When resolving an api call, we want to resolve the main handle first.
	//Because that tells us what function call we are going to make.
	this.main_handle   = new HandleForServiceCall();
	
	//The handles that represent formal parameters of the service call
	//represented by the main_handle.
  this.param_handles =	new FormalParametersCollection();
	
};//FUNC::END