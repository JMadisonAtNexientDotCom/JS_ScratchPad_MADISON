

//Initializer class to initialize the master registry.
//This was added because without it, registry initializes properly
//about 80% of the time. We want 100% of the time.
var MasterRegistry_Initializer = function(){

  this.init = function(){
		UI_PROXY_MASTER_REGISTRY.has_been_initialized = true;
		UI_PROXY_MASTER_REGISTRY.constants = new MasterRegistry_Constants();
	  UI_PROXY_MASTER_REGISTRY.utilities = new MasterRegistry_Utilities();
		
		//Trigger config to execute by making new instance:
		var do_config = new proxy_lib_config();
		
	};//FUNC::END
  

};//CLASS::END