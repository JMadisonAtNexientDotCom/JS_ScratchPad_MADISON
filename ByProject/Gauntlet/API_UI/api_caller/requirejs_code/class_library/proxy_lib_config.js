//HHHHHHHHHHHHHHHHHHHHHH    HEADER    HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//Main config file for creating the SIGNATURES that are used by the proxy.
//The actual implementations of those signatures and how they resolve to api
//calls is stored in the different adapater classes that the proxy can route to.

//@Author:JMadison@Nexient.com 2015.11.04_0849PM (Nov4th,Year2015)
//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var proxy_lib_config = function(){
	
	this.signatures = null; //null until configure() called.
	
	//EDIT SETTINGS WITHIN HERE AT YOUR OWN WILL:
	//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE//
	//EEEEEEEEEEEEEEE     E is for EDIT   (START SECTION)   EEEEEEEEEEEEEEEEEEEE//
	//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE//
	
	//Value here should be one of the values within AdapterIDs.js class:
	this.id_of_adapter_to_use = null; 
	
	function configure(){
		console.log("entering proxy_lib_config.configure()");
		
		var ac = new AsserterClass();
		var id_reg = new AdapterIDs();
		ac.assertNonNull(id_reg, "[id_reg is null. proxy_lib_config]");
		this.id_of_adapter_to_use = id_reg.STATIC_API;
		ac.assertNonNull(this.id_of_adapter_to_use, "[id of adapter is null]");
		validate_initial_settings();
		
		
		//Make sure none of the objects we need for configuration are null:
		instantiateHelperClasses();
		checkForErrors([ s, f, p, t, m]);
		console.log("[proxy_lib_config::helper classes checked for errors.]");
		
	  //Service call signatures:
	  //Here we define the interface for the service calls we want to invoke.
	  //As long as back-end does not change signatures to their service calls,
	  //they can re-name variables all they want, and it should NOT break our
  	//code that references these:

	  s.addService(f.SUBMIT_TOKEN,m.GET);
	  s.setSummary("Allows candidate to confirm a token given to them.");
  	s.addParam(p.TOKEN_HASH, t.STRING, "The string representation of token");
	  s.endService();

	  //when done defining the signatures for all services,
		//we will then build the package containing all of the signatures:
		console.log("about to build signatures");
	  this.signatures = s.build();
		
		//Set these objects in our master container, so that other
		//components of the proxy system can reference them:
		UI_PROXY_MASTER_REGISTRY.signatures = this.signatures;
		UI_PROXY_MASTER_REGISTRY.config     = this;
		
		checkForErrorsInFinalConfiguration();
		
		console.log("exiting proxy_lib_config.configure()");
	};//END OF CONFIGURATION.
	configure(); //<--called when new instance made.
	//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE//
	//EEEEEEEEEEEEEEE     E is for EDIT   (END SECTION)     EEEEEEEEEEEEEEEEEEEE//
	//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE//
	
	/////////////////////////-----------------------------------------------+  
	var s; //== signature  //  Wanted to keep the configuration section as  |
	var f; //== function   //  concise as possible. So short-handed the     |
	var p; //== parameter  //  references to the different registry         |
	var t; //== type       //  classes holding constants.                   |
	var m; //== method     //                                               |
  /////////////////////////-----------------------------------------------+
	
	function instantiateHelperClasses(){
		console.log("[entering instantiateHelperClasses()]");
		//private variables that shouldn't be messed with when editing service PPP//
		//call configurations:
		//PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP//
		//_sig  : The signature maker that makes signatures for api calls.
		//_func : The function registry that holds function id handles.
		//_param: The parameter registry that holds parameter id handles.
		//        Parameter ids will be mapped to actual query string argument
		//        names by the proxy.
		//_type : Registry of types. For some type saftey. By knowing the expected
		//        Types, we can check to make sure we are calling the API correctly.
		//_meth : Http Method registry. Stores "GET","POST","PUT" 
		//        into a nice package so we have a central reference 
		//        for it rather than hard-coding.
		s = new ServiceCallSignatureBuilder();
		f = new FuncReg();  //function handles.
		p = new ParamReg(); //parameter handles.
		t = new TypesReg(); //handles for different types. For type safety.
		m = new HttpMeth(); //handles for different http methods.
		//PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP//
		console.log("[exiting instantiateHelperClasses()]");
	}//FUNC::END
	
	
	//Check all of the objects used for configuration and make
	//sure they are not null:
	function checkForErrors(object_array){
		console.log("object_array==" + object_array);
		var ac = new AsserterClass();
		var on_error_message = "";
		for(var i = 0; i < object_array.length; i++){
			on_error_message = "[proxy_lib_config item]#[" + i + "][isNull]";
			ac.assertNonNull(object_array[i], on_error_message);
		}//next i.
	};//FUNC::END
	
	function checkForErrorsInFinalConfiguration(){
		//assert that signature package we built is not null:
		var ac = new AsserterClass();
		ac.assertNonNull(this.signatures, "[Service Sigs Made are Null]");
		
	}//FUNC::END
	
	
	//If you screw up editing of settings, this function will notify you.
	//So don't worry too much about screwing up.
	function validate_initial_settings(){
		var v = new AdapterIDs_VALIDATOR();
		v.validateID(this.id_of_adapter_to_use, "[proxy_lib_config, bad id]");
	};//CONSTRUCTOR::END
	
};//FUNC::END