//HEADER:
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//Class responsible for creating asserts in javascript.
//An assert is used for error checking.
//When you assert, you make a formal assumption about what the state
//of the code should be. If your assumptions are wrong, and error is thrown.
//
//I have a paranoid programming style. I spend very little time debugging,
//because I spend a lot of time writing inclined asserts.
//I'd rather spend 6 hours coding in a paranoid style than 3 hours coding
//and 3 hours debugging.
//
//Not to mention that asserts help self-document problems.
//And inlining them guarantees that even after your test library code
//has long rotted away, the inlined assert error checks will still be around.
//AUTHOR: JMadison@Nexient.com on:2015.11.03(Nov,3rd,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var AsserterClass = function(){
	
	//Asserts object is of type: ServiceSignatureCollection
	this.assertIsServiceSignatureCollection = function(arg, on_errror_message){
		//Make sure error message is okay:
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[AISSSC]");
		
		//Check for properties that should exist on ServiceSignatureCollection:
		this.assertNonNull(arg        , "[signature collection provided is null]");
		this.assertNonNull(arg.push   , "[arg.push func does not exist]");
		this.assertNonNull(arg.size   , "[arg.size func does not exist]");
		this.assertNonNull(arg.isEmpty, "[arg.isEmpty func does not exist]");
		
	};//FUNC::END
	
	//Asserts object is of type: ServiceSignature
	this.assertIsServiceSignature = function(arg, on_error_message){
    _makeSureErrorMessageIsNotNull(on_error_message, arg, "[AIS]");
		this.assertNonNull(arg              , "[AISS01]"+on_error_message);
		this.assertNonNull(arg.main_handle  , "[AISS02]"+on_error_message);
		this.assertNonNull(arg.param_handles, "[AISS03]"+on_error_message);
	};//FUNC::END
	
	//Asserts that the object passed is a handle for an argument.
	this.assertIsHandleForArgument = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[HFA]");
		this.assertNonNull       (arg      , "[HFA01]"+on_error_message);
		this.assertInteger       (arg.id   , "[HFA02]"+on_error_message);
		this.assertNonNull       (arg.type , "[HFA03]"+on_error_message);
		this.assertNonEmptyString(arg.about, "[HFA04]"+on_error_message);
	};//FUNC::END
	
	//Asserts that the object passed is a handle for a service call.
	this.assertIsHandleForServiceCall = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[HFS]");
		this.assertNonNull       (arg            , "[HFSC01]"+on_error_message);
		this.assertInteger       (arg.id         , "[HFSC02]"+on_error_message);
		this.assertNonEmptyString(arg.http_method, "[HFSC03]"+on_error_message);
		this.assertNonEmptyString(arg.about      , "[HFSC04]"+on_error_message);
	};//FUNC::END
	
	//Assert argument === 0.
	this.assertZero = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[AZERO]");
		if(arg !== 0){doError("[assertZero failed]", on_error_message);}
	};//FUNC::END
  
  //Throws error if:
  //1: argument is null.
  //2: argument is not string.
  //3: argument is an empty string.
  this.assertNonEmptyString = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[ANES]");
		
		_assertNonEmptyString_PRIVATE(arg, on_error_message);
    
  };//FUNC::END
	
	//Made private wrapper for asserting empty string because code also needs
	//to be used to validate the on_error_message*s supplied to the different
	//assert functions. Without this private helper, we would get infinite
	//recursion.
	var _assertNonEmptyString_PRIVATE = function(arg, on_error_message){
		if (typeof arg === "undefined"){ 
      doError("[assertNonEmptyString failed : Null String]", on_error_message);
    }//Object is null?
    
    if (typeof arg === 'string' || myVar instanceof String){
      //Make sure it is NOT empty:
      if(arg.length <= 0){
        doError("[assertNonEmptyString failed : Empty String Found]", 
				                                                      on_error_message);
      }//
    }else{
      doError("[assertNonEmptyString failed : Not A String]", 
			                                                        on_error_message);
    }//Not a string?
	};//FUNC::END
	
	this.assertInteger = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[AINT]");
		
	  if (typeof arg === "undefined"){ 
      doError("[assertInteger failed : null arg]", on_error_message);
    }//Object is null?
		
		if( isNaN(parseFloat(arg)) ){
			doError("[did not parse to number!]", on_error_message);
		}
		
		var floored = Math.floor(arg);
		if(floored !== arg){
			doError("[Was number, but not integer]", on_error_message);
		}
		
	};//FUNC::END
	
  
  //Throws error if argument provided is not strictly equal to true.
  this.assertTrue = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[ASRT_TRUE]");
		
    if(arg !== true){
      doError("[assertTrue failed]", on_error_message);
    }//
  };//FUNC::END
  
  //Throws error if argument provided is not strictly equal to false.
  this.assertFalse = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[ASRT_FALSE]");
		
    if(arg !== false){
      doError("[assertFalse failed]", on_error_message);
    }//
  };//FUNC::END
  
  //Throws error if argument provided is null.
  //Null pointer exceptions can be very hard to fix.
  //So it is important we catch them as soon as they happen.
  this.assertNonNull = function(arg, on_error_message){
		_makeSureErrorMessageIsNotNull(on_error_message, arg, "[ASRT_NON_NULL]");
		
    if (typeof arg === "undefined"){ 
      doError("[assertNonNull failed]", on_error_message);
    }//Object is null?
  };//FUNC::END
	
	//Throws error if supplied error message is null:
	var _makeSureErrorMessageIsNotNull = function(msg, arg, local_stack_key){
		//Use private version of assert to avoid infinite recursion:
		var on_err_msg =
		on_err_msg += "[NULL ERROR MSG SUPPLIED!]";
		on_err_msg += "[arg_hint==[" + arg + "]]"
		on_err_msg += "[local_stack_key==[" + local_stack_key + "]]";
		_assertNonEmptyString_PRIVATE(msg, on_err_msg);
	};//FUNC::END
  
  //Used to throw errors.
  //ARGS:
	//msg: message about error caused in this class.
	//root_cause_error_message: Message from invoking class.
  var doError = function(msg, root_cause_error_message){
    var err_msg = "";
    err_msg += "[AsserterClass Error:[";
    err_msg += msg;
    err_msg += "]]";
		err_msg += "[Root Cause:[" + root_cause_error_message + "]]";
    console.log(err_msg);
    throw err_msg;
  };//FUNC::END
  
};//FUNC::END