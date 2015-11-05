
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//Responsible for building a service call signature.
//A service call signature describes the function signature of a service call.

//This allows:
//1: The proxy to resolve a service call using this signature.
//2: Detecting errors when front-end puts together a mal-formed service call.

//@Author: JMadison@Nexient.com: 2015.11.04_0642PM(Nov4th,Year2015);
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var ServiceCallSignatureBuilder = function(){
	
	//The main data that this collection encapsulates:
	var _signatures = new ServiceSignatureCollection();
	
	//reference to utility that will check integrity of data:
	var _ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
	
	var _ERROR_NOT_YOUR_FAULT = "[prv build block was improperly closed.]";
      _ERROR_NOT_YOUR_FAULT +="[Issue is internal, has nothing to do with how]";
			_ERROR_NOT_YOUR_FAULT +="[external user used this class.]";
	
	var _is_inside_build_block = false; //currently building a signature?
	var _cur = null;     //current signature being built.
	var _has_cur = false;//do we have a signature being built?
	var _param_checksum = 0; //<--for param count integrity check.
	var _summary_for_service_has_been_set = false;
	
	//Sets summary description for service. All services must include description.
	//about_aka_summary : A summary about what this method does.
	this.setSummary = function(about_aka_summary){
    //error check state + parameter:
		_ac.assertFalse(_summary_for_service_has_been_set,"[summary already set]");
		_ac.assertNonEmptyString(about_aka_summary, "[bad about_aka_summary str]");
		
		//Check object integrity BEFORE edits:
		_ac.assertIsHandleForServiceCall(_cur.main_handle,"[SUMMARY_NOT_SUSPECT]");
		
		//Set summary, and flag:
		_cur.main_handle.about       = about_aka_summary;
		_summary_for_service_has_been_set = true;
		
		//Check object integrity AFTER edits:
		_ac.assertIsHandleForServiceCall(_cur.main_handle,"[SUMMARY_IS_SUSPECT]");
		
	};//FUNC::END
	
	//Used to begin the declaration of a service call signature:
	//service_handle_id : A unique integer representing service. 
	//                    to be resolved by the proxy.
	//http_method_string: The http method this service should use.
	this.addService = function(service_handle_id, http_method_string){
		
		//Error check inputs:
		_ac.assertInteger(service_handle_id,"[service handle must be integer]");
		_ac.assertNonEmptyString(http_method_string,"[bad-or-empty method string]");
		
		
		//Enter building block:
		enterBuildingBlock();
		
		//Check object integrity BEFORE edits:
		_ac.assertIsHandleForServiceCall(_cur.main_handle,"[Improper Handle:B4]");
		
		//Add main signature (the handle identifying the function)
		_cur.main_handle.id          = service_handle_id;
		_cur.main_handle.http_method = http_method_string;
		
		//Check object integrity AFTER edits:
		_ac.assertIsHandleForServiceCall(_cur.main_handle,"[BAD_HANDLE:AFTER]");
		
	};//FUNC::END
	
	function enterBuildingBlock(){
		
		//error check state:
		assertOutsideBuildingBlock();
		
		//Enter building block:
		_is_inside_build_block = true;
		_param_checksum        = 0;
		_summary_for_service_has_been_set = false; //set false BOTH enter+exit.
		
		//Create a new ServiceSignature.js instance to build up
		//while we are inside this new building block:
		_cur     = new ServiceSignature();
		_has_cur = true;
	}//FUNC::END
	
	function exitBuildingBlock(){
		
		//Error check state:
		assertInsideBuildingBlock();
		
		//Do we have the number of params we think we have?
		if(_param_checksum !== _cur.param_handles.size()){
			var err_msg = "";
			err_msg += "[param handle checksum mismatch]";
			err_msg += "[_param_checksum==[" + _param_checksum + "]]";
			err_msg += "[size() --->[" + _cur.param_handles.size() + "]]";
			doError(err_msg);
		}//checksum check.
		
		//Empty references to prepare for 
		//next service signature to build:
		_summary_for_service_has_been_set = false; //set false BOTH enter+exit.
		_cur                   = null;
		_has_cur               = false;
		_is_inside_build_block = false;
		_param_checksum        = 0;
		
	}//FUNC::END
	
	//Throws error if youare INSIDE a building block:
	//Errors thrown by this function are indicative of EXITING a building
	//block twice in a row. Analogous to a bracket balancing error in code.
	function assertOutsideBuildingBlock(){
		_ac.assertFalse(_is_inside_build_block, "[Not outside building block]");
		
		if(_cur !== null){doError("[_cur should be null at this point]");}
		_ac.assertFalse(_has_cur,_ERROR_NOT_YOUR_FAULT);
		
		_ac.assertZero (_param_checksum, "[_param_checksum is not zero]");
	}//FUNC::END
	
	//Throws error if youare OUTSIDE a building block:
  //Errors thrown by this function are indicative of ENTERING a building
	//block twice in a row. Analogous to a bracket balancing error in code.
	function assertInsideBuildingBlock(){
		_ac.assertTrue(_is_inside_build_block, "[Not in building block]");
		
		_ac.assertNonNull(_cur , "[finalized signature ref is null]");
		_ac.assertTrue(_has_cur, "[Flag does not match data]");
		
		_ac.assertInteger(_param_checksum, "[_param_checksum not an integer]");
	}//FUNC::END
	
	//Appends a parameter to the current service handle being constructed.
	//handle_id: Unique integer to identify param, to be resolved by proxy.
	//type_id  : constant from TypesReg.js telling us what type of variable it is.
	//about_str: String description of the service.
	//                 Will hopefully give us hints on how to refactor if large
	//                 scale changes of the back-end api take place.
	this.addParam = function(handle_id, type_id, about_str){
		
		//Assert that we are inside a building block, because this action 
		//is only allowed from within the scope of a building block.
		assertInsideBuildingBlock();
		
		//create new parameter:
		var param   = new HandleForArgument();
		param.id    = handle_id;
		param.type  = type_id;
		param.about = about_str;
		
		//push the parameter to the 
		//signature we are building:
		_cur.param_handles.push( param );
		_param_checksum++; //incriment checksum.
		
	};//FUNC::END
	
	//Used to close the block of code started with "addService(...)" call.
	//Finalizes the signature and appends it to the bundle of signatures
	//that have already been built.
	this.endService = function(){
		
		//Error check state:
		assertInsideBuildingBlock();
		
		//Make sure we remembered to add a summary to service before we exit:
		_ac.assertTrue(_summary_for_service_has_been_set,"[Forgot_To_Set_Summary]");
		
		//Append signature to collection:
		_signatures.push(_cur);
		
		//exit build block after appending new signature to collection:
		exitBuildingBlock();
		
	};//FUNC::END
	
	//Used to get the signatures that we have made.
	//The implementation may actually just be a getter, as individual signatures
	//are built as they are declared. But from an encapsulated perspective,
	//a .build() method for a builder object makes sense.
	this.build = function(){
		
		//We CANNOT build if we are currently in the middle of a building block.
		//AKA: Asking you to dump built data when in the middle of configuring.
		assertOutsideBuildingBlock();
		
		//Assert signature object we've been building is not null:
		_ac.assertNonNull(_signatures, "[.build found null signature container]");
		
		if(_signatures.isEmpty()){
			doError("[signature container is empty. Did you not set anything up?]");
		}//
		
		return _signatures;
	};//
	
	//Throw an error from this class:
	function doError(msg){
		var err_msg = "";
		err_msg += "[Error inside ServiceCallSignatureBuilder.js]";
		err_msg += "[CAUSE:]"
		err_msg += msg;
		console.log(msg);
		throw msg;
	}//FUNC::END
	
};//CLASS::END