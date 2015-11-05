//HHHHHHHHHHHHHHHHH  HEADER  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//

//This implementation helps proxy resolve to the static api.
//The static api is a mock-api that does not use express.js or node.js
//And thus, can be ran WITHOUT a node.js server.

//This class exists to make correctly configured ProxyRouteAdapters.
//Routes are loaded into switchboard and used to resolve the proxy.

//Builds service calls that will be loaded into switchboard.

//@Author: JMadison@Nexient.com 2015.11.05_0820AM(Nov5th,Year2015)

//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var StaticApiRouteFactory = function(){
	
	//signature_collection: Instance of ServiceSignatureCollection
	//                      holding the services we want to resolve.
	this.makeRoute = function(signature_collection){
		
		//Assert that we have correct input:
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertIsSignatureCollection(signature_collection,"[NotSigCollection]");
		
		//Pass signature collection to builder:
		var bldr = new ProxyRouteAdapterBuilder(signature_collection);
		
		
		
		//Configure the proxy route adapter:
		bldr.enterServiceResolvingBlock(f.SUBMIT_TOKEN);
		bldr.setURL("https://j1clone01-madnamespace.rhcloud.com/api/OwnerCTRL/is_token_hash_owned_by_ninja");
		bldr.resolveFormalParameter(p.TOKEN_HASH, "token_hash");
		bldr.leaveServiceResolvingBlock(f.SUBMIT_TOKEN);
		
		//Wire-up the debugging call, used while developing.
		//This api call does NOT need to exist on the back-end:
		bldr.enterServiceResolvingBlock(f.UI_TEAM_ONE_PARAM_TEST_CALL_FOR_DEV);
		bldr.setFunction(oneParamTestHandler);
		bldr.resolveFormalParameter(p.TOKEN_HASH, "token_hash", 0);
		bldr.leaveServiceResolvingBlock(f.UI_TEAM_ONE_PARAM_TEST_CALL_FOR_DEV);
		
		
		//Make sure output is not null, and return:
		var ac = new AsserterClass();
		ac.assertNonNull(bldr);
		return bldr;
		
	};//FUNC:END
	
	//Handler functions below: The route factory is responsible for creating
	//A route. If the route using a function to mock the call, that mock function,
	//or at least a wrapper to it, should be declared in the route factory:
	var oneParamTestHandler = function(some_arg){
		return "oneParamTestHandler : Hello World!";
	};//FUNC::END
	
	/*
	var doc = new ApiDocClass();
	var prox_ids = new ProxyIDs();
	this.proxy_string_id = prox_ids.MADISON_API;
	
	this.services = [];
	
	this.base_url = "www.jmim.com";
	
	var SUBMIT_TOKEN = new WiredCall();
	SUBMIT_TOKEN.base_url_override   = "www.whatever.com";
	SUBMIT_TOKEN.setProxyFunc(submitToken);
	SUBMIT_TOKEN.service_call_handle = doc.SUBMIT_TOKEN;
	SUBMIT_TOKEN.link_handle_to_service_name(doc.SUBMIT_TOKEN, "SUBMIT_TOKEN");
	
	this.services.push(SUBMIT_TOKEN);
	
	this.call
	
	
	//Takes a query string bundle and calls the proxy function:
	function submitToken(query_string_bundle){
		
		
		
		var response = "hello, testing 123";
		return response;
	};//FUNC::END
	
	//Return the wired-table of service calls:
	return wired_table;
	*/
	
	
};//CLASS::END


//Example of a previously set-up service signature that we want to resolve:
////////////////////////////////////////////////////////////////////////////
//s.addService(f.SUBMIT_TOKEN,m.GET);
//s.setSummary("Allows candidate to confirm a token given to them.");
//s.addParam(p.TOKEN_HASH, t.STRING, "The string representation of token");
//s.endService();
////////////////////////////////////////////////////////////////////////////