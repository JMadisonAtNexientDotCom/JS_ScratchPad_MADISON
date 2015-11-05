
//Configure 1 instance of ProxyRouteAdapter for each service you want to
//wire up to. In the case of the Nexient-Testing-Service,
//We want:
//1: 1 adapter for the mock api.
//2: 1 adapter for the real api.
//We can then switch which adapter we use in main config when
//switching from live to real api.

var ProxyRouteAdapter = function(){
	
	console.log("[TODO: Write guts of ProxyRouteAdapter.js]");
	
};//CLASS::END