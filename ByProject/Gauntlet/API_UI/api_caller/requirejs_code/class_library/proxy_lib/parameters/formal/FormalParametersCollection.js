
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
//A collection of formal parameter objects.
//Used as part of the signature for a service call.

//@Author: JMadison@Nexient.com: 2015.11.04_0643PM(Nov4th,Year2015);
//HHHHHHHHHHHHHHHHHHHHHHH   HEADER   HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH//
var FormalParametersCollection = function(){

  var _params = []; //array of HandleForArgument.js instances.

	//param: An instance of HandleForArgument that we want to add to our
	//       collection of parameters.
  this.push = function(param){
		
		//Do error checking before we push to collection:
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertIsHandleForArgument(param,"[param is not of correct type]");
		checkForCollisions(param);
		
		//Add to collection of parameters:
		_params.push( param );
		
	};//FUNC::END
	
	
	//Returns true if no items found in our collection of parameters:
	this.isEmpty = function(){
		if(_params.length <= 0){ return true;}
		return false;
	};//FUNC::END
	
	this.size = function(){
		return _params.length;
	};//FUNC::END
	
	
	//Check to make sure an identical parameter does NOT exist.
	//The complexity of this is a bit high. But it is only done during
	//Setup/Initialization. So I think the benifits of robust error check
	//outweigh the costs.
	function checkForCollisions(param){
		var ac = UI_PROXY_MASTER_REGISTRY.utilities.asserter;
		ac.assertNonNull(_params, "[_params collection, empty==OK, null==BAD]");
		ac.assertNonNull(param  , "[THE param cannot be null.]");
		
		//We only care about .id and .about.
		//Both of those should be UNIQUE.
		var cur_param = null;
		for(var i = 0; i < _params.length; i++){
			
			cur_param = _params[i];
			ac.assertNonNull(cur_param, "[Current Param Found To Be Null]");
			
			if(cur_param.id ===    //weird indentation for 
			       param.id){      //easy visual confirmation.
			  doError("[.id collision in formal parameter collection.]");
			}//
			
			if(cur_param.about === //weird indentation for 
			       param.about){   //easy visual confirmation.
			  doError("[.about collision in formal parameter collection.]");
			}//
			
		}//next i.
	}//FUNC::END
	
	//Throw an error from this class:
	function doError(msg){
		var err_msg = "";
		err_msg += "[Error inside FormalParametersCollection.js]";
		err_msg += "[CAUSE:]";
		err_msg += msg;
		throw msg;
	}//FUNC::END

};//CLASS::END




