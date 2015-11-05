
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//IncogAP == "Incognito Actual Parameter"
//It has the exact same structure as a KnownAP (Known Actual Parameter)
//Except instead of having a variable name, we have a variable id handle.
//This id handle will eventually be resolved to an actual variable name.
//
//We use IncogAP to create a flexibile adaptation for the front-end ui to
//adapt to the back-end api. If the back-end api does a naming refactor,
//it will not break all of our ui code, because we are using service handles.
//
//If however, the entire service is removed, or the signature 
//(formal parameters) for the service are altered, that is a bullet we cannot
//dodge.
//AUTHOR: JMadison@Nexient.com: 2015.11.04_0852AM (Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//

var IncogAP = function(){
	
	//A unique id used to identify the variable. Rather than a name.
	//Will eventually be resolved to an actual variable name.
	this.var_id = "VAR_NAME_NOT_SET";
	
	//The actual value. Should be a string or number.
	//Cant really build a query string out of anything else.
	//But since this could, in the future be used for something else
  //besides building query strings, the only thing NOT allowed should
  //be "null" and maybe empty strings.
	this.var_value = null;
	
};//CLASS::END