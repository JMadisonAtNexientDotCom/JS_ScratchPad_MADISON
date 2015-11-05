//HHHHHHHHHHHHHHHHHHHHHHHHH    HEADER    HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//SUMMARY:
//Encapsulates a handle for an [argument/param] to a api service call
//in a nice self-documenting container.
//
//Q: How this differs from IncogAP (Incog Actual Parameter)?
//A: 
//   1: IncogAP represents an ACTUAL parameter, while
//      HandleForArgument represents a FORMAL parameter.
//
//   2: HandleForArgument is used for defining the structure of the service.
//      While IncogAP is used for invoking those services.
//@Author:JMadison@Nexient.com :2015.11.04(Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var HandleForArgument = function(){
	
	//NOTE: Valid handle id's are POSITIVE INTEGERS.
	//
	//      Initializing with invalid integers so that we can detect
	//      the error later. If we see a (-1), we know it probably was
	//      because the handles were never set.
	
	this.id   = (-1); //the integer used to identify the handle.
	this.type = (-1); //the type of argument that should be here.
	this.about= "Descriptions for what the handle is go here";
	
};//CLASS::END
