

//A master registry handles of all the variable 
//names used for all of the services.
//Called "ParamReg" because it is a registry of parameter names.
//However, instead of using string handles for the names, we are using
//Integer handles that will be resolved to actual names by the proxy.
//Used to be called "RegistryOfArgNameHandleIDs" but found ParamReg to be
//more concise.
var ParamReg = function(){
	
	//Zeros and negatives should not be used.
	this.INVALID_ARGUMENT_HANDLE = 0;
	
	//No two handles should have same value:
	this.TOKEN_HASH = 1; //The string representation of a token.
	
};//CLASS::END