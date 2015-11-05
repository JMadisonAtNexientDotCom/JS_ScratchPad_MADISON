

//Implementation for the MockAPI that will be using Express.js and Node.js
//This implementation helps proxy resolve to the Mock Api.

//This class exists to make correctly configured ProxyRouteAdapters.
//Routes are loaded into switchboard and used to resolve the proxy.

var MockApiRouteFactory = function(){
	
	//Should be the only exposed function, and should take zero parameters.
	
	this.makeRoute = function(){
		
		//Unconfigured stub for now:
		console.log("[TODO: Configure adapter for MockApiRouteFactory]");
		
		var fn = new FuncReg();
		var pm = new ParamReg();
		
		/*
		var op = new ProxyRouteAdapter(signatures);
		
		
		
		op.enter_service_resolving_block(fn.SUBMIT_TOKEN);
		op.setUrl("http://www.example.com/api");
		op.resolveParameter(pm.SUBMIT_TOKEN, "submit_token");
		
		op.exit_service_resolving_block(fn.SUBMIT_TOKEN);
		
		
		//Make sure output is not null, and return:
		var ac = new AsserterClass();
		ac.assertNonNull(op);
		return op;
		*/
		
	};//FUNC:END
	
};//CLASS::END