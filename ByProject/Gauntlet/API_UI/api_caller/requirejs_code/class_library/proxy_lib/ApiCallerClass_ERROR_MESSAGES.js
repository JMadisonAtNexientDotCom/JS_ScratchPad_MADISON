
//HHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//This file must be loaded BEFORE ApiCallerClass, since ApiCallerClass
//DEPENDS on these error messages:

//Class to store error messages involving ApiCallerClass,
//This is primarily to reduce the file size of ApiCallerClass
//And make code more readable:
//@Author: JMadison@Nexient.com 2015.11.04 (Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var ApiCallerClass_ERROR_MESSAGES = function(){
	
	//Happens when your balancing is off:
  //This is analogous to having your bracket balancing off in source code.
  var ERROR_BALANCE_ENTER_2X = 
  "[ATTEMPT TO ENTER BUILDING BLOCK 2X OR FAILED TO CLOSE PREV BLOCK.]";
  
  //Happens when your balancing is off:
  //This is analogous to having your bracket balancing off in source code.
  var ERROR_BALANCE_EXIT_2X  = 
  "[ATTEMPT TO EXIT BLOCK 2X OR FAILED TO OPEN PREV BLOCK.]";
  
  //Happens when you attempt to use a command that is only allowed from
  //within a request building block. AKA: a block surrounded by an 
  //enter_request_building_block(..) call at the TOP and an
  //exit_request_building_block(..) call at the BOTTOM.
  //All config code must be between those blocks.
  var ERROR_CONFIG_OUTSIDE   = 
  "[COMMAND NOT ALLOWED OUTSIDE REQUEST BUILDING BLOCK]";
  
  var ERROR_CALL_IN_CONFIG = 
  "[ATTEMPT TO INVOKE CALL() WHILE STILL INSIDE REQUEST BUILDING BLOCK]";
  
  var ERROR_NOT_CONFIGURED_YET = 
  "[ATTEMPT TO INVOKE CALL() WITHOUT FIRST CONFIGURING THE API CALLER]";
  
  var ERROR_NULL_ARG = 
  "[ADDED NULL ARGUMENT WHILE BUILDING REQUEST]";
	
	var ERROR_NULL_OR_EMPTY_STRING =
	"[A NULL STRING OR EMPTY STRING WAS SUPPLIED AS ARGUMENT TO METHOD]";
	
};//CLASS::END