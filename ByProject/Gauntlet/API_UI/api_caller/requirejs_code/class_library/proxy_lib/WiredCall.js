
//Represents wired up service call. Maybe mock, might be real.

//Represents an object that MAY or MAY NOT be a proxy to a rest service
//API call. We want a container like this to [black-box/generic-ify]
//Actual endpoints and mock endpoints so that we can pass them around
//as if they were the same thing.
var WiredCall = function(){
	
	var _ac = new AsserterClass();
	
	//Base url override only needs to be set if
	//the url of the api somehow departs from the base-url
	//of the container that owns the collection of WiredCall(s)
	//that this instance is a part of.
	this.base_url_override = "";
	this.has_base_url_override = false;
	this.setBaseUrlOverride = function(url_arg){
		_ac.assertNonEmptyString(url_arg, "[bad url_arg in WiredCall override]");
		this.base_url_override     = url_arg;
		this.has_base_url_override = true;
	};//FUNC::END
	
	//MOCK does not need the base-url, since a container holding multiples
	//of these will be referenced.
	//
	//Configure these variables if the service
	//method is NOT a mock:
	//this.base_url    = "www.fakesite.com/api/fakeServiceMethod";
	
	//Configure these variables if the service
	//method is a mock service method:
	this.has_proxy_func = false;
	this.proxy_func = null;
	this.setProxyFunc = function(func){
		_ac.assertNonNull(func);
		this.has_proxy_func = true;
		this.proxy_func     = func;
	}//FUNC::END
	
	//Handles to argument mappings:
	//Expects an array of [INTEGER, STRING]
	//Where the integer is the handle used in our API doc.
	//Where the STRING is the actual name of the argument in the api.
	this.handle_to_var_map   = [];
	
	//reference to HandleForServiceCall
	this.service_call_handle = null;
	
	//Resolve the integer service call handle to an actual name
	//that will be used to invoke service call:
	this.service_call_handle_mapped_name = "NOT_SET";
	
	//Map the service call to a meaningful name. As in, if this is not
	//a proxy, that name will be used to build the final url.
	this.link_handle_to_service_name = function(handle, name_of_service_call){
		_ac.assertIsHandleForServiceCall(handle);
		_ac.assertNonEmptyString(name_of_service_call, "[bad service call name]");
		
		this.service_call_handle = handle;
		this.service_call_handle_mapped_name = name_of_service_call;
		
	};//FUNC::END
	
	this.map_arg = function(handle_id, actual_service_name ){
		_ac.assertInteger(handle_id, "[handle_id must be an integer]");
		_ac.assertNonEmptyString(actual_service_name, "[bad actual s-name]");
		
		this.handle_to_var_map.push( [handle_id , actual_service_name] );
	};//FUNC::END
	
};//CLASS::END