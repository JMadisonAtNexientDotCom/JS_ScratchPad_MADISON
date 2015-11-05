
//A master registry of all of the service handles.
//Called "FuncReg" because it is essentially a registry of function names.
//However, we are using integer handles rather than names.
//Was called "RegistryOfServiceHandleIDs" before I renamed it to FuncReg.
//Find RuncReg to be more concise.
var FuncReg = function(){
	
	//Zeros and negatives should not be used.
	this.INVALID_SERVICE_HANDLE = 0;
	
	//No two handles should have same value:
	this.SUBMIT_TOKEN = 1;
	
};//CLASS::END