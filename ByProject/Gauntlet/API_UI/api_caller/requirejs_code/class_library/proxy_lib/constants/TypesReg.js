
//A registry of types so we dont have to be hackish and use
//"STRING" or "INTEGER" in our code.

var TypesReg = function(){
	
	//Zeros and negatives should not be used.
	this.INVALID_TYPE = 0;
	
	//No two handles should have same value:
	this.STRING = 1;
	this.INTEGER= 2;
	
};//CLASS::END