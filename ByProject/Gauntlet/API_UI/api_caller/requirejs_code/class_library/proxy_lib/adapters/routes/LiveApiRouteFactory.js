
//This implementation helps proxy resolve to the actual live testing service.

//This class exists to make correctly configured ProxyRouteAdapters.
//Routes are loaded into switchboard and used to resolve the proxy.

var LiveApiRouteFactory = function(){
	
	//Should be the only exposed function, and should take zero parameters.
	
	this.makeRoute = function(){
		
		//Unconfigured stub for now:
		console.log("[TODO: Configure adapter for LiveApiRouteFactory]");
		var op = new ProxyRouteAdapter();
		
		//Make sure output is not null, and return:
		var ac = new AsserterClass();
		ac.assertNonNull(op);
		return op;
		
	};//FUNC:END
	
};//CLASS::END