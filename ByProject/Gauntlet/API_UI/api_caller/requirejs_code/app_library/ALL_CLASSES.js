//HHHHHHHHHHHHHHHHHHH  HEADER  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//All of the classes needed for the proxy and api caller to function.

//AUTHOR: JMadison@Nexient.com on:2015.11.03(Nov,3rd,Year2015)
//HHHHHHHHHHHHHHHHHHH  HEADER  HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//

//App that is a hack to get all classes imported into project:
define(function (require) {
    
	//PRIMITIVE CLASSES (No dependencies)
	var PRIM_01 = require('proxy_lib/AsserterClass'        ), 
	
	    //Formal parameters used to define structure of service calls:
	    PRIM_02 = require('proxy_lib/parameters/formal/HandleForArgument'    ),
	    PRIM_03 = require('proxy_lib/parameters/formal/HandleForServiceCall' ),
			
			//Actual parameters used to invoke service calls.
			//We abstract arguments using incognito params that hold
			//handles/ids that eventually will map to actual parameter names.
			//this abstraction will make adaptation to back-end refactoring easier:
			PRIM_04 = require('proxy_lib/parameters/actual/IncogAP'              ),
			PRIM_05 = require('proxy_lib/parameters/actual/IncogBundle'          ),
			PRIM_06 = require('proxy_lib/parameters/actual/KnownAP'              ),
			PRIM_07 = require('proxy_lib/parameters/actual/KnownBundle'          ),
			
	//CONSTANTS REGISTRIES (No dependencies):
	    REG_01 = require("proxy_lib/constants/FuncReg"   ),
      REG_02 = require("proxy_lib/constants/ParamReg"  ),
			REG_03 = require("proxy_lib/constants/HttpMeth"  ),
			REG_04 = require("proxy_lib/constants/TypesReg"  ),
			REG_05 = require("proxy_lib/constants/AdapterIDs"),
			
	//Constants validation: (Depends on Constants):
			CVAL_01 = require("proxy_lib/adapters/AdapterIDs_VALIDATOR"),
	
	//COMPOUND PRIMITIVES (Have dependencies)
	    COMP_01 = require('proxy_lib/ApiDocClass'   ), //<--api caller refs this.
			COMP_02 = require("proxy_lib/WiredCall"),
			COMP_03 = require("proxy_lib/ApiCallerClass_ERROR_MESSAGES"),
	    COMP_04 = require('proxy_lib/ApiCallerClass'),
			COMP_05 = require('proxy_lib/parameters/formal/ServiceSignature'),
			
	//COLLECTIONS:
	    C_01 = require('proxy_lib/parameters/formal/FormalParametersCollection'),
			C_02 = require('proxy_lib/parameters/formal/ServiceSignatureCollection'),
			
	//BUILDERS [and/or] FACTORIES:
			FAC_01 = require('proxy_lib/parameters/ServiceCallSignatureBuilder'),
			
  //Mock API and real APIs:
	    GENERIC_ENDPOINT = require('proxy_lib/adapters/ProxyRouteAdapter'),
	    ENDPOINT_01 = require('proxy_lib/adapters/routes/MockApiRouteFactory'),
			ENDPOINT_02 = require('proxy_lib/adapters/routes/LiveApiRouteFactory'),
			ENDPOINT_03 = require('proxy_lib/adapters/routes/StaticApiRouteFactory'),
			
	//Switchboard style configs: These config files have dependencies:
	    SWITCHBOARD_01 = require("proxy_lib/config/ServiceCallSwitchboard"),
			
	//SINGLETONS/GLOBAL CONTAINERS: (Be sparing with these)
	    SINGLETON_01 = require("proxy_lib/MasterRegistry_Constants"  ) ,
			SINGLETON_02 = require("proxy_lib/MasterRegistry_Utilities"  ) ,
			SINGLETON_03 = require("proxy_lib/MasterRegistry_Initializer") ,
	    SINGLETON_04 = require("proxy_lib/UI_PROXY_MASTER_REGISTRY"  ) ,
	    
	//PROXY CONFIG CLASS: Depends on EVERYTHING:
	    PROXY_CONFIG = require("proxy_lib_config");
		
		var ALL_CLASSES = function(){
			
			this.about = "Just a hack to get all of our library classes into file";
			console.log("Importing ALL_CLASSES for use with proxy_lib");
			
			//Do some test code:
			console.log( "MASTER= =" + UI_PROXY_MASTER_REGISTRY );
			
			
			
			//cannot do test here, no gaurantee that object is fully initialized yet:
			//CANT DO --> UI_PROXY_MASTER_REGISTRY.unitTest();
			
			
			//return the [application container class / self]
			return this; 
		};//CLASS::END
		
		return new ALL_CLASSES();
		
});//DEFINE END: