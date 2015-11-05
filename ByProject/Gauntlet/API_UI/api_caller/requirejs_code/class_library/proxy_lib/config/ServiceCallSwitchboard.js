

var ServiceCallSwitchboard = function(){
	
	var _paids = new AdapterIDs(); //"paids" == "proxy adapter ids"
	var _id_of_adapter_to_use = _paids.MOCK_API;
	var _active_api_adapter_reference      = null;
	
	this.getApiAdapter = function(){
		return _active_api_adapter_reference();
	};//
	
	//Private and takes no arguments.
	var _setApiRouteToUse = function(){
		
		//Assert that none of the id's are null:
		//Rather than make error messages, make something that can be quickly found
		//in project to hunt down root cause:
		var ac = new AsserterClass();
		ac.assertNonNull(_paids, "[AdapterIDs Instance Is NULL]");
		
		//Create references to the different adapter ids:
		var MOCK = _paids.MOCK_API;
		var LIVE = _paids.LIVE_API;
		var STAT = _paids.STATIC_API;
		
		//Validate that adapter Ids are non-null integers:
		ac.assertInteger(MOCK, "[FIND_ME:MOCK-NULL-L4J2342LJ2]");
		ac.assertInteger(LIVE, "[FIND_ME:LIVE-NULL-l234234j32]");
		ac.assertInteger(STAT, "[FIND_ME:STAT-NULL-KK34J3J2K2]");
		
		//Select reference to use:
		switch(_id_of_adapter_to_use){
			case MOCK:
			  var _mock_api = new MockApiRouteFactory().makeRoute();
			  _active_api_adapter_reference = _mock_api;
			  break;
			case LIVE:
			  var _live_api = new LiveApiRouteFactory().makeRoute();
			  _active_api_adapter_reference = _live_api;
				break;
			case STAT:
			  var _stat_api = new StaticApiRouteFactory().makeRoute();
			  _active_api_adapter_reference = _stat_api;
			  break;
			default:
			  doError("api_id not recognized");
		}//SWITCH
		
		//Assert reference is NOT NULL!
		ac.assertNonNull(_active_api_adapter_reference, "[ACTIVE_API_REF_SET_TO_NULL]");
			
	};//FUNC::END
	_setApiRouteToUse();
	
	
		
	
	
};//FUNC::END