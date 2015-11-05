
//Used to assert usage of valid adapter id:
//Depends on AdapterIDs.js to be loaded by require.js first.
var AdapterIDs_VALIDATOR = function(){
	
	//Error message passed in from invoking class:
	var _root_cause_error_message = null;
	
	this.validateID = function(adapter_id, on_error_msg){
		
		//Make sure inputs valid:
		var ac = new AsserterClass();
		ac.assertNonEmptyString(on_error_msg,"[FINDME:9723h3k2343jkj423423]");
		var rcem = "[rootcause::[" + on_error_msg + "]";
		ac.assertNonNull(adapter_id, "[adapter_id found to be null]"   + rcem);
		ac.assertInteger(adapter_id, "[adapter_id must be an integer]" + rcem);
		
		
		//Set root cause error message in case validation fails:
		_root_cause_error_message = on_error_msg;
		var paids = new AdapterIDs();
		
		//See if we can match adapter id to setting:
		var found_times = 0;
		switch(adapter_id){
			case paids.MOCK_API:
			  found_times++;
			case paids.LIVE_API:
			  found_times++;
			case paids.STATIC_API:
			  found_times++;
			default:
			  found_times = found_times + 0; //PLUS ZERO. AKA: DO NOTHING.
		}//SWITCH
		
		//Throw errors for different cases where not found:
		if(found_times < 0){ doError("[Negative? How?]");}
		if(found_times===0){ 
		  doError("[Id not recognized][value==[" + adapter_id + "]]");
		}
		if(found_times > 1){ doError("[Id collision.]");}
		
	};//FUNC::END
	
	var doError = function(msg){
		var err_msg = ""; 
		err_msg += "[AdapterID Validate Fail!]";
		err_msg += msg;
		err_msg += "[Root cause:]";
		err_msg += _root_cause_error_message;
		throw err_msg;
	};//FUNC::END
	
};//FUNC::END