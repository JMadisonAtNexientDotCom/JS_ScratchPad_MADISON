
//HHHHHHHHHHHHHHHHHHHHHH  HEADER  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//
//PROBLEM: My global container does NOT always
//fully intialize because the dependencies it needs are not always ready in
//time. I believe this is because requireJS handles such containers
//a bit differently than it handles our "classes".
//
//SOLUTION:
//To circumvent this issue, we will create a singleton that will store all
//master registry information. Then we will have a global container that
//stores a reference to this singleton.
//
//BENIFITS:
//In this way, all of our code can reference the constants they need without
//creating new instances of the classes holding the constants every time
//that data is needed.
//
//@Author:JMadison:2015.11.04_0325PM(Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var MasterRegistry_Constants = function(){

  //REG == Shorthand for "REGISTRY".
	//A registry being a common/central container used by multiple classes.
	
	this.ADAPTER_IDS = 
	              new AdapterIDs(); //Tells us endpoint to route proxy to.
	                                //Example: AdapterIDs.MOCK will make the
																	//proxy route your service calls to the
																	//MOCK API.
																	//while, AdapterIDs.LIVE will make the
																	//proxy route your service calls to the
																	//LIVE Nexient Testing Services API.													
	this.FUNC_REG =
               	new FuncReg()   ; //All functions referenced by handles should
	                                //get their handle values from here. That way
																	//we have a global point of reference, and we
																	//can also gaurantee they are unique.
	this.HTTP_METH = 
	              new HttpMeth()  ; //Cleaner than passing "GET", "POST" hardcoded
	                                //Strings around. Used to define the service
																	//call signatures http-method type.
	this.PARAM_REG =
	              new ParamReg()  ; //All parameters referenced by handles should
	                                //get their id's from here. The proxy will
																	//resolve the handles to actual query string
																	//formal parameters.
	this.TYPES_REG =
	              new TypesReg()  ; //Gives id handles to the types used in the
	                                //signatures for api calls. If signatures
																	//change, we will be able to detect call
																	//being made with the wrong type.



  return this;
};//CLASS::END