
//An object that will be used to make api calls for NexientTestingService.
//AUTHOR: JMadison@Nexient.com on:2015.11.03(Nov,3rd,Year2015)

//BENIFITS:
//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB//
//1:
//ADAPTABILITY:
//Wraps calls in a proxy so that we can switch from MOCK API to LIVE API
//by modifying only one flag:

//2:
//STABILITY:
//If Back-End api changes, we can modify the api caller, and not have
//to edit any of the HTML pages or angular controllers that use the ApiCaller.

//3:
//FIXES PROBLEMS FAST:
//If Back-End api changes the SIGNATURE to an api call, we update that in
//the api caller configuration. HTML documents that attempt to make 
//the api call using the old signature will throw an error, and the root
//of the problem will be found quickly.
//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB//

var ApiCallerClass = function(angular_http_module){
	
	//"ac" for "asserter class".
  //Does things like type checking and other error checking.
  var _ac = new AsserterClass();
	var _http = null; //<--angularjs http module injected.
	
	this.http = angular_http_module; //Inject $http into here.
	function constructor(angular_http_module){
		
		console.log("entering ApiCallerClass.constructor(...)");
		
		_E = new ApiCallerClass_ERROR_MESSAGES();
		
		//Do lazy init of Master Registry.
		//Initing master registry in here because this should be the only exposed
		//class from the proxy system being used in our angular apps:
		if(UI_PROXY_MASTER_REGISTRY.has_been_initialized !== true){
			//Initializer the master registry:
			var initer = new MasterRegistry_Initializer();
			initer.init();
		}//End lazy initialization.
		
		_ac.assertNonNull(angular_http_module, "[null $http reference]");
		_http = angular_http_module;
		_ac.assertNonNull(_http, "[_http was not successfully set]");
		
		console.log("exiting ApiCallerClass.constructor(...)");
		
	}//constructor end.
	constructor(angular_http_module);
	
	//So we have a centralized reference for how to use the ApiCaller.
	//Not only is this object used for reference, it is also understood
	//by the ApiCallerClass
	this.doc = new ApiDocClass();
	
	//reference to a "WiredTable.js" instance that has api doc wired up
	//to a proxy that may call a mock service or a real service.
	var _api = null;
	
	var _service_handle = null;
	var _has_service_handle = false;
	
	this.switchboard = new ServiceCallSwitchboard();
	
	//Initial api to use is whatever the default configured in switchboard is.
	//this.name_of_api_to_use = this.switchboard.name_of_api_to_use;
	
	//Container to hold all of the error messages for this class so
	//that we can cut down the file size and make more readable:
	var _E; //SET IN CONSTRUCTOR---> = new ApiCallerClass_ERROR_MESSAGES();
  
  //Is flagged to true once we have entered + exited configuration block.
  var _has_been_configured = false;
  
  //Are we inside a request building block?
  //Configuring the request is only allowed while
  //inside a request building block.
  var _in_build_block = false;
  
  //If the api call takes ZERO arguments, it would be a bit redundant
  //to ENTER + EXIT a request building block that has absolutely no logic
  //within it. This function addresses that problem.
  this.configure_as_zero_param_call = function(method_type_string){
    _ac.assertNonEmptyString(method_type_string, _E.ERROR_NULL_OR_EMPTY_STRING);
    _ac.assertFalse(_in_build_block, _E.ERROR_BALANCE_ENTER_2X);
    
    //Should still be false, because we are entering+exiting in one call:
    _in_build_block = false;
    
    //Flag as having been configured:
    _has_been_configured = true;
  };//
  
  //PARAMS:
  //method_type_string: "GET","POST","PUT" etc.
  //
  //When configuring the api caller, all configuration must be
  //done within "enter" and "exit" calls. 
  this.enter_request_building_block = function(method_type_string){
    _ac.assertNonEmptyString(method_type_string, _E.ERROR_NULL_OR_EMPTY_STRING);
    _ac.assertFalse(_in_build_block, _E.ERROR_BALANCE_ENTER_2X);
    _in_build_block = true;
    
    //TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: enter_request_building_block(..)");
    
  };//FUNC::END
  
  //PARAMS:
  //method_type_string: "GET","POST","PUT" etc.
  //parameters are used in closing block as a redundancy to prevent
  //errors.
  //
  //Closes the configuration block and does error checks.
  //.call() can only be invoked after we have exited the request 
  //building block.
  this.exit_request_building_block = function(method_type_string){
    _ac.assertNonEmptyString(method_type_string, _E.ERROR_NULL_OR_EMPTY_STRING);
    _ac.assertTrue(_in_build_block, _E.ERROR_BALANCE_EXIT_2X);
    _in_build_block = false;
		_has_been_configured = true;
    
    //TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: exit_request_building_block(..)");
    
  };//FUNC::END
	
	//Set the service you want to call by providing the handle:
	this.set_service_handle = function(service_handle){
		_ac.assertIsHandleForServiceCall(service_handle);
		_service_handle     = service_handle;
		_has_service_handle = true;
		
		//TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: exit_request_building_block(..)");
		
	};//FUNC::END
  
  //Uses an integer to identify an argument name
  //used in the query-string of a rest service call.
  //Paired with add_arg_value, can be called before or after add_arg_value.
  this.add_arg_handle = function(argument_handle){
    _ac.assertTrue(_in_build_block, _E.ERROR_CONFIG_OUTSIDE);
    _ac.assertIsHandleForArgument(argument_handle, "[FUNC:add_arg_handle]");
    
    //TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: add_arg_handle(..)");
    
  };//FUNC::END
  
  //Used to assign a value to a query-string parameter.
  //Null is the only thing NOT allowed to be passed.
  //Will throw an error if you give it null.
  //Paired with add_arg_handle, can be called before or after add_arg_handle.
  this.add_arg_value = function(arg_value){
    _ac.assertNonNull(arg_value, _E.ERROR_NULL_ARG);
    
    //TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: add_arg_value(..)");
    
  };//FUNC::END
	
	//Set a function to be called when the api call successfully completed.
	this.set_on_success_function = function(func){
		
		//TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: set_on_success_function(..)");
		
	};//FUNC::END
	
	//Set a function to be called when the api call fails.
	this.set_on_failure_function = function(func){
		
		//TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: set_on_failure_function(..)");
		
	};//FUNC::END
  
  //Makes the api call that you built earlier within the request building block.
  //Will throw an error if not properly configured.
  this.call = function(){
    _ac.assertFalse(_in_build_block, _E.ERROR_CALL_IN_CONFIG);
    _ac.assertTrue(_has_been_configured, _E.ERROR_NOT_CONFIGURED_YET);
		_ac.assertNonNull(_service_handle);
		_ac.assertNonNull(_query_bundle); 
		//Query Bundle: query string bundle used to execute service call.
    
    //TODO: Actual logic. Stubbed for now.
    console.log("ApiCallerClass.js :: call(..)");
		
		
		//Resolve proxy to use a mock, or the real service:
		_api = switchboard.getApiTable();
		console.log("_api == " + _api);
		
		/*
		//Get the correct wire-up service call using the service handle:
		var wired_call = _api.find_wired_call_using_service_handle(_service_handle);
		
		//Double-check to make sure the service object we have matches the
		//service handle. Then call the service using the query bundle:
		wired_call.assertSignatureMatchesServiceHandle(_service_handle);
		wired_call.call(_query_bundle);
		*/
    
  };//FUNC::END
  
};//CLASS::END
















