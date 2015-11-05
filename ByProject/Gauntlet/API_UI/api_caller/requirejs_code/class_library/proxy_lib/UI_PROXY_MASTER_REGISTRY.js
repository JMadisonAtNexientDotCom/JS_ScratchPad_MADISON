

//Master registry so we don't keep on destroying and re-creating re-useable
//objects. Or objects we only really ever want one instance of.
var UI_PROXY_MASTER_REGISTRY = UI_PROXY_MASTER_REGISTRY || 
{
	
	has_been_initialized : false, //set to true when initialized.
	
	//Holds instantiated constant registries so we don't have to keep on
  //creating them and then destroying them:
	constants : null, //Will eventually be: new MasterRegistry_Constants(),
	
	//Objects we tend to re-use all the time that have ZERO dependencies:
	utilities : null ,//Will eventually be: new MasterRegistry_Utilities()
	
	
	config     : null,
	signatures : null
	
};

//In case a lazy initializer block has not gotten to the registry yet,
//you may use this to initialize the registry.
UI_PROXY_MASTER_REGISTRY.initSelf = function(){
	
	console.log("entering UI_PROXY_MASTER_REGISTRY.initSelf()");
	
	if(UI_PROXY_MASTER_REGISTRY.has_been_initialized !== true){
		//Initializer the master registry:
		var initer = new MasterRegistry_Initializer();
		initer.init();
	}else{
		console.log("UI_PROXY_MASTER_REGISTRY already initialized, skipping");
	}//Init or not?
	
	UI_PROXY_MASTER_REGISTRY.has_been_initialized = true;
	console.log("exiting UI_PROXY_MASTER_REGISTRY.initSelf()");
	
};//FUNC::END

//Stores test code for testing this class:
UI_PROXY_MASTER_REGISTRY.unitTest = function(){
	
	console.log("entering UI_PROXY_MASTER_REGISTRY.unitTest()");
	
	var ac = new AsserterClass();
  var reg = UI_PROXY_MASTER_REGISTRY;
	ac.assertNonNull(reg, "[SELF FOUND TO BE NULL]");
	ac.assertNonNull(reg.constants.ADAPTER_IDS, "[NULL ADAPTER_IDS]");
	ac.assertNonNull(reg.constants.FUNC_REG   , "[NULL FUNC_REG]"   );
	ac.assertNonNull(reg.constants.HTTP_METH  , "[NULL HTTP_METH]"  );
	ac.assertNonNull(reg.constants.PARAM_REG  , "[NULL PARAM_REG]"  );
	ac.assertNonNull(reg.constants.TYPES_REG  , "[NULL TYPES_REG]"  );
	
	//make sure utilites are not null:
	ac.assertNonNull(reg.utilities.asserter, "[NULL ASSSERTER UTILITY]");
	
	//The instances container should not be tested like this.
	//As we cannot gaurantee all instances will have been deposited
	//at the time that unitTest is invoked.
	
	console.log("exiting UI_PROXY_MASTER_REGISTRY.unitTest()");
	
}//FUNC::END





