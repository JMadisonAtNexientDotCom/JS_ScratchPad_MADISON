

//Class responsible for building ProxyRouteAdapter instances.
//signature_collection: Required in constructor so adapter 
//                      knows how api calls should be resolved.
var ProxyRouteAdapterBuilder = function(signature_collection){
	
	//The signatures needed to be referenced to resolve apis.
	var _sigs = null;
	
	//The signature we are currently resolving:
	var _active_sig = null;
	
	//Used to get rudimentary type checking and null checks:
	var _ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
	
	function constructor(signature_collection){
		
		//Assert that we have correct input:
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertIsSignatureCollection
		 (signature_collection,"[ProxyRouteAdapterBuilder-ERROR-NotSigCollection]");
		
	}//CONSTRUCTOR::END
	constructor(signature_collection);
	
	//Used when you want to start resolving the mapping to a service call.
	//function_handle_id: An integer identifying the function:
	this.enterServiceResolvingBlock(function_handle_id){
		
	};//FUNC::END
	
	//Used when you are done resolving the mapping to a service call.
	//Will throw an error if you do not close it with the function_handle_id
	//you orginally opened the resolving block with.
	//Closing the block with the original function_handle_id allows for more
	//robust error checking.
	this.leaveServiceResolvingBlock(function_handle_id){
		
	};//FUNC::END
	
	//Used when you want to resolve the service 
	//call using a URL rather than a function.
	this.setURL = function(fully_qualified_url){
		
	};//FUNC::END
	
	//Used when you want to resolve the service 
	//call using a function rather than a URL.
	//callback_function: A function that should take all of the formal paramters
	//                   that need to be resolved by the proxy.
	this.setFunction = function(callback_function){
		//_ac.assertNumParams(callback_function, _active_sig.
		
	};//FUNC::END
	
	//Resolves the mapping for a formal parameter.
	//param_handle_id : The unique integer id of the parameter.
	//mapped_name     : The string we want to map the parameter handle to.
	//arg_position    : ONLY FOR MAPPINGS USING FUNCTIONS INSTEAD OF URLS:
	//                  The order in which the argument is called.
	this.resolveFormalParameter = 
	                         function(param_handle_id, mapped_name, arg_position){
		
		
	};//FUNC::END
	
	
	
	//Return the finished ProxyRouteAdapter when
	//we are done configuring the build settings:
	this.build = function(){
		return _adapter;
	};//FUNC::END
	
	

	
	
	
	
	
	
};//CLASS::END